import React from 'react';
import {Input,Button,Icon,Select,Transfer} from 'vdap-ui';

const Search = Input.Search;
const Option = Select.Option;
const mockData=[{
  key: '1',
  title: '创建人别名',
  chosen:false,
}, {
  key: '2',
  title: '创建日期',
  chosen:false,
},{
  key: '3',
  title: '上次更新人别名',
  chosen:false,
}, {
  key: '4',
  title: '上次修改日期',
  chosen:false,
},{
  key: '5',
  title: '数量计量单位',
  chosen:false,
},{
  key: '6',
  title: '外部ID',
  chosen:false,
}, {
  key: '7',
  title: '外部数据源',
  chosen:false,
},{
  key: '8',
  title: '显示URL',
  chosen:false,
}, {
  key: '9',
  title: '已启用(产品)',
  chosen:false,
},{
  key: '10',
  title: '产品名称',
  chosen:true,
},{
  key: '11',
  title: '产品代码',
  chosen:true,
},{
  key: '12',
  title: '产品描述',
  chosen:true,
},{
  key: '13',
  title: '产品系列',
  chosen:true,
}];
class ShowField extends React.Component{
	state = {
	    mockData:mockData,
	    targetKeys: ['10','11','12','13'],
	}

	handleChange = (targetKeys) => {
	    this.setState({ targetKeys });
	}


  render(){
  	 return (
      <div style={{padding:'10px'}}>

      	<div style={{margin:'10px 0 10px 100px',padding:'10px'}}>
            <span>
              可用字段
            </span>
            <span style={{margin:'250px'}}>
              可视字段
            </span>
          </div>
          <div style={{margin:'10px 0 10px 100px',padding:'10px'}}>
            <Transfer
                dataSource={this.state.mockData}
                showSearch
                listStyle={{
                  width: 250,
                  height: 300,
                }}
                operations={['', '']}
                targetKeys={this.state.targetKeys}
                onChange={this.handleChange}
                render={item => `${item.title}`}

            />
          </div>
      </div>
    )
  }
}

export default ShowField;
