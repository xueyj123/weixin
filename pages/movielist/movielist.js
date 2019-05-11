const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        style: [],
        country: [],
        current_styleclass: 'active-class',
        current_countryclass: 'active-country',
        class_style: 'all_style',
        class_country: 'all_country',
        myhost: app.globalData.remoteDomainMy
    },
    search() {
        // console.log(e.currentTarget.dataset.)
        wx.navigateTo({
            url: '../search/search?style=movie',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        const that = this;
        // 列表页面
        wx.request({
            url: app.globalData.remoteDomainApi + 'movielist.php',
            data: {
                style_cname: this.data.class_style,
                country_cname: this.data.class_country,
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {

                that.setData({
                    list: res.data.datas,
                    style: res.data.style,
                    country: res.data.country,
                })
            }
        })


    },
    gomoviedetail(e) {
        const id = e.currentTarget.id;
        wx.navigateTo({
            url: '../moviedetail/moviedetail?id=' + id,
        })

    },

    getstyle(e) {
        const that = this;
        let style_cname = e.currentTarget.dataset.class_style
        const country_cname = this.data.class_country

        if (style_cname != 'all_style') {
            this.setData({
                current_styleclass: '',
                class_style: style_cname
            })
        } else {
            this.setData({
                current_styleclass: 'active-class',
                class_style: style_cname

            })
        }
        // 列表页面
        wx.request({
            url: app.globalData.remoteDomainApi + 'movielist.php',
            data: {
                style_cname: style_cname,
                country_cname: country_cname
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                that.setData({
                    list: res.data.datas,
                    style: res.data.style,
                    country: res.data.country,
                })
            }
        })
    },
    getcountry(e) {
        const that = this;
        let country_cname = e.currentTarget.dataset.class_country

        const style_cname = this.data.class_style

        if (country_cname != 'all_country') {
            this.setData({
                current_countryclass: '',
                class_country: country_cname
            })
        } else {
            this.setData({
                current_countryclass: 'active-country',
                class_country: country_cname
            })

        }



        // 列表页面
        wx.request({
            url: app.globalData.remoteDomainApi + 'movielist.php',
            data: {
                style_cname: style_cname,
                country_cname: country_cname
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                that.setData({
                    list: res.data.datas,
                    style: res.data.style,
                    country: res.data.country,
                })
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