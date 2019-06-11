import React from 'react'
import {
	Table, Spin
} from 'antd'
import { connect } from 'dva'
import styles from './style.less'

const { Column } = Table;

class WaitingClass extends React.Component {
	state = { loading: true }

	async componentDidMount() {
		await this.props.dispatch({ type: 'questions/WaitingapprovalAsync', data: {} })
		this.setState({
			loading: false
		})

	}
	render() {
		let { Waitingapproval } = this.props
		return (
			<Spin spinning={this.state.loading}>

				<div className={styles.waiting}>
					<Table dataSource={Waitingapproval ? Waitingapproval : []} rowKey="grade_id">
						<Column
							title="班级名"
							dataIndex="grade_name"
							key="grade_name"
						/>
						<Column
							title="课程名"
							dataIndex="subject_text"
							key="subject_text"
						/>
						<Column
							title="阅卷状态"
							dataIndex="status"
							key="status"
						/>
						<Column
							title="课程名称"
							dataIndex="subject_text"
							key="subject_texts"
						/>
						<Column
							title="成材率"
							dataIndex="room_text"
							key="room_text"
						/>
						<Column
							title="操作"
							key="action"
							render={(text, record) => (
								<span>
									<b className="a" onClick={() => {
										this.props.history.push(`/main/readquestionsdetail?grade_id=${text.grade_id}`)
									}}>批卷</b>
								</span>
							)}
						/>
					</Table>
				</div>
			</Spin>

		)
	}
}

let mapStateToProps = state => state.questions

export default connect(mapStateToProps)(WaitingClass)