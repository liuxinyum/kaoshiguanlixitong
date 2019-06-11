import loadComponent from '@/utils/loadComponent.js'
const userManagement = {
    path: '/main',
    name: 'Questions',
    title: '用户管理',
    icon: '',
    children: [
        {
            path: '/main/adduser',
            name: 'AddUser',
            title: '添加用户',
            component: loadComponent(['add'], () => import('../routes/UserManagement/AddUser/'))
        },
        {
            path: '/main/showuser',
            name: 'ShowUser',
            title: '用户展示',
            component: loadComponent(['add'], () => import('../routes/UserManagement/ShowUser/'))
        }
    ]
}
export default userManagement