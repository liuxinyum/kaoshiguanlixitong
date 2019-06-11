import React from 'react'
import { Layout, Menu, Icon } from 'antd';
import styles from './styles.less'
import { routes } from '@/routerConfig/router.config'
import { withRouter } from "dva/router"
const { SubMenu } = Menu;
const { Sider } = Layout;

class Menus extends React.Component {
  goToContent(path, title) {
    let { getMenuTitle, history: {
      push
    } } = this.props
    getMenuTitle(title)
    push(path)
  }
  render() {
    let { history: {
      location: {
        pathname
      }
    } } = this.props
    return (
      <Sider width={256} className={styles.sider}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {

            routes[1].children.map((ele, ind) => {
              return (
                <SubMenu key={ele.title} title={<span><Icon type="user" />{ele.title}</span>}>
                  {
                    ele.children.map((key)=>{
                      if (key.title) {
                        return <Menu.Item key={key.path}>
                          <p onClick={this.goToContent.bind(this, key.path, key.title)}>{key.title}</p>
                        </Menu.Item>
                      }else{
                        return ''
                      }
                    })

                  }
                </SubMenu>
              )
            })
          }
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(Menus)