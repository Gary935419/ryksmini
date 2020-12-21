// pages/my/message/messageContent/messageContent.js
const app = getApp();
let req = app.globalData.$req;
let that;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: null,
        list: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;

        that.setData({
            userId: wx.getStorageSync('userId')
        })

        that.getData();
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

    

    getData() {
        req({
            url: '/Message/lists',
            method: 'POST',
            data: {
                id: that.data.userId
            },
            success: res => {
            
                console.log(res);
                that.setData({
                    list: res.data.result
                })
            },
            fail: err => {
                console.log(err);
            }
        })
    }
})