const app = getApp()


Page({

    /**
     * 页面的初始数据
     */
    data: {
        host: app.globalData.remoteDomain
    },
    scan() {
        wx.scanCode({
            success(res) {
                // 条形码
                let code = res.result

                // 网络请求
                wx.request({
                    url: app.globalData.remoteDomainApi + 'scan.php', // 仅为示例，并非真实的接口地址
                    data: {
                        code: code
                    },
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success(res) {
                        console.log(res.data)
                        // 分类
                        let classify = res.data.classify
                        // pid
                        let pid = res.data.pid

                        if (classify && pid) {
                            switch (classify) {
                                case 'book':
                                    wx.navigateTo({
                                        url: '../bookdetail/bookdetail?id=' + pid,

                                    })
                                    break;
                                case 'music':
                                    wx.navigateTo({
                                        url: '../musicdetail/musicdetail?id=' + pid,

                                    })
                                    break;
                                case 'movie':
                                    wx.navigateTo({
                                        url: '../moviedetail/moviedetail?id=' + pid,

                                    })
                                    break;
                            }
                        } else {
                            wx.showToast({
                                title: '没有此商品',
                                icon: 'none',
                                duration: 2000
                            })
                        }

                    }
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // // 获取用户信息
        // wx.getSetting({
        //     success: res => {
        //         if (res.authSetting['scope.userInfo']) {
        //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //             wx.getUserInfo({
        //                 success: res => {
        //                     // 可以将 res 发送给后台解码出 unionId
        //                     this.globalData.userInfo = res.userInfo

        //                     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //                     // 所以此处加入 callback 以防止这种情况
        //                     if (this.userInfoReadyCallback) {
        //                         this.userInfoReadyCallback(res)
        //                     }
        //                 }
        //             })
        //         }
        //     }
        // })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})