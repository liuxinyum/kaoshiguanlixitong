import React from 'react'
import {
    Select
} from 'antd';
import {PropTypes} from 'prop-types'
const Option = Select.Option;

class SelectComp extends React.Component {
    searchData() {
        console.log('search');

    }
    render() {
        let { DataArray, title } = this.props
        return (
            <React.Fragment>
                <span>{title}</span>
                <Select defaultValue="请选择" style={{ width: 250 }}>
                    {
                        DataArray.length && DataArray.map((ele) => {
                            return <Option key={ele.grade_id}>{ele.grade_name}</Option>
                        })
                    }
                </Select>
            </React.Fragment>
        )
    }
}

SelectComp.propTypes = {
    DataArray:PropTypes.array
}

export default SelectComp