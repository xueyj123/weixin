const app = getApp()
const helper = require('../../utils/helper.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        myhost: app.globalData.remoteDomainMy,
        bookDatas: [],
        movieDatas: [],
        musicDatas: [],
        result: '',
        totalprice: ''
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

        // 获取本地存取数据
        let openid = wx.getStorageSync('openid')

        let storageDatas = wx.getStorageSync(openid)
        console.log(storageDatas)
        if (storageDatas) {
            let bookArr = storageDatas.book
            let musicArr = storageDatas.music
            let movieArr = storageDatas.movie
            // 统计总价
            let totalprice = helper.totalprice(storageDatas)
            // 获取购买总数量
            let totalcount = helper.getcount(storageDatas)
            console.log(totalcount)
            if (totalcount>0) {
                wx.setTabBarBadge({
                    index: 2,
                    text: totalcount.toString()
                })}
            this.setData({
                result: '',
                bookDatas: bookArr,
                movieDatas: movieArr,
                musicDatas: musicArr,
                totalprice: totalprice,
            })
        } else {

            this.setData({
                result: '暂无数据'
            })
        }
        // if (storageDatas.book.length < 0 && storageDatas.music.length < 0 && storageDatas.movie.length < 0){
        //     console.log(1212)
        //     wx.removeTabBarBadge({
        //         index: 2
        //     })
        // }
        // if (!storageDatas.book.length ) {
        //     wx.removeTabBarBadge({
        //         index: 2
        //     })
           
        // }else{
        //     console.log(2121)
        // }




    },
    add(e) {
        helper.addsubdel(e, app.globalData.openId, this, 'add')

    },
    sub(e) {
        helper.addsubdel(e, app.globalData.openId, this, 'sub')

    },
    del(e) {
        wx.showModal({
            title: '提示',
            content: '确定要删除吗',
            showCancel: true,
            success: (res) => {
                if (res.confirm) {
                    // console.log('确定')
                    helper.addsubdel(e, app.globalData.openId, this, 'del')
                } else {
                    // console.log('取消')
                }
            },
        })
    },
    gopay() {
        wx.navigateTo({
            url: '../pay/pay',

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