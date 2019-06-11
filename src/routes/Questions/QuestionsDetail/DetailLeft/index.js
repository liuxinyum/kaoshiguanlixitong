import React from 'react'
import styles from '../style.less'

import {
	Tag
} from 'antd';

class DetailLeft extends React.Component {
	render() {
		let {conditionclasstype}=this.props
		let conditionclasstypes=conditionclasstype.length&&conditionclasstype[0]
		return (
			<div className={styles.left}>
				<div>出题人：<span>{conditionclasstypes.user_name}</span></div>
				<div>题目信息</div>
				<div style={{ marginBottom: '10px' }}>
					<Tag color="magenta" >{conditionclasstypes.questions_type_text}</Tag>
					<Tag color="geekblue" >{conditionclasstypes.subject_text}</Tag>
					<Tag color="orange" >{conditionclasstypes.exam_name}</Tag>
				</div>
				<div>{conditionclasstypes.title}</div>
				<div>{conditionclasstypes.questions_stem}</div>
			</div>
		)
	}
}
export default DetailLeft