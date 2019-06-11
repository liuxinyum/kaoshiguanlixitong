import React from "react"
import { connect } from "dva"
import { Modal, Input,Button } from 'antd'
class Mask extends React.Component{
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
      roomName:''
    });
  }

  handleOk = (e) => {
    this.props.dispatch({
      type:'roomMsg/addRoom',
      body:{
        room_text:this.state.roomName
      }
    })
    this.setState({
      visible: false,
    });
    this.props.dispatch({
      type:'roomMsg/getRoom'
    })
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  roomName = (e) =>{
    this.setState({
      roomName:e.target.value
    })
  }
  render(){
    let {roomName} = this.state
    return <div>
    <Button type="primary" onClick={this.showModal} style={{ marginBottom:20 }}>
      添加教室
    </Button>
    <Modal
      title="Basic Modal"
      visible={this.state.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
    >
      <div>
        <p>教室号：</p>
        <Input placeholder="教室名" value={roomName} onChange={(e)=>{
          this.roomName(e)
        }} />
      </div>
    </Modal>
  </div>
  }
}

let mapStateToProps = (state) => {
	return state
}
export default connect(mapStateToProps)(Mask)