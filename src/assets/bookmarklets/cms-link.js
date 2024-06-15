// ==Bookmarklet==
// @name +CMSLink
// @description New link for rknight.me
// @version 1.0
// ==/Bookmarklet==
  
const run = () => {
    const link = window.location.href

    const url = `https://cms.rknight.me/new?type=3&link=${encodeURIComponent(link)}`
  
    window.open(url);
}
  
run()
  