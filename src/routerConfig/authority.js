import loadComponent from '@/utils/loadComponent.js'
const AuthorityManage = {
    path: '/main',
    name: 'AuthorityManage',
    title: '权限管理',
    icon: '',
    children: [
        {
            path: '/main/addroute',
            name: 'AddRoute',
            title: '添加路由',
            component: loadComponent(['AuthorityManage'], () => import('../routes/AuthorityManage/AddRoute/'))
        },
        {
            path: '/main/roleauthority',
            name: 'RoleAuthority',
            title: '角色权限',
            component: loadComponent(['AuthorityManage'], () => import('../routes/AuthorityManage/RoleAuthority/'))
        }
    ]
}

export default AuthorityManage