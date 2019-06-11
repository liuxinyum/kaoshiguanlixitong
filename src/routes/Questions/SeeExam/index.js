import React from 'react'
import { connect } from 'dva'
import styles from './styles.less'
import MyTag from './MyTag/index'
import {
	Button, Select, List, Tag, Spin
} from 'antd';
const Option = Select.Option;

class SeeExam extends React.Component {
	state = {
		getquestions: {
		},
		activeIndex: 0,
		loading: true
	}
	async componentDidMount() {
		// 筛选全题
		await this.props.dispatch({ type: "questions/getQuestionsConditionAsync", data: {} })
		// 周考...
		await this.props.dispatch({ type: "questions/changeExamType" })
		// 题目类型
		await this.props.dispatch({ type: "questions/changeAllQuestionType" })
		// 所有课程
		await this.props.dispatch({ type: "questions/changeAllSubject" })
		this.setState({
			loading: false
		})
	}
	// 跳转detail
	examDetail(item) {
		this.props.history.push(`/main/questionsdetail?questinos_id=${item.questions_id}`)
	}
	// 筛选数据
	searchData() {
		this.props.dispatch({ type: "questions/getQuestionsConditionAsync", data: this.state.getquestions })
	}
	changeTab = (item) => {
		let { getquestions } = this.state
		getquestions.subject_id = item
		this.setState({
			getquestions
		})
	}
	render() {
		let {
			examType,
			allQuestionType,
			conditionClassType,
			ClassType
		} = this.props
		let { getquestions } = this.state
		return (
			<Spin spinning={this.state.loading}>
				<div className={styles.top}>
					<div className={styles.classType}>
						<span className={styles.names}>课程类型：</span>
						<div className={styles.choose}>
							<MyTag onClick={this.changeTab} classtype={ClassType} ></MyTag>
						</div>
					</div>
					<div className={styles.examtype}>
						<span>考试类型:</span>
						<Select defaultValue="请选择" style={{ width: 250 }} onChange={(value) => {
							getquestions.exam_id = value
							this.setState({
								getquestions
							})
						}}>
							{
								examType.length && examType.map((ele) => {
									return <Option value={ele.exam_id} key={ele.exam_id}>{ele.exam_name}</Option>
								})
							}
						</Select>
						<span>题目类型:</span>
						<Select defaultValue="请选择" style={{ width: 250 }} onChange={(value) => {
							getquestions.questions_type_id = value
							this.setState({
								getquestions
							})
						}}>
							{
								allQuestionType.length && allQuestionType.map((ele) => {
									return <Option key={ele.questions_type_id}>{ele.questions_type_text}</Option>
								})
							}
						</Select>
						<Button type="primary" icon="search" className={styles.search} onClick={this.searchData.bind(this)}>查询</Button>
					</div>
				</div>

				<div className={styles.bottom}>
					<List
						className="browse-right-bot"
						itemLayout="horizontal"
						dataSource={conditionClassType}
						renderItem={(item, key) => (
							<List.Item className={styles.hoverHeight}>
								<List.Item.Meta
									key={key}
									className="browse-right-bot-list"
									title={
										<div style={{
											cursor: 'pointer'
										}} onClick={() => {
											this.examDetail(item)
										}}>
											<div style={{ marginBottom: '10px' }}>{item.title}</div>
											<div style={{ marginBottom: '10px' }}>
												<Tag color="magenta" >{item.questions_type_text}</Tag>
												<Tag color="geekblue" >{item.subject_text}</Tag>
												<Tag color="orange" >{item.exam_name}</Tag>
											</div>
										</div>
									}
									description={item.user_name + "发布"}
								/>
								<b className={styles.edit} onClick={() => {
									this.props.history.push(`/main/editquestions?id=${item.questions_id}`)
								}}>编辑</b>
							</List.Item>
						)}
					/>
				</div>
			</Spin>
		)
	}
}

let mapStateToProps = (state) => {
	return state.questions
}
export default connect(mapStateToProps)(SeeExam)