package kr.brightnetworks.fittracker

import android.annotation.SuppressLint
import android.app.Dialog
import android.content.ActivityNotFoundException
import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.os.Bundle
import android.os.Message
import android.util.Log
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.webkit.CookieManager
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ImageButton
import android.widget.LinearLayout
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import com.kakao.sdk.auth.model.OAuthToken
import com.kakao.sdk.common.model.ClientError
import com.kakao.sdk.common.model.ClientErrorCause
import com.kakao.sdk.user.UserApiClient
import org.json.JSONObject
import java.net.URISyntaxException

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private var popupDialog: Dialog? = null
    private val TARGET_URL = "http://gym.brightnetworks.kr"
    private val TAG = "FitTrackerApp"

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
        val keyHash = com.kakao.sdk.common.util.Utility.getKeyHash(this)
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

        webView.loadUrl(TARGET_URL)
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

    private var isLoggingIn = false

    /**
     * Native Javascript Interface for Hybrid Web Communication
     */
    inner class AndroidBridge {
        @JavascriptInterface
        fun isAndroidApp(): Boolean = true

        @JavascriptInterface
        fun loginWithKakao() {
            runOnUiThread {
                performKakaoNativeLogin()
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
                val msg = error.message ?: "카카오 로그인 실패"
                sendKakaoLoginResult(false, null, msg)
            } else if (token != null) {
                Log.i(TAG, "Kakao Login success with token: ${token.accessToken}")
                fetchKakaoUserProfile(token.accessToken)
            }
        }

        // 1. If KakaoTalk app is installed, try loginWithKakaoTalk first
        if (UserApiClient.instance.isKakaoTalkLoginAvailable(this)) {
            Log.i(TAG, "Attempting loginWithKakaoTalk...")
            UserApiClient.instance.loginWithKakaoTalk(this) { token, error ->
                if (error != null) {
                    Log.e(TAG, "KakaoTalk login failed/closed: ${error.javaClass.simpleName} -> ${error.message}", error)
                    // If KakaoTalk app fails or closes unexpectedly, fallback to Kakao Account login
                    Log.i(TAG, "Falling back to loginWithKakaoAccount (browser/web)...")
                    UserApiClient.instance.loginWithKakaoAccount(this, callback = callback)
                } else if (token != null) {
                    isLoggingIn = false
                    Log.i(TAG, "KakaoTalk login success! Fetching profile...")
                    fetchKakaoUserProfile(token.accessToken)
                }
            }
        } else {
            // 2. Otherwise, login with Kakao Account directly
            Log.i(TAG, "KakaoTalk not available, using loginWithKakaoAccount...")
            UserApiClient.instance.loginWithKakaoAccount(this, callback = callback)
        }
    }

    /**
     * Request Kakao User Profile and pass back to WebView
     */
    private fun fetchKakaoUserProfile(accessToken: String) {
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
                    put("accessToken", accessToken)
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
                Log.i(TAG, "Executing login success script in WebView: $jsonData")
                val script = """
                    (function() {
                        try {
                            var data = $jsonData;
                            var nickname = data.nickname || '카카오 사용자';
                            var kakaoId = String(data.kakaoId || '');
                            
                            var kakaoUser = {
                                kakaoId: kakaoId,
                                nickname: nickname,
                                email: data.email || null,
                                profileImage: data.profileImage || null
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


