import React from 'react'
import { Layout } from 'antd'
import Menus from "./Menus/index"
import Contents from "./Contents/index"
import Header from './Header/index'
import {connect} from 'dva'
class Main extends React.Component {
  getMenuTitle=(titles)=>{
    this.setState({
        MenuTitle:titles
    })
  }
  render() {
    return (
      <Layout>
        <Header>
          header
        </Header>
        <Layout>
          <Menus getMenuTitle={this.getMenuTitle}></Menus>
          <Contents></Contents>
        </Layout>
      </Layout>
    )
  }
}
let mapState = store => {
  return { ...store.login}
}
export default connect(mapState)(Main);
