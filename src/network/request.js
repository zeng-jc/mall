import axios from 'axios';

export function request(config) {
  const instance = axios.create({
    baseURL: "",
    timeout: 5000,
    method: 'GET'
  })
  //响应拦截
  instance.interceptors.response.use(result => {
    return result.data;//返回处理后的data
  }, err => {
    console.log(err);
  });
  // 请求拦截
  // instance.interceptors.request.use(config => {

  // }, err => {
  //   console.log(err);
  // });

  return instance(config);
}