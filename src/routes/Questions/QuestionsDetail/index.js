import React from 'react'
import { connect } from 'dva'
import DetailLeft from './DetailLeft/index'
import DetailRight from './DetailRight/index'
import styles from './style.less'

class QuestionsDetail extends React.Component {
	componentDidMount() {
		let {history:{
			location:{
				search
			}
		}}=this.props
		let question_id=search.split('=')[1]
		this.props.dispatch({type:"questions/getQuestionsConditionAsync",data:{questions_id:question_id}})
	}
	
	render() {
		let {conditionClassType}=this.props
		return (
			<div className={styles.details}>
				<DetailLeft conditionclasstype={conditionClassType}></DetailLeft>
				<DetailRight conditionclasstype={conditionClassType}></DetailRight>
			</div>
		)
	}
}

let mapStateToProps = (state) => {
	return state.questions
}
export default connect(mapStateToProps)(QuestionsDetail)