import request from '../utils/request'
export const getClassInfo = () => {
return request('/manger/grade',{
    method:'get'
  })
}
//获取所有教室号
export const getClassRoom = () => {
  return request('/manger/room',{
    method:'get'
  })
}
//获取所有课程名称
export const getSubject = () =>{
  return request('/exam/subject',{
    method:'get'
  })
}

//删除班级
export const getDetele = (body) =>{
  return request('/manger/grade/delete',{
    method:'DELETE',
    body
  })
}
//添加班级
export const getAddClass = (body) =>{
  return request('/manger/grade',{
    method:'post',
    body
  })
}
//更新班级数据
export const getUpClass = (body) =>{
  return request('/manger/grade/update',{
    method:'put',
    body
  })
}
//修改班级数据
export const getChangeClass = (body) =>{
  return request('/manger/grade/update',{
    method:'PUT',
    body
  })
}