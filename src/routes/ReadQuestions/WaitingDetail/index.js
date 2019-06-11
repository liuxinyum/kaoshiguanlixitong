import React from 'react'
import { connect } from 'dva'
import SelectComp from './SelectComp.js'
import ExamList from './ExamList.js'
import {
	Button
} from 'antd'

class WaitingClass extends React.Component {
	componentDidMount() {
		let searchs = this.props.location.search.split('=')[1]
		this.props.dispatch({ type: 'questions/WaitingapprovalAsync' })
		this.props.dispatch({ type: 'questions/getStudentDetailAsync', data: { grade_id: searchs } })
	}
	render() {
		let { Waitingapproval } = this.props
		return (
			<React.Fragment>
				<div style={{ background: '#fff', borderRadius: '5px', padding: '15px' }}>
					<SelectComp
						DataArray={Waitingapproval}
						title='班级：'
					>
					</SelectComp>
					<SelectComp
						DataArray={Waitingapproval}
						title='班级：'
					>
					</SelectComp>
					<Button type="primary" icon="search">查询</Button>
				</div>
				<ExamList></ExamList>
			</React.Fragment>
		)
	}
}

let mapStateToProps = state => state.questions

export default connect(mapStateToProps)(WaitingClass)