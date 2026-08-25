# ==========================================
# R8 / ProGuard Rules for FitTracker Pro
# ==========================================

# 1. Keep JavaScript Interface methods called from WebView
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# 2. Keep Android Bridge and Activity inner classes
-keep class kr.brightnetworks.fittracker.** { *; }
-keepclassmembers class kr.brightnetworks.fittracker.** { *; }

# 3. Kakao SDK Rules
-keep class com.kakao.sdk.** { *; }
-keep interface com.kakao.sdk.** { *; }
-dontwarn com.kakao.sdk.**

# 4. OkHttp / Okio / Network Rules (used by Kakao SDK)
# Retrofit 2.9's bundled rules predate R8 full mode. Without keeping service
# return types, R8 strips retrofit2.Call<T>'s generic signature and Kakao's
# access-token check crashes as soon as the app enters the foreground.
-keepattributes RuntimeVisibleAnnotations,RuntimeVisibleParameterAnnotations,AnnotationDefault
-if interface * { @retrofit2.http.* public *** *(...); }
-keep,allowoptimization,allowshrinking,allowobfuscation class <3>
-keep,allowoptimization,allowshrinking,allowobfuscation class retrofit2.Response

-dontwarn okhttp3.**
-dontwarn okio.**
-dontwarn org.bouncycastle.**
-dontwarn org.conscrypt.**
-dontwarn org.openjsse.**
-dontwarn javax.annotation.**
-dontwarn java.lang.invoke.**

# 5. Keep JSON and Model serialization
-keepclassmembers class * {
    <fields>;
    <methods>;
}
-keepattributes Signature
-keepattributes *Annotation*
-keepattributes InnerClasses
-keepattributes EnclosingMethod

# 6. Keep AndroidX & Material Components
-dontwarn com.google.android.material.**
-dontwarn androidx.**
