// base on https://github.com/carhartl/jquery-cookie/blob/master/src/jquery.cookie.js
lib.cookie  = function(key, value, options) {
    var cookie, cookies, len, name, result = false

    if (arguments.length > 1) {
        options = options || {}

        if (typeof options.expires === 'number') {
            var hours = options.expires,
                t     = options.expires = new Date()

            t.setMilliseconds(t.getMilliseconds()+1000*60*60*hours)
        }

            return (document.cookie = [
                    key,'=',value,
                    options.expires ? '; expires=' + options.expires.toUTCString() : '',
                    options.path ? '; path=' + options.path : '',
                    options.domain ? '; domain=' + options.domain : '',
                    options.secure ? '; secure' : ''
                   ].join(''))

    } else {
        if (!key) return false
        cookies = document.cookie ? document.cookie.split('; ') : []
        len = cookies.length

        for (var i = 0; i < len; i++) {
            cookie = cookies[i].split('=');
            name = cookie.shift()

            if (name === key) {
                result = cookie.join('')
                break;
            }
        }
        return result
    }
}

lib.removeCookie = function(key, options) {
    options = options || {}
    options.expires = -1
    lib.cookie(key, '', options)
    return !$.cookie(key)
}
