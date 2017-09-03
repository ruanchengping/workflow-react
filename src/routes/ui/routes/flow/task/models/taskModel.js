/**
 * actionTypes
 */
import axios from 'axios';
import taskJson from '../taskJson';

export const RECEIVE_taskDATA = 'taskModel.RECEIVE_taskDATA';
export const RECEIVE_chartDATA = 'taskModel.RECEIVE_chartDATA';
export const RECEIVE_expenseDATA = 'taskModel.RECEIVE_expenseDATA';

export function fetchChartData() {
  return (dispatch) => {
    let data =  [];
    for (let i = 0; i < 20; i++) {
      let json = {
                  id:i,
                  chartName:'分组圆形图'+i,
                  chartType:'pie',
                  totalField:'报销金额',
                  groupField:'部门',           
                  };
      data.push(json);
    }   
    dispatch(receiveChartData(data));
  }
};

let receiveChartData = (data) => {
  return {
    type: RECEIVE_chartDATA,
    chartData: data,
  };
};

export function fetchExpenseData() {
  return (dispatch) => {
    let data =  [];
    for (let i = 0; i < 20; i++) {
      let json = {
                  id:i,
                  startTime:'2017-01-01',
                  endTime:'2017-08-30', 
                  expendStandard:30.00,
                  paperMoney:40.00,
                  expendMoney:30.00,               
                  };
      data.push(json);
    }
    
    dispatch(receiveExpenseData(data));
  }
};

let receiveExpenseData = (data) => {
  return {
    type: RECEIVE_expenseDATA,
    expenseData: data,
  };
};

export function fetchtaskData(taskId) {
  //获取时间格式化
let gshtime = (time) =>
{
  var year = time.getFullYear();       //年</span>
  var month = time.getMonth() + 1;  //月
  var day = time.getDate();         //日
 var hh = time.getHours();       //时
 var mm = time.getMinutes();    //分
 var seconds = time.getSeconds();
  var str= year + "-";
  if(month < 10)
    str+= "0";
  str+= month + "-";
  if(day < 10)
    str+= "0";
  str+= day + "-";
 if(hh < 10)
   hh+= "0";
 str+= hh + ":";
 if(mm < 10)
   mm+= "0";
 str+= mm + ":";
 if(seconds < 10)
   seconds+= "0";
 str+= seconds;
  return(str);
}
  return (dispatch) => {
    let backData = [];
    let waites = [];
    let copies = [];
    for (let i = 0; i < 30; i++) {
      let json = {
                  id:i,
                  expands:'正常',
                  updated:'2017-08-02 21:42:28',
                  tasks:'部门经理审批'+i,
                  business:'季度通信费用报销'+i,
                  priority:'高',
                  expandTime:'2017-08-30 21:42:28',
                  department:'开发部'+i,
                  numbers:'20170801'+i,
                  submitTime:'2017-08-01 21:42:28',
                  submitter:'李六环'+i, 
                  createTime:'2017-08-01 21:42:28',                  
                  };
      waites.push(json);
      copies.push(json);
    }
    let todays = [];
    for (let i = 30; i < 60; i++) {
      let json = {
                  id:i,
                  expands:'正常',
                  updated:'2017-08-02 21:42:28',
                  tasks:'部门经理审批'+i,
                  business:'季度通信费用报销'+i,
                  priority:'中',
                  expandTime:gshtime(new Date()),
                  department:'开发部'+i,
                  numbers:'20170802'+i,
                  submitTime:'2017-08-02 21:42:28',
                  submitter:'李六环'+i, 
                  createTime:'2017-08-02 21:42:28',                  
                  };
      todays.push(json);
      copies.push(json);
    }
    let expands = [];
    for (let i = 60; i < 90; i++) {
      let json = {
                  id:i,
                  expands:'逾期',
                  updated:'2017-08-02 21:42:28',
                  tasks:'部门经理审批'+i,
                  business:'季度通信费用报销'+i,
                  priority:'中',
                  expandTime:'2017-08-18 21:42:28',
                  department:'开发部'+i,
                  numbers:'20170803'+i,
                  submitTime:'2017-08-03 21:42:28',
                  submitter:'李六环'+i,
                  createTime:'2017-08-03 21:42:28',                  
                  };
      expands.push(json);
      copies.push(json);
    }
    
    if(taskId=="waites"){
      backData = waites;
    }else if(taskId=="todays"){
      backData = todays;  
    }else if(taskId=="expands"){
      backData = expands;  
    }else if(taskId=="copies"){
      backData = copies;  
    }else if(taskId=="delegates"){
      backData = copies; //delegates;  
    }else if(taskId=="did"){
      backData = copies; //did;  
    }
    let data = backData;
    dispatch(receivetask(data))
  }
};

let receivetask = (data) => {
  return {
    type: RECEIVE_taskDATA,
    taskData: data,
  };
};

export default function taskReducer(state ={taskDataBack:[],expenseDataBack:[],chartData:[] }, action) {
  switch (action.type) {
    case RECEIVE_taskDATA:
      return {
        ...state,
        taskDataBack:action.taskData
        };

    case RECEIVE_expenseDATA:
      return {
        ...state,
        expenseDataBack:action.expenseData
        };
    case RECEIVE_chartDATA:
      return {
        ...state,
        chartData:action.chartData
        };


    default:
      return state;
  }
}
