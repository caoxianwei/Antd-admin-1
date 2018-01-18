/**
 *  @desc /src/service/app.js
 */

//后台根据发送的header的cookie 查询用户是否登录
//如果cookie.token存在且cookie未过期
//则解密并解析 经过id加密生成的token值 在数据库联查 如果找到则返回该用户的id 名字 及权限
import request from '../utils/request';

export async function query (params) {//传本地token
    return request(`/api/userstatus`,{
        method: 'POST',
        headers:{ 'Content-Type': 'application/json'},
        body:params//JSON.stringify(data)
    });
}


export async function login (params) {
    return request(`/api/user/login`,{
        method: 'POST',
        headers:{ 'Content-Type': 'application/json' },
        body:JSON.stringify(params)
    })
  }

export async function logout (params) {
    return request(`/api/user/logout`,{
        method: 'GET',
        headers:{ 'Content-Type': 'application/json' },
        body:JSON.stringify(params)
    })
}
