/**
 * actionTypes
 */
import axios from 'axios';
import flowJson from '../flowJson';

export const RECEIVE_Tree = 'flowModel.RECEIVE_Tree';
export const RECEIVE_ServiceTree = 'flowModel.RECEIVE_ServiceTree';
export const RECEIVE_ServiceData = 'flowModel.RECEIVE_ServiceData';
export const RECEIVE_ModelData = 'flowModel.RECEIVE_ModelData';
export const RECEIVE_FlowData = 'flowModel.RECEIVE_FlowData';
export const RECEIVE_TaskData = 'flowModel.RECEIVE_TaskData';
export const RECEIVE_VariableData = 'flowModel.RECEIVE_VariableData';
export const RECEIVE_ActivityData = 'flowModel.RECEIVE_ActivityData';
export const RECEIVE_FlowCol = 'flowModel.RECEIVE_FlowCol';

/*模型左侧的树*/
export function fetchTree() {
  return (dispatch) => {
    let data = flowJson.treeData;
    dispatch(receiveTree(data))
  }
};

let receiveTree = (data) => {
  return {
    type: RECEIVE_Tree,
    treeData: data,
  };
};

/*模型右侧的表数据*/
export function fetchModelData(name) {
  return (dispatch) => {
    let backData = [];
    for (let i = 0; i < 30; i++) {
      let json = {
                    id: i,
                    modelName:name+'审批',
                    sorting:name,
                    currentVersion:'V2.0',
                    createTime:'2017-03-02 21:42:26',
                    creator:`张花${i}`,
                    updateTime:'2017-03-22 21:42:26',
                  };
      backData.push(json);
    }
    let data = backData;
    dispatch(receiveModelData(data))
  }
};

let receiveModelData = (data) => {
  return {
    type: RECEIVE_ModelData,
    modelData: data,
  };
};

/*设置应用服务左侧的树*/
export function fetchServiceTree() {
  return (dispatch) => {
    let data = flowJson.serviceTree;
    dispatch(receiveServiceTree(data))
  }
};

let receiveServiceTree = (data) => {
  return {
    type: RECEIVE_ServiceTree,
    serviceTree: data,
  };
};

/*设置应用服务右侧的表数据*/
export function fetchServiceData(name) {
  return (dispatch) => {
    let backData = [];
    for (let i = 0; i < 30; i++) {
      let json = {
                    id: i,
                    serviceName:'修改'+name+'状态',
                    sorting:name,
                    createTime:'2017-03-02 21:42:26',
                    creator:`张花${i}`,
                    description:'',
                    serviceType:'Java',
                    url:`www.baidu.com${i}`,
                  };
      backData.push(json);
    }
    let data = backData;
    dispatch(receiveServiceData(data))
  }
};


let receiveServiceData = (data) => {
  return {
    type: RECEIVE_ServiceData,
    serviceData: data,
  };
};

export function fetchFlowCol() {
  return (dispatch) => {
    let data = flowJson.columns;
    dispatch(receiveFlowCol(data))
  }
};

let receiveFlowCol = (data) => {
  return {
    type: RECEIVE_FlowCol,
    flowCol: data,
  };
};
export function fetchFlowData(flag) {
  return (dispatch) => {
    //dispatch(requestRole(roleId));
    //let {data} = await axios.get('');
    /*以下模拟ajax结果数据*/
    let backData = [];
    if(flag=="allData"){
      backData = flowJson.allData;
    }else if(flag=="unfinished"){
      backData = flowJson.unfinished;  
    }else if(flag=="finished"){
      backData = flowJson.finished;  
    }
    let data = backData;
    dispatch(receiveFlowData(data))
  }
};

let receiveFlowData = (data) => {
  return {
    type: RECEIVE_FlowData,
    flowData: data,
  };
};

export function fetchVariableData() {
  return (dispatch) => {
    let variable = [];
    for (let i = 0; i < 30; i++) {
      let json = {
                    id: i,
                    vName: `BPM_${i}`,
                    vType: 'string',
                    vValue:'',
                    updatetime:'2017-03-02 21:42:26',
                  };
      variable.push(json);
    }
    let data = variable;
    dispatch(receiveVariableData(data))
  }
};

let receiveVariableData = (data) => {
  return {
    type: RECEIVE_VariableData,
    variableData: data,
  };
};

export function fetchActivityData() {
  return (dispatch) => {
    let activity = [];
    for (let i = 0; i < 30; i++) {
      let json = {
                    id: i,
                    actid:i,
                    actname:`活动${i}`,
                  };
      activity.push(json);
    }
    let data = activity;
    dispatch(receiveActivityData(data))
  }
};

let receiveActivityData = (data) => {
  return {
    type: RECEIVE_ActivityData,
    activityData: data,
  };
};

export function fetchTaskData(flag) {
  return (dispatch) => {
    let waited = [];
    let allData = [];
    for (let i = 0; i < 30; i++) {
      let json = {
                    id: i,
                    status: '待办',
                    taskName: `审批任务${i}`,
                    executor: `张花${i}`,
                    createTime:'2017-03-02 21:42:26',
                    expiration:'2017-03-02 21:42:26',
                    endTime:'2017-03-02 21:42:26',
                    isexpand:'未逾期',
                    processName: `张花${i}的费用报销单`,
                    documentNum:'ertyujasdfgh12345',
                  };
      waited.push(json);
      allData.push(json);
    }
    let expandPeriod = [];
    for (let i = 30; i < 60; i++) {
      let json = {
        id: i,
        status: '逾期',
        taskName: `审批任务${i}`,
        executor: `张花${i}`,
        createTime:'2017-03-02 21:42:26',
        expiration:'2017-03-02 21:42:26',
        endTime:'2017-03-02 21:42:26',
        isexpand:'逾期',
        processName: `张花${i}的费用报销单`,
        documentNum:'ertyujasdfgh12345',
      };
      expandPeriod.push(json);
      allData.push(json);
    }
    let finished = [];
    for (let i = 60; i < 90; i++) {
      let json = {
        id: i,
        status: '完成',
        taskName: `审批任务${i}`,
        executor: `张花${i}`,
        createTime:'2017-03-02 21:42:26',
        expiration:'2017-03-02 21:42:26',
        endTime:'2017-03-02 21:42:26',
        isexpand:'未逾期',
        processName: `张花${i}的费用报销单`,
        documentNum:'ertyujasdfgh12345',
      };
      finished.push(json);
      allData.push(json);
    }
    /*以下模拟ajax结果数据*/
    let backData = [];
    if(flag=="waited"){
      backData = waited;
    }else if(flag=="expandPeriod"){
      backData = expandPeriod;  
    }else if(flag=="finished"){
      backData = finished;  
    }else if(flag=="allData"){
      backData = allData;  
    }
    let data = backData;
    dispatch(receiveTaskData(data))
  }
};

let receiveTaskData = (data) => {
  return {
    type: RECEIVE_TaskData,
    taskData: data,
  };
};

export default function flowReducer(state ={
  flowColBack:[],flowDataBack:[],taskData:[],variableData:[],activityData:[],
  treeData:[],modelData:[],serviceTree:[],serviceData:[] }, action) {
  switch (action.type) {
    case RECEIVE_FlowCol:
      return {
        ...state,
        flowColBack:action.flowCol
        };

    case RECEIVE_FlowData:
      return {
        ...state,
        flowDataBack:action.flowData
        };

    case RECEIVE_TaskData:
      return {
        ...state,
        taskData:action.taskData
        };
    case RECEIVE_VariableData:
      return {
        ...state,
        variableData:action.variableData
        };

    case RECEIVE_ActivityData:
      return {
        ...state,
        activityData:action.activityData
        };

    case RECEIVE_Tree:
      return {
        ...state,
        treeData:action.treeData
        };

    case RECEIVE_ModelData:
      return {
        ...state,
        modelData:action.modelData
        };

    case RECEIVE_ServiceTree:
      return {
        ...state,
        serviceTree:action.serviceTree
        };


    case RECEIVE_ServiceData:
      return {
        ...state,
        serviceData:action.serviceData
        };


    default:
      return state;
  }
}
