import React from 'react'
import {Table,Button,Modal} from 'antd';
import { connect} from "dva"
import styles from './style.less'
import Mask from './mask'
const { Column } = Table;
const confirm = Modal.confirm;
class ClassRoomMag extends React.Component{
  constructor(props){
    super(props)
    this.state={
    }
  }
  remgrade(text){
    let that = this
    confirm({
      title: '你确定要删除这条信息吗?',
      content: 'Some descriptions',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        that.props.dispatch({
          type:'roomMsg/removeRoom',
          body:{
            room_id:text.room_id
          }
        })
        that.props.dispatch({
          type:'roomMsg/getRoom'
        })
      },
      onCancel() {
        
      },
    })
  }

  componentDidMount(){
    this.props.dispatch({
      type:'roomMsg/getRoom'
    })
  }
  
  render(){
    let {roomData,mask} = this.props.roomMsg
    return (
      <div className={styles.roomContent}>
        <div className="in-typeTopic">
          <div className="little-classGrade">
            <Mask></Mask>
            <div className="typeList">
              <Table dataSource={roomData} rowKey="room_id">
                <Column
                  title="教室名"
                  dataIndex="room_text"
                />
                <Column
                  title="操作"
                  render={(text, record) => (
                    <div style={{display:"flex"}} >
                      <Button type="dashed" onClick={()=>{
                          this.remgrade(text)
                      }}><b className="a" >删除</b></Button>
                    </div>
                  )}
                />
              </Table>
            </div>
          </div>
        </div>
        {
          mask?<Mask></Mask>:null
        }
       
      </div>
    )
  }
}
let mapStateToProps = (state) => {
	return state
}
export default connect(mapStateToProps)(ClassRoomMag)
