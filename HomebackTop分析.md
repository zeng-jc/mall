### Coderwhy老师的移动端购物商城项目。

##### 本次提交的是首页代码，主要是分享一下不使用better-scroll框架是如何完成首页内容。

##### 我不使用better-scroll的首要原因就是懒，还有不想这个项目过于依赖这个框架。

##### 于是我自己完成了：“下拉更多”，“回到顶部” （tbaControll的position:sticky;样式可以保留）。

##### 如果你使用我的写法就可以跳过：165（better-scroll的安装）-178集（tabControll吸顶效果的完成）

##### 我的写法非常的简单，并且兼容性好且没有bug，你可以看到164集后再来看我的写法，如果你js基础较好，那么我的写法一定能为你省下不少的时间。



### 1、下拉触底加载更多

##### 1.1 home绑定滚动监听事件及其样式设置

首先我们需要考虑的是给谁绑定滚动事件，你可能会想直接给根元素或者window添加滚动监听的事件，但是这样是不符合要求的。我们当前编写的是home组件所以肯定是给home添加滚动监听。

但是你添加scroll事件后发现并没有效果，js基础较好的小伙伴应该知道，一个标签（home组件）需要监听他的滚动事件必然是需要有滚动条，所以我们要给home组件设置css样式，我给home设置的是**【overflow:auto; height:100vh】**，我们来解决一个样式bug，就是被navbar与tabber栏遮盖的问题。我给出的解决方案是：

```css
#home{
  height: 100vh;
  overflow: auto;
  /*俗称的怪异盒模型（ie游览器的默认盒子样式）：表示盒子的大小包括border与padding，相反的content-box就不会包括*/
  box-sizing: border-box; 
  border-top: 44px solid transparent;
  border-bottom: 49px solid transparent;
}
```

**box-sizing: border-box; **是为了更好的控制home首页的高度为100vh，如果你不理解为什么要使用**box-sizing: border-box; **你可以先往下看。

对于border的设置你可能也比较疑惑，你可能会觉得可以设置margin或者padding，但这都是不行的。

**我认为一定只能设置border挤压内容区域，因为通过边框可以很好将滚动条控制再两个边框之间。**

**如果使用padding那么滚动条会算上padding的区域，对于用户滑动页面的体验效果非常不好，会有卡顿现象（本人亲自尝试）。如果使用margin这样会将home组件的父元素撑开，home此时的总高度为100vh+上下margin，那么这样会出现两个滚动区域，这就更加不好了。**

**如果你有其他的方法，欢迎联系我，我也想学下你的方法** [cnsd](https://blog.csdn.net/m0_46217225?spm=1011.2124.3001.5343&type=blog)：m0_46217225，[我的QQ：2356924146](http://wpa.qq.com/msgrd?v=3&uin=2356924146&site=qq&menu=yes) 

##### 1.2 完成下拉加载更多

样式部分已经完成，接下来需要完成下拉触底加载更多的功能，首先我们需要先判断什么时候会触底，然后再进行网络请求。

###### 触底判断判断代码：

```js
loadMore(e){
  this.scrollHome = e.currentTarget; 
  //if中的代码为下拉触底的判断公式
  if(
    //滚动条距离顶部的高度+可视区域的高度 >= 可以滚动区域的总高度
    Math.ceil(this.scrollHome.scrollTop + this.scrollHome.clientHeight) >= 
    this.scrollHome.scrollHeight;
  ){
    this.getHomegoods(this.currentType); //网络请求
  }
}
```

###### [判定元素是否滚动到底](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight#判定元素是否滚动到底)

如果元素滚动到底，下面等式返回true，没有则返回false。如下是MDN给出的解释，但是我经过测试实际并不能使用如下代码去作为判断条件（具体原因我也不是很清楚），但是经过我的测试如上的判断条件是一定可以的，具体原因我也讲不清楚，你可以先使用一下，如果你知道为什么希望你可以联系教我： [cnsd](https://blog.csdn.net/m0_46217225?spm=1011.2124.3001.5343&type=blog)：m0_46217225，[我的QQ：2356924146](http://wpa.qq.com/msgrd?v=3&uin=2356924146&site=qq&menu=yes) 。

```js
element.scrollHeight - element.scrollTop === element.clientHeight
```



### 2、 封装回到顶部的组件 backTop

核心是requestAnimationFrame()，这部分如果你不理解这个api， [这里看我文章](https://blog.csdn.net/m0_46217225/article/details/117933815?spm=1001.2014.3001.5501)。

此组件是公共组件可以在任何项目中使用，所以应该放在common目录中

```html
<template>
  <div @click="backTopBtn(backTop.el, backTop.move)">
    <slot />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  data() {
    return {
      //根元素内容的垂直移动距离
      elemt: 0,
    };
  },
  props: {
    backTop: {
      type: Object,
      default() {
        return {
          //需要回到顶部的元素
          el: "#home",
          //每一帧移动的距离
          move: 300,
        };
      },
    },
  },
  methods: {
    backTopBtn(el, move) {
      //1.防止重复点击
      clearTimeout(this.timer);
      cancelAnimationFrame(this.timer);
      this.elemt = document.querySelector(el);
      //3.回调函数
      const fn = () => {
        //4.条件满足递归动画
        if (this.elemt.scrollTop > 0) {
          this.elemt.scrollTop = this.elemt.scrollTop - move;
          requestAnimationFrame(fn) || setTimeout(fn, 1000 / 60);
        } else {
          //5.清除动画
          cancelAnimationFrame(this.timer) || clearTimeout(this.timer);
        }
      };
      //2.开始执行动画
      this.timer = requestAnimationFrame(fn) || setTimeout(fn, 1000 / 60);
    },
  },
};
</script>
```

### 3、设置backTop的显示与隐藏

```html
<template>
  <!-- 回到顶部 -->
  <back-top
    class="back-top"
    :backTop="{ el: '#home', move: 700 }"
    v-show="isShow"
  >
    <img src="~assets/img/home/arrow.svg" alt="" />
  </back-top>
</template>

<script>
  data() {
    return {
      isShow: false;  
    }
  },
  methods:{
    loadMore(e){
      //当然这里也可以使用ref来获取元素
      this.scrollHome = e.currentTarget; 
      //通过监听元素滚动条的位置来决定显示和隐藏
      if (this.scrollHome.scrollTop > 1200) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  }
</script>
```

