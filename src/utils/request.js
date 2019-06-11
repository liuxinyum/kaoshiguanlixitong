import {routerRedux} from 'dva/router'
const request = (url, option = {}) => {
  let urls= process.env.NODE_EV==='production'?'':'api'
  let token =localStorage.getItem("token")
  if(!token){
    routerRedux.push('/')
  }
  if(option.method === 'get'){
    let newOption = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": localStorage.getItem("token")
        }
    };
    let str = '?'
    let bodys = option.body
    for(let i in bodys) {
        str += (i + '=' + bodys[i] + '&')
    }
    str = str.slice(0, str.length-1)
    url += str
    return fetch(urls+url, newOption).then(res => res.json()).catch((err) => alert(err));
  }else{
    option.body = JSON.stringify(option.body)
    let newOption = {
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
          "Authorization": localStorage.getItem('token')
      },
      ...option
    }
    return fetch(urls+url, newOption).then(res => res.json()).catch((err) => alert(err));
  }
  
}
export default request;


