import React from 'react'
import {
	Table, Button, Modal, Input, Spin
} from 'antd'
import { connect } from 'dva'
import styles from '../style.less'
const { Column } = Table;
const confirm = Modal.confirm;

class questionsClassify extends React.Component {
	state = { visible: false, userName: '', loading: true }

	async componentDidMount() {
		await this.props.dispatch({ type: 'questions/changeAllQuestionType' })
		this.setState({
			loading: false
		})
	}

	showModal = () => {
		this.setState({
			visible: true
		});
	}

	// 随机数
	generateRandom = (count) => {
		let num = Math.random() * count
		return num
	}

	// 添加
	handleOk = (e) => {
		this.setState({
			visible: false,
		});

		// 随机值
		let num = this.generateRandom(1000)
		this.props.dispatch({ type: 'questions/insertQuestionsTypeAsync', body: { text: this.state.userName, sort: num } })
		this.props.dispatch({ type: 'questions/changeAllQuestionType' })
	}

	handleCancel = (e) => {
		this.setState({
			visible: false,
		});
	}

	// 删除
	showConfirm = (id) => {
		let that = this
		confirm({
			title: '你确定删除吗？',
			content: '删除这条',
			// 确定
			onOk() {
				that.props.dispatch({ type: 'questions/delQuestionsTypeAsync', body: { id } })
				that.props.dispatch({ type: 'questions/changeAllQuestionType' })
			},
			//取消
			onCancel() {
				console.log('Cancel');
			}
		});
	}

	onChangeUserName = (e) => {
		this.setState({ userName: e.target.value });
	}

	render() {
		let { allQuestionType } = this.props
		return (
			<Spin spinning={this.state.loading}>
				<div className={styles.questionsClassify}>
					<div className="type-topic-dialog">
						<Button type="primary" onClick={this.showModal} style={{ width: "30%" }}>
							+ 添加类型
          </Button>
						<Modal
							title="创建新类型"
							okText="确定"
							cancelText="取消"
							visible={this.state.visible}
							onOk={this.handleOk}
							onCancel={this.handleCancel}
						>
							<Input placeholder="请输入类型名称" value={this.state.userName} onChange={this.onChangeUserName} />
						</Modal>
					</div>
					<Table dataSource={allQuestionType} rowKey="questions_type_id" >
						<Column
							title="类型ID"
							dataIndex="questions_type_id"
						/>
						<Column
							title="类型名称"
							dataIndex="questions_type_text"
						/>
						<Column
							title="操作"
							dataIndex="questions_type_sort"
							render={(text, record) => {
								return <Button onClick={() => {
									this.showConfirm(record.questions_type_id)
								}}>删除</Button>
							}}
						/>
					</Table>
				</div>
			</Spin>
		)
	}
}

let mapStateToProps = (state) => {
	return state.questions
}

export default connect(mapStateToProps)(questionsClassify)