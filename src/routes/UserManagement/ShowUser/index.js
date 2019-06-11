import React from 'react'
import styles from './style.less'
import { connect } from "dva"
import { List, Icon, Spin } from 'antd'
class ShowUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      exhibition: [
        {
          title: '用户数据'
        },
        {
          title: '身份数据'
        },
        {
          title: 'api接口权限'
        },
        {
          title: '身份和api接口关系'
        },
        {
          title: '试图接口权限'
        },
        {
          title: '身份和视图权限关系'
        }
      ],
      titles: '用户数据',
      current: 1,
      activeIndex: '用户身份',
      currents: 10,
      loading: true
    }
  }
  data2 = (item) => {
    this.setState({
      titles: item,
      activeIndex: item
    })
  }
  async componentDidMount() {
    await this.props.dispatch({
      type: 'add/user'
    })
    this.setState({
      loading: false
    })
  }
  IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
  render() {
    let { exhibition, titles, activeIndex } = this.state
    let { users } = this.props
    return (
      <Spin spinning={this.state.loading}>
        <div className={styles.wrap1}>
          <div className={styles.Exhibition}>
            {
              exhibition.map((item, index) => {
                return (
                  <div key={index} className={activeIndex === item.title ? styles.active : ''} onClick={() => {
                    this.data2(item.title)
                  }}>{item.title}</div>
                )
              })
            }
          </div>
          <div className={styles.data1}>
            <h2>{titles}</h2>
          </div>
          <div className={styles.name}>
            <span>用户名</span>
            <span>密码</span>
            <span>身份</span>
          </div>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 10,
            }}
            dataSource={users}
            renderItem={item => (
              <List.Item key={item.user_id}>

                <List.Item.Meta />
                <div className={styles.list}>
                  <p> {item.user_name}</p>
                  <p>{item.user_pwd}</p>
                  <p>{item.identity_text}</p>
                </div>
                {item.content}
              </List.Item>
            )}
          />
        </div>
      </Spin>
    )
  }
}

const mapStateToProps = (state) => state.add
export default connect(mapStateToProps)(ShowUser)