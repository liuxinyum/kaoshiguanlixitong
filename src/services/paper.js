import request from '../utils/request'

export const establish = (body) => {
  return request('/exam/exam',{
    method:'post',
    body
  });
}

export const subject=()=>{
  return request('/exam/subject',{
     method:'get',
  })
}

export const examType=()=>{
  return request('/exam/examType',{
    method:'get'
  })
}

export const getQuestionsType=()=>{
  return request('/exam/getQuestionsType',{
    method:'get'
  })
}

export const obtain=()=>{
  return request('/exam/exam',{
    method:'get'
  })
}

export const detail=(body)=>{
  console.log(body)
  return request(`/exam/exam/${body.id}`,{
    method:'get'
  })
}









