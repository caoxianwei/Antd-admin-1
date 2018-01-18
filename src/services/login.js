import { request } from '../utils/index'

export async function login (data) {
    return request(`/api/user/login`,{
        method: 'POST',
        headers:{ 'Content-Type': 'application/json' },
        body:JSON.stringify(data)
    })
}
