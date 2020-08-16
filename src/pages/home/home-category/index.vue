<template>
  <scroll-view class="home_category" scroll-y>
    <view class="home_nav">
      <navigator
        class="cate_item"
        v-for="item in category"
        :key="item.id"
        :url="`/pages/imgCategory/index?id=${item.id}`"
      >
        <image :src="item.cover" mode="aspectFill" />
        <view class="cate_name">{{ item.name }}</view>
      </navigator>
    </view>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      category: []
    };
  },
  mounted() {
    uni.setNavigationBarTitle({ title: "分类" });
    this.getList();
  },
  methods: {
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v1/vertical/category"
      }).then(result => {
        console.log(result);
        this.category = result.res.category;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home_category {
  height: calc(100vh - 36px);
}
.home_nav {
  display: flex;
  flex-wrap: wrap;

  .cate_item {
    width: 33.33%;
    border: 5rpx solid #fff;
    position: relative;
    image {
      height: 240rpx;
    }

    .cate_name {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 90%;
      height: 50rpx;
      color: #fff;
      // css3渐变
      background-image: linear-gradient(
        to right top,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      );
      font-size: 36rpx;
      padding-left: 20rpx;
      display: flex;
      align-items: center;
    }
  }
}
</style>