<template>
  <view>
    <view class="home_tab">
      <view class="home_tab_title">
        <view class="title_inner">
          <uni-segmented-control
            :current="current"
            :values="items.map(v=>v.title)"
            @clickItem="onClickItem"
            style-type="text"
            active-color="#ccc"
          ></uni-segmented-control>
        </view>
        <view class="iconfont icon-icon-test"></view>
      </view>
      <view class="home_tab_content">
        <view v-if="current === 0">
          <home-recommend></home-recommend>
        </view>
        <view v-if="current === 1">
          <home-category></home-category>
        </view>
        <view v-if="current === 2">
          <home-new></home-new>
        </view>
        <view v-if="current === 3">
          <home-album></home-album>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { homeAlbum } from "./home-album";
import { homeCategory } from "./home-category";
import { homeNew } from "./home-new";
import { homeRecommend } from "./home-recommend";
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  data() {
    return {
      items: [
        { title: "推荐" },
        { title: "分类" },
        { title: "最新" },
        { title: "专辑" },
      ],
      current: 0,
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
  },
  components: {
    homeAlbum,
    homeCategory,
    homeNew,
    homeRecommend,
    uniSegmentedControl,
  },
};
</script>
    
<style scoped lang="scss">
.home_tab {
  .home_tab_title {
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
}
</style>