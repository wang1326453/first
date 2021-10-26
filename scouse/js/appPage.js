document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function (params) {
        var tbody = document.body
    var width = tbody.clientWidth
    var height = tbody.clientHeight
    window.parent.postMessage({
        height: height,
        width: width
    }, '*')
    },200)
    
}, false)