// components/star/star.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        starnums: Number,
    },

    /**
     * 组件的初始数据
     */
    data: {
        list: []
    },

    ready() {
        // 获取父组件传递的星星数量
        let star = this.properties.starnums



        // 创建星星
        let totalStars = 5;

        // 临时数组
        let tempArr = [];
        for (let i = 1; i <= totalStars; i++) {

            // 一颗红星
            let redStar = '../../static/icon/star.png'
            // 一颗灰星
            let grayStar = '../../static/icon/star-gray.png'

            // 存入数组
            if (i > star) {
                tempArr.push(grayStar)
            } else {
                tempArr.push(redStar)
            }
        }

        this.setData({
            list: tempArr
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})