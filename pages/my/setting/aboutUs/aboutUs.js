// pages/my/setting/aboutUs/aboutUs.js
const app = getApp();
let req = app.globalData.$req;
let that;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        wx_gongzhonghao: '',
		user_id: wx.getStorageSync('userId'),
        email: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;

        that.getDeal();
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

    getDeal() {
		var that = this;
		let d = that.data;
		let data = {
			user_id: d.user_id,
		}
        req({
            url: '/GetBasic/get_text_info',
            method: 'POST',
			data,
            success: res => {
                console.log(res);

                that.setData({
                    wx_gongzhonghao: res.data.result.wx_gongzhonghao,
                    email: res.data.result.email
                })
            },
            fail: err => {
                console.log(err);
            }
        })
    },

})