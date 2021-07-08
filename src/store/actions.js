import {
  ADD_CART,
  ADD_COUNT
} from './mutations-types'

export default {
  addGoodsToCart(context, payload) {//context也可以使用结构赋值 {state, commit} 
    //由于 actions 可以包含任何的异步操作，所以这里我们可以返回一个promise
    return new Promise((resolve) => {
      //1.找到之前数组列表中是否有相同的商品（通过iid判断）
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      //2.判断 oldProduct
      if (oldProduct) {
        resolve("购物车商品数量+1");
        context.commit(ADD_COUNT, oldProduct);
      } else {
        resolve("添加到购物车成功");
        context.commit(ADD_CART, payload);
      }
    })
  }
}