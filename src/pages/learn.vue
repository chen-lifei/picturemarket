<template>
  <view @touchstart="handleTouchStrat" @touchend="handleTouchEnd">触屏事件</view>
</template>

<script>
export default {
  data() {
    return {
      //按下的时间
      startTime: 0,
      //坐标
      startX: 0,
      startY: 0
    };
  },
  methods: {
    //用户按下屏幕
    handleTouchStrat(event) {
      // console.log("come in");
      // console.log(event.changedTouches[0].clientX);
      // console.log(event.changedTouches[0].clientY);

      this.startTime = Date.now();
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientY;
    },
    handleTouchEnd(event) {
      // console.log("leave out");
      // console.log(event.changedTouches[0].clientX);
      // console.log(event.changedTouches[0].clientY);

      const endTime = Date.now();
      const endX = event.changedTouches[0].clientX;
      const endY = event.changedTouches[0].clientY;

      //判断时长
      if (endTime - this.startTime > 2000) {
        return;
      }

      // 滑动的方向
      let direction = "";

      //判断滑动的距离，合法后判断滑动的方向
      if (Math.abs(endX - this.startX) > 10) {
        direction = endX - this.startX > 0 ? "right" : "left";
      } else {
        return;
      }

      console.log(direction);
    }
  }
};
</script>

<style>
view {
  width: 100%;
  height: 500rpx;
  background-color: plum;
}
</style>