// pages/my/agreement/agreementContent/agreementContent.js
const app = getApp();
let req = app.globalData.$req;
let that;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        content: ''
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
    submitNOAgreement() {
        wx.setStorageSync('agreement_flg', 0);
		let pages = getCurrentPages();
		let prevPage = pages[pages.length - 2];
		prevPage.setData({
			agreement_flg: 0,
		})
		wx.navigateBack({
		     delta: 1,
		})
    },
    submitAgreement() {
        wx.setStorageSync('agreement_flg', 1);
		let pages = getCurrentPages();
		let prevPage = pages[pages.length - 2];
		prevPage.setData({
			agreement_flg: 1,
		})
		wx.navigateBack({
		     delta: 1,
		})
    },
    getDeal() {
        req({
            url: '/GetBasic/get_deal',
            method: 'POST',
            data: {
                type: 1
            },
            success: res => {
                console.log(res);

                that.setData({
                    content: res.data.result
                })
            },
            fail: err => {
                console.log(err);
            }
        })
    }
})