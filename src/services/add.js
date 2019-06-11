import request from '../utils/request'
export const add = (body) => {
  return request('/user',{
    method:'post',
    body
  })
}

export const update = (body) => {
  return request('/user/user', {
    method: "put",
    body
  });
}

export const identity = (body) => {
  return request('/user/identity/edit',{
    method:'get',
    body
  })
}


export const apt = (body) => {
  return request('/user/authorityApi/edit',{
    method:'get',
    body
  })
}

export const view = (body) => {
  return request('/user/authorityView/edit',{
    method:'get',
    body
  })
}

export const permissions = (body) => {
  return request('/user/setIdentityApi',{
    method:'post',
    body
  });
}

export const setup = (body) => {
  return request('/user/setIdentityView',{
    method:'post',
    body
  })
}
export const exhibition = () => {
  return request('/user/identity',{
    method:'get'
  }) //get方法请求
}

export const user = () => {
  return request('/user/user',{
    method:'get'
  }) //get方法请求
}



export const authority = (body) => {
  return request('/user/view_authority',{
    method:'get'
  })
}

export const apiauthority = (body) => {
  return request('/user/api_authority',{
    method:'get'
  })
}

// export const update = (body) => {
//   return request('/user/user', {
//     method: "put",
//     body
//   });
// }
