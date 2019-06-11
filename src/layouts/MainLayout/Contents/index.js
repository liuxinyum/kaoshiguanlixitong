import React from 'react'
import { Route, Switch, withRouter } from 'dva/router'
import { Layout, Breadcrumb } from 'antd'
import { getLayoutRoute, getRouterInfo } from '@/routerConfig/router.config'
import styles from "../styles.less";
const { Content } = Layout;
class Contents extends React.Component {
  // 动态计算title
  get title() {
    let title = getRouterInfo(this.props.location.pathname).title
    document.title = title
    return title
  }
  render() {
    return (
      <Layout style={{ padding: '0 24px 24px' }} className={styles.con}>
        <Breadcrumb style={{ margin: '16px 0', fontSize: '18px' }}>
          <Breadcrumb.Item>
            {this.title}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Content className={styles.Content}>
          <Switch>
            {
              getLayoutRoute('BaseLayout').map(item => {
                return <Route
                  path={item.path}
                  key={item.name}
                  component={item.component}
                ></Route>
              })
            }
          </Switch>
        </Content>
      </Layout>
    )
  }
}
export default withRouter(Contents)
