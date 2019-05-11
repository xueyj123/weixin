const app = getApp();



Page({

    /**
     * 页面的初始数据
     */
    data: {
        uname: '',
        tel: '',
        post: '',
        address: '',
        myheader: '',
        tempFilePaths: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    chooselocation() {
        wx.chooseLocation({
            success: (res) => {
                console.log(res)

                // 渲染地址
                this.setData({
                    address: res.address
                })
            },

        })
    },
    getphoto() {
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                // tempFilePath可以作为img标签的src属性显示图片

                const tempFilePaths = res.tempFilePaths
                this.setData({
                    tempFilePaths: tempFilePaths[0]
                })

            }
        })
    },
    formSubmit(e) {
        // 获取数据
        // 姓名
        let uname = e.detail.value.uname

        // 手机号
        let tel = e.detail.value.tel

        // 收货地址
        let address = e.detail.value.address

        // 邮政编码
        let post = e.detail.value.post

        // 头像临时文件地址
        let tempFilePaths = this.data.tempFilePaths
        // console.log(tempFilePaths)

        if (tempFilePaths) {
            wx.uploadFile({
                url: app.globalData.remoteDomainApi + 'upload.php',
                filePath: tempFilePaths,
                name: 'file',
                formData: {
                    uname: uname,
                    tel: tel,
                    address: address,
                    post: post,
                    openid: app.globalData.openId
                },
                success(res) {
                    const data = res.data

                    // 结果提示
                    if (data == 'success') {
                        wx.showToast({
                            title: '注册成功',
                            icon: 'success',
                            duration: 2000,
                            success: (res) => {
                                setTimeout(() => { // 返回上一个页面
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                }, 2000)
                            }
                        })
                    } else {
                        wx.showToast({
                            title: '注册失败',
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
        } else {
            wx.request({
                url: app.globalData.remoteDomainApi + 'upload.php',
                data: {
                    uname: uname,
                    tel: tel,
                    post: post,
                    address: address,
                    openid: app.globalData.openId
                },
                header: {
                    'content-type': 'application/json'
                },
                success: (res) => {
                    const data = res.data

                    // 结果提示
                    if (data == 'success') {
                        wx.showToast({
                            title: '注册成功',
                            icon: 'success',
                            duration: 2000,
                            success: (res) => {
                                setTimeout(() => { // 返回上一个页面
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                }, 2000)
                            }
                        })
                    } else {
                        wx.showToast({
                            title: '注册失败',
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
                },

            })
        }
    },
    formReset() {
        console.log('form发生了reset事件')
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
                        uname: res.data.uname,
                        tel: res.data.tel,
                        post: res.data.post,
                        address: res.data.address,
                        myheader: app.globalData.remoteDomainMy + res.data.header,
                    })
                }
            }
        })
        // wx.getImageInfo({
        //     src: res.tempFilePaths[0],
        //     success: (res) => {
        //         console.log(res.path)
        //         this.setData({
        //             tempFilePaths: res.path
        //         })
        //     }
        // })
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