import loadComponent from '@/utils/loadComponent.js'
const ClassManagement = {
    path: '/main',
    name: 'ClassManagement',
    title: '班级管理',
    icon: '',
    children: [
        {
            path: '/main/ClassManagements',
            name: 'ClassManagements',
            title: '班级管理',
            component: loadComponent(['classMsg'], () => import('../routes/ClassManagement/ClassManagements/'))
        },
        {
            path: '/main/ClassRoomMag',
            name: 'ClassRoomMag',
            title: '教室管理',
            component: loadComponent(['roomMsg'], () => import('../routes/ClassManagement/ClassRoomMag/'))
        },
        {
            path: '/main/StudentMag',
            name: 'StudentMag',
            title: '学生管理',
            component: loadComponent(['studentMag'], () => import('../routes/ClassManagement/StudentMag/'))
        }
    ]
}
export default ClassManagement