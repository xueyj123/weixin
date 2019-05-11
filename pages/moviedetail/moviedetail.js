const app = getApp();
const helper = require('../../utils/helper.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pid: 0,
        datas: {},
        myhost: app.globalData.remoteDomainMy,
        setcount:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const that = this
        const id = options.id
        let storageDatas = wx.getStorageSync(app.globalData.openId)
        if (storageDatas) {
            let count = helper.getcount(storageDatas)
            this.setData({
                setcount: count
            })
            wx.setTabBarBadge({
                index: 2,
                text: count.toString()
            })
        }
        // 国家数据
        wx.request({
            url: app.globalData.remoteDomainApi + 'moviedetail.php',
            data: {
                id: id
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                that.setData({
                    datas: res.data,
                    pid: id
                })

            }
        })

    },
    gohome() {
        wx.switchTab({
            url: '../home/home'
        })
    },
    shopcaradd() {

        // 1.显示购物状态
        wx.showToast({
            title: '成功加入购物车',
            icon: 'success',
            duration: 2000,
        })
        // 2.把产品写入到storage中（购买）
        // 2.1在storage中是否存在该ipenid
        wx.getStorage({
            key: app.globalData.openId,
            success: (res) => { // 2.2如果在storage存在该ipenid


                // 当前storage中该openid的所有数据
                let allDatas = res.data

                let allDatas_movie = allDatas.movie

                // 2.2.1它的movie项中是否存在当前的产品
                if (allDatas_movie.length < 1) { //图书中没有数据
                    let data = [{
                        pid: this.data.pid,
                        count: 1,
                        pdatas: this.data.datas
                    }]
                    let lastData = {
                        movie: data,
                        music: allDatas.music,
                        book: allDatas.book
                    }

                    // 存入storage
                    wx.setStorage({
                        key: app.globalData.openId,
                        data: lastData,
                        success: (res) => {
                            //    获取总数
                            let count = helper.getcount(lastData)

                            // 更新模板数据
                            this.setData({
                                setcount: count
                            })
                        }

                    })
                } else { //有数据

                    // 定义一个临时新数组，用于存放最新的数据
                    let temparr = []

                    // 定义一个状态（当前产品是否已经在购买的数组中）
                    let isExist = false

                    for (let i = 0; i < allDatas_movie.length; i++) {

                        // 遍历当前产品id是否等于当前页面加载的产品id
                        if (allDatas_movie[i].pid == this.data.pid) { //如果等于代表买过
                            // 当前遍历的项目

                            // 2.2.2如果有则数量+1

                            allDatas_movie[i].count++;
                            isExist = true;
                            temparr.push(allDatas_movie[i])
                        } else {
                            temparr.push(allDatas_movie[i])
                        }

                    }
                    if (!isExist) { //当前产品不在购买的数组中
                        // 当前图书信息
                        // 2.2.3如果没有则直接加入movie并数量为1
                        let data = {
                            pid: this.data.pid,
                            count: 1,
                            pdatas: this.data.datas
                        }
                        temparr.push(data)

                    }
                    let lastdata = {
                        movie: temparr,
                        music: allDatas.music,
                        book: allDatas.book
                    }
                    wx.setStorage({
                        key: app.globalData.openId,
                        data: lastdata,
                        success: (res) => {
                            let totalcount = helper.getcount(lastdata)
                            this.setData({
                                setcount: totalcount
                            })
                        }

                    })

                }
            },
            fail: (res) => { // 2.3如果storage不存在该openid,创建storage,并存入当前产品信息{pid,count,pdatas}
                wx.setStorage({
                    key: app.globalData.openId,
                    data: {
                        movie: [{
                            pid: this.data.pid,
                            count: 1,
                            pdatas: this.data.datas
                        }],
                        music: [],
                        book: [],
                    },
                    success: (res) => {
                        // 每次成功设置storage后，重新统计购买数量
                        // 第一次创建storage时，数量总是1
                        let count = 1;

                        // 更新模板数据
                        this.setData({
                            setcount: count
                        })

                    }

                })
            }
        })
    },
    goshopcar() {
        wx.reLaunch({

            url: '../shopcar/shopcar'
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