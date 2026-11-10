package kr.brightnetworks.fittracker

import android.annotation.SuppressLint
import android.app.Dialog
import android.content.ActivityNotFoundException
import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.os.Bundle
import android.os.Message
import android.util.Base64
import android.util.Log
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.webkit.CookieManager
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ImageButton
import android.widget.LinearLayout
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.FileProvider
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import com.kakao.sdk.auth.TokenManagerProvider
import com.kakao.sdk.auth.model.OAuthToken
import com.kakao.sdk.common.model.AuthError
import com.kakao.sdk.common.model.AuthErrorCause
import com.kakao.sdk.common.model.ClientError
import com.kakao.sdk.common.model.ClientErrorCause
import com.kakao.sdk.common.util.Utility
import com.kakao.sdk.user.UserApiClient
import org.json.JSONObject
import java.io.ByteArrayInputStream
import java.io.File
import java.io.FileOutputStream
import java.net.URISyntaxException
import java.nio.charset.StandardCharsets

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private var popupDialog: Dialog? = null
    private val TARGET_URL = "https://gym.brightnetworks.kr"
    private val LEGACY_STORAGE_EXPORT_URL = "http://gym.brightnetworks.kr/__android_storage_export__"
    private val SECURE_STORAGE_IMPORT_URL = "https://gym.brightnetworks.kr/__android_storage_import__"
    private val MIGRATION_PREFERENCES = "fittracker_migrations"
    private val HTTPS_STORAGE_MIGRATION_KEY = "http_to_https_storage_v1"
    private val LEGACY_STORAGE_BACKUP_KEY = "http_storage_backup_v1"
    private val TAG = "FitTrackerApp"
    @Volatile private var pendingLegacyStorageSnapshot = "{}"

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        // Enable edge-to-edge system bar handling (Android 15 requirement)
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)

        val insetsController = WindowCompat.getInsetsController(window, window.decorView)
        insetsController.isAppearanceLightStatusBars = false
        insetsController.isAppearanceLightNavigationBars = false

        setContentView(R.layout.activity_main)

        // Print KeyHash for Kakao Console Registration Verification
        val keyHash = Utility.getKeyHash(this)
        Log.e(TAG, "========================================")
        Log.e(TAG, "★ CURRENT RUNTIME KAKAO KEY HASH: $keyHash")
        Log.e(TAG, "========================================")

        // 1. Top and Bottom Safe Margin / Window Insets handling
        val rootLayout = findViewById<View>(R.id.rootLayout)
        ViewCompat.setOnApplyWindowInsetsListener(rootLayout) { view, windowInsets ->
            val insets = windowInsets.getInsets(
                WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout()
            )
            view.updatePadding(
                top = insets.top,
                bottom = insets.bottom,
                left = insets.left,
                right = insets.right
            )
            WindowInsetsCompat.CONSUMED
        }

        webView = findViewById(R.id.webView)
        setupWebView(webView)

        // 2. Back press dispatcher handling
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (popupDialog != null && popupDialog?.isShowing == true) {
                    popupDialog?.dismiss()
                    popupDialog = null
                    return
                }
                if (webView.canGoBack()) {
                    webView.goBack()
                } else {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                }
            }
        })

        startWebViewWithStorageMigration()
    }

    private fun startWebViewWithStorageMigration() {
        val preferences = getSharedPreferences(MIGRATION_PREFERENCES, MODE_PRIVATE)
        if (preferences.getBoolean(HTTPS_STORAGE_MIGRATION_KEY, false)) {
            webView.loadUrl(TARGET_URL)
            return
        }

        Log.i(TAG, "Starting one-time HTTP to HTTPS local storage migration")
        webView.loadUrl(LEGACY_STORAGE_EXPORT_URL)
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView(targetWebView: WebView, isPopup: Boolean = false) {
        val settings: WebSettings = targetWebView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true
        settings.mediaPlaybackRequiresUserGesture = false
        settings.useWideViewPort = true
        settings.loadWithOverviewMode = true
        settings.allowFileAccess = true
        settings.allowContentAccess = true
        settings.javaScriptCanOpenWindowsAutomatically = true
        settings.setSupportMultipleWindows(true)
        settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        settings.cacheMode = WebSettings.LOAD_DEFAULT

        val cookieManager = CookieManager.getInstance()
        cookieManager.setAcceptCookie(true)
        cookieManager.setAcceptThirdPartyCookies(targetWebView, true)

        if (!isPopup) {
            // Register AndroidBridge for Native Kakao SDK Login
            targetWebView.addJavascriptInterface(AndroidBridge(), "AndroidBridge")
        }

        targetWebView.webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(
                view: WebView?,
                request: WebResourceRequest?
            ): WebResourceResponse? {
                if (!isPopup) {
                    migrationResponseFor(request?.url?.toString())?.let { return it }
                }
                return super.shouldInterceptRequest(view, request)
            }

            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url?.toString() ?: return false
                return handleUrlScheme(view, url)
            }

            @Deprecated("Deprecated in Java")
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                if (url == null) return false
                return handleUrlScheme(view, url)
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                if (url == LEGACY_STORAGE_EXPORT_URL || url == SECURE_STORAGE_IMPORT_URL) return
                // Inject bridge override to ensure kakaoLoginBtn directly triggers Android Native KakaoTalk App and renders user info
                val js = """
                    (function() {
                        window.signInWithKakao = function() {
                            if (window.AndroidBridge && window.AndroidBridge.loginWithKakao) {
                                window.AndroidBridge.loginWithKakao();
                            }
                        };
                        function syncUI() {
                            var btn = document.getElementById('kakaoLoginBtn');
                            if (btn && !btn._kakaoBound) {
                                btn._kakaoBound = true;
                                btn.onclick = function(e) {
                                    e.preventDefault();
                                    e.stopImmediatePropagation();
                                    if (window.AndroidBridge && window.AndroidBridge.loginWithKakao) {
                                        window.AndroidBridge.loginWithKakao();
                                    }
                                };
                            }
                            var raw = localStorage.getItem('fit_tracker_kakao_user');
                            if (raw) {
                                try {
                                    var u = JSON.parse(raw);
                                    if (u && u.kakaoId) {
                                        var nameEl = document.getElementById('authUserName');
                                        if (nameEl) nameEl.textContent = u.nickname || '카카오 사용자';
                                        var idEl = document.getElementById('authUserKakaoId');
                                        if (idEl) idEl.textContent = u.kakaoId;
                                        var loggedOutView = document.getElementById('authLoggedOutView');
                                        if (loggedOutView) loggedOutView.classList.add('hidden');
                                        var loggedInView = document.getElementById('authLoggedInView');
                                        if (loggedInView) loggedInView.classList.remove('hidden');
                                        var dotEl = document.getElementById('authBadgeDot');
                                        if (dotEl) dotEl.classList.remove('hidden');
                                        var btnEl = document.getElementById('authModalBtn');
                                        if (btnEl) btnEl.classList.add('logged-in');
                                    }
                                } catch(e) {}
                            }
                        }
                        syncUI();
                        setInterval(syncUI, 1000);
                    })();
                """.trimIndent()
                view?.evaluateJavascript(js, null)
            }
        }

        if (!isPopup) {
            targetWebView.webChromeClient = object : WebChromeClient() {
                override fun onCreateWindow(
                    view: WebView?,
                    isDialog: Boolean,
                    isUserGesture: Boolean,
                    resultMsg: Message?
                ): Boolean {
                    // When Kakao login popup is attempted by web JS, intercept and trigger Native KakaoTalk App
                    runOnUiThread {
                        performKakaoNativeLogin()
                    }
                    return false
                }

                override fun onCloseWindow(window: WebView?) {
                    super.onCloseWindow(window)
                    popupDialog?.dismiss()
                    popupDialog = null
                }
            }
        }
    }

    private fun migrationResponseFor(url: String?): WebResourceResponse? {
        val html = when (url) {
            LEGACY_STORAGE_EXPORT_URL -> legacyStorageExportHtml()
            SECURE_STORAGE_IMPORT_URL -> secureStorageImportHtml()
            else -> return null
        }

        return WebResourceResponse(
            "text/html",
            "utf-8",
            ByteArrayInputStream(html.toByteArray(StandardCharsets.UTF_8))
        )
    }

    private fun legacyStorageExportHtml(): String = """
        <!doctype html>
        <html><head><meta charset="utf-8"></head><body><script>
        (function() {
            var snapshot = {};
            try {
                for (var i = 0; i < localStorage.length; i++) {
                    var key = localStorage.key(i);
                    if (key !== null) snapshot[key] = localStorage.getItem(key);
                }
            } catch (e) {}
            AndroidBridge.onLegacyStorageExported(JSON.stringify(snapshot));
        })();
        </script></body></html>
    """.trimIndent()

    private fun secureStorageImportHtml(): String = """
        <!doctype html>
        <html><head><meta charset="utf-8"></head><body><script>
        (function() {
            function parseJson(raw, fallback) {
                if (!raw) return fallback;
                try { return JSON.parse(raw); } catch (e) { return fallback; }
            }

            function mergeWorkoutObject(target, source) {
                if (!source || typeof source !== 'object' || Array.isArray(source)) return target;
                Object.keys(source).forEach(function(dateKey) {
                    var legacyExercises = source[dateKey];
                    if (!Array.isArray(legacyExercises)) return;
                    if (!Array.isArray(target[dateKey]) || target[dateKey].length === 0) {
                        target[dateKey] = legacyExercises;
                        return;
                    }

                    var existing = {};
                    target[dateKey].forEach(function(exercise) {
                        var identity = String((exercise && exercise.id) || '') + '|' +
                            String((exercise && exercise.name) || '');
                        existing[identity] = true;
                    });
                    legacyExercises.forEach(function(exercise) {
                        var identity = String((exercise && exercise.id) || '') + '|' +
                            String((exercise && exercise.name) || '');
                        if (!existing[identity]) {
                            target[dateKey].push(exercise);
                            existing[identity] = true;
                        }
                    });
                });
                return target;
            }

            function mergeArrayByIdentity(target, source) {
                if (!Array.isArray(target)) target = [];
                if (!Array.isArray(source)) return target;
                var existing = {};
                target.forEach(function(item) {
                    existing[String((item && item.id) || (item && item.name) || JSON.stringify(item))] = true;
                });
                source.forEach(function(item) {
                    var identity = String((item && item.id) || (item && item.name) || JSON.stringify(item));
                    if (!existing[identity]) {
                        target.push(item);
                        existing[identity] = true;
                    }
                });
                return target;
            }

            var success = false;
            var workoutDayCount = 0;
            try {
                var snapshot = parseJson(AndroidBridge.getPendingLegacyStorageSnapshot(), {});
                var primaryKey = 'fit_tracker_workouts_v1';
                var secureWorkouts = parseJson(localStorage.getItem(primaryKey), {});
                secureWorkouts = mergeWorkoutObject(
                    secureWorkouts,
                    parseJson(snapshot[primaryKey], {})
                );
                secureWorkouts = mergeWorkoutObject(
                    secureWorkouts,
                    parseJson(snapshot.fit_tracker_workouts, {})
                );
                if (Object.keys(secureWorkouts).length > 0) {
                    localStorage.setItem(primaryKey, JSON.stringify(secureWorkouts));
                }
                workoutDayCount = Object.keys(secureWorkouts).length;

                var presetKey = 'fit_tracker_custom_presets_v1';
                var securePresets = mergeArrayByIdentity(
                    parseJson(localStorage.getItem(presetKey), []),
                    parseJson(snapshot[presetKey], [])
                );
                if (securePresets.length > 0) {
                    localStorage.setItem(presetKey, JSON.stringify(securePresets));
                }

                var deletedKey = 'fit_tracker_deleted_dates_v1';
                var deletedDates = Array.from(new Set(
                    parseJson(localStorage.getItem(deletedKey), [])
                        .concat(parseJson(snapshot[deletedKey], []))
                ));
                if (deletedDates.length > 0) {
                    localStorage.setItem(deletedKey, JSON.stringify(deletedDates));
                }

                Object.keys(snapshot).forEach(function(key) {
                    if (key === primaryKey || key === 'fit_tracker_workouts' ||
                        key === presetKey || key === deletedKey) return;
                    if (localStorage.getItem(key) === null && snapshot[key] !== null) {
                        localStorage.setItem(key, snapshot[key]);
                    }
                });
                success = true;
            } catch (e) {
                success = false;
            }
            AndroidBridge.onLegacyStorageImported(success, workoutDayCount);
        })();
        </script></body></html>
    """.trimIndent()

    private var isLoggingIn = false

    /**
     * Native Javascript Interface for Hybrid Web Communication
     */
    inner class AndroidBridge {
        @JavascriptInterface
        fun isAndroidApp(): Boolean = true

        @JavascriptInterface
        fun openExternalChatGPT(url: String) {
            val uri = Uri.parse(url)
            if (uri.scheme != "https" || uri.host != "chatgpt.com" || (uri.port != -1 && uri.port != 443)) return
            runOnUiThread {
                try {
                    startActivity(Intent(Intent.ACTION_VIEW, uri))
                } catch (error: ActivityNotFoundException) {
                    Log.e(TAG, "No external browser available for ChatGPT", error)
                }
            }
        }

        @JavascriptInterface
        fun onLegacyStorageExported(snapshot: String) {
            val validatedSnapshot = try {
                JSONObject(snapshot)
                snapshot
            } catch (_: Exception) {
                "{}"
            }

            pendingLegacyStorageSnapshot = validatedSnapshot
            getSharedPreferences(MIGRATION_PREFERENCES, MODE_PRIVATE)
                .edit()
                .putString(LEGACY_STORAGE_BACKUP_KEY, validatedSnapshot)
                .apply()
            Log.i(TAG, "Exported ${JSONObject(validatedSnapshot).length()} legacy storage entries")

            runOnUiThread {
                webView.loadUrl(SECURE_STORAGE_IMPORT_URL)
            }
        }

        @JavascriptInterface
        fun getPendingLegacyStorageSnapshot(): String {
            if (pendingLegacyStorageSnapshot != "{}") return pendingLegacyStorageSnapshot
            return getSharedPreferences(MIGRATION_PREFERENCES, MODE_PRIVATE)
                .getString(LEGACY_STORAGE_BACKUP_KEY, "{}") ?: "{}"
        }

        @JavascriptInterface
        fun onLegacyStorageImported(success: Boolean, workoutDayCount: Int) {
            if (success) {
                getSharedPreferences(MIGRATION_PREFERENCES, MODE_PRIVATE)
                    .edit()
                    .putBoolean(HTTPS_STORAGE_MIGRATION_KEY, true)
                    .apply()
                Log.i(TAG, "HTTP to HTTPS local storage migration completed ($workoutDayCount workout days)")
            } else {
                Log.w(TAG, "HTTP to HTTPS local storage migration failed; it will retry next launch")
            }
            pendingLegacyStorageSnapshot = "{}"

            runOnUiThread {
                webView.loadUrl(TARGET_URL)
            }
        }

        // Tokens may only be delivered to our HTTPS origin, never an external page.
        @JavascriptInterface
        fun requestGymToken() {
            runOnUiThread {
                fun isTrustedPage(): Boolean {
                    val uri = Uri.parse(webView.url ?: "")
                    return uri.scheme == "https" && uri.host == "gym.brightnetworks.kr" && (uri.port == -1 || uri.port == 443)
                }
                if (!isTrustedPage()) return@runOnUiThread
                UserApiClient.instance.me { _, error ->
                    if (isTrustedPage()) {
                        val token = if (error == null) TokenManagerProvider.instance.manager.getToken()?.accessToken else null
                        val encoded = token?.let { JSONObject.quote(it) } ?: "null"
                        webView.evaluateJavascript("window.onGymNativeToken && window.onGymNativeToken($encoded);", null)
                    }
                }
            }
        }

        @JavascriptInterface
        fun loginWithKakao() {
            runOnUiThread {
                performKakaoNativeLogin()
            }
        }

        @JavascriptInterface
        fun shareToInstagram(dataUrl: String, caption: String) {
            runOnUiThread {
                val page = Uri.parse(webView.url ?: "")
                if (page.scheme != "https" || page.host != "gym.brightnetworks.kr" || (page.port != -1 && page.port != 443)) return@runOnUiThread
                if (!dataUrl.startsWith("data:image/") || dataUrl.length > 4_000_000 || caption.length > 500) return@runOnUiThread
                try {
                    val bytes = Base64.decode(dataUrl.substringAfter(',', ""), Base64.DEFAULT)
                    if (bytes.isEmpty() || bytes.size > 3_000_000) return@runOnUiThread
                    val directory = File(cacheDir, "shared_images").apply { mkdirs() }
                    val image = File(directory, "fittracker-instagram.jpg")
                    FileOutputStream(image).use { it.write(bytes) }
                    val uri = FileProvider.getUriForFile(this@MainActivity, "$packageName.fileprovider", image)
                    val share = Intent(Intent.ACTION_SEND).apply {
                        type = "image/jpeg"
                        putExtra(Intent.EXTRA_STREAM, uri)
                        putExtra(Intent.EXTRA_TEXT, caption)
                        clipData = android.content.ClipData.newRawUri("FitTracker 오운완", uri)
                        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                        setPackage("com.instagram.android")
                    }
                    try {
                        startActivity(share)
                    } catch (_: ActivityNotFoundException) {
                        share.setPackage(null)
                        startActivity(Intent.createChooser(share, "오운완 공유"))
                    }
                } catch (error: Exception) {
                    Log.e(TAG, "Instagram share failed", error)
                }
            }
        }

        @JavascriptInterface
        fun logoutKakao() {
            runOnUiThread {
                UserApiClient.instance.logout { error ->
                    if (error != null) {
                        Log.w(TAG, "Kakao logout error", error)
                    }
                }
            }
        }
    }

    /**
     * Perform Kakao Login via Native KakaoTalk App or Kakao Account Fallback
     */
    private fun performKakaoNativeLogin() {
        if (isLoggingIn) {
            Log.w(TAG, "Login is already in progress, skipping duplicate call.")
            return
        }
        isLoggingIn = true

        val callback: (OAuthToken?, Throwable?) -> Unit = { token, error ->
            isLoggingIn = false
            if (error != null) {
                Log.e(TAG, "Kakao Login failed", error)
                sendKakaoLoginResult(false, null, kakaoLoginErrorMessage(error))
            } else if (token != null) {
                Log.i(TAG, "Kakao Account login success")
                fetchKakaoUserProfile()
            }
        }

        // 1. If KakaoTalk app is installed, try loginWithKakaoTalk first
        if (UserApiClient.instance.isKakaoTalkLoginAvailable(this)) {
            Log.i(TAG, "Attempting loginWithKakaoTalk...")
            UserApiClient.instance.loginWithKakaoTalk(this) { token, error ->
                if (error != null) {
                    Log.e(TAG, "KakaoTalk login failed/closed: ${error.javaClass.simpleName} -> ${error.message}", error)

                    // A user cancellation must not unexpectedly open the browser.
                    if (error is ClientError && error.reason == ClientErrorCause.Cancelled) {
                        isLoggingIn = false
                        return@loginWithKakaoTalk
                    }

                    // Platform configuration errors affect both login methods. Opening Chrome here
                    // only hides the real cause and makes the app appear to ignore KakaoTalk.
                    if (isKakaoPlatformConfigurationError(error)) {
                        isLoggingIn = false
                        sendKakaoLoginResult(false, null, kakaoLoginErrorMessage(error))
                        return@loginWithKakaoTalk
                    }

                    // KakaoTalk is installed but has no usable Kakao account, so use the
                    // Kakao Account browser flow as recommended by Kakao.
                    Log.i(TAG, "Falling back to loginWithKakaoAccount (browser/web)...")
                    UserApiClient.instance.loginWithKakaoAccount(this, callback = callback)
                } else if (token != null) {
                    isLoggingIn = false
                    Log.i(TAG, "KakaoTalk login success; fetching profile")
                    fetchKakaoUserProfile()
                }
            }
        } else {
            // 2. Otherwise, login with Kakao Account directly
            Log.i(TAG, "KakaoTalk not available, using loginWithKakaoAccount...")
            UserApiClient.instance.loginWithKakaoAccount(this, callback = callback)
        }
    }

    private fun isKakaoPlatformConfigurationError(error: Throwable): Boolean {
        if (error is AuthError &&
            (error.reason == AuthErrorCause.Misconfigured || error.reason == AuthErrorCause.InvalidClient)
        ) {
            return true
        }

        val message = error.message.orEmpty().lowercase()
        return message.contains("keyhash validation failed") ||
            message.contains("key hash validation failed") ||
            message.contains("android_key_hash") ||
            message.contains("koe009")
    }

    private fun kakaoLoginErrorMessage(error: Throwable): String {
        if (isKakaoPlatformConfigurationError(error)) {
            val keyHash = Utility.getKeyHash(this)
            return "카카오 앱 설정 오류입니다. Kakao Developers의 네이티브 앱 키에 " +
                "Android 패키지명 $packageName 과 현재 앱 키 해시 $keyHash 를 등록해 주세요."
        }
        return error.message ?: "카카오 로그인에 실패했습니다."
    }

    /**
     * Request Kakao User Profile and pass back to WebView
     */
    private fun fetchKakaoUserProfile() {
        UserApiClient.instance.me { user, error ->
            if (error != null) {
                Log.e(TAG, "Failed to get Kakao user profile", error)
                sendKakaoLoginResult(false, null, "카카오 프로필 정보를 가져오지 못했습니다.")
                return@me
            }

            if (user != null) {
                val kakaoId = user.id.toString()
                val kakaoAccount = user.kakaoAccount
                val profile = kakaoAccount?.profile
                val nickname = profile?.nickname ?: "카카오 사용자"
                val email = kakaoAccount?.email ?: ""
                val profileImage = profile?.profileImageUrl ?: ""

                val jsonObj = JSONObject().apply {
                    put("kakaoId", kakaoId)
                    put("nickname", nickname)
                    put("email", email)
                    put("profileImage", profileImage)
                    put("accessToken", TokenManagerProvider.instance.manager.getToken()?.accessToken)
                }

                sendKakaoLoginResult(true, jsonObj.toString(), null)
            }
        }
    }

    /**
     * Send login results to Web Javascript with complete fallback handling
     */
    private fun sendKakaoLoginResult(success: Boolean, jsonData: String?, errorMsg: String?) {
        runOnUiThread {
            isLoggingIn = false
            if (success && jsonData != null) {
                val callbackUri = Uri.parse(webView.url ?: "")
                if (callbackUri.scheme != "https" || callbackUri.host != "gym.brightnetworks.kr" || (callbackUri.port != -1 && callbackUri.port != 443)) return@runOnUiThread
                Log.i(TAG, "Sending Kakao login success to WebView")
                val script = """
                    (function() {
                        try {
                            var data = $jsonData;
                            if (/^\/community(?:\.html)?$/.test(window.location.pathname) && typeof window.onKakaoNativeLoginSuccess === 'function') {
                                window.onKakaoNativeLoginSuccess(data);
                                return;
                            }
                            var nickname = data.nickname || '카카오 사용자';
                            var kakaoId = String(data.kakaoId || '');
                            
                            var kakaoUser = {
                                kakaoId: kakaoId,
                                nickname: nickname,
                                email: data.email || null,
                                profileImage: data.profileImage || null,
                                accessToken: data.accessToken || null
                            };
                            localStorage.setItem('fit_tracker_kakao_user', JSON.stringify(kakaoUser));
                            
                            var nameEl = document.getElementById('authUserName');
                            if (nameEl) nameEl.textContent = nickname;
                            var idEl = document.getElementById('authUserKakaoId');
                            if (idEl) idEl.textContent = kakaoId;
                            var loggedOutView = document.getElementById('authLoggedOutView');
                            if (loggedOutView) loggedOutView.classList.add('hidden');
                            var loggedInView = document.getElementById('authLoggedInView');
                            if (loggedInView) loggedInView.classList.remove('hidden');
                            var dotEl = document.getElementById('authBadgeDot');
                            if (dotEl) dotEl.classList.remove('hidden');
                            var btnEl = document.getElementById('authModalBtn');
                            if (btnEl) btnEl.classList.add('logged-in');

                            if (typeof currentKakaoUser !== 'undefined') {
                                currentKakaoUser = kakaoUser;
                            }
                            if (typeof window.currentKakaoUser !== 'undefined') {
                                window.currentKakaoUser = kakaoUser;
                            }
                            if (typeof updateAuthUIState === 'function') {
                                updateAuthUIState(kakaoUser);
                            }
                            if (typeof syncWorkoutsToAdminServer === 'function') {
                                syncWorkoutsToAdminServer(kakaoUser);
                            }
                            if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth()) {
                                firebase.auth().signInAnonymously().catch(function() {});
                            }
                            var authModal = document.getElementById('authModal');
                            if (authModal) {
                                authModal.classList.add('hidden');
                            }
                            if (typeof window.onKakaoNativeLoginSuccess === 'function') {
                                window.onKakaoNativeLoginSuccess(data);
                            } else {
                                alert(nickname + '님, 카카오톡 로그인 및 동기화 완료!');
                            }
                        } catch(e) {
                            console.error('Native login script injection error:', e);
                        }
                    })();
                """.trimIndent()
                webView.evaluateJavascript(script, null)
            } else {
                val escapedError = JSONObject.quote(errorMsg ?: "로그인 실패")
                val script = """
                    (function() {
                        if (typeof window.onKakaoNativeLoginFailure === 'function') {
                            window.onKakaoNativeLoginFailure($escapedError);
                        } else {
                            alert($escapedError);
                        }
                    })();
                """.trimIndent()
                webView.evaluateJavascript(script, null)
            }
        }
    }

    /**
     * Handle Kakao, Intent schemes, Market, and external URLs safely.
     */
    private fun handleUrlScheme(view: WebView?, url: String): Boolean {
        // Intercept Kakao OAuth URLs to trigger Native KakaoTalk App login directly
        if (url.contains("kauth.kakao.com") || url.contains("accounts.kakao.com") || url.startsWith("kakaokompassauth:")) {
            Log.i(TAG, "Kakao auth URL detected: $url -> trigger Native KakaoTalk App login")
            runOnUiThread {
                performKakaoNativeLogin()
            }
            return true
        }

        // Standard Web URLs
        if (url.startsWith("http://") || url.startsWith("https://")) {
            return false // Let WebView load it normally
        }

        // Android Intent Scheme (e.g. KakaoTalk auth intent://...)
        if (url.startsWith("intent:")) {
            try {
                val intent = Intent.parseUri(url, Intent.URI_INTENT_SCHEME)
                if (intent != null) {
                    val packageManager = packageManager
                    if (intent.resolveActivity(packageManager) != null) {
                        startActivity(intent)
                        return true
                    }

                    // Fallback to browser URL if provided
                    val fallbackUrl = intent.getStringExtra("browser_fallback_url")
                    if (!fallbackUrl.isNullOrEmpty()) {
                        view?.loadUrl(fallbackUrl)
                        return true
                    }

                    // Fallback to Google Play Store if package name exists
                    val packageName = intent.`package`
                    if (!packageName.isNullOrEmpty()) {
                        val marketIntent = Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=$packageName"))
                        if (marketIntent.resolveActivity(packageManager) != null) {
                            startActivity(marketIntent)
                            return true
                        }
                    }
                }
            } catch (e: URISyntaxException) {
                e.printStackTrace()
            } catch (e: ActivityNotFoundException) {
                e.printStackTrace()
            } catch (e: Exception) {
                e.printStackTrace()
            }
            return true
        }

        // Custom App Schemes (kakaotalk, kakaolink, kakaokompassauth, kakaoplus, storylink, market, tel, mailto, sms, etc.)
        if (url.startsWith("kakaotalk:") || url.startsWith("kakaolink:") || 
            url.startsWith("kakaokompassauth:") || url.startsWith("kakaoplus:") ||
            url.startsWith("storylink:") || url.startsWith("market:") ||
            url.startsWith("tel:") || url.startsWith("mailto:") || url.startsWith("sms:")) {
            try {
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                startActivity(intent)
                return true
            } catch (e: ActivityNotFoundException) {
                if (url.startsWith("kakaotalk:") || url.startsWith("kakaolink:") || url.startsWith("kakaokompassauth:")) {
                    try {
                        startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=com.kakao.talk")))
                    } catch (ex: Exception) {
                        view?.loadUrl("https://play.google.com/store/apps/details?id=com.kakao.talk")
                    }
                    return true
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
            return true
        }

        // Any other non-http scheme -> try to start activity or consume
        return try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
            startActivity(intent)
            true
        } catch (e: Exception) {
            true
        }
    }

    /**
     * Open popup window (e.g. Kakao OAuth popup / window.open) inside a managed Dialog with a Close (X) button.
     */
    private fun openPopupWindow(resultMsg: Message?) {
        popupDialog?.dismiss()

        val dialog = Dialog(this, android.R.style.Theme_Black_NoTitleBar_Fullscreen)
        popupDialog = dialog

        val context = this
        val rootContainer = LinearLayout(context).apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(Color.parseColor("#0b0f17"))
            layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
        }

        // Top Navigation / Close Bar for popup window
        val headerBar = LinearLayout(context).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
            setBackgroundColor(Color.parseColor("#141b27"))
            val density = resources.displayMetrics.density
            val padPx = (12 * density).toInt()
            setPadding(padPx, (8 * density).toInt(), padPx, (8 * density).toInt())
            layoutParams = LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
            )
        }

        val titleView = TextView(context).apply {
            text = "카카오 로그인 / 인증"
            setTextColor(Color.parseColor("#f1f5f9"))
            textSize = 16f
            layoutParams = LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1.0f)
        }

        val closeButton = ImageButton(context).apply {
            setImageResource(android.R.drawable.ic_menu_close_clear_cancel)
            setBackgroundColor(Color.TRANSPARENT)
            setColorFilter(Color.parseColor("#94a3b8"))
            val density = resources.displayMetrics.density
            val btnSize = (36 * density).toInt()
            layoutParams = LinearLayout.LayoutParams(btnSize, btnSize)
            setOnClickListener {
                dialog.dismiss()
                popupDialog = null
            }
        }

        headerBar.addView(titleView)
        headerBar.addView(closeButton)
        rootContainer.addView(headerBar)

        val popupWebView = WebView(context).apply {
            layoutParams = LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
        }

        setupWebView(popupWebView, isPopup = true)

        popupWebView.webChromeClient = object : WebChromeClient() {
            override fun onCloseWindow(window: WebView?) {
                dialog.dismiss()
                popupDialog = null
            }
        }

        rootContainer.addView(popupWebView)
        dialog.setContentView(rootContainer)

        dialog.setOnDismissListener {
            popupWebView.destroy()
            popupDialog = null
        }

        dialog.show()

        val transport = resultMsg?.obj as? WebView.WebViewTransport
        transport?.webView = popupWebView
        resultMsg?.sendToTarget()
    }
}
