---
title: JXA
eleventyNavigation:
  key: JXA
  parent: Programming
---

## Notes

JXA = JavaScript for Automation

## Run Shell Script

```js
const app = Application.currentApplication();
app.includeStandardAdditions = true;
const path = app.doShellScript('pwd');
```

## Write to a File

```js
const path = '/Users/foo/info.txt'
const dataToWrite = 'this is some text'
const file = app.openForAccess(Path(path), { writePermission: true })
app.setEof(file, { to: 0 })
app.write(dataToWrite, { to: file, startingAt: app.getEof(file) })
app.closeAccess(file)
```

## Read plist file

```js
const data = se.propertyListFiles.byName(`path/to/info.plist`).contents.value()
```

## Open Calendar at Date

```js
var app = Application.currentApplication()
app.includeStandardAdditions = true
var Calendar = Application("Calendar")
var date = new Date()
Calendar.switchView({ to: "day view" })
Calendar.viewCalendar({ at: date })
```