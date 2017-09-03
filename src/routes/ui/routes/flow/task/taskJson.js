import React from 'react';
import { Icon,Popconfirm} from 'vdap-ui';

const taskJson = {
  taskData:[{
    key: '1',
    taskId: 'ProcuAdmin',
    taskName: '采购管理员',
    description: '负责和管理采购相关的配置、运营',
    type: '业务',
    creator: '李六环',
    creatTime: '2017-04-01 21:42:26',
    modifier: '',
    modifyTime: ''
  }, {
    key: '2',
    taskId: 'SysAdmin',
    taskName: '系统管理员',
    description: 'OES系统的管理',
    type: '系统',
    creator: '内建',
    creatTime: '2017-03-30 02:12:26',
    modifier: '',
    modifyTime: ''
  }],
  systemData:[{
    key: '1',
    taskId: 'SysAdmin',
    taskName: '系统管理员',
    description: 'OES系统的管理',
    type: '系统',
    creator: '内建',
    creatTime: '2017-03-30 02:12:26',
    modifier: '',
    modifyTime: ''
  }],
  normalData:[{
    key: '1',
    taskId: 'ProcuAdmin',
    taskName: '采购管理员',
    description: '负责和管理采购相关的配置、运营',
    type: '业务',
    creator: '李六环',
    creatTime: '2017-04-01 21:42:26',
    modifier: '',
    modifyTime: ''
  }],
  noData:[{
    key: '1',
    taskId: 'DeviceAdmin',
    taskName: '设备管理员',
    description: '负责和管理设备相关的配置、运营',
    type: '业务',
    creator: '贺函',
    creatTime: '2017-07-01 21:42:26',
    modifier: '',
    modifyTime: ''
  }]
}
export default taskJson;
