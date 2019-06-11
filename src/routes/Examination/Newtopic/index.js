import React from 'react'
import { connect } from "dva"
import styles from './style.less'
import { Button } from 'antd';
class Details extends React.Component {
  biography = () => {
    return this.props.history.location.search.slice(7)
  }
  establish=()=>{
    this.props.history.push(`/main/examinationlist`)
  }
  render() {
    return (
      <div className={styles.wrap}>
       <div className={styles.Newtopic}>  
         <h2>添加新题</h2>
       </div>
       <div className={styles.Title}>
         <h3>{this.biography()}</h3>
         <h4>考试时间：1小时30分钟  监考人：刘于       开始考试时间：2018.9.10  10:00  阅卷人：刘于</h4>
       </div>
        <Button type="primary" onClick={()=>{
            this.establish()
          }}>创建试卷</Button>
      </div>
    )
  }
}


const mapStateToProps = (state) => state.paper
export default connect(mapStateToProps)(Details)