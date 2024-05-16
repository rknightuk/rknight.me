---
title: SwiftUI
permalink: intersect/programming/swiftui/index.html
eleventyNavigation:
  key: SwiftUI
  parent: Programming
---

## Button Opens URL

```swift
Button(action: {
    if let url = URL(string: "https://rknight.me") {
        NSWorkspace.shared.open(url)
   }
}) {
    Text("Website")
        .foregroundColor(Color.blue)
}
```


## Using SF Symbols

```swift
Image(systemName: "bolt.circle")
    .foregroundColor(.yellow)
```

## Centre VStack

```swift
VStack(alignment: .center)
```