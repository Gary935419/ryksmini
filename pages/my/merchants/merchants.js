// pages/my/wallet/wallet.js
const app = getApp();
const req = app.globalData.$req;
let that;

Page({

    /**
     * 页面的初始数据
     */
    data: {
		is_merchants:0,
        statusBarHeight: 0,
        userId: wx.getStorageSync('userId'),
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;
		console.log(options.is_merchants);
		that.setData({
			is_merchants: options.is_merchants,
			statusBarHeight: app.globalData.systemInfo.statusBarHeight
		})
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

    goBack() {
        wx.navigateBack({
            delta: 1
        })
    },

	toApplyTopup() {
		that = this;
	    wx.navigateTo({
	        url: '/pages/my/merchants/writeInvoice/writeInvoice',
	    })
	},
	toApplyTopuplist() {
		that = this;
	    wx.navigateTo({
	        url: '/pages/my/merchants/merchantslist/merchantslist',
	    })
	}
})
