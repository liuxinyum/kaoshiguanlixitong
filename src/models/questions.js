import {
	addQuestions,
	ExamType,
	AllSubject,
	AllQuestionType,
	insertQuestionsType,
	delQuestionsType,
	getQuestionsCondition,
	Waitingapproval,
	getStudentDetail,
	updateQuestions
} from '@/services/questions'
import { routerRedux } from 'dva/router'
import {
	message
} from 'antd';

export default {
	namespace: 'questions',
	state: {
		examType: [],
		ClassType: [],
		allQuestionType: [],
		msg: '',
		conditionClassType: [],
		Waitingapproval: [],
	},
	reducers: {
		addQuestionsSync(state, action) {
			state.msg = action.msg
			return {
				...state,
				msg: action.msg
			}

		},
		changeExamTypes(state, action) {
			return {
				...state,
				examType: action.data
			}
		},
		changeAllSubjects(state, action) {
			return {
				...state,
				ClassType: action.data
			}
		},
		changeAllQuestionTypes(state, action) {
			return {
				...state,
				allQuestionType: action.data
			}
		},
		// 同步筛选
		conditionClassType(state, action) {
			return {
				...state,
				conditionClassType: action.data
			}
		},
		Waitingapproval(state, action) {
			return {
				...state,
				Waitingapproval: action.data
			}
		}
	},
	effects: {
		// 添加试题
		* addQuestionsAsync(action, {
			call,
			put
		}) {
			let result = yield call(addQuestions, action.user)
			if (result.code === 1) {
				yield put({ type: 'addQuestionsSync', msg: result.msg })
				message.success(result.msg);
				yield put(routerRedux.push('/main/list'))
			} else {
				message.error(result.msg);
			}
		},
		// 考试类型
		* changeExamType(action, {
			call,
			put
		}) {
			let examType = yield call(ExamType)
			yield put({ type: 'changeExamTypes', data: examType.data })

		},
		// 所有课程
		* changeAllSubject(action, {
			call,
			put
		}) {
			let ClassType = yield call(AllSubject)
			yield put({ type: 'changeAllSubjects', data: ClassType.data })
		},
		// 题目类型
		* changeAllQuestionType(action, {
			call,
			put
		}) {
			let allQuestionType = yield call(AllQuestionType)
			yield put({ type: 'changeAllQuestionTypes', data: allQuestionType.data })
		},
		// 插入类型
		* insertQuestionsTypeAsync(action, {
			call,
			put
		}) {
			let insertQuestions = yield call(insertQuestionsType, action.body)
			if (insertQuestions.code === 1) {
				yield put({
					type: "changeAllQuestionTypes"
				})
			}
		},
		// 删除类型
		* delQuestionsTypeAsync(action, {
			call,
			put
		}) {
			yield call(delQuestionsType, action.body)
		},
		// 按条件筛选
		* getQuestionsConditionAsync(action, {
			call,
			put
		}) {
			let questionsCondition = yield call(getQuestionsCondition, action.data)
			yield put({ type: "conditionClassType", data: questionsCondition.data })
		},
		* WaitingapprovalAsync(action, {
			call,
			put
		}) {
			let WaitingapprovalAsync = yield call(Waitingapproval, action.data)
			yield put({ type: "Waitingapproval", data: WaitingapprovalAsync.data })
		},
		* getStudentDetailAsync(action, {
			call,
			put
		}) {
			let readExam = yield call(getStudentDetail, action.data)
			if (readExam.code === 1) {
				message.success(readExam.msg);
			}else{
				message.error(readExam.msg);

			}
		},
		* updateQuestionsAsync(action, {
			call,
			put
		}) {
			yield call(updateQuestions, action.user)
		}

	}
}