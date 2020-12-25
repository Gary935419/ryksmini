// pages/my/wallet/applyInvoice/selectItem/writeInvoice/writeInvoice.js
const app = getApp();
let req = app.globalData.$req;
let that;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        user_id: wx.getStorageSync('userId'),
		invitation:'' //邀请码
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
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
	//获得code内容
	bindTextAreaBlur(e) {
		var that = this;
		console.log(e.detail.value);
		that.setData({
			invitation: e.detail.value
		})
	},
    submitInvitation() {
		var that = this;
        let d = that.data;
		let data = {
			user_id: d.user_id,
			invitation: d.invitation,
		}
		console.log(data);
		wx.showLoading({
		    title: '提交中...',
		})
		req({
		    url: '/UserCall/invitation',
		    method: 'POST',
		    data,
		    success: res => {
		        wx.hideLoading();
		        wx.navigateTo({
		            url: '/pages/my/my',
		        })
		    },
		    fail: err => {
		        console.log(err);
		    }
		})
    }
})