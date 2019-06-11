import React from 'react'
import styles from './style.less'
import { Select, InputNumber, DatePicker, Button, Form, Input } from 'antd';
import { connect } from "dva"
const Option = Select.Option;
class WaitingClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
      subject: '',
      exam: '',
      tites: '',
      start: '',
      end: '',
      value: '',
      isshow: false
    }
  }
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();

  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value, dateString) => {
    this.onChange('startValue', value);
    this.setState({
      start: value.valueOf()
    })
  }


  onEndChange = (value, dateString) => {
    this.onChange('endValue', value);
    this.setState({
      end: value.valueOf()
    })
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }
  onChanges = (value) => {
    this.setState({
      value: value
    })
  }
  tites = (e) => {
    this.setState({
      tites: e.target.value
    })
  }
  exams = (item) => {
    this.setState({
      exam: item
    })
  }
  title = (item) => {
    this.setState({
      subject: item
    })
  }
  Createclick = () => {
    let { subject, exam, tites, start, end, value } = this.state
    if (subject === '' && exam === '' && tites === '' && start === '' && end === '' && value === '') {

    } else {
      this.props.dispatch({
        type: 'paper/establish',
        payload: {
          'subject_id': this.state.subject,
          'exam_id': this.state.exam,
          'title': this.state.tites,
          'start_time': this.state.start,
          'end_time': this.state.end,
          'number': this.state.value
        }
      })
      this.props.history.push(`/main/newtopic?title=${tites}`)
    }

  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'paper/subject'
    })
    this.props.dispatch({
      type: 'paper/examTypes'
    })
    this.props.dispatch({
      type: 'paper/getQuestionsType'
    })
  }
  render() {
    let { startValue, endValue, endOpen, tites } = this.state
    const { subjec, exam } = this.props
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.wrap}>
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
          <Form.Item
            label="试卷名称"
            style={{ width: 800 }}
          >
            {getFieldDecorator('note', {
              rules: [{ required: true, message: '请输入试卷名称!' }],
            })(
              <Input setfieldsvalue={tites} onChange={(e) => {
                this.tites(e)
              }} />
              )}
          </Form.Item>
          <Form.Item
            label="选择考试类型"
            style={{ width: 300, marginTop: 8 }}
          >
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: '请输入考试类型!' }],
            })(
              <Select
                onChange={this.handleSelectChange}
              >
                {exam.map(province => <Option key={province.exam_id} onClick={() => {
                  this.exams(province.exam_id)
                }}>{province.exam_name}</Option>)}
              </Select>
              )}
          </Form.Item>
          <Form.Item
            label="选择课程"
            style={{ width: 300, marginTop: 8 }}
          >
            {getFieldDecorator('assa', {
              rules: [{ required: true, message: '请输入选择课程!' }],
            })(
              <Select
                onChange={this.handleSelectChange}
              >
                {subjec.map(province => <Option key={province.subject_id} onClick={() => {
                  this.title(province.subject_id)
                }}>{province.subject_text}</Option>)}
              </Select>
              )}
          </Form.Item>
          <Form.Item
            label="设置题量"
            style={{ width: 160, marginTop: 8 }}
          >
            {getFieldDecorator('fds', {
              rules: [{ required: true, message: '请输入设置题量!' }],
            })(
              <InputNumber min={3} max={10} onChange={this.onChanges} />
              )}
          </Form.Item>
          <Form.Item
            label="考试时间"
          >
            {getFieldDecorator('fsd', {
              rules: [{ required: true, message: '请输入开始时间!' }],
            })(
              <DatePicker
                disabledDate={this.disabledStartDate}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                setfieldsvalue={startValue}
                placeholder="开始"
                onChange={this.onStartChange}
                onOpenChange={this.handleStartOpenChange}
              />
              )}
              <span> - </span>
            {getFieldDecorator('fsttd', {
              rules: [{ required: true, message: '请输入结束时间!' }],
            })(
              <DatePicker
                disabledDate={this.disabledEndDate}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                setfieldsvalue={endValue}
                placeholder="结束"
                onChange={this.onEndChange}
                open={endOpen}
                onOpenChange={this.handleEndOpenChange} />
              )}
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 12, offset: 5 }}
          >
            <Button type="primary" htmlType="submit" onClick={() => {
              this.Createclick()
            }}>
              创建试卷
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const WrappedApp = Form.create({ name: 'coordinated' })(WaitingClass);
const mapStateToProps = (state) => {
  return state.paper
}
export default connect(mapStateToProps)(WrappedApp)
