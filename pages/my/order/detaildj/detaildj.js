// pages/my/setting/aboutUs/aboutUs.js
const app = getApp();
let req = app.globalData.$req;
let that;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:'',//订单id
		order_result:[],//订单详情
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.setData({
          id: options.id,
        });
        that.get_order_details();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    get_order_details() {
		var that = this;
        req({
            url: '/UserCall/my_order_info',
            method: 'POST',
			data: {
			  id: that.data.id,
			  type: 2,
			},
            success: res => {
                console.log(res);
                that.setData({
                    order_result: res.data.result,
                })
            },
            fail: err => {
                console.log(err);
            }
        })
    },

})