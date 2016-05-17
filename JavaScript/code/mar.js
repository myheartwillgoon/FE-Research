/*! mars_viplux-1.0.1 create 2014-12-11 03:12:43 */
// http://3rd.vipstatic.com/mars_viplux/mars_viplux.js
!
function() {
    window.T0 = (new Date).getTime(),
    window.Mar = function() {},
    // cookie 组件封装
    Mar.Cookie = {
        get: function(a) {
            var b, c = document.cookie,
            d = c.indexOf(a + "=");
            return - 1 !== d ? (d += a.length + 1, b = c.indexOf(";", d), unescape(c.substring(d, -1 === b ? c.length: b))) : void 0
        },
        set: function(a, b, c) {
            for (var d, e = document.domain.toLowerCase(), f = ["viplux", "vipstatic"], g = 0; g < f.length && -1 === e.indexOf(f[g] + ".com"); g++);
            0 === c ? document.cookie = a + "=" + escape(b) + ";path=/;domain=." + f[g] + ".com": (d = new Date, d.setTime(d.getTime() + 24 * c * 3600 * 1e3), document.cookie = a + "=" + escape(b) + ";expires=" + d.toGMTString() + ";path=/;domain=." + f[g] + ".com")
        },
        del: function(a, b) {
            document.cookie = a + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=/;" + (b ? "domain=" + b: "")
        }
    },
    // 唯一id,三种方式
    Mar.guid = function() {
        for (var a = 0,
        b = []; 8 > a;) b.push((65536 * (1 + Math.random()) | 0).toString(16).substring(1)),
        a++;
        return b.join("").toUpperCase()
    },
    Mar.guid2 = function() {
        function a() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        }
        return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
    },
    Mar.guid3 = function() {
        function a(a, c, d) {
            var e = b(a, 16),
            f = new Array,
            g = "",
            h = 0;
            for (h = 0; h < e.length; h++) f.push(e.substring(h, h + 1));
            for (h = Math.floor(c / 4); h <= Math.floor(d / 4); h++) g += f[h] && "" != f[h] ? f[h] : "0";
            return g
        }
        function b(a, b) {
            return a.toString(b).toUpperCase()
        }
        function c(a) {
            return Math.floor(Math.random() * (a + 1))
        }
        var d = new Date(1582, 10, 15, 0, 0, 0, 0),
        e = new Date,
        f = e.getTime() - d.getTime(),
        g = a(f, 0, 31),
        h = a(f, 32, 47),
        i = a(f, 48, 59) + "1",
        j = a(c(4095), 0, 7),
        k = a(c(4095), 0, 7),
        l = a(c(8191), 0, 7) + a(c(8191), 8, 15) + a(c(8191), 0, 7) + a(c(8191), 8, 15) + a(c(8191), 0, 15);
        return g + h + i + j + k + l
    },
    // 产生随机数
    Mar.rand = function(a) {
        var b = "0123456789abcdef",
        c = "",
        d = 0;
        for (a = a || 32; a > d; d++) c += b.charAt(Math.ceil(1e8 * Math.random()) % b.length);
        return c
    },
    //判断IE 版本号,IE特性手法
    Mar.IE = function() {
        for (var a = 3,
        b = document.createElement("DIV"), c = b.getElementsByTagName("I"); b.innerHTML = "<!--[if gt IE " + ++a + "]><i></i><![endif]-->", c[0];);
        return a > 4 ? a: 0
    },
    // 简单浏览器检测
    Mar.browser = function() {
        var a = navigator.userAgent.toLowerCase(),
        b = Mar.IE();
        return {
            ie: b && ["ie", b],
            firefox: a.match(/firefox\/([\d.]+)/),
            chrome: a.match(/chrome\/([\d.]+)/),
            opera: a.match(/opera.([\d.]+)/),
            safari: window.openDatabase ? a.match(/version\/([\d.]+)/) : void 0
        }
    },
    // http协议提取
    Mar.protocal = function() {
        return - 1 !== document.location.href.toLowerCase().indexOf("https://") ? "https://": "http://"
    },
    // JSON.stringify兼容
    Mar.stringify = function(a) {
        if (window.JSON && window.JSON.stringify) return window.JSON.stringify(a);
        var b, c, d, e = [],
        f = typeof a,
        g = 0;
        if ("string" === f) return '"' + a + '"';
        if ("undefined" === f || "boolean" === f || "number" === f || null === a) return a;
        if ("[object Array]" == Object.prototype.toString.call(a)) {
            for (b = a.length, e.push("["); b > g; g++) e.push(Mar.stringify(a[g]) + ",");
            e.push("]")
        } else {
            e.push("{");
            for (c in a) a.hasOwnProperty(c) && e.push('"' + c + '":' + Mar.stringify(a[c]) + ",");
            d = e.length - 1,
            e[d] = e[d].replace(/,$/, ""),
            e.push("}")
        }
        return e.join("")
    },
    // 发送统计数据,image.src发送
    Mar.Request = function(a, b) {
        var c = Mar.Base,
        d = Mar.Biz();
        a = Mar.protocal() + "mar.vip.com" + a + "&mars_cid=" + d.cid + "&mars_sid=" + d.sid + "&pi=" + d.pid + "&mars_vid=" + d.vid + "&lvm_id=" + d.lvmId + "&mars_var=" + d.mvar + "&lg=" + d.isLog + "&wh=" + d.wh + "&in=" + d.newbie + "&sn=" + d.orderId + "&url=" + c.url + "&sr=" + c.res + "&rf=" + c.ref + "&bw=" + c.cw + "&bh=" + c.ch + "&sc=" + c.col + "&bv=" + c.nav + "&ce=" + c.ce + "&vs=&title=" + c.title + "&tab_page_id=" + d.pageId,
        b && (a += "&wap_ln=" + d.wapln + "&wap_vs=" + d.wapvs + "&wap_pwh=" + d.wappwh + "&wap_wh=" + d.wapwh + "&wap_id=" + d.wapid + "&wap_from=" + d.wapfrom + "&cps_u=" + d.cpsu + "&m_vipruid=" + d.ruid),
        a += "&r=" + Math.random();
        var e = new Image(1, 1);
        return e.onload = e.onerror = e.onabort = function() {
            e.onload = e.onerror = e.onabort = null,
            e = null
        },
        e.src = a,
        Mar
    };
    var a;
    Mar.Base = {},
    a = Mar.Base,
    a.local = document.location,
    a.domain = document.domain,
    a.docEle = document.documentElement,
    a.context = "css1compat" === document.compatMode.toLowerCase() ? document.body: a.docEle,
    a.monitor = window.screen,
    a.href = a.local.href,
    a.url = escape(a.href),
    a.pn = a.local.pathname.toLowerCase(),
    a.hn = a.local.hostname.toLowerCase(),
    a.ref = escape(document.referrer),
    a.cw = a.docEle.clientWidth,
    a.ch = a.docEle.clientHeight,
    a.res = a.monitor.width + "*" + a.monitor.height,
    a.col = a.monitor.colorDepth,
    a.w = a.context.width,
    a.h = a.context.height,
    a.nav = escape(navigator.userAgent.toLowerCase()),
    a.ce = navigator.cookieEnabled ? 1 : 0,
    a.title = escape(document.title)
} (),
function(a) {
    Mar.PageIdIndex = 0,
    Mar.PageId = Mar.PageId ? Mar.PageId + "_" + ++Mar.PageIdIndex: (new Date).getTime() + "_" + Mar.guid2(),
    Mar.Biz = function(b) {
        var c = Mar.Cookie,
        d = c.get,
        e = c.set,
        f = c.del,
        g = Mar.Base,
        h = 0,
        i = 0,
        j = "",
        k = d("VipLID"),
        l = d("PHPSESSID"),
        m = d("mars_cid") || d("cookie_id"),
        n = d("mars_pid") || d("page_id"),
        o = d("mars_sid") || Mar.rand(),
        p = d("visit_id") || Mar.guid(),
        q = d("lvm_id"),
        r = d("tmp_mars_cid"),
        s = d("vip_wh"),
        t = window.mars_var ? Mar.stringify(window.mars_var) : "-",
        u = d("vip_qe"),
        v = d("vip_qt"),
        w = window.vip_xe || "",
        x = window.vip_xt || "";
        if (k && l && unescape(k).split("|")[0] === l && (h = 1), !m && r ? m = r: (!m || 32 !== (m + "").length && 46 !== (m + "").length) && (m = (new Date).getTime() + "_" + Mar.rand(), i = 1), n = n || 0, b && n++, f("cookie_id"), f("page_id"), f("mars_cid"), e("mars_pid", n, 732), e("mars_cid", m, 732), e("mars_sid", o, 0), e("visit_id", p, .5 / 24), "/shop/shop_pay.php" === g.pn) j = a("#orid").html();
        else if ("checkout.vipshop.com" === g.hn && "order.php" === g.pn.substring(6, 15)) try {
            j = a("body").html().match(/æ‚¨çš„è®¢å•å·ä¸ºï¼š(\d+)/)[1]
        } catch(y) {}
        return {
            cid: m,
            sid: o,
            pid: n,
            vid: p,
            lvmId: q,
            wh: s,
            mvar: t,
            newbie: i,
            isLog: h,
            orderId: j,
            pageId: Mar.PageId,
            vip_qe: u,
            vip_qt: v,
            vip_xe: w,
            vip_xt: x
        }
    },
    Mar.PV = function() {
        return Mar.Request("/viplux/aa?"),
        Mar
    }
} (jQuery),
// 用户行为数据发送
function(a) {
    Mar.Seed = function() {
        function b(b) {
            return /.*\.\w*$/.test(b) && -1 !== a.inArray(b.match(/\.(\w*)$/i)[1], ["rar", "zip", "exe", "doc", "ppt", "xls", "docx", "xlsx", "pptx", "sisx", "apk"]) ? "download": ""
        }
        function c(c, e) {
            var f, g, h, i = a(this),
            j = this.tagName.toLowerCase();
            e = e || "click",
            "a" === j ? (g = i.attr("href"), h = d[j + (g ? b(g.toLowerCase()) : "")]) : (g = i.attr("type"), f = d[j + (g ? g.toLowerCase() : "")], h = f ? f: j),
            Mar.Seed.request(h, e, i.attr("hover" !== e.toLowerCase() ? "mars_sead": "mars_sead_hover"), i.attr("data-mars"))
        }
        var d = {
            inputbutton: "button",
            inputsubmit: "button",
            inputtext: "inputText",
            inputinput: "inputText",
            inputradio: "radio",
            inputcheckbox: "checkbox",
            adownload: "download",
            a: "link",
            span: "span",
            button: "button"
        };
        return a("body").delegate("[mars_sead]:not(select)", "click",
        function() {
            c.call(this)
        }).delegate("select[mars_sead]", "change",
        function() {
            Mar.Seed.request("select", "change", a(this).attr("mars_sead"))
        }).delegate("[mars_sead_hover]", "mouseenter",
        function(a) {
            c.call(this, a, "hover")
        }),
        Mar
    },
    Mar.Seed.request = function(a, b, c, d) {
        var e = (new Date).getTime() - window.T0;
        d = d || "",
        Mar.Request("/viplux/ab?at=" + e + "&et=" + a + "&ed=" + b + "&one=" + encodeURIComponent(c) + "&data_mars=" + d)
    }
} (jQuery),
function() {
    Mar.PV().Seed()
} (jQuery);
