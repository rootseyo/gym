package kr.brightnetworks.fittracker

import android.app.Application
import com.kakao.sdk.common.KakaoSdk

class FitTrackerApp : Application() {
    companion object {
        const val KAKAO_NATIVE_APP_KEY = "4375f15513f363611ff6adfe86f4a766"
    }

    override fun onCreate() {
        super.onCreate()
        // Initialize Kakao Native SDK
        KakaoSdk.init(this, KAKAO_NATIVE_APP_KEY)
    }
}
