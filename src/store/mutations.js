import {
  ADD_CART,
  ADD_COUNT
} from './mutations-types'

export default {
  //mutations尽可能只做单一的事情，所以我们要将复杂的代码抽离到action中
  [ADD_CART](state, payload) {
    payload.count = 1;
    payload.checked = true;
    state.cartList.push(payload);
  },
  [ADD_COUNT](state, payload) {//将提取出来的商品的count属性+1
    payload.count++;
  },
}