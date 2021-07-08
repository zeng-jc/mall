import Toast from "./Toast";

const obj = {}

obj.install = function (Vue) {
  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast);

  //2.new的方式，创建一个组件的实例对象
  const toast = new toastConstructor();

  //3.将组件的实例对象挂载到一个元素上
  toast.$mount(document.createElement('div'));

  //4.将组件实例对象，关联的元素，添加到body中
  document.body.appendChild(toast.$el);

  //5.最后将组件的实例对象添加到Vue的原型上，方便全局调用
  Vue.prototype.$toast = toast;
}

export default obj;