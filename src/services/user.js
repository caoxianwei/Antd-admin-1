/**
 *  @desc 请求相关[与后台交互]
 *  @func 与用户相关的操作：增删查改都可以放在service/user里
 */
import request from '../utils/request';

//获取数据
export async function query(params) {
    return request(`/api/users`,{
        method: 'GET'
    });
}

//删除用户
export async function remove(id){
    return request(`/api/users/${id}`,{
        method: 'DELETE'
    });
}

//新增
export async function create(params) {
    return request(`/api/users`,{
      method: 'POST',
      header:'Content-Type: application/x-www-form-urlencoded',
      body: JSON.stringify(params)
    })
}


//编辑
export async function update(id,params) {
    params.id = id;
    return request(`/api/users/${id}`,{
      method: 'PATCH',
      header:'Content-Type: application/x-www-form-urlencoded',
      body: JSON.stringify(params)
    })
}
