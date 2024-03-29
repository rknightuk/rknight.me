---
title: Alfred
permalink: intersect/macos/alfred/index.html
eleventyNavigation:
  key: Alfred
  parent: MacOS
---

### Fix for Snippets Not Working in VSCode

Alfred Preferences > Snippets > Auto Expansion Options > Tweaking and setting Simulated key event speed to 4/5 (the level below fastest)

### Workflow Development Notes

These are notes and snippets I found helpful when making [my Alfred workflows](https://rknight.me/alfred-workflows/). View the [JXA page](/programming/js/jxa/) for JXA snippets and notes.

- Optimise your images and icons otherwise this can slow down workflows
- Script filter ordering - [_As long as you don't give your items a UID, Alfred should show them in the same order you emit them_](https://www.alfredforum.com/topic/9293-script-filter-ordering/)
- You can setup auto-updating really easily with [OneUpdater](https://github.com/vitorgalvao/alfred-workflows/tree/master/OneUpdater)

#### Release Checklist

This is my checklist for releasing a new workflow.

```txt
- [ ] Version Number
- [ ] Set bundle ID
- [ ] Set Website and Author
- [ ] Readme
- [ ] Screenshot
- [ ] Check for hard-coded/test values
```

#### Updating Variables in a Workflow

It's much nicer to be able to let people update settings from inside a workflow, this script does exactly that.

```js
function run(argv) {
    ObjC.import('stdlib');
    var app = Application.currentApplication();
    app.includeStandardAdditions = true;

    const setting = $.getenv('setting') // the variable name
    const newValue = $.getenv('newValue') // the value to set

    Application('com.runningwithcrayons.Alfred').setConfiguration(setting, {
        toValue: newValue,
        inWorkflow: $.getenv('alfred_workflow_bundleid'),
        exportable: true // update this if it should not be exportable
    })

    return `Updated ${setting} to ${newValue}`
}
```

#### Caching Data or Items

```js
const cacheFileName = 'cache.json'
const finderApp = Application("Finder")
const cacheFile = Path(`${$.getenv('alfred_workflow_data')}/${cacheFileName}`)
const cacheFileExists = finderApp.exists(cacheFile)

if (cacheFileExists)
{
    // load the cache file instead of fetching again
    ObjC.import('Foundation')
    const fm = $.NSFileManager.defaultManager
    let contents = fm.contentsAtPath(cacheFile.toString())
    contents = $.NSString.alloc.initWithDataEncoding(contents, $.NSF8StringEncoding)
    items = JSON.parse(ObjC.unwrap(contents))
} else {
    // get data from somewhere
    const request = `curl https://example.com/api`
    const response = app.doShellScript(request)
    const items = JSON.parse(response) || []

    if (data.length > 0)
    {
        // if the cache directory doesn't exist, create it
        app.doShellScript(`[[ -d "${$.getenv('alfred_workflow_data')}" ]] || mkdir "${$.getenv('alfred_workflow_data')}"`)

        const cachePath = `${$.getenv('alfred_workflow_data')}/${cacheFileName}`
        // delete the old cache
        app.doShellScript(`rm -rf "${cachePath}"`)
        // create new cache file
        app.doShellScript(`touch "${cachePath}"`)

        // stringify the data
        const cacheData = JSON.stringify(items)

        // write to the file
        const cacheFileWrite = app.openForAccess(Path(cachePath), { writePermission: true })
        app.setEof(cacheFileWrite, { to: 0 })
        app.write(cacheData, { to: cacheFileWrite, startingAt: app.getEof(cacheFileWrite) })
        app.closeAccess(cacheFileWrite)
    }
}

// do what you need to do with your data

```