/**
 *  @desc 向后台发出请求
 */
import { request } from '../utils/index'
export async function query () {
    return request(`/api/menus`,{
      method: 'GET',
    })
}
