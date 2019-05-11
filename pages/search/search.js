const app = getApp()


Page({

    /**
     * 页面的初始数据
     */
    data: {
        style: '',
        list: [],
        myhost: app.globalData.remoteDomainMy
    },

    formSubmit(e) {
        wx.request({
            url: app.globalData.remoteDomainApi + 'search.php',
            data: {
                search: e.detail.value.search,
                style: this.data.style
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: (res) => {
                console.log(res.data)
                this.setData({
                    list: res.data
                })
            }
        })
    },
    formReset() {},
    godetail(e) {
        // 获取id
        let id = e.currentTarget.dataset.id
        let classify = e.currentTarget.dataset.classify

        // 跳转到详情页
        if (classify == 'book') {
            wx.navigateTo({
                url: '../bookdetail/bookdetail?id=' + id,
            })
        }
        if (classify == 'music') {
            wx.navigateTo({
                url: '../musicdetail/musicdetail?id=' + id,
            })
        }
        if (classify == 'movie') {
            wx.navigateTo({
                url: '../moviedetail/moviedetail?id=' + id,
            })
        }


    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options.style)
        if (options.style) {
            this.setData({
                style: options.style
            })
        }

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