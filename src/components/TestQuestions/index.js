import React from 'react'
import {
	Form, Input, Select, Button, Modal, Spin
} from 'antd';
import { connect } from 'dva'
import Editor from 'for-editor'
import styles from './style.less'
const confirm = Modal.confirm

const Option = Select.Option;

class TestQuestions extends React.Component {
	constructor() {
		super()
		this.state = {
			user: {
				questions_type_id: 'wbxm4-jf8q6k-lvt2ca-ze96mg', //试题类型id
				questions_stem: '', //题干
				subject_id: '', //课程id
				exam_id: '', //考试类型id
				user_id: '', //用户id
				questions_answer: '', // 题目答案
				title: '' // 试题的主题
			},
			loading: true
		}
	}
	async componentDidMount() {
		if (this.props.typewithquestions === "add") {
			await this.props.dispatch({ type: 'questions/changeExamType' })
			await this.props.dispatch({ type: 'questions/changeAllSubject' })
			await this.props.dispatch({ type: 'questions/changeAllQuestionType' })
			this.setState({
				loading: false
			})

		} else {
			let { user } = this.state
			await this.props.dispatch({ type: 'questions/changeExamType' })
			await this.props.dispatch({ type: 'questions/changeAllSubject' })
			await this.props.dispatch({ type: 'questions/changeAllQuestionType' })
			await this.props.dispatch({ type: 'questions/getQuestionsConditionAsync', data: { questions_id: this.props.path } })
			user.questions_id = this.props.path
			this.setState({
				user,
				loading: false
			})
		}
	}

	// 提交试题
	updateToQuestion = () => {
		// 获取信息
		let { userInfo } = this.props.login
		let { user } = this.state
		let that = this
		user.user_id = userInfo.user_id
		this.setState({
			user
		})
		let flag = user.questions_type_id && user.questions_stem && user.subject_id && user.exam_id && user.user_id && user.questions_answer && user.title

		// 判断是添加还是修改执行不同代码块
		if (this.props.typewithquestions === "add") {
			if (flag) {
				confirm({
					title: '你确定要添加这道题吗',
					content: '真的要添加吗',
					// 确定
					onOk() {
						that.props.dispatch({ type: 'questions/addQuestionsAsync', user })

					},
					//取消
					onCancel() {
						console.log('Cancel');
					}
				});
			}
		} else {
			if (flag) {
				this.props.dispatch({ type: 'questions/updateQuestionsAsync', user })
				this.props.push("/main/list")
			}

		}
	}

	render() {
		let { examType, ClassType, allQuestionType } = this.props.questions
		let { user } = this.state
		return (
			<Spin spinning={this.state.loading}>
				<div className={styles.AddQuestions}>
					<Form.Item label="题目信息:题干">
						<Input placeholder='请输入题目标题，不超过20个字' onChange={(event) => {
							user.questions_stem = event.target.value
							this.setState({
								user
							})
						}} />
					</Form.Item>
					<Form.Item label="请选择考试类型">
						<Select defaultValue="请选择" style={{ width: 120 }} onChange={(value) => {
							let { user } = this.state
							user.exam_id = value
							this.setState({
								user
							})
						}}>
							{
								examType.length && examType.map((ele) => {
									return <Option value={ele.exam_id} key={ele.exam_id}>{ele.exam_name}</Option>
								})
							}
						</Select>
					</Form.Item>
					<p>题目主题</p>
					<Editor value={user.title} onChange={(value) => {
						user.title = value
						this.setState({
							user
						})
					}} />
					<Form.Item label="请选择课程类型">
						<Select defaultValue="请选择" style={{ width: 120 }} onChange={(text) => {
							user.subject_id = text
							this.setState({
								user
							})
						}}>
							{
								ClassType.length && ClassType.map((ele) => {
									return <Option key={ele.subject_id}>{ele.subject_text}</Option>
								})
							}
						</Select>
					</Form.Item>
					<Form.Item label="请选择题目类型">
						<Select defaultValue="请选择" style={{ width: 120 }} onChange={(text) => {
							user.questions_type_id = text
							this.setState({
								user
							})
						}} >
							{
								allQuestionType.length && allQuestionType.map((ele) => {
									return <Option key={ele.questions_type_id}>{ele.questions_type_text}</Option>
								})
							}
						</Select>
					</Form.Item>
					<p>答案信息</p>
					<Editor value={user.questions_answer} onChange={(value) => {
						user.questions_answer = value
						this.setState({
							user
						})
					}} />
					<Button type="primary" onClick={this.updateToQuestion}>提交</Button>
				</div>
			</Spin>
		)
	}
}

let mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps)(TestQuestions)
