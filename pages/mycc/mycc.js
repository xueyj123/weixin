const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        pname: {},
        content: '',
        stars: [],
        pid: '',
        classify: '',
        starnum: 5,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        let classify = options.classify
        let pid = options.pid
        let action = options.action
        let num = options.num
        let notes = options.notes

        // 网络请求，获取产品名称
        wx.request({
            url: app.globalData.remoteDomainApi + 'getpname.php',
            data: {
                classify: classify,
                pid: pid
            },
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                this.setData({
                    pname: res.data
                })

            }
        })


        // 星星
        let tempArr = []

        if (!num) {
            for (let i = 1; i < 6; i++) {
                let starUrl = {
                    starurl: '../../static/icon/star.png',
                    id: i
                }
                tempArr.push(starUrl)
            }
        } else {
            let starNum = num
            // 重置星星
            for (let i = 1; i < 6; i++) {

                // 红星
                let redstar = '../../static/icon/star.png'

                // 灰星
                let graystar = '../../static/icon/star-gray.png'
                if (i > starNum) {

                    tempArr.push({
                        starurl: graystar,
                        id: i
                    })
                } else {
                    tempArr.push({
                        starurl: redstar,
                        id: i
                    })
                }
                console.log(tempArr)

            }
        }
        if (notes) {
            this.setData({
                stars: tempArr,
                classify: classify,
                pid: pid,
                content: notes,
                action: action,

            })
        } else {
            this.setData({
                stars: tempArr,
                classify: classify,
                pid: pid,
                action: action,
            })
        }

    },
    selectStar(e) {

        let tempArr = []
        let starNum = e.target.id

        // 重置星星
        for (let i = 1; i < 6; i++) {

            // 红星
            let redstar = '../../static/icon/star.png'

            // 灰星
            let graystar = '../../static/icon/star-gray.png'
            if (i > starNum) {

                tempArr.push({
                    starurl: graystar,
                    id: i
                })
            } else {
                tempArr.push({
                    starurl: redstar,
                    id: i
                })
            }


        }
        this.setData({
            stars: tempArr,
            starnum: starNum
        })
    },
    formSubmit(e) {
        console.log(e.detail.value)

        console.log(e)
        // 分类
        let classify = this.data.classify

        // 产品id
        let pid = this.data.pid
        // openid
        let openid = app.globalData.openId
        // 星星数
        let starnums = this.data.starnum
        // 评论内容
        let content = e.detail.value.content
        console.log(classify, pid, openid, starnums, content, this.data.action)

        wx.request({
            url: app.globalData.remoteDomainApi + 'comment.php', // 仅为示例，并非真实的接口地址
            data: {
                action: this.data.action,
                classify: classify,
                pid: pid,
                openid: openid,
                starnums: starnums,
                content: content
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            complete: (res) => {
                console.log(res.data)
                if (res.data == 'success') {
                    wx.showToast({
                        title: '发表成功',
                        icon: 'success',
                        duration: 2000,
                        success() {
                            setTimeout(() => {
                                wx.navigateBack({
                                    delta: 1,
                                })
                            }, 2000)
                        }
                    })
                } else {
                    wx.showToast({
                        title: '发表失败',
                        icon: 'none',
                        duration: 2000
                    })
                }
            }
        })
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