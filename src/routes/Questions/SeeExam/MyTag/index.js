import React from 'react'
import { Tag } from 'antd'
const { CheckableTag } = Tag

class MyTag extends React.Component {
	state = {
		checkedIndex: ''
	}

	handleChange(index, subject_id) {
		let { onClick } = this.props
		this.setState({
			checkedIndex: index
		})
		onClick(subject_id)
	}

	render() {
		let { classtype } = this.props

		return (
			<div>
				{
					classtype.length && classtype.map((item, index) => {
						return <CheckableTag key={item.subject_id} {...this.props} checked={this.state.checkedIndex === index} onChange={this.handleChange.bind(this, index, item.subject_id)}>{item.subject_text}</CheckableTag>
					})
				}
			</div>
		)
	}
}
export default MyTag