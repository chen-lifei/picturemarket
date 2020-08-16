<template>
  <view class="video_play">
    <!-- 背景 -->
    <image :src="videoObj.img" />
    <!-- 工具栏 -->
    <view class="video_tool">
      <view
        @click="handleMuted"
        :class="['iconfont', muted ? 'icon-icon-test4' : 'icon-icon-test5']"
      ></view>
      <view class="iconfont icon-icon-test6">
        <button open-type="share"></button>
      </view>
    </view>

    <!-- 视频 -->
    <view class="video_wrap">
      <video :src="videoObj.video" objectFit="fill" :muted="muted"></video>
    </view>

    <!-- 下载 -->
    <view class="download">
      <view class="download_btn" @click="handleDownload">下载视频</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      videoObj: {},
      //   是否静音
      muted: false
    };
  },
  onLoad() {
    this.videoObj = getApp().globalData.video;
  },
  methods: {
    handleMuted() {
      this.muted = !this.muted;
    },
    async handleDownload() {
      await uni.showLoading({ title: "下载中" });
      // 将远程文件下载到小程序内存中
      const { tempFilePath } = (
        await uni.downloadFile({ url: this.videoObj.video })
      )[1];
      await uni.saveVideoToPhotosAlbum({
        filePath: tempFilePath
      });

      uni.hideLoading();

      await uni.showToast({ title: "下载成功！" });
    }
  }
};
</script>

<style scoped lang="scss">
.video_play {
  position: relative;
  image {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    filter: blur(15px);
  }

  .video_tool {
    height: 80rpx;
    display: flex;
    justify-content: flex-end;
    .iconfont {
      width: 80rpx;
      color: #fff;
      font-size: 50rpx;
      border-radius: 40rpx;
      background-color: rgba(0, 0, 0, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20rpx;
    }
    .icon-icon-test6 {
      position: relative;
      button {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }

  .video_wrap {
    display: flex;
    justify-content: center;
    video {
      width: 450rpx;
      height: 800rpx;
    }
  }

  .download {
    display: flex;
    justify-content: center;
    margin-top: 30rpx;
    .download_btn {
      width: 450rpx;
      height: 80rpx;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 40rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      border: 2rpx solid #fff;
    }
  }
}
</style>