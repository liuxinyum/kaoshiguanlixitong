import React from 'react'
import styles from '../style.less'

class DetailRight extends React.Component {
	render() {
		let {conditionclasstype}=this.props
		let conditionclasstypes=conditionclasstype.length&&conditionclasstype[0]
        return (
            <div className={styles.right}>
                <h3>答案信息</h3>
                <div>{conditionclasstypes.questions_answer}</div>
            </div>
        )
    }
}

export default DetailRight