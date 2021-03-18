// pages/my/wallet/wallet.js
const app = getApp();
const req = app.globalData.$req;
let that;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: 0,
        userId: wx.getStorageSync('userId'),
        money: 0.00,
        couponList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;

        that.setData({
            statusBarHeight: app.globalData.systemInfo.statusBarHeight
        })

        if (options.money) {
            that.setData({
                money: options.money
            })
        }

        that.getCoupon();
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

    getCoupon() {
        req({
            url: '/UserCoupon/lists',
            method: 'POST',
            data: {
                id: wx.getStorageSync('userId')
            },
            success: res => {
                console.log(res);
                that.setData({
                    couponList: res.data.result
                })
            },
			fail: err => {
			    console.log(err);
			}
        })
    },

    goBack() {
        wx.navigateBack({
            delta: 1
        })
    },

    toApplyInvoice() {
        wx.navigateTo({
            url: '/pages/my/wallet/applyInvoice/applyInvoice',
        })
    },

    toCoupon() {
        wx.navigateTo({
            url: '/pages/my/wallet/myCoupon/myCoupon',
        })
    },
	
	toApplyWithdrawal() {
		that = this;
	    wx.navigateTo({
	        url: '/pages/my/wallet/withdrawal/withdrawal?price=' + that.data.money,
	    })
	},
	
	toApplyTopup() {
		that = this;
	    wx.navigateTo({
	        url: '/pages/my/wallet/topup/topup?price=' + that.data.money,
	    })
	}
})
