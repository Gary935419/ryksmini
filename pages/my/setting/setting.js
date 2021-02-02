// pages/my/setting/setting.js
const app = getApp();
let req = app.globalData.$req;
let that;

Page({

    /**
     * 页面的初始数据
     */
    data: {
		user_id: wx.getStorageSync('userId'),
        phone: '',
		user_info: [],
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
		var that = this;
		let d = that.data;
		let data = {
			user_id: d.user_id,
		}
        req({
            url: '/GetBasic/get_text_info',
            method: 'POST',
			data,
            success: res => {
                console.log(res);

                that.setData({
                    phone: res.data.result.user_contact_us,
					user_info: res.data.result.user_info
                })
            },
            fail: err => {
                console.log(err);
            }
        })
    },

    callPhone() {
        if (this.data.phone) {
            wx.makePhoneCall({
                phoneNumber: this.data.phone,
            })
        }
    },


    toNext(e) {
        let index = e.currentTarget.dataset.index;
        switch (index) {
            case '0':
                wx.navigateTo({
                    url: '/pages/my/setting/aboutUs/aboutUs',
                })
                break;

            case '1':
                wx.navigateTo({
                    url: '',
                })
                break;

            case '2':
                wx.navigateTo({
                    url: '/pages/my/setting/license/license',
                })
                break;

            case '3':
                wx.navigateTo({
                    url: '/pages/my/setting/recruit/recruit',
                })
                break;

            case '4':
                wx.navigateTo({
                    url: '/pages/my/setting/invitation/invitation',
                })
                break;

            case '5':
                wx.showModal({
                    title: '提示',
                    content: '确认退出吗？',
                    success: res => {
                        if (res.confirm) {
                            wx.removeStorageSync('userId');
							wx.removeStorageSync('tabState');
                            wx.showToast({
                                title: '退出成功',
                                success: () => {
                                    setTimeout(() => {
                                        wx.reLaunch({
                                            url: '/pages/index/index',
                                          })
                                    }, 1100)
                                }
                            })
                        }
                    }
                })
                
                break;
        }
    },
})