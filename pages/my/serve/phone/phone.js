// pages/my/serve/phone/phone.js
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

    getDeal() {
        req({
            url: '/GetBasic/get_text_info',
            method: 'POST',
            success: res => {
                console.log(res);

                that.setData({
                    content: res.data.result.user_contact_us
                })
            },
            fail: err => {
                console.log(err);
            }
        })
    },

    call() {
        wx.makePhoneCall({
            phoneNumber: this.data.content,
        })
    }
})