import request from '../utils/request'

export const addQuestions = (body) => {
	return request('/exam/questions', {
		method: 'post',
		body
	})
}

// 考试类型
export const ExamType = () => {
	return request('/exam/examType')
}
// 所有课程
export const AllSubject = () => {
	return request('/exam/subject')
}

// 题目类型
export const AllQuestionType = () => {
	return request('/exam/getQuestionsType')
}

// 添加试题类型
export const insertQuestionsType = (body) => {
	return request('/exam/insertQuestionsType', {
		method: 'get',
		body
	})
}

// 删除指定的试题类型
export const delQuestionsType = (body) => {
	return request('/exam/delQuestionsType', {
		method: 'post',
		body
	})
}

// 按条件获取试题
export const getQuestionsCondition = (body) => {
	return request('/exam/questions/condition', {
		method: 'get',
		body
	})
}

// 待批班级
export const Waitingapproval = () => {
	return request('/manger/grade')
}

// 班级试卷详情
export const getStudentDetail = (body) => {
	return request('/exam/student', {
		method:'get',
		body
	})
}

// 更新试题
export const updateQuestions = (body) => {
	return request('/exam/questions/update', {
		method:'PUT',
		body
	})
}
