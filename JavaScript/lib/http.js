/* eslint-disable */
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.timeout = 6000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

function ajax(method, url, params, resolve, reject) {    
    axios[method](params).then((rs) => {
        if (rs.data && +rs.data.code === 200) {
            resolve(rs.data.data);
        } else {
            reject(rs.data);
        }
    }).catch(err => reject({ code: 999, msg: '服务出现异常,请稍后再试', data: err }));
}

const methods = ['get', 'post', 'put', 'delete'];

const http = Object.create(null);

methods.forEach((method) => {
    http[method] = function(url, params) {
        return new Promise((resolve, reject) => {
            ajax(method, url, params, resolve, reject);
        });
    };
});
export default http;
