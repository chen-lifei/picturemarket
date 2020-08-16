<template>
  <view class="category_tab">
    <view class="category_tab_title">
      <view class="title_inner">
        <uni-segmented-control
          :current="current"
          :values="items.map(v=>v.title)"
          @clickItem="onClickItem"
          style-type="text"
          active-color="#D4237A"
        ></uni-segmented-control>
      </view>
      <view class="iconfont icon-icon-test"></view>
    </view>
    <scroll-view
      scroll-y
      enable-flex
      class="category_tab_content"
      @scrolltolower="handleScrollToLower"
    >
      <view class="cate_item" v-for="item in vertical" :key="item.id">
        <image :src="item.thumb" mode="widthFix" />
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  data() {
    return {
      items: [
        { title: "最新", order: "new" },
        { title: "热门", order: "hot" }
      ],
      current: 0,
      params: {
        limit: 30,
        skip: 0,
        order: "new"
      },
      id: 0,
      //   获取到的数据
      vertical: [],
      hasMore: true
    };
  },
  onLoad(options) {
    this.id = options.id;
    this.getList();
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      } else {
        //点击了相同的标题
        return;
      }
      this.params.order = this.items[e.currentIndex].order;
      this.params.skip = 0;
      this.vertical = [];
      this.getList();
    },
    getList() {
      this.request({
        url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
        data: this.params
      }).then(result => {
        if (result.res.vertical.length === 0) {
          this.hasMore = false;
          uni.showToast({
            title: "没有数据啦！",
            icon: "none"
          });
          return;
        }
        this.vertical = [...this.vertical, ...result.res.vertical];
      });
    },
    handleScrollToLower() {
      if (this.hasMore) {
        this.params.skip = this.params.limit;
        this.getList();
      } else {
        uni.showToast({
          title: "没有数据啦！",
          icon: "none"
        });
      }
    }
  },
  components: {
    uniSegmentedControl
  }
};
</script>

<style scoped lang="scss">
.category_tab {
  .category_tab_title {
    position: relative;
    .title_inner {
      width: 60%;
      margin: 0 auto;
    }
    .icon-icon-test {
      position: absolute;
      top: 9px;
      right: 5%;
    }
  }
  .category_tab_content {
    display: flex;
    flex-wrap: wrap;
    height: calc(100vh - 36px);
    .cate_item {
      width: 33.33%;
      border: 5rpx solid #fff;
      image {
        width: 100%;
      }
    }
  }
}
</style>