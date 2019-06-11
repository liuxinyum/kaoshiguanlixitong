import request from '../utils/request'
// 班级试卷详情
export const getLogin = (body) => {
	return request('/user/login',{
    method:'post',
    body
  })
}

export const getInfo=()=> {
  return request('/user/userInfo')
}

