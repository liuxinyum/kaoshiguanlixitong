import React from 'react'
import { Input, Button, Select, Table, Modal } from 'antd';
import styles from './style.less'
import { connect} from "dva"
const { Column } = Table;
const Option = Select.Option;
const confirm = Modal.confirm;
class StudentMag extends React.Component{
  constructor(props){
    super(props)
    this.state={
      studentName:'',
      roomValue:'',
      classValue:'',
      roomId:'',
      classId:'',
      newStudentInfo:[]
    }
  }
  componentDidMount(){
    this.props.dispatch({
      type:'studentMag/getStudent'
    })
    this.props.dispatch({
      type:'studentMag/getClassRoom'
    })
    this.props.dispatch({
      type:'studentMag/getClassInfo'
    })
  }
  remStudent = (text) => {
    let that = this
    confirm({
        title: '你确定删除该学生吗？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          that.props.dispatch({
            type:'studentMag/deteleStudent',
            body:{
              id:text.student_id
            }
          })
        },
        onCancel() {
            console.log('Cancel');
        }
    });
  }
  room(value,id){
    this.setState({
      roomValue: value,
      roomId:id
    })
  }
  subject(value,id){
    this.setState({
      classValue: value,
      classId:id
    })
  }
  searchStudent(){
    let {studentInfo} = this.props.studentMag
    let {studentName} = this.state
    let data= studentInfo.filter((v, i) => {
      return v.student_name === studentName
    })
    this.setState({
      newStudentInfo:data
    })
    
  }
  render(){
    let {studentInfo,classRoomData,classMsgInfo} = this.props.studentMag
    let {newStudentInfo} = this.state
    return (
      <div className={styles.roomContent}>
        <div className="in-typeTopic">
          <div className="little-classGrade">
          <div className={styles.search}>
            <Input placeholder="输入学生姓名" value={this.state.studentName} onChange={(e) => {
                this.setState({
                  studentName: e.target.value
                })
            }} style={{ width: 200 }} />
            <Select onChange={this.roomValue} value={this.state.roomValue} style={{ width: 200 }} placeholder="请选择教室号">
                {
                  classRoomData.length?classRoomData.map((v, i) => {
                    return <Option value={v.room_text} key={v.room_id} onClick={()=>{
                        this.room(v.room_text,v.room_id)
                      }}>{v.room_text}</Option>
                    }):null
                }
            </Select>
            <Select onChange={this.classValue} value={this.state.classValue} style={{ width: 200 }} placeholder="请选择班级">
                {
                  classMsgInfo.length?classMsgInfo.map((v, i) => {
                        return <Option value={v.grade_name} key={v.grade_id} onClick={()=>{
                        this.subject(v.subject_text,v.subject_id)
                      }}>{v.grade_name}</Option>
                    }):null
                }
            </Select>
            <Button type="primary" style={{ width: 120 }} onClick={() => {
                this.searchStudent()
            }}>搜索</Button>
            <Button type="primary" style={{ width: 120 }} onClick={() => {
                let newData = this.state
                delete newData.roomValue
                delete newData.classValue
                delete newData.studentName
                newData.value = ""
                this.setState({
                    newData
                })
            }}>重置</Button>
          </div>
            <div className="typeList">
              <Table dataSource={newStudentInfo.length?newStudentInfo:studentInfo} rowKey="student_id">
                <Column
                  title="姓名"
                  dataIndex="student_name"
                />
                <Column
                  title="学号"
                  dataIndex="student_id"
                />
                <Column
                  title="班级"
                  dataIndex=""
                />
                <Column
                  title="教室"
                  dataIndex=""
                />
                <Column
                  title="密码"
                  dataIndex="student_pwd"
                />
                <Column
                  title="操作"
                  render={(text, record) => (
                    <div style={{display:"flex"}} >
                      <Button type="dashed" onClick={()=>{
                          this.remStudent(text)
                      }}><b className="a" >删除</b></Button>
                    </div>
                  )}
                />
              </Table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
let mapStateToProps = (state) => {
	return state
}
export default connect(mapStateToProps)(StudentMag)