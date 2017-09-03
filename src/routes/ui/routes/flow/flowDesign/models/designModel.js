/**
 * actionTypes
 */
import axios from 'axios';
import designJson from '../designJson';
export const RECEIVE_Remind = 'designModel.RECEIVE_Remind';

export function fetchRemind() {
  return (dispatch) => {
    let data =  [];
    let json = {};
    for (let i = 0; i < 20; i++) {
      if(i%4==0){
        json = {
          id:i,
          remindName:'逾期提醒'+i,
          startStop:'启用',
          events:'逾期',
          receiver:'审批人/抄送人', 
          remindMode:'邮件/微信/短消息/系统',
          remindType:'用户',            
        };
      }else if(i%4==1){
        json = {
          id:i,
          remindName:'新待办提醒'+i,
          startStop:'启用',
          events:'新待办',
          receiver:'审批人', 
          remindMode:'邮件',
          remindType:'系统',            
        };
      }else if(i%4==2){
        json = {
          id:i,
          remindName:'审批通过提醒'+i,
          startStop:'启用',
          events:'审批通过',
          receiver:'制单人/审批人', 
          remindMode:'短消息',
          remindType:'系统',            
        };
      }else if(i%4==3){
        json = {
          id:i,
          remindName:'驳回提醒'+i,
          startStop:'停用',
          events:'驳回',
          receiver:'制单人/抄送人', 
          remindMode:'系统',
          remindType:'用户',            
        };
      }       
      data.push(json);
    }   

    dispatch(receiveRemind(data))
  }
};

let receiveRemind = (data) => {
  return {
    type: RECEIVE_Remind,
    remind: data,
  };
};

export default function flowReducer(state ={
 remindBack:[], }, action) {
  switch (action.type) {
    
    case RECEIVE_Remind:
      return {
        ...state,
        remindBack:action.remind
        };

    default:
      return state;
  }
}
