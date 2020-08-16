<template>
  <scroll-view scroll-y enable-flex class="video_view" @scrolltolower="handleScrollToLower">
    <view class="video_item" v-for="item in list" :key="item.id" @click="handleGoVideo(item)">
      <image :src="item.img" mode="widthFix" />
    </view>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      hasMore: true
    };
  },
  props: {
    urlobj: Object
  },
  watch: {
    urlobj() {
      this.list = [];
      this.getList();
    }
  },
  mounted() {
    // console.log(this.urlobj);
    this.getList();
  },
  methods: {
    getList() {
      this.request({
        url: this.urlobj.url,
        data: this.urlobj.params
      }).then(result => {
        // console.log(result);
        if (result.res.videowp.length === 0) {
          this.hasMore = false;
          uni.showToast({
            title: "没有数据啦！",
            icon: "none"
          });
          return;
        }
        this.list = [...this.list, ...result.res.videowp];
      });
    },
    handleScrollToLower() {
      if (this.hasMore) {
        this.urlobj.params.skip += this.urlobj.params.limit;
        this.getList();
      } else {
        uni.showToast({
          title: "没有数据啦！",
          icon: "none"
        });
      }
    },
    handleGoVideo(item) {
      // 将数据存储带全局共享中
      getApp().globalData.video = item;
      // 页面跳转
      uni.navigateTo({
        url: "/pages/videoPlay/index"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.video_view {
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 36px);
  .video_item {
    width: 33.33%;
    border: 5rpx solid #fff;
  }
}
</style>