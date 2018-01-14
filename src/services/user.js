/**
 *  @desc 请求相关[与后台交互]
 *  @func 与用户相关的操作：增删查改都可以放在service/user里
 */
import request from '../utils/request';


export async function query(params) {
    return request(`/api/users`,{
        method: 'GET'
    });
}
