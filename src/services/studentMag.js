import request from '../utils/request'
export const getStudent = () => {
  return request('/manger/student/new',{
    method:'get'
  })
}
//获取所有教室号
export const getClassRoom = () => {
  return request('/manger/room',{
    method:'get'
  })
}

//获取班级数据
export const getClassInfo = () => {
  return request('/manger/grade',{
    method:'get'
  })
}

//删除学生
export const deteleStudent = (params) =>{
  return request('/manger/student/'+params.id,{
    method:'delete'
  })
}