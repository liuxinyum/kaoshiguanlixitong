import { app } from '../index'
import dynamic from 'dva/dynamic'
const loadComponent = (models, component) => {
    return dynamic({
        app,
        models: () => models.map((name) => import(`../models/${models}`)),
        component
    })
}
export default loadComponent