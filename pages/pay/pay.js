// pages/pay/pay.js
const app = getApp();
let req = app.globalData.$req;
let that;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: 0,
        userId: wx.getStorageSync('userId'),
        orderId: '',   // 22
        orderInfo: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;

        that.setData({
            statusBarHeight: app.globalData.systemInfo.statusBarHeight
        })

        if (options.orderId) {
            that.setData({
                orderId: options.orderId
            })

            console.log(options.orderId);

            that.getOrderInfo();
        }

        // // 
        // that.getOrderInfo();
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

    getOrderInfo() {
        req({
            url: '/UserCall/traffic_order_pay',
            method: 'POST',
            data: {
                order_id: that.data.orderId
            },
            success: res => {
                wx.hideLoading();
                
                console.log(res);

                that.setData({
                    orderInfo: res.data.result.weixin_sign
                })
            },
            fail: err => {
                console.log(err);
            }
        })
    },

    pay() {
        let d = that.data;
        let { nonceStr, _package, paySign, timeStamp, signType } = d.orderInfo.app_request;

        wx.showLoading({
            title: 'loading...',
        })

        wx.requestPayment({
            nonceStr,
            package: _package,
            signType,
            paySign,
            timeStamp,
            success: resp => {
                wx.hideLoading();
        
                console.log(resp);

                wx.reLaunch({
                    url: '/pages/my/order/order',
                })
            },
            fail: err => {
                console.log(err);
            }
        })
    },

    toBack() {
        wx.navigateBack({
            delta: 1
        })
    }
})