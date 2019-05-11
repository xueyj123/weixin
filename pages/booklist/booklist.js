const app = getApp();

// pages/booklist/booklist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        style: [],
        myhost: app.globalData.remoteDomainMy,
        activeHealth: '',
        activeYounth: '',
        activePeople: '',
        activeScience: '',
        activeHots: '',
        activeNew: '',
        activeShipping: '',
        active_class: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {


        // 加载loading
        wx.showLoading({
            title: '加载中',
        })
        // this
        const that = this;

        // 是搜索还是查询分类

        // 获取tap
        let tap = options.tap;


        if (options.keywords) { //搜索
            // 根据关键词从服务器拿对应的数据
            wx.request({
                url: app.globalData.remoteDomainApi + 'booklist.php',
                data: {
                    searchKeywords: options.keywords,
                    comlumn: options.action

                },
                header: {
                    'content-type': 'application/json'
                },
                success(res) {
                    // 取消loading
                    wx.hideLoading()
                    // 给模板提供数据
                    that.setData({
                        list: res.data.datas,
                        style: res.data.style
                    })
                }
            })
        } else { //查询
            // 根据tap从服务器拿对应的数据
            wx.request({
                url: app.globalData.remoteDomainApi + 'booklist.php',
                data: {
                    tap: tap,
                },
                header: {
                    'content-type': 'application/json'
                },
                success(res) {
                    console.log(res.data)
                    // 取消loading
                    wx.hideLoading()
                    // 给模板提供数据
                    that.setData({
                        list: res.data.datas,
                        style: res.data.style
                    })
                }
            })
        }


    },

    search(e){
        // console.log(e.currentTarget.dataset.)
        wx.navigateTo({
            url: '../search/search?style=book',
        })
    },
    // 详情页
    godetail(e) {
        // 获取id
        let id = e.currentTarget.id

        // 跳转到详情页
        wx.navigateTo({
            url: '../bookdetail/bookdetail?id=' + id,
        })
    },
    style(e) {
        let id = e.currentTarget.dataset.id
        console.log(id)
        let that = this
        wx.request({
            url: app.globalData.remoteDomainApi + 'booklist.php',
            data: {
                id: id,
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                // 取消loading
                wx.hideLoading()

                // 给模板提供数据
                that.setData({
                    list: res.data.datas,
                    style: res.data.style
                })
            }
        })

        if (id == 'all') {
            that.setData({
                active_class: 'active'

            })
        } else {
            that.setData({
                active_class: ''

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