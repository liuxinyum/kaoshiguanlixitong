import request from '../utils/request'
//获取教室号
export const getRoom = () =>{
  return request('/manger/room',{
    method:'get'
  })
}
//添加教室号
export const addRoom = (body) =>{
  return request('/manger/room',{
    method:'post',
    body
  })
}
//删除教室号
export const removeRoom = (body) =>{
  return request('/manger/room/delete',{
    method:'delete',
    body
  })
}
