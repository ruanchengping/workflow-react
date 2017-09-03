import React from 'react';
import {Input,Button,Icon,Select,Transfer} from 'vdap-ui';

const Search = Input.Search;
const Option = Select.Option;
const { TextArea } = Input;
class FilterView extends React.Component{
	 constructor(props) {
	    super(props);
	    this.state = {
	      filter: '',
	      textValue: '',
	    };
	  }
	  emitEmpty = () => {

	    this.setState({ filter: '' });
	  }
	  onChangeFilter = (e) => {
	    this.setState({ filter: e.target.value });
	  }

	  onChangeM = (value) => {
	  	var myFilter = this.state.filter +" "+ value +" ";
	    this.setState({ filter:myFilter});
	  }

	  onChangeText = (e) => {
	  	console.log(e.target.value);
	    this.setState({ textValue: e.target.value});
	  }

	  getTextValue = () => {
	  	console.log(1);
	  	console.log(this.state.textValue);
	  	var myFilter = this.state.filter +" "+ this.state.textValue +" ";
	    this.setState({ filter:myFilter});
	  }


  render(){
  	const { filter } = this.state;

  	 return (
      <div>

      	<div style={{margin:'10px 0 10px 70px'}}>
          <label >
           <span style={{ width: 60,display:'inline-block' }}>关系</span>
            <Select defaultValue="" style={{ width: 320}} onChange={this.onChangeM}>
              <Option value=""></Option>
              <Option value="and">and</Option>
              <Option value="or">or</Option>
              <Option value="(">(</Option>
              <Option value=")">)</Option>
            </Select>
          </label>

          <label>
            <span  style={{ width: 60,display:'inline-block' }}>字段</span>
            <Select defaultValue="" style={{ width: 320}} onChange={this.onChangeM}>
              <Option value=""></Option>
              <Option value="产品代码">产品代码</Option>
              <Option value="产品名称">产品名称</Option>
              <Option value="产品系列">产品系列</Option>
              <Option value="产品描述">产品描述</Option>
            </Select>
          </label>

          <label>
            <span style={{ width: 60,display:'inline-block' }}>运算符</span>
            <Select defaultValue="" style={{ width: 320}} onChange={this.onChangeM}>
              <Option value=""></Option>
              <Option value="="> 等于 </Option>
              <Option value=">"> 大于 </Option>
              <Option value=">="> 大于等于 </Option>
              <Option value="<"> 小于 </Option>
              <Option value="<="> 小于等于 </Option>
              <Option value="<>"> 不等于 </Option>
              <Option value="like"> like </Option>
            </Select>
          </label>

          <label>
            <span style={{ width: 60,display:'inline-block' }}>值</span>
            <Input style={{ width: 255 }} onChange={this.onChangeText} />
            <Button style={{margin:'0 5px 0 5px'}}  onClick={this.getTextValue} >完成</Button>
          </label>

          <p style={{padding:'0', width:410,marginTop:'30px',textAlign:'center',fontSize:'16px',color:'#333'}}>生成过滤条件</p>

          <p style={{padding:'0', width:385 }}>
            <Button style={{margin:'5px 8px',float:'right',}}  onClick={this.emitEmpty} >全部删除</Button>
          </p>

          <TextArea rows={4} style={{ width: 320,marginLeft:'60px'}}  value={filter} />


        </div>
      </div>
    )
  }
}

export default FilterView;
