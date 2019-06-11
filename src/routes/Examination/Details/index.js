import React from 'react'
import { connect } from "dva"
import styles from './style.less'
class Details extends React.Component {
    componentDidMount() {
    this.props.dispatch({
      type: 'paper/detailt',
      payload:{
        id:this.props.location.search.slice(4)
      }
    })
  }
  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.title}>
          <h3>试卷详情</h3>
        </div>
        <div className={styles.Itembank}>
          <div className={styles.left}>

          </div>
          <div className={styles.right}>

          </div>

        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => state.paper
export default connect(mapStateToProps)(Details)