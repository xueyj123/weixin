//app.js
App({
    onLaunch: function() {



        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 用户code
                const code = res.code

                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                wx.request({
                    url: this.globalData.remoteDomainApi + 'getopenid.php',
                    data: {
                        code: code
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: (res) => {
                        let openid = res.data.openid
                        // 把openid存入全局app的属性中，便于后面业务需要
                        this.globalData.openId = openid



                        // 把openid本地存储（同步）
                        wx.setStorageSync('openid', openid)
                    },
                })
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        remoteDomain: 'https://www.fuhushi.com',
        remoteDomainMy: 'https://www.fuhushi.com/web10/xyj_bookstore/',
        remoteDomainApi: 'https://www.fuhushi.com/web10/xyj_bookstore/api/'
    },

})