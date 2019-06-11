import request from '@/utils/request'

/**
 * 获取用户id 获取当前用户视图  
 * @params {string} user_id
 */
export const getViewAuthority = (body) => {
    return request('/user/new', {
        method: 'get',
        body
    })
}