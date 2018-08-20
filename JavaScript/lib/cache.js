function getStorage(isSession) {
    return isSession ? sessionStorage : localStorage;
}
const cache = {
    get(name, isSession) {
        const storage = getStorage(isSession);
        let ret = storage.getItem(name);
        const char = ret && ret.slice(0, 1);
        if (char && (char === '{' || char === '[')) ret = JSON.parse(ret);
        return ret;
    },
    set(name, value, isSession) {
        const storage = getStorage(isSession);
        let val = value;
        if (typeof value === 'object') val = JSON.stringify(val);
        storage.setItem(name, val);
    },
    remove(name, isSession) {
        const storage = getStorage(isSession);
        storage.removeItem(name);
    },
};
export default cache;
