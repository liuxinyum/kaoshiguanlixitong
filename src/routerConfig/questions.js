import loadComponent from '@/utils/loadComponent.js'
const questions = {
    path: '/main',
    name: 'Questions',
    title: '试卷管理',
    icon: '',
    children: [
        {
            path: '/main/addquestions',
            name: 'QuestionsAdd',
            title: '添加试题',
            component: loadComponent(['questions'], () => import('../routes/Questions/AddQuestions'))
        },
        {
            path: '/main/type',
            name: 'QuestionsType',
            title: '试题分类',
            component: loadComponent(['questions'], () => import('../routes/Questions/QuestionsClassify'))
        },
        {
            path: '/main/list',
            name: 'SeeExam',
            title: '查看试卷',
            component: loadComponent(['questions'], () => import('../routes/Questions/SeeExam')),
        },
        {
            path: '/main/questionsdetail',
            name: 'QuestionsDetail',
            title: '',
            component: loadComponent(['questions'], () => import('../routes/Questions/QuestionsDetail')),
        },
        {
            path: '/main/editquestions',
            name: 'QuestionsDetail',
            title: '',
            component: loadComponent(['questions'], () => import('../routes/Questions/EditQuestions')),
        }

    ]
}
export default questions