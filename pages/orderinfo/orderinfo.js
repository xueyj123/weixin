 const app = getApp();

 Page({

     /**
      * 页面的初始数据
      */
     data: {
         list: [],
         myhost:app.globalData.remoteDomainMy,

     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function(options) {

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
         // 获取该用户下的所有订单信息
         wx.request({
             url: app.globalData.remoteDomainApi + 'getorderinfo.php',
             data: {
                 openid: wx.getStorageSync('openid')
             },
             header: {
                 'content-type': 'application/json' // 默认值
             },
             success:(res)=> {
                 console.log(res.data);
                 this.setData({
                     list: res.data
                 })
             }
         })
     },

     createcomment(e){
         let classify = e.currentTarget.dataset.classify
         let pid = e.currentTarget.dataset.pid
         wx.navigateTo({
             url: '../mycc/mycc?action=add&classify=' + classify + '&pid=' + pid,
           
         })
     },
     editcomment(e) {
         let classify = e.currentTarget.dataset.classify
         let pid = e.currentTarget.dataset.pid
         let num = e.currentTarget.dataset.num
         let notes = e.currentTarget.dataset.notes
         wx.navigateTo({
             url: '../mycc/mycc?action=edit&classify=' + classify + '&pid=' + pid + '&num=' + num + '&notes=' + notes,
         })
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