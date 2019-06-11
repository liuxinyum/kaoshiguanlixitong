import React from 'react'
import { Select } from 'antd'
import { connect } from 'dva'
// import {getRouterInfo} from '@/routerConfig/router.config.js'
const Option = Select.Option
class AddRoute extends React.Component {
    handleChange = () => {
        console.log('handle');
    }
    render() {
        console.log(this.props,'orp');
        
        return (
            <div style={{ background: '#fff', borderRadius: '5px' }}>
                <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </div>
        )
    }
}
let mapStateToProps = (state) => state.login
export default connect(mapStateToProps)(AddRoute)
