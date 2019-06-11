import React from 'react'
import {
	Table, Button
} from 'antd'
const { Column } = Table;
class ExamList extends React.Component {
    render() {
        return (
            <React.Fragment>
                <br/>
                <Table>
					<Column
						title="班级"
						dataIndex="name"
					/>
					<Column
						title="姓名"
						dataIndex="2"
                    />
                    <Column
						title="阅卷管理"
						dataIndex="3"
                    />
                    <Column
						title="开始时间"
						dataIndex="4"
                    />
                    <Column
						title="结束时间"
						dataIndex="5"
                    />
                    <Column
						title="成材率"
						dataIndex="6"
					/>
					<Column
						title="操作"
						dataIndex="7"
						render={(text, record) => {
							return <Button onClick={() => {
								this.showConfirm(record.questions_type_id)
							}}>删除</Button>
						}}
					/>
				</Table>
            </React.Fragment>
        )
    }
}

export default ExamList