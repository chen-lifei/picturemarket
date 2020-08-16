<template>
  <scroll-view class="album_view" scroll-y @scrolltolower="handelToLower">
    <!-- swiper实现轮播图 -->
    <view class="album_swiper">
      <swiper autoplay indicator-dots circular>
        <swiper-item v-for="item in banner" :key="item.id">
          <image :src="item.thumb" />
        </swiper-item>
      </swiper>
    </view>

    <!-- 专辑列表 -->
    <view class="album_list">
      <navigator
        class="albim_item"
        v-for="item in album"
        :key="item.id"
        :url="`/pages/album/index?id=${item.id}`"
      >
        <view class="album_img">
          <image :src="item.cover" mode="aspectFill" lazy-load="true" />
        </view>
        <view class="album_info">
          <view class="album_name">{{ item.name }}</view>
          <view class="album_desc">{{ item.desc }}</view>
          <view class="album_btn">
            <view class="album_attention">+ 关注</view>
          </view>
        </view>
      </navigator>
    </view>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      params: {
        limit: 30,
        order: "new",
        skip: 0
      },
      //轮播图数组
      banner: [],
      //列表数据
      album: [],
      hasMore: true
    };
  },
  mounted() {
    //修改页面的标题
    uni.setNavigationBarTitle({ title: "专辑" });
    this.getList();
  },
  methods: {
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
        data: this.params
      }).then(result => {
        // console.log(result);
        if (this.banner.length === 0) {
          this.banner = result.res.banner;
        }

        if (result.res.album === 0) {
          this.hasMore = false;
          uni.showToast({
            title: "已经到底啦！",
            icon: "none"
          });
          return;
        }

        // this.album = [this.album, ...result.res.album];
        this.album = this.album.concat(result.res.album);
      });
    },
    handelToLower() {
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getList();
      } else {
        uni.showToast({
          title: "已经到底啦！",
          icon: "none"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.album_view {
  height: calc(100vh - 36px);
}
.album_swiper {
  swiper {
    height: calc(750rpx / 2.3);
    image {
      height: 100%;
    }
  }
}

.album_list {
  .albim_item {
    display: flex;
    // flex-direction: row;
    border-bottom: 1px solid #ccc;
    padding: 20rpx 10rpx;
    .album_img {
      flex: 1;
      image {
        width: 200rpx;
        height: 200rpx;
      }
    }

    .album_info {
      padding-left: 10rpx;
      padding-right: 5rpx;
      flex: 2;
      overflow: hidden;
      .album_name {
        font-size: 30rpx;
        font-weight: 600;
      }

      .album_desc {
        font-size: 24rpx;
        font-weight: 400;
        padding-top: 15rpx;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .album_btn {
        display: flex;
        justify-content: flex-end;
        .album_attention {
          border: 5rpx solid $color;
          color: $color;
          font-size: 24rpx;
          padding: 5rpx;
          margin-top: 50rpx;
        }
      }
    }
  }
}
</style>