import SwiftUI
import WebKit

struct WebViewRepresentable: UIViewRepresentable {
    let url: URL

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = [] // Enable audio auto-playback for rest timer beeps

        let preferences = WKWebpagePreferences()
        preferences.allowsContentJavaScript = true
        config.defaultWebpagePreferences = preferences
        config.userContentController.add(context.coordinator, name: "timerVibration")
        config.userContentController.add(context.coordinator, name: "openExternalChatGPT")

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = context.coordinator
        webView.isOpaque = false
        webView.backgroundColor = UIColor(red: 11/255, green: 15/255, blue: 23/255, alpha: 1.0)
        webView.scrollView.backgroundColor = UIColor(red: 11/255, green: 15/255, blue: 23/255, alpha: 1.0)

        let request = URLRequest(url: url)
        webView.load(request)

        return webView
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        var parent: WebViewRepresentable

        init(_ parent: WebViewRepresentable) {
            self.parent = parent
        }

        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            decisionHandler(.allow)
        }

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            if message.name == "openExternalChatGPT",
               let urlString = message.body as? String,
               let url = URL(string: urlString),
               url.scheme == "https", url.host == "chatgpt.com" {
                DispatchQueue.main.async {
                    UIApplication.shared.open(url)
                }
                return
            }
            guard message.name == "timerVibration" else { return }
            let vibrationType = message.body as? Int ?? 1

            DispatchQueue.main.async {
                if vibrationType == 2 {
                    let generator = UINotificationFeedbackGenerator()
                    generator.prepare()
                    generator.notificationOccurred(.success)
                } else {
                    let generator = UIImpactFeedbackGenerator(style: .medium)
                    generator.prepare()
                    generator.impactOccurred()
                }
            }
        }
    }
}
