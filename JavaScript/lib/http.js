import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function ajax(method, url, params, resolve, reject) {
    axios[method](url, params).then((rs) => {
        if (rs.data && +rs.data.code === 200) {
            resolve(rs.data.data, rs.data);
        } else {
            reject(rs.data.msg, rs.data.code, rs.data);
        }
    }).catch(err => reject(err || '服务错误,请稍后再试', 999));
}

const http = {
    get(url, params) {
        return new Promise((resolve, reject) => {
            ajax('get', url, params, resolve, reject);
        });
    },
    post(url, params) {
        return new Promise((resolve, reject) => {
            ajax('post', url, params, resolve, reject);
        });
    },
    put(url, params) {
        return new Promise((resolve, reject) => {
            ajax('put', url, params, resolve, reject);
        });
    },
    delete(url, params) {
        return new Promise((resolve, reject) => {
            ajax('delete', url, params, resolve, reject);
        });
    },
};

export default http;
