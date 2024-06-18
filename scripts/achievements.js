// https://account.xbox.com/en-gb/Profile?xr=mebarnav&rtc=1&csrf=ZXEz-6KSlkx_96yS6mkoi75Qo0npdXDKQ86Kv5LJ6LXgqzNKYHpIEXluKXVkZ5oTIzKsOx9JRvGPEixpPiUu5UbEL2U1&wa=wsignin1.0&activetab=main:mainTab2

data = {}

Array.from(document.querySelectorAll('.recentProgressInfoWrapper')).forEach(e => {
    const score =e.getElementsByClassName('gamerscoreinfo')
    data[e.getElementsByClassName('recentProgressItemTitle')[0].innerText.replace(/[^0-9A-Z]+/gi,"").toLowerCase()] = {
        title: e.getElementsByClassName('recentProgressItemTitle')[0].innerText,
        achievements: e.getElementsByClassName('achievementinfo')[0].innerText,
        score: score[0].innerText,
        progress: e.getElementsByClassName('recentProgressPercentageNumber')[0].innerText
    }
})

copy(data)