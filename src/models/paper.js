import { establish, subject, examType, getQuestionsType, obtain, detail } from '../services/paper.js'

export default {

    namespace: 'paper',

    state: {
        subjec: [],
        exam: [],
        gets: [],
        test: [],
        deta:[]
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },
    effects: {
        *establish(action, { call, put }) {
            yield call(establish, action.payload)
        },
        *subject(action, { call, put }) {
            const subjects = yield call(subject)
            yield put({ type: 'save', subjec: subjects.data })
        },
        *examTypes(action, { call, put }) {
            const examtype = yield call(examType)
            yield put({ type: 'exams', exam: examtype.data })
        },
        *getQuestionsType(action, { call, put }) {
            const getQuestionsTypes = yield call(getQuestionsType)
            yield put({ type: 'QuestionsType', gets: getQuestionsTypes.data })
        },
        *obtain(action, { call, put }) {
            const obtext = yield call(obtain)
            yield put({ type: 'obtains', test: obtext.exam })
        },
        *detailt(action, { call, put }) {
            const detai = yield call(detail,action.payload)
            yield put({ type: 'details', deta: detai })
            console.log(detai)
        }
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action };
        },
        exams(state, action) {
            return { ...state, ...action };
        },
        QuestionsType(state, action) {
            return { ...state, ...action }
        },
        obtains(state, action) {
            return { ...state, ...action }
        },
        details(state, action) {
            return { ...state, ...action }
        },
    }
}
