import React from 'react'
import { connect } from "dva"
import { Select, Button, Spin } from 'antd';
import styles from './style.less'
const Option = Select.Option;
class WaitingClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lists: ['全部', '已进行', '已结束'],
      activeIndex: 0,
      loading: true
    }
  }
  tab = (index) => {
    this.setState({
      activeIndex: index
    })
  }
  start = (time) => {
    console.log(time)
  }
  add0 = (m) => { return m < 10 ? '0' + m : m }
  start = (times) => {
    //shijianchuo是整数，否则要parseInt转换
    const time = new Date(times * 1);
    const y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    const h = time.getHours();
    const mm = time.getMinutes();
    const s = time.getSeconds();
    return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
  }
  async componentDidMount() {
    await this.props.dispatch({
      type: 'paper/subject'
    })
    await this.props.dispatch({
      type: 'paper/examTypes'
    })
    await this.props.dispatch({
      type: 'paper/obtain'
    })
    this.setState({
      loading: false
    })
  }
  examDetail(item) {
    this.props.history.push(`/main/details?id=${item}`)
  }
  render() {
    let { lists, activeIndex } = this.state
    const { subjec, exam, test } = this.props
    return (
      <Spin spinning={this.state.loading}>
        <div className={styles.wrap}>
          <div className={styles.header}>
            <div className={styles.ipt}>
              <label htmlFor=""><b>*</b>选择考试类型:</label>
              <Select
                style={{ width: 140, marginTop: 8 }}
                onChange={this.handleProvinceChange}
              >
                {exam.map(province => <Option key={province.exam_id}>{province.exam_name}</Option>)}
              </Select>
            </div>
            <div className={styles.ipt}>
              <label htmlFor="" style={{ marginTop: 16 }}><b>*</b>选择课程:</label>
              <Select
                style={{ width: 140, marginTop: 8 }}
                onChange={this.handleProvinceChange}
              >
                {subjec.map(province => <Option key={province.subject_id}>{province.subject_text}</Option>)}
              </Select>
            </div>
            <Button type="primary" icon="search">查询</Button>
          </div>
          <div className={styles.paper}>
            <div className={styles.list}>
              <h4>试卷列表</h4>
              <div className={styles.whole}>
                <ul>
                  {
                    lists.map((item, index) => {
                      return (
                        <li key={index} className={activeIndex === index ? styles.active : ''} onClick={() => {
                          this.tab(index)
                        }}>{item}</li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            <div className={styles.information}>
              <p>试卷信息</p>
              <p>班级</p>
              <p>创建人</p>
              <p>开始时间</p>
              <p>结束时间</p>
              <p>操作</p>
            </div>
            {
              test.map((item, index) => {
                return (
                  <div className={styles.details} key={index}>
                    <p>{item.title}</p>
                    <p>
                      <span>考试班级</span>
                      <span>{item.grade_name}</span>
                    </p>
                    <p>{item.user_name}</p>
                    <p onClick={() => {
                      this.start(item.start_time)
                    }}>{this.start(item.start_time)}</p>
                    <p>{this.start(item.end_time)}</p>
                    <p onClick={() => {
                      this.examDetail(item.exam_exam_id)
                    }}>详情</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </Spin>
    )
  }
}


const mapStateToProps = (state) => state.paper
export default connect(mapStateToProps)(WaitingClass)