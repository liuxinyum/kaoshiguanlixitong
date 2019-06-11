import React from 'react'
import TestQuestions from '@/components/TestQuestions/index'
class EditQuestions extends React.Component{
	render(){
		return <TestQuestions typewithquestions="edit" path={this.props.history.location.search.split('=')[1]} push={this.props.history.push}></TestQuestions>
	}
}
export default EditQuestions
