const app = getApp();


Page({

    /**
     * 页面的初始数据
     */
    data: {
        host: app.globalData.remoteDomain+'/web10',
        header: '/static/images/header.png',
        userinfo:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {



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
        let openid = wx.getStorageSync('openid')
        // 获取本地存取数据
        let productData = wx.getStorageSync(openid)
        if (!productData) { // 去除tabbar购物车数量
            wx.removeTabBarBadge({
                index: 2
            })
        }
        wx.request({
            url: app.globalData.remoteDomainApi+'getuserinfo.php', // 仅为示例，并非真实的接口地址
            data: {
                id: openid
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success:(res) =>{
                console.log(res.data)
                this.setData({
                    userinfo: res.data.uname,
                    header: '/xyj_bookstore/'+res.data.header
                })
            }
        })
    },

    myinfo() {
        wx.navigateTo({
            url: '../myinfo/myinfo',
        })
    },
    myorder() {
        wx.navigateTo({
            url: '../orderinfo/orderinfo',
        })
    },
    mycomment() {
        wx.navigateTo({
            url: '../mycomment/mycomment',
        })
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