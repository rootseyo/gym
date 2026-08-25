import SwiftUI

struct ContentView: View {
    private let targetURL = URL(string: "https://gym.brightnetworks.kr")!

    var body: some View {
        ZStack {
            Color(red: 11/255, green: 15/255, blue: 23/255)
                .ignoresSafeArea()

            WebViewRepresentable(url: targetURL)
                .ignoresSafeArea(.all, edges: .bottom)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
