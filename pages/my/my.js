// pages/my/my.js
const app = getApp();
let req = app.globalData.$req;
let that;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        hideLogin: true,
        statusBarHeight: 0,
        hideLogin: true,
        userId: null,
        userInfo: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;

        that.setData({
            statusBarHeight: app.globalData.systemInfo.statusBarHeight,
            userId: wx.getStorageSync('userId')
        })

        if (that.data.userId) {
            that.getUserInfo();
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

    getUserInfo() {
        wx.showLoading({
            title: '加载中...',
        })

        req({
            url: '/User/info',
            method: 'POST',
            data: {
                id: that.data.userId
            },
            success: res => {
                wx.hideLoading();
                
                console.log(res);
                that.setData({
                    userInfo: res.data.result
                })
            },
            fail: err => {
                console.log(err);
            }
        })
    },

    handleShowLogin() {
        that.setData({
            hideLogin: false
        })
    },

    loginResult(e) {
        console.log(e);
        let result = e.detail.result;

        if (result == 'success') {
            that.setData({
                hideLogin: true,
                userId: wx.getStorageSync('userId')
            })

            that.getUserInfo();
        }
    },

    closeLogin() {
        that.setData({
            hideLogin: true
        })
    },

    goBack() {
        wx.navigateBack({
            delta: 1
        })
    },

    toNext(e) {
        let index = e.currentTarget.dataset.index;

        if (that.data.userId) {
            switch (index) {
                case '0':
                    wx.navigateTo({
                        url: '/pages/my/order/order',
                    })
                    break;
    
                case '1':
                    wx.navigateTo({
                        url: `/pages/my/wallet/wallet?money=${that.data.userInfo.money}`,
                    })
                    break;
    
                case '3':
                    wx.navigateTo({
                        url: '/pages/my/message/message',
                    })
                    break;
    
                case '4':
                    wx.navigateTo({
                        url: '/pages/my/agreement/agreement',
                    })
                    break;

                case '5':
                    wx.navigateTo({
                        url: '/pages/my/guide/guide',
                    })
                    break;

                case '6':
                    wx.navigateTo({
                        url: '/pages/my/serve/serve',
                    })
                    break;

                case '7':
                    wx.navigateTo({
                        url: '/pages/my/setting/setting',
                    })
                    break;
            }
        } else {
            that.setData({
                hideLogin: false
            })
        }
    }
})
