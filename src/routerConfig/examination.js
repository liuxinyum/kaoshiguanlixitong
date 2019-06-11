import loadComponent from '@/utils/loadComponent.js'
const examination = {
    path: '/main',
    name: 'Questions',
    title: '考试管理',
    icon: '',
    children: [
        {
            path: '/main/addexam',
            name: 'Addexam',
            title: '添加考试',
            component: loadComponent(['paper'], () => import('../routes/Examination/Addexam/'))
        },
        {
            path: '/main/examinationlist',
            name: 'Examinationlist',
            title: '考试列表',
            component: loadComponent(['paper'], () => import('../routes/Examination/Examinationlist/'))
        },
        {
            path: '/main/details',
            name: 'Details',
            title: '',
            component: loadComponent(['paper'], () => import('../routes/Examination/Details/'))
        },
        {
            path: '/main/newtopic',
            name: 'Newtopic',
            title: '',
            component: loadComponent(['paper'], () => import('../routes/Examination/Newtopic/'))
        }
    ]
}
export default examination