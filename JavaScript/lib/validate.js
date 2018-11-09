/* eslint-disable */
const validate = {
    compare(a, b, type, msg) {
        let ret = '';
        if ((type === -1 && a >= b) || // less
            (type === 0 && a != b) ||  // equal
            (type === 1 && a <= b) ||  // more
            (type === -2 && a > b) ||  // less and equal
            (type === 2 && a < b) ||   // more and equal
            (type === 3 && a === b)) { // not equal
                ret = msg;
            }
        return ret;
    },
    isMobile(val, msg, empty) {
        let ret = '';
        if (empty && (ret = this.isEmpty(val, empty))) return ret;
        if (val && !/^1\d{10}$/.test(val)) ret = msg;
        return ret;
    },
    isSMSCode(code, msg, empty) {
        let ret = '';
        if (empty && (ret = this.isEmpty(code, empty))) return ret;
        if (code && !/^\d{6}$/.test(code)) ret = msg;
        return ret;
    },
    isEmpty(val, msg) {
        let ret = '';
        if (!val || (val && !val.trim())) ret = msg;
        return ret;
    },
    hasEmoji(val, msg, empty) {
        let ret = '';
        if (empty && (ret = this.isEmpty(val, empty))) return ret;
        if (/(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f])|(\ud83d[\ude80-\udeff])/.test(val)) {
            ret = msg;
        }
        return ret;
    },
    inRange(val, max, min = 0, msg, num = false) {
        let len = num ? val : val.length;
        let ret = '';
        if (min > len || len > max) ret = msg;
        return ret; 
    },
    isName(val, msg, empty) {
        let ret = '';
        if (empty && (ret = this.isEmpty(val, empty))) return ret;
        return !val || /^[·a-zA-Z\.\u4e00-\u9fa5]+$/.test(val) ? '' : msg;
    },
    isNum(val, msg, empty) {
        let ret = '';
        if (empty && (ret = this.isEmpty(val, empty))) return ret;
        return !val || /^\d+$/.test(val) ? '' : msg;
    },
    isTel(val, msg, empty) {
        let ret = '';
        if (empty && (ret = this.isEmpty(val, empty))) return ret;
        return !val || /^[\d-]+$/.test(val) ? '' : msg;
    },
    inRules(val, ...rules) {
        let msg = '';
        if (Array.isArray(rules[0])) rules = rules[0];
        rules.every(item => {
            let ret = true;
            if (item.indexOf(':') > 0) {
                let [rule, args] = item.split(':');
                args = args.split('|').map(val => {
                    if (val === 'false' || val === 'true') return val === 'false' ? false : true;
                    else if (!isNaN(val)) return Number(val);
                    else return val;
                })
                msg = this[rule](val, ...args);
            } else {
                msg = this[item](val);
            }
            if (msg) ret = false;
            return ret;
        })
        return msg;
    },
}

export class Validator {
    constructor() {
        this.list = [];
        this.keys = null;
    }
    add(val, ...rules) {
        if (Array.isArray(val) && Array.isArray(val[0])) {
            this.list.concat(val);
        } else if (typeof val === 'object' && !Array.isArray(val)) {
            const vm = rules[0];
            const keys = Object.keys(val);
            this.keys = keys;
            keys.forEach(key => {
                this.add(vm[key], val[key]);
            }, this);
        } else {
            if (rules.length < 2) {
                this.list.push([val, rules[0]]);
            } else {
                this.list.push([val, ...rules]);
            }
        }
    }
    validate(allMessage = false, vm = null, keys = null) {
        let ret = [];
        this.list.every(item => {
            const [val, rules] = item;
            let message = '';
            message = typeof rules === 'string' && rules.indexOf(':') === -1 ? validate[rules](val) : validate.inRules(val, rules);
            allMessage ? ret.push(message) : (ret = message);
            return allMessage ? true : !message;
        })
        if (allMessage && vm) {
            if (!keys) keys = this.keys;
            keys.forEach((item, i) => {
                vm[item] = ret[i];
            })
        }
        if (allMessage && ret.every(item => !item)) ret = false;
        return ret;
    }
}
export default validate;
