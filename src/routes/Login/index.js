import React, { Component } from 'react';
import { connect } from "dva"
import {
    Form, Icon, Input, Button, Checkbox
} from 'antd';
import styles from "./styles.less"

class Login extends Component {
    
  handleSubmit = (e) => {
    let {
      history: {
        push
      }
    } = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.remember) {
          localStorage.setItem("userName", values.userName)
          localStorage.setItem("password", values.password)
        }
        this.props.dispatch({
          type: 'login/getLogin', body: {
            'user_name': values.userName,
            'user_pwd': values.password
          }, push
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.login}>
        <Form onSubmit={this.handleSubmit} className={styles.loginBox}>
          <h3>请登录</h3>
          <Form.Item>
            {getFieldDecorator('userName', {
                rules: [{ required: true, message: '用户名不能为空' }],
            })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.3)' }} />} placeholder="请输入用户名" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
                rules: [{ required: true, message: '密码不能为空' }],
            })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.3)' }} />} type="password" placeholder="请输入密码" />
            )}
          </Form.Item>
          <Form.Item>
            <div className="login-pwd">
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: false,
                })(
                    <Checkbox>记住密码</Checkbox>
                )}
                <b className="login-form-forgot a" >忘记密码</b>
            </div>
            <Button type="primary" htmlType="submit" className="login-form-button">
                登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
let mapStateToProps = state => {
  return state
}
export default connect(mapStateToProps)(Form.create()(Login));
