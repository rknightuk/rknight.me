---
title: App Development
permalink: intersect/programming/appdev/index.html
eleventyNavigation:
  key: AppDev
  title: App Development
  parent: Programming
---

Lots of random notes from building an app. See also [SwiftUI notes](/programming/swift/swiftui/).

### Make  a Release in Xcode

`Product > Archive`

### Remove Unused Simulators from XCode

```bash
xcrun simctl delete unavailable
```

### Adding GitHub Package Dependency

- Personal Access Token must have `repo` access
- Use the SSH GitHub URL and not the HTTPS one, otherwise it will fail `git@github.com:user/repo.git`

### User Settings with UserDefaults

```swift
var userDefaults = UserDefaults.standard

// set default values
userDefaults.register(
    defaults: [
        "enabled": true
    ]
)

// get value
UserDefaults.standard.bool(forKey: "enabled")

// set value
UserDefaults.standard.set(false, forKey: "enabled")
```

### Open a SwiftUI View in Window

```swift
// AboutScreenController.swift
import Cocoa

class AboutScreenController: NSWindowController, NSWindowDelegate {
    override func windowDidLoad() {
        super.windowDidLoad()
    }
}

// AppDelegate.swift
let windowController = AboutScreenController(
    window: NSWindow(
        contentRect: NSRect(x: NSScreen.main!.frame.width/2, y: NSScreen.main!.frame.height/2, width: 300, height: 200),
        styleMask: [.titled, .closable, .miniaturizable, .resizable, .fullSizeContentView],
        backing: .buffered, defer: false
    )
)

let aboutView = AboutView()
            
windowController.window?.delegate = windowController
windowController.window?.title = "TrackerZapper"
windowController.window?.contentView = NSHostingView(rootView: aboutView)
windowController.window?.makeKeyAndOrderFront(nil)
NSApp.activate(ignoringOtherApps: true)

// AboutView.swift
import SwiftUI
import Cocoa

struct AboutView: View {
    var body: some View {
        VStack(alignment: .center) {
            Text("This is a window")
        }
        .frame(width: 200, alignment: .top)
        .padding()
    }
}
```

### Show About Window

```swift
// default
NSApplication.shared.orderFrontStandardAboutPanel()

// with options
NSApplication.shared.orderFrontStandardAboutPanel(
    options: [
        NSApplication.AboutPanelOptionKey(rawValue: "Copyright"): "© 2021 Robb Knight"]
)
```