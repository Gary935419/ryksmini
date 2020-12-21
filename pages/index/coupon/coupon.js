// pages/index/coupon/coupon.js
const app = getApp();
let req = app.globalData.$req;
let that;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: wx.getStorageSync('userId'),
        list: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;

        that.getCouponData();
    },

    noLogin: function () {
        var that = this;

        that.setData({
            showLogin: false
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

    

    getCouponData() {
        wx.showLoading({
            title: '加载中...',
        })

        req({
            url: '/UserCoupon/lists',
            method: 'POST',
            data: {
                id: that.data.userId,
                limit: 1000
            },
            success: res => {
                wx.hideLoading();
                
                console.log(res);

                that.setData({
                    list: res.data.result
                })
            },
            fail: err => {
                console.log(err);
            }
        })
    },

    selCoupon(e) {
        let item = e.currentTarget.dataset.item;
        let currentPages =  getCurrentPages();
        let prePage = currentPages[currentPages.length - 2];

        prePage.setData({
            couponItemData: item
        })

        if (prePage.data.writeItemArr[0].address != '' 
            && prePage.data.writeItemArr[1].address != '') {
            prePage.calTotalPrice();
        }

        wx.navigateBack({
            delta: 1,
            success: res => {
                console.log(prePage);
            }
        })
    },
})