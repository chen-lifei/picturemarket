<template>
  <view>
    <!-- 专辑背景 -->
    <view class="album_bg">
      <image :src="album.cover" mode="widthFix" />
      <view class="album_info">
        <view class="album_name">{{ album.name }}</view>
        <view class="album_btn">关注专辑</view>
      </view>
    </view>

    <!-- 专辑作者 -->
    <view class="album_author">
      <view class="album_author_info">
        <image mode="widthFix" :src="album.user.avatar" />
        <view class="author_name">{{ album.user.name }}</view>
      </view>
      <view class="album_author_desc">
        <!-- text 可以识别换行符 -->
        <text>{{ album.desc }}</text>
      </view>
    </view>

    <!-- 列表 -->
    <view class="album_list">
      <view class="album_item" v-for="(item, index) in wallpaper" :key="item.id">
        <go-detail :list="wallpaper" :index="index">
          <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>', 360)" />
        </go-detail>
      </view>
    </view>
  </view>
</template>

<script>
import goDetail from "@/components/goDetail";
export default {
  components: {
    goDetail
  },
  data() {
    return {
      params: {
        limit: 30,
        order: "new",
        skip: 0,
        //first=0表示不是第一次请求数据，返回值中只有wallpaper
        //first=1表示是第一次请求数据，返回值中还有album
        first: 1
      },
      id: -1,
      album: {},
      wallpaper: [],
      hasMore: true
    };
  },
  onLoad(options) {
    this.id = options.id;
    // this.id = "5d5f8e45e7bce75ae7fb8278";
    this.getList();
  },
  //页面触底 上拉加载下一页
  onReachBottom() {
    if (this.hasMore) {
      this.params.first = 0;
      this.params.skip = this.params.limit;
      this.getList();
    } else {
      uni.showToast({
        title: "已经到底啦！",
        icon: "none"
      });
    }
  },
  methods: {
    getList() {
      this.request({
        url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
        data: this.params
      }).then(result => {
        //console.log(result);
        if (Object.keys(this.album).length === 0) {
          this.album = result.res.album;
        }

        if (result.res.wallpaper.length === 0) {
          this.hasMore = false;
          uni.showToast({
            title: "已经到底啦！",
            icon: "none"
          });
          return;
        }

        this.wallpaper = [...this.wallpaper, ...result.res.wallpaper];
      });
    }
  }
};
</script>

<style scoped lang="scss">
.album_bg {
  position: relative;
  .album_info {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    height: 80rpx;
    align-items: center;
    color: #fff;
    padding: 0 15rpx;
    .album_name {
      font-size: 36rpx;
      text-shadow: #ccc 0.5rpx 0 0, #ccc 0 0.5rpx 0, #ccc -0.5rpx 0 0,
        #ccc 0 -0.5rpx 0;
    }

    .album_btn {
      background-color: $color;
      width: 152rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10rpx;
      font-size: 30rpx;
    }
  }
}

.album_author {
  padding: 10rpx;
  .album_author_info {
    padding: 15rpx 0;
    display: flex;
    image {
      width: 50rpx;
    }

    .author_name {
      color: #000;
      margin-left: 15rpx;
      line-height: 25px;
    }
  }
  .album_author_desc {
    padding: 10rpx 0;
    color: #4d4d4d;
  }
}

.album_list {
  display: flex;
  flex-wrap: wrap;
  padding-top: 20rpx;
  .album_item {
    width: 33.33%;
    border: 3rpx solid #fff;
    image {
      height: 160rpx;
    }
  }
}
</style>