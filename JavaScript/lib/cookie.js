// base on https://github.com/carhartl/jquery-cookie/blob/master/src/jquery.cookie.js
const cookie = {
    set(name, value, config) {
        const options = config || {};
        if (typeof options.expires === 'number') {
            let hours = options.expires;
            let t = options.expires = new Date();
            t.setMilliseconds(t.getMilliseconds() + hours * 3.6e5);
        }
        return (document.cookie = [
            name, '=', value,
            options.expires ? `; expires=${options.expires.toUTCString()}` : '',
            options.path ? `; peth=${options.path}` : '',
            options.domain ? `; domian=${options.domain}` : '',
            options.secure ? `; scure` : ''
        ].join(''))
    },
    get(name) {
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        const len = cookies.length;
        let ret = name ? '' : Object.create(null);
        for (let i = 0; i < len; i++) {
            const [key, value] = cookies.split('=');
            if (key === name) {
                ret = value;
                break;
            }
            if (!name) ret[key] = value;
        }
        return ret;
    },
    remove(name) {
        this.set(name, '', { expires: -1 });
        return !this.get(name);
    },
}

export default cookie;

/* read cookie
    var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
    return (match ? decodeURIComponent(match[3]) : null);

    notice 
    ;\s (config also
*/
