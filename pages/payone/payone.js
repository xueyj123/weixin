const app = getApp()
const helper = require('../../utils/helper.js')



Page({

    /**
     * 页面的初始数据
     */
    data: {
        myhost: app.globalData.remoteDomainMy,
        orderuname: '无',
        ordertel: '无',
        orderaddress: '无',
        coverurl: '',
        price: '',
        pid:'',
        classify:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        this.setData({
            classify: options.classify,
            pid: options.pid,
            price: options.price,
            coverurl: options.coverurl,
        })

    },
    getUserInfo() {
        let openid = wx.getStorageSync('openid')
        wx.request({
            url: app.globalData.remoteDomainApi + 'getuserinfo.php',
            data: {
                id: openid,
            },
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                console.log(res.data)
                if (res.data == null) {
                    console.log('请注册后填写地址')
                    wx.showModal({
                        title: '提示',
                        content: '请完善您的个人资料',
                        success: function(res) {
                            if (res.confirm) {
                                wx.navigateTo({
                                    url: '../myinfo/myinfo',

                                })
                            } else {
                                console.log('取消')
                            }
                        },

                    })
                } else { //渲染模板

                    this.setData({
                        orderuname: res.data.uname,
                        ordertel: res.data.tel,
                        orderaddress: res.data.address,
                    })
                }
            }
        })
    },
    submitorder() {
        // 校验收货人
        this.getUserInfo()


        // 读取信息
        let openid = wx.getStorageSync('openid')
        // 执行提交

        if (this.data.ordertel != '无' && this.data.price > 0) { //确保填写了地址和有商品

            wx.request({
                url: app.globalData.remoteDomainApi + 'createorderone.php',
                data: {
                    id: openid,
                    pid:this.data.pid,
                    classify:this.data.classify
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: (res) => {
                    console.log(res.data)
                    if (res.data == 'success') {

                        // 销毁storage
                        wx.removeStorage({
                            key: app.globalData.openId,
                        })

                        wx.reLaunch({
                            url: '../mine/mine',

                        })
                    } else {
                        wx.showToast({
                            title: '提交失败',
                            icon: 'none',
                            duration: 2000,
                            success: (res) => {
                                setTimeout(() => { // 返回上一个页面
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                }, 2000)
                            }
                        })
                    }
                }
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
        this.getUserInfo()
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