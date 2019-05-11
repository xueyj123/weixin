let helper = {

    titleName: 'jadfjknkl;xcvznkl;',

    // 统计购物车数量

    getcount(allDatas) {
        let totalcount = 0
        // // 购买图书的总数量
        if (allDatas.book.length > 0) {
            for (let i = 0; i < allDatas.book.length; i++) {
                totalcount += parseInt(allDatas.book[i].count)
            }
        }

        // 购买音乐的总数量
        if (allDatas.music.length > 0) {
            for (let i = 0; i < allDatas.music.length; i++) {
                totalcount += parseInt(allDatas.music[i].count)
            }
        }
        // 购买电影的总数量
        if (allDatas.movie.length > 0) {
            for (let i = 0; i < allDatas.movie.length; i++) {
                totalcount += parseInt(allDatas.movie[i].count)
            }
        }
        return totalcount
    },
    addsubdel(e, openId, that_, active) {
        // 获取分类
        let item = e.currentTarget.dataset.name

        // 获取产品id
        let pid = e.currentTarget.dataset.id


        // 每点击一次，1.更新storage，2.重新渲染数据，3.购物车数量线束
        // 1.1获取本地数据
        let storageDatas = wx.getStorageSync(openId)

        // 1.2更新本地数据
        let bookData = storageDatas.book
        let musicData = storageDatas.music
        let movieData = storageDatas.movie

        if (item == 'book') {
            for (let i = 0; i < bookData.length; i++) {
                if (bookData[i].pid == pid) {
                    if (active == 'add') {
                        bookData[i].count++
                    } else if (active == 'sub') {
                        if (bookData[i].count <= 1) {

                            wx.showModal({
                                title: '提示',
                                content: '确定要删除吗',
                                showCancel: true,
                                success: (res) => {
                                    if (res.confirm) {
                                        // console.log('确定')
                                        this.addsubdel(e, openId, that_, 'del')
                                    } else {
                                        // console.log('取消')
                                    }
                                },
                            })
                        } else {
                            bookData[i].count--
                        }
                    } else {
                        bookData.splice(i, 1)
                    }

                }
            }
        } else if (item == 'music') {
            for (let i = 0; i < musicData.length; i++) {
                if (musicData[i].pid == pid) {
                    if (active == 'add') {
                        musicData[i].count++
                    } else if (active == 'sub') {
                        if (musicData[i].count <= 1) {

                            wx.showModal({
                                title: '提示',
                                content: '确定要删除吗',
                                showCancel: true,
                                success: (res) => {
                                    if (res.confirm) {
                                        // console.log('确定')
                                        this.addsubdel(e, openId, that_, 'del')
                                    } else {
                                        // console.log('取消')
                                    }
                                },
                            })
                        } else {
                            musicData[i].count--
                        }
                    } else {
                        musicData.splice(i, 1)
                    }

                }
            }
        } else {
            for (let i = 0; i < movieData.length; i++) {
                if (movieData[i].pid == pid) {
                    if (active == 'add') {
                        movieData[i].count++
                    } else if (active == 'sub') {
                        if (movieData[i].count <= 1) {

                            wx.showModal({
                                title: '提示',
                                content: '确定要删除吗',
                                showCancel: true,
                                success: (res) => {
                                    if (res.confirm) {
                                        // console.log('确定')
                                        this.addsubdel(e, openId, that_, 'del')
                                    } else {
                                        // console.log('取消')
                                    }
                                },
                            })
                        } else {
                            movieData[i].count--
                        }
                    } else {
                        movieData.splice(i, 1)
                    }

                }
            }
        }
        // 1.3重新设置storage
        wx.setStorageSync(openId, storageDatas)



        // 3.购物车数量的显示
        let count = this.getcount(storageDatas)
        console.log(count)
        if (count) {
            wx.setTabBarBadge({
                index: 2,
                text: count.toString(),
            })
        } else {
            wx.removeTabBarBadge({
                index: 2
            })
        }


        // 统计总价
        let totalprice = this.totalprice(storageDatas)
        // 2.重新渲染到模板
        that_.setData({
            bookDatas: storageDatas.book,
            movieDatas: storageDatas.movie,
            musicDatas: storageDatas.music,
            totalprice: totalprice
        })

    },

    // 统计购物车总价
    totalprice(allDatas) {
        let totalprice = 0
        let items = ['book', 'music', 'movie']
        // items.forEach((item)=>{
        //     for (let i = 0; i < allDatas.item.length; i++) {
        //         // 数量
        //         let count = allDatas.item[i].count
        //         // 单价
        //         let price = allDatas.item[i].pdatas.price
        //         // 总价
        //         totalprice += count * price
        //     }
        // })

        // 图书总价
        for (let i = 0; i < allDatas.book.length; i++) {
            // 数量
            let count = allDatas.book[i].count
            // 单价
            let price = allDatas.book[i].pdatas.price
            // 总价
            totalprice += count * price
        }
        // 音乐总价
        for (let i = 0; i < allDatas.music.length; i++) {
            // 数量
            let count = allDatas.music[i].count
            // 单价
            let price = allDatas.music[i].pdatas.price
            // 总价
            totalprice += count * price
        }
        // 电影总价
        for (let i = 0; i < allDatas.movie.length; i++) {
            // 数量
            let count = allDatas.movie[i].count
            // 单价
            let price = allDatas.movie[i].pdatas.price
            // 总价
            totalprice += count * price
        }
        return this.returnFloat(totalprice)
    },
    returnFloat(value) {
        var value = Math.round(parseFloat(value) * 100) / 100;
        var xsd = value.toString().split(".");
        if (xsd.length == 1) {
            value = value.toString() + ".00";
            return value;
        }
        if (xsd.length > 1) {
            if (xsd[1].length < 2) {
                value = value.toString() + "0";
            }
            return value;
        }
    }

}

module.exports = helper