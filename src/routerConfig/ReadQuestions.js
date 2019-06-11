import loadComponent from '@/utils/loadComponent.js'
const ReadQuestions = {
    path:'/main',
    name:'ReadQuestions',
    title:'阅卷管理',
    icon:'',
    children:[
      {
        path:'/main/readquestions',
        name:'ReadQuestions',
        title:'待批班级',
        component:loadComponent(['questions'],()=>import('../routes/ReadQuestions/WaitingClass/'))
      },
      {
        path:'/main/readquestionsdetail',
        name:'ReadQuestions',
        title:'',
        component:loadComponent(['questions'],()=>import('../routes/ReadQuestions/WaitingDetail/'))
      }
    ]
}
export default ReadQuestions