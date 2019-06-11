import React, { Component } from 'react'
import { Avatar,Menu, Dropdown } from 'antd';
import styles from "../styles.less"
import {connect} from 'dva'
import {withRouter} from "dva/router"
class Header extends Component {
  async componentDidMount(){
    await this.props.dispatch({
      type: 'login/getInfo'
    })
  }
  handleMenuClick = (e) => {
    if (e.key === '4') {
      this.props.history.push("/")
      localStorage.clear('token');
    }
  }
  render() {
    let {userInfo} = this.props.login
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">个人中心</Menu.Item>
        <Menu.Item key="2">我的班级</Menu.Item>
        <Menu.Item key="3">设置</Menu.Item>
        <Menu.Item key="4">退出登录</Menu.Item>
      </Menu>)
    return (
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <img src={require('@/static/nhead.png')} alt=""/>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="Javescript:;">
              <Avatar size="large" icon="user" />
              <b className={styles.user}>{userInfo.user_name}</b>
            </a>
          </Dropdown>
        </div>
      </div>
    )
  }
}

let mapState = state => {
  return state
}
export default connect(mapState)(withRouter(Header));