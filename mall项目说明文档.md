### 一、搭建项目

##### 1.1 项目构建与托管：

vue2移动端商城项目，脚手架版本：vue-cli4。

将项目托管到GitHub，通过git连接本地厂库与远程厂库。

```
git remote add origin https://github.com/zengjiachengcode/mall.git
git push -u origin main
```

##### 1.2 划分源码src的基本目录结构：

```dylan
├─assets
│  ├─css
│  │      base.css 
│  │      normalize.css
│  │      
│  └─img
├─common
├─components
│  ├─common
│  └─content
├─network
├─router
│      index.js
│      
├─store
│      index.js
│      
└─views
    ├─about
    ├─category
    ├─home
    └─profile
```

##### 1.3 设置css文件：

下载normalize.css统一基础样式，并导入到base.css中。

##### 1.4 脚手架4中配置vue.config.js与.editorconfig

由于新版的脚手架`配置路径别名的文件`被隐藏到了node_modules，但是node_modules中的文件一般不修改，所以我们可以创建vue.config.js配置路径别名，该文件在打包时会自动与公共配置合并，代码如下。

```js
module.exports = {
  configureWebpack: {
    resolve: {
      // extensions:[],
      alias: {
        //'@': 'src', 脚手架中已经默认配置，但是此项被隐藏
        'common': '@/common',
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
```

新版的脚手架中也没有.editorconfig文件，.editorconfig是用于对项目源码设置编写规范，比如缩进，结尾换行，字符集等等。所以我们可以直接将脚手架2的.editorconfig文件拿过来使用，对源码进行简单规范。

**注意在dom元素中使用别名必须要在最前面加上 "`~`"**

### 二、搭建底部标签栏：

##### 1.1 设置底部标签栏的基本结构

在components的common文件夹中创建tabbar文件夹（此文件负责封装一个可以公用的tabbar），tabbar中创建TabBar组件将他进行封装并设置插槽，主要负责管理其中的item，我们需要设置一个插槽可以灵活的插入item组件，接下来就是在tabbar中创建TabBarItem组件，此组件组要就是用于管理其中的item选项，在此组件中我们需要设置两个具名插槽，item-icon与item-text，这样我们就可以对tem插入我们想要的图片与文本。

接下来我们就可以将TabBar与TabBarItem一起导入App.vue组件，在App.vue组件中如同套娃一样将每一项item的素材插入TabBarItem中，然后将TabBarItem插入TabBar中，最外层的TabBar组件就直接放入template中展示，底部标签栏的基本样式就已经完成。

但是这样并不好，会使得App.vue非常臃肿，所以我们还需要将标签栏的整体抽离，也就是抽离TabBar这个组件，在content中新建一个mainTabBar文件夹再新建MainTabBar组件，将标签栏TabBar抽离到MainTabBar中。这样在App.vue中我们就只需要导入MainTabBar组件就能展现同样的效果。

##### 1.2 给每个标签栏的item设置对应的路由

通过路由来配置组件与url地址之间的映射关系，点击底部的标签栏item可以链接到对应的组件并展示。路由使用history模式，使用es6的方式【const xx = ()=> import('xx')】对路由进行懒加载。

通过点击item展示对应的组件，所以需要设置点击事件，当然我们不需要直接在MainTabBar中一个个设置，所以我的想法是在TabBarItem中设置点击事件（clickActive），我们需要做的就是在MainTabBar这个父组件中对每个item设置参数path传入给子组件TabBarItem，path的值为点击后组件对应组件的url地址。这样点击不同的item接收的就是不同的path，还可以为后面设置活跃状态的item做铺垫。

##### 1.3 点击标签栏item显示对应的title

先给每个路由设置meta属性，并设置指定title。然后设置导航守卫中的前置守卫【router.beforeEach()】监听跳转，在跳转前会调用前置守卫。守卫代码如下：

```js
router.beforeEach((to, from, next) => {//to将要进入的目标路由对象，from将要离开的路由对象
  document.title = to.matched[0].meta.title;//设置title
  next();//比如调用next()才能进入下一个钩子
})
```

##### 1.4 设置活跃状态的item样式

首先我们可以先思考如何点击后改变活跃状态的图片，于是我给TabBarItem又增加了一个插槽（item-icon-active），同时我也给图片的两个插槽包装了一层div。【这是因为我要给两个图片设置v-if与v-else，直接在插槽上使用v-if与v-else这样并不好，由于插槽最终是会被替换的，这样的设计并不符合逻辑，也会出现bug】

v-if里面的值当然不是在data中写死的，一定是可以由代码来动态决定的。这时我们可以在计算属性中定义一个属性`isActive`，由这段代码来动态设置`this.$route.path.includes(this.path)`v-if的值，`this.$route`表示当前活跃的路由对象，我们可以查看当前活跃的路由对象的path中是否包含当前路径（也就是this.path），在4个tabbar中肯定只有一个item是处于活跃的，所以只有一个会返回true其余的都会返回false。为true就显示活跃状态的图片，false则显示不活跃状态的图片。

图片得到了解决那么文字颜色就比较容易了，我们可以使用v-bind动态绑定class属性，也可以动态绑定style属性，为了简便我动态绑定style属性，设置行内样式。但是这里也要注意在文字外层包裹一个div，在div上绑定:style或:class。

最后一步就是彻底的封装TabBarItem，所以我可以再向外开放一个接口`activeColor`。利用父传子的props，可以让外部插入时动态的决定活跃状态下的字体颜色，同时设置默认传入的参数（颜色）。

封装后代码如下：

```html
<div class="tab-bar-item" @click="clickActive">
  <div v-if="isActive"><slot name="item-icon-active" /></div>
  <div v-else><slot name="item-icon" /></div>
  <div :style="isActive ? { color: activeColor } : ''">
    <slot name="item-text" />
  </div>
</div>
```

### 三、完成首页home：

##### 1.1 封装顶部导航栏NavBar

每个页面都有导航栏，所以导航栏一定是一个公共组件。所以我们在common文件夹中创建tabbar文件夹并创建TabBar组件，使用flex布局我们简单的将导航栏分为三个部分（left，center，right），左右宽度各占12%，并分别在三个部分中设置具名插槽

##### 1.2 设置首页home导航栏

在home中导入NavBar组件，并在center中插入元素，设置好样式。

##### 1.3 axios封装网络请求

首先下载 axios `npm install axios --save`，在network中创建request.js文件封装网络请求。

```js
import axios from 'axios';
export function request(config) {
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/m5",
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
```

封装好网络请求后我们当然不能直接在home组件中写网络请求，所以我们要将各种请求提取出来封装，所以我们在network中创建home.js专门处理home组件的网络请求。

我们在home.js文件中将各种请求封装为函数然后导出，然后在home组件中导入，使用封装好的请求方法就行。这样当我们请求的地址改变时我们只要去home.js中修改。

**home.js封装方法：**

```js
import { request } from './request';

export function getHomeMutildata() {
  return request({
    url: '/home/multidata'
  })
}
```

##### 1.4 封装轮播图组件

##### 1.5 使用轮播图组件

轮播图组件最好不在home组件中使用，否则home组件会非常臃肿，所以我们在home文件夹中创建childComps文件夹用于分离存放home的子组件。这里我们创建homeSwiper组件并导入Swiper与SwiperItem组件。最后在home组件中使用，home中请求过来的图片通过父子之间的通信传递给子组件，显示最终的效果。

##### 1.6 封装轮播图下的组件RecommendView

通过组件之间的通信，父组件将数据请求过来的recommends数据传给子组件，通过v-for将这组数据渲染到元素中，注意cli4中v-for必须要绑定:key。

##### 1.7 封装组件FeatureView组件

这里feature使用一张静态的图片代替，但是为了方便以后更改，我们还是要将他封装成一个子组件，然后导入home父组件中。

##### 1.8 封装TabControl组件

当一个组件需要在多个界面使用，但只是组件中的文字不一样，那么就没必要设置插槽。这里的TabControl组件不设置插槽。

虽然TabControl这个组件在多个页面可以使用，但考虑到TabControl这个组件一般不会应用到其他项目中，所以这个组件我定义在content文件夹中，用tabControl文件夹包裹。

这个组件中只需要自定义文字title，所以我们可以在父组件中定义一个**数组**，来存放tabControl的title，使用这个组件时将文字传给子组件【注意！！子组件我们拿到这个数组肯定是通过v-for来遍历展示，在cli4脚手架中v-for必须添加`:key`,所以数组中必须是一个带有title和id的对象`[{ id: 1, title: "流行" },{...}...`】。

TabControl组件的数据渲染出来了，然后就是需要设置当前活动的item了，我们可以通过点击事件`设置class类名`来改变当前活动的item。首先定义一个数据currentIndex默认值为0，然后以对象形式给class设置`:class="{ active: index === currentIndex }`，当index与currentIndex相等，就返回true，就会给当前item设置active类名，由于currentIndex默认值为0，所以默认第一个处于活跃状态。

后面我们只需要改变currentIndex的值就行，所以我们可以给点击事件传入v-for的index，通过点击将index赋值给currentIndex，这样点击哪个哪个就是处于活跃状态。

##### 1.9 为TabControl的每一个item请求对应的商品并展示

###### 1.9.1 商品的数据结构设计

对于三个不同的item请求到的商品数据是不一致的。后台会将这些数据分为三类，所以我们要设计三个对象(pop，news，sell)来存储对应item的商品数据。

主页goods的数据存储结构：

```js
goods: {
	'pop':{page: 0, list: []},
	'new':{page: 0, list: []},
	'sell':{page: 0, list: []},
}
```

###### 1.9.2 Home主页goods数据处理

在network文件的home.js中定义一个getHomeGoods网络请求方法，通过参数type与page可以请求不同类型和页面的数据。

```js
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
```

将请求的数据存储到对应的对象中：

```js
data() {
 return {
   goods: {
     pop: { page: 0, list: [] },
     new: { page: 0, list: [] },
     sell: { page: 0, list: [] },
   },
 }  
},
created() {
  //对created的代码进行了抽取，抽取到methods中，可以减少代码冗余、提高代码复用率。	
  this.getHomeGoods("pop");
  this.getHomeGoods("new");
  this.getHomeGoods("sell");
},
methods: {
  //通过传入的type动态加载数据
  getHomeGoods(type) {
    const page = this.goods[type].page + 1;
    getHomeGoods(type, page).then((res) => {
      //重复调用加载更多，只需要向对象的属性中塞入数据即可
      this.goods[type].list.push(...res.data.list);
      this.goods[type].page += 1;
    });
  },
}
```

##### 2.0 将数据在组件中展示

goods的商品在其他的页面一样可能出现，所以展示商品的组件是公共的组件且和业务有关系，所以放在content中。

所以我们要创建goods文件夹，再创建GoodsList组件和GoodsListItem组件。GoodsList为大组件负责管理小组件GoodsListItem。在home中就只需要引入GoodList组件，然后给GoodList组件传入goods数据，子组件GoodList通过v-for渲染遍历goods到GoodsListItem中。最后给组件设置flex布局，展示完成。

点击tabControl切换不同款式的商品：

在home中引用GoodList组件传入的参数不能写死，good.x，x为动态的。

所以我们可以对子组件tabControl的点击事件，并在其中设置` this.$emit("tabClick", index);`发出一个时间tabClick，然后在父组中就可以接收到这个事件 `@tabClick="tabClick"`，然后实现tabClick这个方法。这时我们可以定义一个currentType属性，通过传过来的index配合switch修改。

```js
data() {
  return {
    currentType: "pop",
  }
},
computed: {
  showCurGoods() {
    return this.goods[this.currentType].list;
  },
},
methods :{
  tabClick(i) {
  	switch (i) {
  	  case 0:
  	    this.currentType = "pop";
  	    break;
  	  case 1:
  	    this.currentType = "new";
  	    break;
  	  case 2:
  	    this.currentType = "sell";
  	    break;
  	}
  }
}

```

> **复习提示：**
>
> 监听组件的`原生事件`时需必须要要设置修饰符native，比如：` @click.native="click"`。
>
> $refs 与 ref 父组件访问子组件的数据。

##### 2.1 下拉触底加载更多

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

##### 2.2 封装回到顶部的组件 backTop

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
      this.elemt = Fdocument.querySelector(el);
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

##### 2.3 设置backTop的显示与隐藏

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

##### 2.4 保留Home的状态

保留home的状态在tabbar进行切换时，home主页不会销毁，并且home的内容保持原来的位置。

**保留home组件状态 **

- `keep-alive` 标签包裹

**记录home滚动的位置**

- 因为组件不会被销毁，所以我们可以设置一个变量homeY来记录home的位置
  - 首先设置变量homeY，初始值为0
- 再次进来时将位置设置为原来的保存的homeY
  - 在home的监听函数中获取滚动的位置 `this.homeY = e.currentTarget.scrollTop` （scrollTop当前滚动条距离顶部的距离）
  - 设置 `activated` 方法，当前组件进入活跃状态时调用此方法。方法中获取home元素，并设置scrollTop等于homeY



### 四、商品详情页

##### 1.1 点击商品携带id跳转至详情页

首先在views目录下创建详情页面，再给GoodsListItem设置点击事件，点击进行路由跳转。注意跳转时需要使用到动态路由，通过动态路由携带id传给详情页面。

创建details组件，并配置路由：

```js
const Details = () => import('views/details/Details.vue') //导入组件
//配置路由
{
  path: '/details/:id', //动态路由携带id
  component: Details,
  meta: {
    title: '商品详情'
  }
}
```

绑定点击事件：

```js
//绑定点击事件
methods: {
  itemClick() {
  	this.$router.push('details/'+this.goodsItem.iid);
  }
}
```

详情页获取id并保存：

```js
data(){
  id: null
},
//创建时拿到id
created(){
 this.id = this.$route.params.id; //注意！！这里的id需要和路由中 “:id” 匹配
}
```

> bug提示：
>
> 轮播图数据还没有加载完成，就开始切换页面，进行了路由跳转导致轮播图元素没有拿到就会发生**一次报错**。
>
> ```js
> Uncaught TypeError: Cannot read property 'getElementsByClassName' of null
> at VueComponent.handleDom (Swiper.vue?56a2:122)
> at eval (Swiper.vue?56a2:49)
> ```
>
> 因为保留了路由组件的生命周期，所以跳转回来的时候就没有重新进行网络请求，所以只会报错一次



##### 1.2 导航栏封装

创建子目录childComps在其中创建DetailsNavBar.vue组件

```html
<template>
  <nav-bar>
    <div slot="left" class="details-return">
      <img src="~assets/img/navbar/arrow-left.svg" alt="" @click="returnBtn" />
    </div>
    <div slot="center" class="details-title">
      <span
        v-for="(item, index) in detailsTitles"
        :key="item.id"
        @click="titleItemClick(index)"
        :class="{ active: currentTitle == index }"
      >
        {{ item.title }}
      </span>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  name: "DetailsNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      detailsTitles: [
        { title: "商品", id: 1 },
        { title: "参数", id: 2 },
        { title: "评论", id: 3 },
        { title: "推介", id: 4 },
      ],
      currentTitle: 0,
    };
  },
  methods: {
    titleItemClick(i) {
      this.currentTitle = i;
    },
    returnBtn() {
      this.$router.back();
    },
  },
};
</script>

<style>
.details-title {
  display: flex;
  justify-content: space-evenly;
}
.details-return img {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
.active {
  color: var(--color-tint);
}
</style>
```

##### 1.2 轮播图封装与数据请求

```js
import { request } from './request.js'

export function getDetails(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
```

将请求的数据传给轮播图组件

```js
import { getDetails } from "network/details.js";
data() {
  return {
    iid: null,
    topImages: [],
  };
},
created() {
  this.iid = this.$route.params.iid;
  getDetails(this.iid).then((res) => {
    //获取顶部轮播图
    const result = res.result;
    this.topImages = result.itemInfo.topImages;
  });
},
```

##### 1.3 商品基础信息封装与数据展示

由于商品的基础信息较为杂乱所以我们先要处理数据，将杂乱的数据全部放入一个对象中传一次传给子组件`DetailsGoodsInfo.vue`。

在`details.js`中设置`detailsGoods`类并导出。

```js
export class detailsGoods {
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title;
    this.oldPrice = itemInfo.oldPrice;
    this.nowPrice = itemInfo.lowNowPrice;
    this.discountDesc = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
  }
}
```

在`Details.vue`组件中引入，将实例化的对象传给子组件。

```html
<template>
  <div id="details">
    <details-basic-info :basic-info="basicInfo" />
  </div>
</template>

<script>
import DetailsBasicInfo from "./childComps/DetailsBasicInfo.vue";
import { getDetails, detailsGoods } from "network/details.js";
export default {
  name: "Details",
	data() {
	  return {
	    iid: null,
	    topImages: [],
	    basicInfo: {},
	  };
	},
	created() {
	  this.iid = this.$route.params.iid;
	  getDetails(this.iid).then((res) => {
	    const result = res.result;
	    this.topImages = result.itemInfo.topImages;
	    console.log(result);
	    //获取基础商品信息，并整合到一个对象中
	    this.basicInfo = new detailsBasicGoods(
	      result.itemInfo,
	      result.columns,
	      result.shopInfo.services
	    );
	  });
	}
  }
</script>
```

> **总结：当需要传给子组件的数据较多且较为复杂时，我们需要在网络请求的js文件中创建一个构造函数或一个类，导入到对应的组件中，通过new这个构造函数或类，将杂乱的数据整合到一个实例对象中**
>
> **注意：**防止异步请求的数据还没请求过来就开始渲染，所以需要在子组件中设置：**v-if="Object.keys(basicInfo).length"**

##### 1.4 店铺信息的组件封装

与上面一样需要将数据整合到一个对象中再展示

##### 1.5 商品详情信息的组件封装

同上一样，但是不需要整合到一个对象中，因为数据单一。

##### 1.6 商品参数信息的组件封装

需要整合数据到一个对象中

> 防止异步请求的数据还没请求过来就开始渲染，所以需要在子组件中设置：**v-if="Object.keys(itemParams).length !== 0"**
>
> 参数信息使用表格table标签展示，注意事项：
>
> - 表格每行底部边框，只有在 **<td></td>** 中设置有效
> - 消除表格间隙：**border-spacing: 0;** 此样式边框不重合时有效(collapse-spacing:separate;)
> - 设置表格第一列：**table tr td:first-child{}**

##### 1.7 商品评论信息组件的封装

**this.commentInfo = result.rate.list[0]; **获取评论的数据在组件中展示

在 common 目录下的 `utils.js` 中封装日期格式化函数，对时间格式化（时间的展示最好不要使用过滤器，vue3中过滤器已经删除，建议使用计算属性或方法代替）

```js
/**
 * 格式化日期函数 
 */
export function dateFormat(stamp = null, format = "YYYY-MM-DD HH:mm:ss") {
  const date = new Date(stamp);
  const config = {
    YYYY: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds()
  }
  for (const key in config) {
    format = format.replace(key, addZero(config[key]));
  }
  return format;
}

function addZero(date) {
  const strs = date.toString();
  if (strs.length <= 1) return ('00' + date).substr(strs.length);
  return strs;
}
```

##### 1.8 推介数据的展示

先获取推介的数据

```js
export function getRecommend(){
  return require({
    url: 'recommend'
  })
}
```

```js
getRecommend().then((res) => {
  this.recommends = res.data.list;
});
```

然后将获取到的数据传给已经封装好的子组件GoodsList，在GoodsListItem中展示时由于路径不一致需要设置计算属性修改展示的图片

```js
computed: {
  showImg() {
    return this.goodsItem.image || this.goodsItem.show.img;
  },
},
```



##### 1.9抽取回到顶部组件

因为之前的回到顶部组件 `backTop` 是直接放到 common 目录中，然后在 home 中引入，基本样式都是直接在home定制的。

这样并不好，所以我们需要先将 ` backTop`  组件放到项目相关的 content 目录中，在 content 中做基本的样式处理，再导入home组件或当前组件中使用。

###### MainBackTop：

```html
<template>
  <back-top class="back-top" :backTop="mainBackTop">
    <img src="~assets/img/home/arrow.svg" alt="" />
  </back-top>
</template>

<script>
import BackTop from "components/common/backTop/BackTop";
export default {
  name: "MainBackTop",
  props: {
    mainBackTop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    BackTop,
  },
};
</script>

<style>
.back-top {
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 60px;
  right: 8px;
  z-index: 100;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
}
.back-top img {
  height: 40px;
  width: 28px;
  margin: 0 auto;
  display: block;
}
</style>
```

###### 使用MainBackTop并传参：

```js
<main-back-top
  v-show="isShow"
  :main-back-top="{ el: 'XXX', move: XXX }"
/>
```

##### 2.0 点击导航栏滚动到对应的位置（参数，评论，推介）（防抖设置	）

1. 在details.vue中我们需要监听导航栏的点击，并获取到index。

   - 所以当我们点击导航栏时需要发送自定义事件并携带下标 **this.$emit('titleClick',index)** ，然后在父组件`details.vue`中实现自定义事件 **<details-nav-bar class="details-nav-bar" @titleClick="titleClick" />** 。

2. 设置一个变量 `moduleLocation` 用于保存每个模块对应的位置。

3. 获取每个组件的offsetTop，并将他们push到moduleLocation

   - 给组件设置ref，这样就能通过$refs引用组件实例

   - 问题在哪里获取？

     - 不能在created中获取，因为created()是绑定数据data
     - mounted也不行，因为mounted是将实例挂载到dom上，虽然可以拿到元素了，但数据还没渲染到元素上
     - $nextTick也不行，他虽然会根据最新的数据，更新DOM之后立即执行，但是异步图片可能还没渲染完成，获取的offsetTop不准确
     - 所以必须要等图片加载完成后才能正确获取offsetTop

   - 所以我们可以在加载图片的子组件中（DetailsGoodsInfo.vue）添加一个 `load` 事件，监听图片的加载，加载完成就发出一个事件 `this.$emit("imgLoad")` ，这样就可以在 `imgLoad()` 中拿到正确的offsetTop。

   - 但是这样获取 offsetTop 会获取很多次，因为每次图片加载完成就会获取一次 offsetTop。所以我们要对他进行防抖处理

   - 导入防抖函数 `debounce` ，在 created 对防抖函数初始化

     - 设置一个变量 `setDebounce` 保存debounce

     - ```js
       this.setDebounce = debounce(() => {
         this.moduleLocation.push(0);
         //给组件注册引用ref。从$refs中拿到组件实例的引用，然后拿到这些组件关联的元素的offsetTop
         this.moduleLocation.push(this.$refs.params.$el.offsetTop);
         this.moduleLocation.push(this.$refs.comment.$el.offsetTop);
         this.moduleLocation.push(this.$refs.recommend.$el.offsetTop);
         console.log(this.moduleLocation);
       });
       ```

   - 然后在 `imgLoad` 中使用 `this.setDebounce()`

4. 给 `details.vue` 关联的dom元素注册引用(ref='details')，然后在 **titleClick** 方法中设置滚动到的位置

   - ```js
     titleClick(i) {
       this.$refs.details.scrollTo({
     	top: this.moduleLocation[i],
     	behavior: "smooth",
       });
     },
     ```

     

##### 2.1 滚动内容显示对应的标题

```js
 for (let i = 0; i < this.moduleLocation.length - 1; i++) {
   if (
     this.currentIndex != i &&
     //区间范围
     detailsTopY >= this.moduleLocation[i] &&
     detailsTopY < this.moduleLocation[i + 1]//防止越界要在数组最后添加一个最大值（Number.MAX_VALUE）
   ) {
     //将i存储起来，通过判断使得滚动只进入一次
     this.currentIndex = i;
     this.$refs.detailsTitle.currentTitle = this.currentIndex;
     break;
   }
 }
```

##### 2.2 设置底部导航栏 DetailsBottomBar.vue



### 五、添加商品到购物车

##### 1.1 添加商品到购物车分析

由于购物车的数据是共享的，在各个页面能访问到，所以我们需要将购物车数据放入vuex中管理。

##### 1.2 给底部加入购物按钮设置事件

给子组件添加购物车的元素添加一个点击事件，并发出一个事件在父组件中实现。

```html
<!-- 子组件：DetailsBottomBar.vue -->
<template>
  <div @click="addCart" >加入购物车</div>
</template>

<script>
  export default {
    name: 'DetailsBottomBar',
    methods: {
	  addCart() {
	  	this.$emit('addCart');
      }
    }
  }
</script>

<!-- 父组件：Details.vue -->
<template>
  <details-bottom-bar @addCart="arrCart"/>
</template>
<script>
  import DetailsBottomBar from "./childComps/DetailsBottomBar.vue";
  export default {
    name: 'Details',
    method: {
      addCart(){}
    }
  }
</script>
```

##### 1.3 将商品添加到vuex

```js
addCart(){
  //1.获取购物车需要的信息
  const product = {};
  product.img = this.topImages[0];
  product.title = this.basicInfo.title;
  product.nowPrice = this.basicInfo.lowNowPrice;
  product.iid = this.iid;//iid用于区分添加的商品
  //2. 将商品添加到购物车
  this.$store.commit('addGoodsToCart',product);
}
```

vuex代码：

```js
export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addGoodsToCart(state, payload){
      //找到相同的商品
      let oldProduct = state.cartList.find(item => itme.iid === payload.iid);
      //iid相同就将count加1，如果不一样就将添加的商品设置 count 属性并 push 到 cartList
      if(oldProduct){
        oldProduct.count += 1;
      }else {
        payload.count = 1;
        state.cartList.push(payload);
      }
	}
  }
})
```

##### 1.4 重构上面代码

mutations 中尽可能只做单一的事情，也就是 **添加新商品到购物车** 与 **商品数量+1** 是**两件事情**，所以我们要先将代码提交到action中。

之前说过处理异步操作就必须要使用到 actions ，因为这样 devtools 插件 才能跟踪到变化。但是当我们将两件事都用一个方法来实现的化，通过 devtools 就无法观察到底是 添加了新商品 还是 商品数量+1。所以当mutations中的方法有判断逻辑，需要将多个不同的事情写入到同一个方法时也需要使用到 actions 来修改分离。

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    //mutations尽可能只做单一的事情，所以我们要将复杂的代码抽离到action中
    addCart(state, payload) {
      payload.count = 1;
      state.cartList.push(payload);
    },
    cartCount(state, payload) {//将提取出来的商品的count属性+1
      payload.count++;
    }
  },
  actions: {
    addGoodsToCart(context, payload) {
      //1.找到之前数组列表中是否有相同的商品（通过iid判断）
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      //2.判断 oldProduct
      if (oldProduct) {
        context.commit('cartCount', oldProduct);
      } else {
        context.commit('addCart', payload);
      }
    }
  },
  modules: {
  }
})

```

最后再将其中的代码按照vuex的目录结构将各个属性中（state，mutations，actions）的代码抽离出来，并创建 mutations-type.js文件统一mutations中的方法名，在其中声明常量并导出。

##### 1.5 设置购物车导航栏

创建子组件 CartNavBar.vue 导入公共组件 NavBar 设置样式后导入父组件 Cart中展示。

###### 1.5.1 导航栏展示购物车商品种类的数量。

在store目录中创建 getters.js，通过getters获取购物车列表（cartList）的长度。 再导入index.js中

```js
export default {
  //商品购物车商品数量
  cartLength(state) {
    return state.cartList.length;
  },
  //获取购物车列表的商品
  cartList(state) {
    return state.cartList;
  }
}
```

> getters与组件中computed的用法类似，也是基于依赖进行缓存

###### 1.5.2 通过辅助函数 mapGetters 来获取getters中的方法

从vuex中导入辅助函数 mapGetters 可以直接将 store 中的 getter 映射到 computed 中。

```js
import { mapGetters } from 'vuex';
export default {
  name: "CartNavBar",
  components: {
    NavBar,
  },
  computed: {
    //通过展开语法将 getter 映射到 computed中。传入对象可以自定义别民
    ...mapGetters({
      length: 'cartList'
    })
    //...mapGetters([cartList]) 传入数组则不能自定义别名
  }
};
```

##### 1.6 展示购物车列表的商品

首先创建子组件 CartList.vue 并导入vuex中的 getter 映射到 computed 中

```html
<template>
  <ul class="cart-list">
    <cart-list-item v-for="item in cartList" :key="item.iid" :itemInfo="item" />
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  components: {
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>
```

拿到购物车列表的数据后，创建 CartListItem.vue 子组件。通过 v-for 将单个的数据传给子组件，让子组件来展示item。

这里需要注意的是：**CartListItem.vue子组件中，选中商品的按钮设置为一个公共组件在content目录中**。

```html
<template>
  <ul>
    <li :key="itemInfo.iid" class="cart-item">
      <check-btn/>
      <img :src="itemInfo.img" alt="" />
      <div class="cart-item-info">
        <p>{{ itemInfo.title }}</p>
        <p>{{ itemInfo.desc }}</p>
        <p class="cart-item-Uprice">
          <span>{{ itemInfo.nowPrice }}</span>
          <span>x{{ itemInfo.count }}</span>
        </p>
        
      </div>
    </li>
  </ul>
</template>

<script>
import CheckBtn from "components/content/checkBtn/CheckBtn";

export default {
  name: "CartListItem",
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    CheckBtn,
  },
};
</script>
```

##### 1.7 设置选中和不选中

首先分析选中和不选中的状态在什么地方记录。当然不能搞一个属性来记录。我们需要将选择的状态保存在模型中，再交给视图层展示。

这里购物车商品的模型是在 vuex 的 cartList 中，所以我们在添加购物车的时候顺便增加一个 checked 属性，默认为true也就是选中。

```js
[ADD_CART](state, payload) {
  payload.count = 1;
  payload.checked = true;
  state.cartList.push(payload);
},
```

接下来就是在 CartListItem 中拿这个 checked 属性，然后传给按钮组件。

```js
<check-btn @click.native="checkToogle" :isChecked="itemInfo.checked" />
```

按钮组件拿到状态后，我们可以设置一个类名，根据checked的状态来决定是否添加

然后就是给按钮添加点击事件，通过点击切换 checked 的状态。

这里我将点击事件绑定在 CartListItem 引入的 check-btn.vue 组件中 ，所以需要设置native修饰词。

```js
<check-btn @click.native="checkToogle" />
```

> 这里你可能会疑惑，为什么点击修改 checked 的状态，不用通过mutations来提交。因为这里的数据是直接从 getters 中映射的可以直接修改。

##### 1.8 封装底部计算总和的组件（CartBottomBar.vue）

先设置好基本样式，导入按钮组件 `checkBtn` 与 `{mapGetters}`

###### 1.8.1 选中商品合计的总价：

```js
totalPrice() {
  return this.cartList
    .filter((item) => item.checked)
    .reduce((prev, cur) => prev + cur.nowPrice * cur.count, 0)
    .toFixed(2);
},
```

###### 1.8.2 去计算的商品

```js
selectCount() {
  return this.cartList.filter((item) => item.checked).length;
},
```

###### 1.8.3 全选按钮的状态

```js
totalSelect() {
  if(this.cartList.length === 0){
  	return false;
  }
  //return this.cartList.every(item => item.checked) ? true : false;
  //高效方法。some是只要返回true就停止遍历
  return this.cartList.some(item => !item.checked) ? false : true; 
}
```

###### 1.8.4 全选按钮的点击切换

```js
clickChecked() {
  //点击时会切换状态，如果当时全部选中，点击后就是全都不选中
  //如果当时全选按钮状态为true，那么点击切换后状态就是全都补选中false
  if (this.totalSelect) {
    this.cartList.forEach((item) => (item.checked = false));
  } else {
    this.cartList.forEach((item) => (item.checked = true));
  }
},
```

##### 1.9 判断加入购物车是否成功

判断加入购物车是否成功不能直接在添加购物车的方法中(addCart)判断，我们需要在 actions 中返回一个promise。

```js
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
```

然后将 actions 中添加购物车的方法映射到 Details.vue 组件的methods中，然后直接调用映射过来的方法

```js
import { mapActions } from "vuex";
methods: {
  ...mapActions({
    add: "addGoodsToCart" 
  }),
  addCart() {
    //1.获取购物车需要的信息
    const product = {};
    product.img = this.topImages[0];
    product.title = this.basicInfo.title;
    product.nowPrice = this.basicInfo.nowPrice;
    product.desc = this.basicInfo.desc;
    product.iid = this  
    //2. 将商品添加到购物车 （promise，mapActions）
    // this.$store.dispatch("addGoodsToCart", product).then((data) => {
    //   console.log(data);
    // })  
    this.add(product).then((data) => {//映射actions中的方法
      console.log(data);
    });
  } 
}

```

##### 2.0 利用插件的方式封装 toast

首先在toast目录下创建一个 index.js 文件。继续创建一个对象，调用install方法后，并导出

```js
const obj = {};
//此方法在toast插件安装后会自动调用，并且会传入Vue对象
obj.install = function(Vue){}
export default obj;
```

然后将这个文件导入 main.js 中。

```js
import toast from 'components/content/toast' //默认会找到index.js文件
```

安装toast插件

```js
Vue.use(toast); //这里会自动调用toast中的install方法
```

接下来回到index.js文件中，将组件 Toast.vue 导入

```js
import Toast from './Toast';
const obj = {}
obj.install = function(Vue){
  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast);
  //2.通过new的方式，创建组件的实例对象
  const toast = new toastConstructor()
  //3.将组件实例对象挂载到指定的元素中
  toast.$mount(document.createElement('div'));
  //4.将组件添加到body中
  document.body.appendChild(toast);
  //5.最后将组件的实例对象添加到Vue的原型上，方便全局调用
  Vue.prototype.$toast = toast;
}
export default obj
```

##### 2.1 使用toast

添加购物车时使用

```js
this.add(product).then((data) => {//映射actions中的方法
  console.log(data);
});
```

选择商品时使用

```js
clickCalc() {
  if (!this.totalSelect) {//如果返回false说明一个也没选中	
    this.$toast.show("请选择商品");
  }
},
```



### 六、细节补充

##### 1.1 图片懒加载

使用 vue-lazyload 完成图片懒加载

1. 安装：`npm i vue-lazyload --save`
2. main.js中导入：`import VueLazyLoad from "vue-lazyload";`
3. 使用插件：`Vue.use(VueLazyLoad, { loading: require('./assets/img/common/placeholder.png') } );`
4. 需要懒加载的地方替换src：` <img v-lazy="showImg" />`

##### 1.2 px单位转为vw

1. 安装插件：`npm install postcss-px-to-viewport --save-dev`

2. 配置插件

   - 找到 `postcss.config.js` 文件夹，没有则新建

   - ```js
     module.exports = {
       plugins: {
         autoprefixer: {},
         'postcss-px-to-viewport': {
            viewportWidth: 375,   // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
           viewportHeight: 667, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
           unitPrecision: 3,     // 指定`px`转换为视窗单位值的小数位数
           viewportUnit: "vw",   //指定需要转换成的视窗单位，建议使用vw
           selectorBlackList: ['.ignore'],// 指定不转换为视窗单位的类或id，可以自定义，可以无限添加,建议定义一至两个通用的类名
           minPixelValue: 1,     // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
           mediaQuery: false     // 允许在媒体查询中转换`px`
         }
       }
     }
     ```

3. 注意！！

   - `selectorBlackList`指定不转换的类或id。如果想要子元素也不转换，书写样式时必须使用**后代选择器** （比如：`.item span`，如果添加了 `.item`  那么span也会不转换）。
   - 转换无效？？注意只有设置了样式单位为 **px** 的元素才会生效！！

