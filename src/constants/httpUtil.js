import { Alert } from 'antd';
import ModelMsgBox from 'constants/ModelMsgBox';

const URL = '/api/commonProcessor/commonMethod';
class NetUtil {
  /*
   *  get请求
   *  url:请求地址
   *  data:参数(json对象)
   *  successFun:成功-回调函数
   *  failedFun:失败-回调函数
   * */
  static get(url, params, successFun, failedFun) {
    this.post(url, params, successFun, failedFun);
  }

  /*
   *  post请求
   *  url:请求地址
   *  data:参数(DataCenter对象)
   *  successFun:成功-回调函数
   *  failedFun:失败-回调函数
   * */
  static post(url, params, successFun, failedFun) {
    if (!url || url.length == 0) {
      url = URL;
    }
    //fetch请求
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      body: params.toJson()//JSON.stringify(params)
    })
      .then((res) => {
        if (res.ok) {
          if (successFun) {
            res.json().then((data)=> {
              if (data.header.code == -1) {
                if (failedFun) {
                  failedFun(data);
                } else {
                  let title = data.header.message.title;
                  let detail = data.header.message.detail;
                  ModelMsgBox.ErrorMsg(title, detail);
                  return;
                }
              } else {
                //var dc = new window.DataCenter(data);
                successFun(data);
              }
            });
          } else {
            return res.json();
          }
        } else {
          if (failedFun) {
            res.json().then((data)=> {
              failedFun(data);
            });
          } else {
            //return res.json();
            return Promise.reject({
              status: res.status,
              statusText: res.statusText,
              url: res.url
            });
          }
        }
      })
      .catch(err => {
        let title = err.statusText;
        let detail = err.url;
        ModelMsgBox.ErrorMsg(title, detail);
        return;
      });
  }
}


export default NetUtil;

