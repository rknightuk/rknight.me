---
title: Swift
eleventyNavigation:
  key: Swift
  parent: Programming
---

### Strings

#### Interpolation

```swift
let name = "Robb"
let myString = "My name is \(name)"
```

#### Replacement

```swift
str.replacingOccurrences(of: "this", with: "that")
```

#### Split

```swift
myString.components(separatedBy: " ")
```

#### Includes

```swift
let myString = "something cool"
// starts with
myString.starts(with: "something")

// contains
myString.contains("something")

// get first or last
myString.prefix(2) // "so"
myString.suffix(2) // "ol"
```

### Arrays

#### Join

```swift
myArray.joined(separator: ", ")
```

#### Filter

```swift
let filtered = myArray.filter { $0.count > 1 }
```

#### Iterate

```swift
for element in elements {
    print(element)
}

// or

elements.forEach { element in
    print(element)
}
```

#### Index Exists

```swift
myArray.indices.contains(1)
```

#### Length of Array

```swift
myArray.count
```
