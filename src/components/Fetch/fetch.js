/**
 *
 * Created by hanrui on 2016/3/10.
 */
import {message} from 'antd'
function _fetch(url, props = {}) {
  if ('headers' in props) {
  } else {
    props.headers = {}
  }
  props.headers["Content-Type"] = 'application/json';
  return fetch(url, props).catch(
    (e)=>message.error('网络请求出现错误，请联系系统管理员协调解决，错误为' + e)
  ).then(
    response=> {
      switch (response.status) {
        case (403 || 401):
          message.error('未登陆或身份认证已过期，即将跳转到登陆界面');
          setTimeout(function () {
            window.location.href = '/login'
          }, 3000);
          break;
        default:
          return response
      }
    }
  )
};
export default _fetch
