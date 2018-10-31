/* eslint-disable */
export const MESSAGE = {
    emptyMobile: '请输入手机号',
    invalidMobile: '手机号格式不正确',
    emptySMSCode: '请输入短信验证码',
    invalidSMSCode: '短信验证码格式错误',
    illegalString: '不能输入特殊字符',
    notEmpty: '不能为空',
    outRange: '不在范围内',
}

const M = MESSAGE;

const validate = {
    compare(a, b, type, msg) {
        let ret = '';
        if (type === -1 && a >= b) ret = msg;
        else if (type === 0 && a != b) ret = msg;
        else if (type === 1 && a <= b) ret = msg;
        else if (type === 2 && a == b) ret = msg;
        return ret;
    },
    isMobile(val, message = M.invalidMobile) {
        let ret = '';
        if (val && !/^1\d{10}$/.test(val)) ret = message;
        return ret;
    },
    isSMSCode(code, message = M.invalidSMSCode) {
        let ret = '';
        if (code && !/^\d{6}$/.test(code)) ret = message;
        return ret;
    },
    isEmpty(val, message = M.notEmpty) {
        let ret = '';
        if (!val || (val && !val.trim())) ret = message;
        return ret;
    },
    hasEmoji(val, message = M.illegalString) {
        let ret = '';
        if (/(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f])|(\ud83d[\ude80-\udeff])/.test(val)) {
            ret = message;
        }
        return ret;
    },
    inRange(val, max, min = 0, num = false, msg = M.outRange) {
        let len = num ? val : val.length;
        let ret = '';
        if (min > len || len > max) ret = msg;
        return ret; 
    },
    isName(val, msg) {
        return !val || /^[·a-zA-Z\.\u4e00-\u9fa5]+$/.test(val) ? '' : msg;
    },
    isNum(val, msg) {
        return !val || /^\d+$/.test(val) ? '' : msg;
    },
    inRules(val, ...rules) {
        let message = '';
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
                message = this[rule](val, ...args);
            } else {
                message = this[item](val)
            }
            if (message) ret = false;
            return ret;
        })
        return message;
    },
}

export class Validator {
    constructor() {
        this.list = [];
    }
    add(val, rules) {
        if (Array.isArray(val) && Array.isArray(val[0])) {
            this.list.concat(val);
        } else {
            this.list.push([val, rules]);
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
        if (allMessage && vm && keys) {
            keys.forEach((item, i) => {
                vm[item] = ret[i];
            })
        }
        if (allMessage && ret.every(item => !item)) ret = false;
        return ret;
    }
}
export default validate;
