const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        classify: [],
        list: [],
        activ: 'active',
        host: app.globalData.remoteDomain,
        myhost: app.globalData.remoteDomainMy,
    },
    search(e) {
        // console.log(e.currentTarget.dataset.)
        wx.navigateTo({
            url: '../search/search?style=music',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        const that = this;

        // 列表分类
        wx.request({
            url: app.globalData.remoteDomainApi + 'musiclist.php',
            data: {
                x: '',
                y: ''
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    list: res.data
                })

            }
        })


        // 分类数据
        wx.request({
            url: app.globalData.remoteDomainApi + 'musicclass.php',
            data: {
                x: '',
                y: ''
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    classify: res.data
                })

            }
        })
    },


    classitem(e) {
        const that = this;
        let newobj = {};
        let temparr = [];
        let id = e.target.id;
        if (id) {
            this.setData({
                activ: ''
            })
        } else {
            this.setData({
                activ: 'active'
            })
        }
        // 获取全部分类
        let classify = that.data.classify

        // 添加分类的项目class
        for (let i = 0; i < classify.length; i++) {
            let item = classify[i];

            if (item.id == id) {
                newobj = {
                    id: item.id,
                    cls: 'active',
                    cname: item.cname
                }
            } else {
                newobj = {
                    id: item.id,
                    cls: '',
                    cname: item.cname
                }
            }
            // 把每个新对象存入到临时数组中
            temparr.push(newobj);
        }


        // 更改classif的内容
        that.setData({
            classify: temparr
        })


        // 列表分类
        wx.request({
            url: app.globalData.remoteDomainApi + 'musiclist.php',
            data: {
                ccid: id,
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    list: res.data
                })


            }
        })
    },
    musicdetail(e) {
        // 获取id
        let id = e.currentTarget.id
        // 跳转到详情页
        wx.navigateTo({
            url: '../musicdetail/musicdetail?id=' + id,
        })
    }
})