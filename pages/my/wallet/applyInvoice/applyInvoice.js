// pages/my/wallet/applyInvoice/applyInvoice.js
const app = getApp();
let req = app.globalData.$req;
let that;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: 0,
        showJijiaModal: false,
        showKaipiaoModal: false,
        jijiaContent: '',
        kaipiaoContent: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;

        that.setData({
            statusBarHeight: app.globalData.systemInfo.statusBarHeight
        })

        that.getExplain();
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

    

    getExplain() {
        req({
            url: '/GetBasic/get_text_info',
            method: 'POST',
            success: res => {
                // console.log(res);
                that.setData({
                    jijiaContent: res.data.result.jijia,
                    kaipiaoContent: res.data.result.kaipiao
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

    handleShowKaipiaoModal() {
        that.setData({
            showKaipiaoModal: true
        })
    },

    handleShowJijiaModal() {
        that.setData({
            showJijiaModal: true
        })
    },

    closeModal(e) {
        let type = e.currentTarget.dataset.type;

        if (type == 'jijia') {
            that.setData({
                showJijiaModal: false
            })
        } else if (type == 'kaipiao') {
            that.setData({
                showKaipiaoModal: false
            })
        }
    },

    toApplyInvoice() {
        wx.navigateTo({
            url: '/pages/my/wallet/applyInvoice/selectItem/selectItem',
        })
    }
})
