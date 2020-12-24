// pages/my/setting/aboutUs/aboutUs.js
const app = getApp();
let req = app.globalData.$req;
let that;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:'',//订单id
		order_result:[],//订单详情
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.setData({
          id: options.id,
        });
        that.get_order_details();
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
	   wx.reLaunch({
			url: '/pages/my/order/order',
		})
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

    get_order_details() {
		var that = this;
        req({
            url: '/UserCall/my_order_info',
            method: 'POST',
			data: {
			  id: that.data.id,
			  type: 1,
			},
            success: res => {
                console.log(res);
                that.setData({
                    order_result: res.data.result,
                })
            },
            fail: err => {
                console.log(err);
            }
        })
    },
	submitCancelOrder() {
		var that = this;
		wx.showModal({
		    title: '温馨提示',
		    content: '确认要取消当前订单么?',
		    success: function (res) {
		      if (res.confirm) {
				  wx.showLoading({
				      title: '提交中...',
				  })
		        req({
		            url: '/UserCall/cancel',
		            method: 'POST',
		        	data: {
		        	  order_small_id: that.data.id,
		        	  type: 1,
		        	},
		            success: res => {
		                wx.hideLoading();
		                wx.showModal({
		                    title: '温馨提示',
		                    content: '取消成功',
		                    showCancel: false,
		                    success: () => {
		                        wx.navigateTo({
		                            url: '/pages/my/order/detail/detail?id=' + that.data.id,
		                        })
		                    }
		                })
		            },
		            fail: err => {
		                console.log(err);
		            }
		        })
		      }
		    }
		  })
	},
	submitEvaluateOrder(e) {
	    let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: '/pages/my/order/evaluate/evaluate?type=1&id=' + id,
		})
	}
})