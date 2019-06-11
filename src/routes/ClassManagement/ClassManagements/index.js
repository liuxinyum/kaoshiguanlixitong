import React from 'react'
//引入样式
import styles from "./style.less"
import { connect } from "dva"
//进入组件
import GradeModel from './conponments/GradeModel'
// import GradeModel from '@/components/GradeModel'
//引入antd
import {Table,Button} from 'antd';
const { Column } = Table
class ClassManagements extends React.Component{
  constructor(props){
    super(props)
    this.state={
    }
  }
  async componentDidMount(){
    await this.props.dispatch({
      type:'classMsg/getClassInfo'
    })
  }
  async deteleClass(val){
    await this.props.dispatch({
      type:'classMsg/getDetele',body:{
        grade_id:val.grade_id
      }
    })
    await this.props.dispatch({
      type:'classMsg/getClassInfo'
    })
  }
  sendClassData= (event) =>{
    console.log(event,'event')
  }
  render(){
    let {classMsgInfo,flag} = this.props.classMsg
    return (
      <div className={styles.classContent}>
        <div className="in-typeTopic">
          <div className="little-classGrade">
            <div className={styles.addClass}>
              <GradeModel sendClassData={this.sendClassData}></GradeModel>
            </div>
            <div className="typeList">
              <Table dataSource={classMsgInfo} rowKey="grade_id">
                <Column
                  title="班级名"
                  dataIndex="grade_name"
                />
                <Column
                  title="课程名"
                  dataIndex="subject_text"
                />
                <Column
                  title="教室号"
                  dataIndex="room_text"
                />
                <Column
                  title="操作"
                  render={(text, record) => (
                    <div style={{display:"flex"}} >
                      <GradeModel text={text} className={styles.btn}></GradeModel>
                      <Button className={styles.btn} onClick={(e)=>{
                        this.deteleClass(text)
                      }}>删除</Button>
                    </div>
                  )}
                />
              </Table>
            </div>
          </div>
        </div>
        {/* 弹出框 */}
        {
          flag?<GradeModel></GradeModel>:null
        }
      </div>
    )
  }
}



let mapStateToProps = state =>{
  return state
}
export default connect(mapStateToProps)(ClassManagements)