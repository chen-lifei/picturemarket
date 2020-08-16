<template>
  <view class="content">
    <view class="rpx">rpx</view>
    <view class="vm">vm</view>
    <view class="sass">sass</view>
    <view>{{ msg }}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      msg: "哈哈哈哈哈哈"
    };
  },
  onLoad() {
    //1 原生的微信小程序api
    wx.request({
      url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
      //data: {},
      //method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res) {
        // success
        console.log(res);
      }
    });

    //2 uni-api
    uni
      .request({
        url: "http://157.122.54.189:9088/image/v3/homepage/vertical"
      })
      .then(res => {
        console.log(res);
      });
  }
};
</script>

<style lang="scss">
.rpx {
  /* rpx: 小程序中的单位，750rpx = 屏幕的宽度 */
  width: 750rpx;
  height: 200px;
  background: plum;
}
.vm {
  /* vm: h5的单位，100vw = 屏幕的宽度，100vh = 屏幕的高度*/
  width: 100vw;
  height: 100px;
  background-color: powderblue;
}
.content {
  .sass {
    background-color: pink;
    color: $uni-color-error;
  }
}
</style>
