/**
 *  @desc 向后台发出请求
 */
import { request } from '../utils/index'
export async function query () {
    return request(`/api/menus`,{
      method: 'GET',
    })
}

//删除菜单
export async function remove(id){
    return request(`/api/menu/${id}`,{
        method: 'DELETE'
    });
}

//新增菜单
export async function create(params) {
    console.log(params)//将id属性修改为pid属性 【算了先将id当pis使用吧其实传过来的id就是接下来做为该菜单的pid的值
    return request(`/api/menu`,{
      method: 'POST',
      headers:{ 'Content-Type': 'application/json' },
      body:JSON.stringify(params)
    })
}


//编辑菜单
export async function update(id,params) {
    params.id = id;
    return request(`/api/menu/${id}`,{
      method: 'PATCH',
      headers:{ 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })
}
