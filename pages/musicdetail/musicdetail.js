const app = getApp();
const helper = require('../../utils/helper.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isplay: false,
        dt: '00:00',
        setcount: '',
        pid: 0,
        currentTime: 0,
        totalSeconds: 0,
        myhost: app.globalData.remoteDomainMy,
        datas: {
            coverurl: 'images/loading.gif'
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let id = options.id

        // this
        let that = this;
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

        // 根据id从后端api获取数据
        wx.request({
            url: app.globalData.remoteDomainApi + 'musicdetail.php',
            data: {
                id: id
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {

                that.setData({
                    datas: res.data,
                    pid: id
                }, function() {
                    // 创建音频对象
                    that.InnerAudioContext = wx.createInnerAudioContext()

                    // 资源地址
                    that.InnerAudioContext.src = that.data.myhost + res.data.musicurl
                    // // 是否自动播放
                    // that.InnerAudioContext.autoplay=true;
                    that.InnerAudioContext.onTimeUpdate(() => {
                        // 当前播放的时长
                        let totalSeconds = parseInt(that.InnerAudioContext.duration)

                        // 当前播放的秒数
                        let currentTime = parseInt(that.InnerAudioContext.currentTime)
                        that.setData({
                            totalSeconds: totalSeconds,
                            currentTime: currentTime
                        })

                    })

                })
            }
        })


    },
    onShow() {

    },

    // 播放音乐
    play() {
        this.InnerAudioContext.play()

        // 改变图标
        this.setData({
            isplay: true
        })
        // 计算播放时长
        if (!this.clock) {

            this.clock = setInterval(() => {

                // 剩余的秒数
                let leftTime = this.data.totalSeconds - this.data.currentTime

                // 把秒转换成分钟
                let seconds = ''
                let minuts = ''

                minuts = Math.floor(leftTime / 60);
                seconds = leftTime % 60;

                if (minuts < 10) {
                    minuts = '0' + minuts;
                }

                if (seconds < 10) {
                    seconds = '0' + seconds;
                }

                let res = minuts + ':' + seconds
                console.log(leftTime)
                this.setData({
                    dt: res
                })
            }, 1000)

        }
    },

    // 暂停音乐
    pause() {
        this.InnerAudioContext.pause()
        this.setData({
            isplay: false,

        })
        this.clock && clearInterval(this.clock)
        this.clock = 0;


        // console.log(this.clock)
    },
    // 停止音乐
    stop() {
        this.InnerAudioContext.stop()
        this.setData({
            isplay: false,
            dt: '00:00',
        })
        this.clock && clearInterval(this.clock)
        this.clock = 0;

    },
    gohome() {
        wx.switchTab({
            url: '../home/home'
        })
    },
    goshopcar() {
        wx.reLaunch({

            url: '../shopcar/shopcar'
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

                let allDatas_music = allDatas.music

                // 2.2.1它的music项中是否存在当前的产品
                if (allDatas_music.length < 1) { //图书中没有数据
                    let data = [{
                        pid: this.data.pid,
                        count: 1,
                        pdatas: this.data.datas
                    }]
                    let lastData = {
                        music: data,
                        book: allDatas.book,
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

                    for (let i = 0; i < allDatas_music.length; i++) {

                        // 遍历当前产品id是否等于当前页面加载的产品id
                        if (allDatas_music[i].pid == this.data.pid) { //如果等于代表买过
                            // 当前遍历的项目

                            // 2.2.2如果有则数量+1

                            allDatas_music[i].count++;
                            isExist = true;
                            temparr.push(allDatas_music[i])
                        } else {
                            temparr.push(allDatas_music[i])
                        }

                    }
                    if (!isExist) { //当前产品不在购买的数组中
                        // 当前图书信息
                        // 2.2.3如果没有则直接加入music并数量为1
                        let data = {
                            pid: this.data.pid,
                            count: 1,
                            pdatas: this.data.datas
                        }
                        temparr.push(data)

                    }
                    let lastdata = {
                        music: temparr,
                        book: allDatas.book,
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
                        music: [{
                            pid: this.data.pid,
                            count: 1,
                            pdatas: this.data.datas
                        }],
                        book: [],
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

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        this.InnerAudioContext.destroy()
    },
})