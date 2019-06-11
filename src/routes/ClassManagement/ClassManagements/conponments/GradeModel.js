import React from "react"
import { connect } from "dva"
import { Modal, Input, Select, Button } from 'antd'
const Option = Select.Option;
class ClassMask extends React.Component{
  state = { 
    visible: false,
    gradeName: "",//班级
    roomName: "",//教室
    bookName: "",//课程名
    newClassData:{},
    roomId:'',
    bookId:''
  }
  componentDidMount(){
    this.props.dispatch({
      type:'classMsg/getClassRoom'
    })
    this.props.dispatch({
      type:'classMsg/getSubject'
    })
  }
  showModal = () => {
    console.log(this.props.text,'text')
    let {text} =this.props
    if(text){
      this.setState({
        gradeName: text.grade_name,
        roomName: text.room_text,
        bookName: text.subject_text
      })
    }
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    let {gradeName,roomId,bookId} = this.state
      this.props.dispatch({
        type:'classMsg/getAddClass',
        body:{
          grade_name:gradeName,
          room_id:roomId,
          subject_id:bookId
        }
      })
    this.setState({
      visible: false,
    });
    this.props.dispatch({
      type:'classMsg/getClassInfo'
    })
    this.setState({
      gradeName: '',
      roomName: '',
      bookName: ''
    })
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
    this.setState({
      gradeName: '',
      roomName: '',
      bookName: ''
    })
  }
  grades = (e) => {
    this.setState({
      gradeName: e.target.value
    })
  }
  room(value,id){
    this.setState({
      roomName: value,
      roomId:id
    })
  }
  subject(value,id){
    this.setState({
      bookName: value,
      bookId:id
    })
  }
  render(){
    let {gradeName,roomName,bookName} = this.state
    let {classRoomData,subjectData} = this.props.classMsg
    let {text} =this.props
    return (
      <div>
        {text?<Button onClick={this.showModal}>修改</Button>:<Button type="primary" onClick={this.showModal}>+添加班级</Button>}
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <p>班级名：</p>
          <Input placeholder="班级名" value={gradeName} onChange={this.grades} style={{ width: 450 }} disabled={text ? true : false}/>
          </div>
          <div>
            <p>教室号：</p>
            <Select value={roomName} style={{ width: 450 }}> 
            {
              classRoomData.length && classRoomData.map((item, key) => {
                return <Option key={item.room_id} value={item.room_id} onClick={()=>{
                        this.room(item.room_text,item.room_id)
                      }}>{item.room_text}</Option>
              })
            }
            </Select>
          </div>
          <div>
            <p>课程名：</p>
            <Select value={bookName}  style={{ width: 450 }}>
            {
              subjectData.length && subjectData.map((item, key) => {
                return <Option key={item.subject_id} value={item.subject_id} onClick={()=>{
                        this.subject(item.subject_text,item.subject_id)
                      }}>{item.subject_text}</Option>
              })
            }
            </Select>
          </div>
        </Modal>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
	return state
}
export default connect(mapStateToProps)(ClassMask)