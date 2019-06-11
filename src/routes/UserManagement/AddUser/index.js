import React from 'react'
import styles from './style.less'
import { Select, Button, message } from 'antd';
import { connect } from "dva"
const Option = Select.Option;
class AddUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: [
        {
          add1: '添加用户',
        },
        {
          add1: '更新用户'
        }
      ],
      activeIndex: 0,
      iconLoading: false,
      name: '',
      pwd: '',
      ids: '',
      identity: '',
      text: '',
      url: '',
      mehtod: '',
      test: '',
      id: '',
      identityid: '',
      apiauthorityid: '',
      identityids: '',
      viewauthorityid: '',
      show: true,
      isshow: false
    }
  }
  reset = () => {
    this.setState({
      name: '',
      pwd: ''
    })
  }
  resets = () => {
    this.setState({
      identity: ''
    })
  }
  rese = () => {
    this.setState({
      text: '',
      url: '',
      mehtod: ''
    })
  }
  LoginMines = () => {
    this.props.dispatch({
      type: 'add/addUser',
      payload: {
        'user_name': this.state.name,
        'user_pwd': this.state.pwd,
        'identity_id': this.state.ids
      }
    })
  }
  update = () => {
    this.props.dispatch({
      type: 'add/updates',
      payload: {
        'user_id': this.state.name
      }
    })
  }
  click = (index) => {
    this.setState({
      activeIndex: index
    })
    if (index === 0) {
      this.setState({
        show: true,
        isshow: false
      })
    } else {
      this.setState({
        show: false,
        isshow: true
      })
    }
  }
  names = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  pwds = (e) => {
    this.setState({
      pwd: e.target.value
    })
  }
  text = (item) => {
    this.setState({
      ids: item
    })
  }
  texts = (e) => {
    this.setState({
      text: e.target.value
    })
  }
  urls = (e) => {
    this.setState({
      url: e.target.value
    })
  }
  mehtods = (e) => {
    this.setState({
      mehtod: e.target.value
    })
  }
  ident = (e) => {
    this.setState({
      identity: e.target.value
    })
  }
  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  }
  sure = () => {

    if (this.state.identity === '') {
      message.error('名称不能为空');
    } else {
      this.props.dispatch({
        type: 'add/identity',
        payload: {
          'identity_text': this.state.identity
        }
      })
    }
  }
  views = (item, index) => {
    this.setState({
      test: item,
      id: index
    })
  }
  apis = () => {
    this.props.dispatch({
      type: 'add/api',
      payload: {
        'api_authority_text': this.state.text,
        'api_authority_url': this.state.url,
        'api_authority_method': this.state.mehtod
      }
    })
  }
  sures = () => {
    this.props.dispatch({
      type: 'add/views',
      payload: {
        'view_authority_text': this.state.test,
        'view_id': this.state.id
      }
    })
  }
  authority = (item) => {
    this.setState({
      apiauthorityid: item
    })
  }
  ids = (id) => {
    this.setState({
      identityid: id
    })
  }
  set = () => {
    this.props.dispatch({
      type: 'add/permissions',
      payload: {
        'identity_id': this.state.identityid,
        'api_authority_id': this.state.apiauthorityid
      }
    })
  }
  viewpermissions = (item) => {
    this.setState({
      identityids: item

    })
  }
  viewpermission = (item) => {
    this.setState({
      view_authority_id: item
    })
  }
  viewid = () => {
    this.props.dispatch({
      type: 'add/setup',
      payload: {
        'identity_id': this.state.identityids,
        'view_authority_id': this.state.view_authority_id
      }
    })
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'add/exhibition'
    })
    this.props.dispatch({
      type: 'add/authoritys'
    })
    this.props.dispatch({
      type: 'add/apiauthoritys'
    })

  }
  render() {
    let { user, activeIndex, iconLoading, name, pwd, identity, text, url, mehtod } = this.state
    const { exhibitions, thority, auth } = this.props;
    return (
      <div className={styles.wrap}>
        {/* 添加用户 */}
        <div className={styles.user}>
          <div className={styles.add}>
            {
              user.map((item, index) => {
                return (<div key={index} className={+ activeIndex === index ? styles.active : ''} onClick={() => {
                  this.click(index)
                }}>{item.add1}</div>)
              })
            }
          </div>
          {
            this.state.show && <div >
              <form className={styles.ipt}>
                <input type="text" value={name} onChange={(e) => {
                  this.names(e)
                }} placeholder='请输入用户名' />
              </form>
              <div className={styles.ipt}>
                <input type="text" value={pwd} onChange={(e) => {
                  this.pwds(e)
                }} placeholder='请输入密码' />
              </div>
              <div>
                <Select
                  className={styles.option}
                  defaultValue='请选择身份id'
                  onChange={this.handleProvinceChange}
                >
                  {exhibitions.map(province => <Option key={province.identity_text} onClick={() => {
                    this.text(province.identity_text)
                  }}>{province.identity_text}</Option>)}
                </Select>
              </div>
              <div className={styles.btn}>
                <Button type="primary" onClick={this.LoginMines.bind(this)}>确定</Button>
                <Button onClick={this.reset}>重置</Button>
              </div>
            </div>
          }
          {
            this.state.isshow && <div>
              <div>
                <Select
                  style={{ width: 140, marginLeft: 20, marginTop: 8 }}
                  defaultValue='请选择身份id'

                  onChange={this.handleProvinceChange}
                >
                  {exhibitions.map(province => <Option key={province.identity_text}>{province.identity_text}</Option>)}
                </Select>
              </div>
              <form className={styles.ipt}>
                <input type="text" value={name} onChange={(e) => {
                  this.names(e)
                }} placeholder='请输入用户名' />
              </form>
              <div className={styles.ipt}>
                <input type="text" value={pwd} onChange={(e) => {
                  this.pwds(e)
                }} placeholder='请输入密码' />
              </div>
              <div>
                <Select
                  style={{ width: 140, marginLeft: 20, marginTop: 8 }}
                  defaultValue='请选择身份id'

                  onChange={this.handleProvinceChange}
                >
                  {exhibitions.map(province => <Option key={province.identity_text}>{province.identity_text}</Option>)}
                </Select>
              </div>
              <div className={styles.btn}>
                <Button type="primary" style={{ width: 140, marginLeft: 20, marginTop: 8 }} onClick={this.update.bind(this)}>确定</Button>
                <Button style={{ marginLeft: 10 }}>重置</Button>
              </div>
            </div>
          }
        </div>

        {/* 添加身份 */}
        <div className={styles.user}>
          <div className={styles.Addidentity}>
            <p >添加身份</p>
          </div>
          <form className={styles.ipt}>
            <input type="text" value={identity} onChange={(e) => {
              this.ident(e)
            }} placeholder='请输入身份名称' />
          </form>
          <div className={styles.btn}>
            <Button type="primary" onClick={this.sure.bind(this)}>确定</Button>
            <Button onClick={this.resets}>重置</Button>
          </div>
        </div>
        {/* 添加api接口权限 */}
        <div className={styles.user}>
          <div className={styles.Interfacepermissions}>
            <p>添加api接口权限</p>
          </div>
          <div className={styles.ipt}>
            <input type="text" value={text} onChange={(e) => {
              this.texts(e)
            }} placeholder='请输入api接口权限名称' />
          </div>
          <div className={styles.ipt}>
            <input type="text" value={url} onChange={(e) => {
              this.urls(e)
            }} placeholder='请输入api接口权限url' />
          </div>
          <div className={styles.ipt}>
            <input type="text" value={mehtod} onChange={(e) => {
              this.mehtods(e)
            }} placeholder='请输入api接口权限方法' />
          </div>
          <div className={styles.btn}>
            <Button type="primary" loading={iconLoading} onClick={this.apis.bind(this)}>确定</Button>
            <Button onClick={this.rese}>重置</Button>
          </div>
        </div>
        {/* 添加视图接口权限 */}
        <div className={styles.user}>
          <div className={styles.Interfacepermissions}>
            <p>添加视图接口权限</p>
          </div>
          <div className={styles.select}>
            <Select
              className={styles.option}
              defaultValue='请选择已有视图'

              onChange={this.handleProvinceChange}
            >
              {thority.map((province, index) => <Option key={province.view_authority_text} onClick={() => {
                this.views(province.view_authority_text, province.view_id)
              }}>{province.view_authority_text}</Option>)}
            </Select>
          </div>
          <div className={styles.btn}>
            <Button type="primary" loading={iconLoading} onClick={this.sures.bind(this)}>确定</Button>
            <Button>重置</Button>
          </div>
        </div>
        {/* 给身份设置api接口权限 */}
        <div className={styles.user}>
          <div className={styles.Interfacepermissions}>
            <p>给身份设置api接口权限</p>
          </div>
          <div className={styles.select}>
            <Select
              className={styles.option}
              defaultValue='请选择身份id'

              onChange={this.handleProvinceChange}
            >
              {exhibitions.map(province => <Option key={province.identity_text} onClick={() => {
                this.ids(province.identity_text)
              }}>{province.identity_text}</Option>)}
            </Select>
          </div>
          <div className={styles.select}>
            <Select
              className={styles.option}
              defaultValue='请选择api接口权限'

              onChange={this.handleProvinceChange}
            >
              {auth.map((province, index) => <Option key={province.api_authority_text} onClick={() => {
                this.views(province.api_authority_text, province.api_authority_id)
              }}>{province.api_authority_text}</Option>)}
            </Select>
          </div>
          <div className={styles.btn}>
            <Button type="primary" loading={iconLoading} onClick={this.set.bind(this)}>确定</Button>
            <Button>重置</Button>
          </div>
        </div>
        {/* 给身份设置视图权限 */}
        <div className={styles.user}>
          <div className={styles.Interfacepermissions}>
            <p>给身份设置视图权限</p>
          </div>
          <div className={styles.select}>
            <Select
              className={styles.option}
              defaultValue='请选择身份id'

              onChange={this.handleProvinceChange}
            >
              {exhibitions.map(province => <Option key={province.identity_text} onClick={() => {
                this.viewpermission(province.identity_text)
              }}>{province.identity_text}</Option>)}
            </Select>
          </div>
          <div className={styles.select}>
            <Select
              className={styles.option}
              defaultValue='请选择视图权限id'

              onChange={this.handleProvinceChange}
            >
              {thority.map((province, index) => <Option key={province.view_authority_text} onClick={() => {
                this.views(province.view_authority_text, province.view_id)
              }}>{province.view_authority_text}</Option>)}
            </Select>
          </div>
          <div className={styles.btn}>
            <Button type="primary" loading={iconLoading} onClick={this.viewid.bind(this)}>确定</Button>
            <Button>重置</Button>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => state.add
export default connect(mapStateToProps)(AddUser)

