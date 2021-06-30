<template>
  <div class="goods-comment" v-if="Object.keys(commentInfo).length !== 0">
    <!-- 评论头部 -->
    <div class="comment-head">
      <span>用户评价</span>
      <span>更多</span>
    </div>
    <!-- 用户信息 -->
    <div class="comment-userinfo">
      <img :src="commentInfo.user.avatar" alt="" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <!-- 评论内容 -->
    <div class="comment-content">
      {{ commentInfo.content }}
    </div>
    <!-- 商品样式与日期 -->
    <div class="goods-style">
      <!-- 过滤传入的时间戳 -->
      <span>{{ commentInfo.created | createDate }}</span>
      {{ commentInfo.style }}
    </div>
    <!-- 评论缩略图 -->
    <div class="comment-img">
      <div v-for="(item, index) in commentInfo.images" :key="index">
        <img :src="item" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "common/utils";
export default {
  name: "DetailsComment",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    createDate(value) {
      if (!value) return "";
      //由于JavaScript在内部使用毫秒，而普通的时间戳通常以秒为单位，所以需要乘以1000
      const date = new Date(value * 1000);
      return dateFormat(date, "YYYY-MM-DD");
    },
  },
};
</script>

<style>
.goods-comment {
  padding: 10px;
}
.comment-head {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #f2f5f8;
}
.comment-userinfo {
  margin: 10px 0;
}
.comment-userinfo img {
  width: 45px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
}
.comment-content {
  font-size: 14px;
  color: #777;
}
.goods-style {
  font-size: 13px;
  color: #999;
  margin: 10px 0;
}

.comment-img {
  display: flex;
  flex-flow: row wrap;
}
.comment-img div {
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin-right: 5px;
}
.comment-img div img {
  width: 100px;
}
</style>