import loadComponent from '@/utils/loadComponent.js'
import Main from '../layouts/MainLayout/index'
import examination from './examination.js'      //考试管理
import AuthorityManage from './authority.js'    // 权限管理
import questions from './questions.js'          // 试题管理
import userManagement from './userManagement.js'// 用户管理
import ClassManagement from './ClassManagement.js'//班级管理
import ReadQuestions from './ReadQuestions.js'    // 阅卷管理

const routes = [
  {
    path: '/login',
    component: loadComponent(['login'], () => import('../routes/Login'))
  },
  {
    path: '/',
    component: Main, //主路由
    layouyName: "BaseLayout",
    children: [
      questions,
      userManagement,
      examination,
      ClassManagement,
      ReadQuestions,
      AuthorityManage
    ]
  }
]

const getLayoutRoute = (layouyName) => {
  const layoutRoutesObj = {}
  routes.forEach((item, index) => {
    if (item.layouyName) {
      layoutRoutesObj[layouyName] = item.children.map((ele, ind) => {
        return ele.children
      })
    }
  })
  return flattenArr(layoutRoutesObj[layouyName])
}

// 将多维数组转为一维数组
function flattenArr(arr) {
  var result = [];
  function flatten(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        flatten(arr[i]);
      } else {
        result.push(arr[i]);
      }
    }
  }
  flatten(arr);
  return result;
}

const getRouterInfo = (() => {
    const routersInfo = {}

    const getRouterInfoObj = ( routeArr = routes) => {
    routeArr.forEach((item, index) => {
      routersInfo[item.path] = {
        name: item.name,
        title: item.title
      }
      if (item.children) {
        getRouterInfoObj(item.children)
      }
    })
  }
  
  getRouterInfoObj()

  return (pathname) => {
    return routersInfo[pathname]
  }
})()

export {
  routes,
  getLayoutRoute,
  getRouterInfo
}