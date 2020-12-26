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
		withdrawal_price:0.00 ,//提现金额
		money:0.00,//原始金额
		moneynow:0.00,//现在金额
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;
        if (options.price) {
            that.setData({
                money: options.price
            })
        }
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
			withdrawal_price: e.detail.value
		})
	},
    submitWithdrawal() {
		var that = this;
        let d = that.data;
		let data = {
			user_id: d.user_id,
			withdrawal_price: d.withdrawal_price,
		}
		console.log(d.money);
		console.log(d.withdrawal_price);
		if(parseInt(d.money) < parseInt(d.withdrawal_price)){
			wx.showToast({
			    title: '您的余额不足！',
			    icon: 'none'
			})
			return;
		}
		wx.showLoading({
		    title: '提交中...',
		})
		req({
		    url: '/PayMerchants/sendMoney',
		    method: 'POST',
		    data,
		    success: function(res) {
		        wx.hideLoading();
				if(res.data.result == 'SUCCESS'){
					that.setData({
					    moneynow: parseInt(d.money) - parseInt(d.withdrawal_price),
					})
					wx.showToast({
					  title: '提现成功，2s后自动跳转',
					  icon: 'none',
					  duration: 3000
					})
					setTimeout(function() {
					  wx.reLaunch({
					      url: '/pages/my/wallet/wallet?money=' + that.data.moneynow,
					  })
					}, 2000)
				}else{
					wx.showToast({
					  title: '提现失败，2s后自动跳转',
					  icon: 'none',
					  duration: 3000
					})
					setTimeout(function() {
					 wx.reLaunch({
					    url: '/pages/my/wallet/wallet?money=' + that.data.money,
					  })
					}, 2000)
				}
		    },
		    fail: function(res) {
		      wx.showToast({
		        title: '提现失败，2s后自动跳转',
		        icon: 'none',
		        duration: 3000
		      })
		      setTimeout(function() {
		       wx.reLaunch({
		          url: '/pages/my/wallet/wallet?money=' + that.data.money,
		        })
		      }, 2000)
		    },
		})
    }
})