const app = getApp();

let helper = require('../../utils/helper.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        pid: '',
        setcount: '',
        imgUrls: [],
        interval: 3000,
        duration: 1000,
        myhost: app.globalData.remoteDomainMy,
        datas: {},
        comments: [],
        price: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 获取从列表页传来的id
        let id = options.id;

        // this
        let that = this;

        // 根据id从后端api获取数据
        wx.request({
            url: app.globalData.remoteDomainApi + 'bookdetail.php?id=' + id,
            data: {
                x: '',
                y: ''
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {

                that.setData({
                    datas: res.data,
                    imgUrls: res.data.cover,
                    pid: id,
                    price: res.data.price
                })
            }
        })
        // 根据id从后端api获取数据
        wx.request({
            url: app.globalData.remoteDomainApi + 'getcomment.php',
            data: {
                id: id,
                classify: 'book'
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                console.log(res.data)
                that.setData({
                    comments: res.data
                })
            }
        })
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


    },

    gopay(e) {
        console.log(e);
        // 分类
        const classify = 'book'
        // 产品id
        const pid = this.data.pid
        // 封面地址
        const coverurl = this.data.imgUrls[0].coverurl
        // 价格
        const price = this.data.price



        wx.navigateTo({
            url: '../payone/payone?classify=' + classify + '&pid=' + pid + '&coverurl=' + coverurl + '&price=' + price,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },

    // 查看作品
    viewworks(e) {

        // 获取搜索词
        let keywords = e.currentTarget.id

        // 跳转到图书列表+参数
        wx.navigateTo({
            url: '../booklist/booklist?keywords=' + keywords + '&action=author',
        })

    },


    shopcaradd(e) {

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

                let allDatas_book = allDatas.book

                // 2.2.1它的book项中是否存在当前的产品
                if (allDatas_book.length < 1) { //图书中没有数据
                    let data = [{
                        pid: this.data.pid,
                        count: 1,
                        pdatas: this.data.datas
                    }]
                    let lastData = {
                        book: data,
                        music: allDatas.music,
                        movie: allDatas.movie
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

                    for (let i = 0; i < allDatas_book.length; i++) {

                        // 遍历当前产品id是否等于当前页面加载的产品id
                        if (allDatas_book[i].pid == this.data.pid) { //如果等于代表买过
                            // 当前遍历的项目

                            // 2.2.2如果有则数量+1

                            allDatas_book[i].count++;
                            isExist = true;
                            temparr.push(allDatas_book[i])
                        } else {
                            temparr.push(allDatas_book[i])
                        }

                    }
                    if (!isExist) { //当前产品不在购买的数组中
                        // 当前图书信息
                        // 2.2.3如果没有则直接加入book并数量为1
                        let data = {
                            pid: this.data.pid,
                            count: 1,
                            pdatas: this.data.datas
                        }
                        temparr.push(data)

                    }
                    let lastdata = {
                        book: temparr,
                        music: allDatas.music,
                        movie: allDatas.movie
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
                        book: [{
                            pid: this.data.pid,
                            count: 1,
                            pdatas: this.data.datas
                        }],
                        music: [],
                        movie: [],
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
    gohome() {
        wx.reLaunch({

            url: '../home/home'
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