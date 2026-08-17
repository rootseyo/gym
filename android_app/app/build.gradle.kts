plugins {
    id("com.android.application")
}

android {
    namespace = "kr.brightnetworks.fittracker"
    compileSdk = 36

    defaultConfig {
        applicationId = "kr.brightnetworks.fittracker"
        minSdk = 24
        targetSdk = 36
        versionCode = 6
        versionName = "1.0.5"
        manifestPlaceholders["KAKAO_NATIVE_APP_KEY"] = "4375f15513f363611ff6adfe86f4a766"
    }
    signingConfigs {
        create("release") {
            storeFile = file("release-key.jks")
            storePassword = "Tkfkd0605!"
            keyAlias = "fittracker-key"
            keyPassword = "Tkfkd0605!"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("release")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.activity:activity-ktx:1.9.3")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.11.0")
    implementation("com.kakao.sdk:v2-user:2.20.6")
}
