// pages/home/home.js
const app = getApp();
const helper = require('../../utils/helper.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: ['../../static/images/loading.gif'],
        interval: 3000,
        duration: 1000,
        idloading: false,
        newsinfo: ['这是快讯', '还有一些内容', '继续增加'],
        host: app.globalData.remoteDomain,
        myhost: app.globalData.remoteDomainMy,
        bookTop3: [],
        newbook: [],
        newmovie: [],
        starbook: {},
        starmusic: {},
        starmovie: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const that = this;


        // 网络请求
        wx.request({
            url: app.globalData.remoteDomainApi + 'homeswiperlist.php',
            // url: 'http://192.168.1.116:8080/CharityProject/TestServlet',
            // data: {
            //     username: 'xueyujie',
            //     password: 123456
            // },
            success(res) {
                // 接收数据，渲染模板
                // console.log(res)
                that.setData({
                    imgUrls: res.data,
                    isloading: true
                })

            }
        })


    },
    onShow() {

        // 显示tabbar购物车的数量
        let openid = wx.getStorageSync('openid')

        // 根据openid获取产品
        let storageData = wx.getStorageSync(openid)

        if (storageData) {
            // 获取购买总数量
            let totalcount = helper.getcount(storageData)
            if (totalcount > 0) {
                wx.setTabBarBadge({
                    index: 2,
                    text: totalcount.toString()
                })
            }

        }



        //////////////////////////////////////////////////
        // 畅销书top3
        // 网络请求
        wx.request({
            url: app.globalData.remoteDomainApi + 'booksaletop3.php',
            success: (res) => {
                // 接收数据，渲染模板
                this.setData({
                    bookTop3: res.data,
                })

            }
        })
        //////////////////////////////////////////////////
        // 新书+特价包邮
        // 网络请求
        wx.request({
            url: app.globalData.remoteDomainApi + 'newbook.php',
            success: (res) => {
                // 接收数据，渲染模板
                this.setData({
                    newbook: res.data,
                })

            }
        })
        //////////////////////////////////////////////////
        // 五星排行榜
        // 网络请求
        wx.request({
            url: app.globalData.remoteDomainApi + 'star5.php',
            success: (res) => {
                // 接收数据，渲染模板
                if (res.data.book) {
                    this.setData({
                        starbook: res.data.book,
                    })
                }
                if (res.data.music) {
                    this.setData({
                        starmusic: res.data.music,
                    })
                }
                if (res.data.movie) {
                    this.setData({
                        starmovie: res.data.movie
                    })
                }



            }
        })

        //////////////////////////////////////////////////
        // 音乐top6
        // 网络请求
        wx.request({
            url: app.globalData.remoteDomainApi + 'musictop6.php',
            success: (res) => {
                // 接收数据，渲染模板
                this.setData({
                    newmusic: res.data
                })

            }
        })
        //////////////////////////////////////////////////
        // 电影top6
        // 网络请求
        wx.request({
            url: app.globalData.remoteDomainApi + 'movietop6.php',
            success: (res) => {
                // 接收数据，渲染模板
                this.setData({
                    newmovie: res.data
                })

            }
        })

    },
    search(e) {
        // 页面跳转
        wx.navigateTo({
            url: '../search/search?style=all'
        })
    },
    // 更多畅销书排行榜
    booktop3more() {
        // 页面跳转
        wx.navigateTo({
            url: '../booklist/booklist?tap=bookmoretop'
        })

    },
    /* 分类跳转 */
    gobooklist(e) {
        // 获取标签参数
        let tap = e.currentTarget.dataset.tap

        // 页面跳转
        wx.navigateTo({
            url: '../booklist/booklist?tap=' + tap
        })
    },
    /* 分类跳转 */
    gomusiclist(e) {
        // 获取标签参数
        let tap = e.currentTarget.dataset.tap

        // 页面跳转
        wx.navigateTo({
            url: '../musiclist/musiclist?tap=' + tap
        })
    },
    /* 分类跳转 */
    gomovielist(e) {
        // 获取标签参数
        let tap = e.currentTarget.dataset.tap

        // 页面跳转
        wx.navigateTo({
            url: '../movielist/movielist?tap=' + tap
        })
    },

    godetail(e) {
        let gourl = e.target.dataset.gourl
        let arr = ['home', 'scan', 'shopcar', 'mine']

        let res = arr.indexOf(gourl)
        if (res >= 0) {
            wx.switchTab({
                url: '../' + gourl,
            })
        } else {
            wx.navigateTo({
                url: '../' + gourl,
            })
        }

    },

    // 图书详情
    gobookdetail(e) {
        console.log(e)
        let pid = e.currentTarget.id
        // 页面跳转
        wx.navigateTo({
            url: '../bookdetail/bookdetail?id=' + pid,
        })

    }
})