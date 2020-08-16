<template>
  <scroll-view
    class="recommend_view"
    scroll-y
    v-if="recommends.length>0"
    @scrolltolower="handleToLower"
  >
    <!-- 推荐 -->
    <view class="recommend_wrap">
      <navigator
        class="recommend_item"
        v-for="item in recommends"
        :key="item.id"
        :url="`/pages/album/index?id=${item.target}`"
      >
        <image mode="widthFix" :src="item.thumb" />
      </navigator>
    </view>

    <!-- 月份 -->
    <view class="months_warp">
      <view class="months_title">
        <view class="months_title_info">
          <view class="months_date">
            <text>{{ months.DD }}/</text>
            {{ months.MM }}月
          </view>
          <view class="months_text">{{ months.title }}</view>
        </view>
        <view class="months_title_more">更多 ></view>
      </view>
      <view class="months_content">
        <view class="months_item" v-for="(item, index) in months.items" :key="item.id">
          <go-detail :list="months.item" :index="index">
            <image mode="aspectFill" :src="item.thumb + item.rule.replace('$<Height>', 360)" />
          </go-detail>
        </view>
      </view>
    </view>

    <!-- 热门 -->
    <view class="hots_wrap">
      <view class="hots_title">
        <text>热门</text>
      </view>
      <view class="hots_content">
        <view class="hots_item" v-for="(item, index) in hots" :key="item.id">
          <go-detail :list="hots" :index="index">
            <image :src="item.thumb" mode="widthFix" />
          </go-detail>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import moment from "moment";
import goDetail from "@/components/goDetail";
export default {
  components: {
    goDetail
  },
  data() {
    return {
      recommends: [],
      months: [],
      hots: [],
      //请求的参数
      params: {
        //获取数据条数
        limit: 30,
        //关键字
        order: "hot",
        //要跳过几条
        skip: 0
      },
      //是否还有下一页数据
      hasMore: true
    };
  },
  mounted() {
    uni.setNavigationBarTitle({ title: "图片集市" });
    this.getList();
  },
  methods: {
    //获取接口的数据
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
        data: this.params
      }).then(result => {
        console.log(result);

        //判断还有没有下一页数据
        if (result.res.vertical.length === 0) {
          this.hasMore = false;
          uni.showToast({
            title: "已经到底啦！",
            icon: "none"
          });
          return;
        }

        if (this.recommends.length === 0) {
          //推荐模块
          this.recommends = result.res.homepage[1].items;
          //月份
          this.months = result.res.homepage[2];
          //将时间戳格式化：moment.js
          this.months.MM = moment(this.months.stime).format("MM");
          this.months.DD = moment(this.months.stime).format("DD");
        }
        //获取热门数据的列表
        //数组拼接 es6
        this.hots = [...this.hots, ...result.res.vertical];
        //this.hots = this.hots.concat(result.res.vertical);
      });
    },
    handleToLower() {
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
.recommend_view {
  //高度 = 屏幕的高度 - 头部标题的高度
  height: calc(100vh - 36px);
}
.recommend_wrap {
  display: flex;
  flex-wrap: wrap;
  .recommend_item {
    width: 50%;
    border: 5rpx solid #fff;
  }
}
.months_warp {
  .months_title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    .months_title_info {
      color: $color;
      font-size: 30rpx;
      font-weight: 600;
      display: flex;
      .months_date {
        text {
          font-size: 36rpx;
        }
      }

      .months_text {
        font-size: 34rpx;
        color: #666;
        margin-left: 30rpx;
      }
    }

    .months_title_more {
      font-size: 24rpx;
      color: $color;
      margin: auto 0;
    }
  }

  .months_content {
    display: flex;
    flex-wrap: wrap;
    .months_item {
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}
.hots_wrap {
  .hots_title {
    padding: 20rpx;
    text {
      border-left: 10rpx solid $color;
      font-size: 30rpx;
      font-weight: 600;
      padding-left: 10rpx;
    }
  }

  .hots_content {
    display: flex;
    flex-wrap: wrap;
    .hots_item {
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}
</style>