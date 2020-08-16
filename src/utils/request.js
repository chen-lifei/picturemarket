export default (params) => {
    //加载中
    uni.showLoading({
        title: "Loading"
    })

    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            success: function (res) {
                // success
                resolve(res.data);
            },
            fail: function (err) {
                // fail
                reject(err)
            },
            complete: function () {
                // complete
                uni.hideLoading();
            }
        })
    })
}