// pages/my/wallet/applyInvoice/selectItem/writeInvoice/writeInvoice.js
const app = getApp();
let req = app.globalData.$req;
let that;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '', //订单id
		type:'', //1非代驾 2代驾
		evaluate:'' //评价内容
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       var that = this;
       that.setData({
         id: options.id,
		 type: options.type,
       });
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
	//获得评价内容
	bindTextAreaBlur(e) {
		var that = this;
		console.log(e.detail.value);
		that.setData({
			evaluate: e.detail.value
		})
	},
    submitEvaluate() {
		var that = this;
        let d = that.data;
		let data = {
			order_small_id: d.id,
			type: d.type,
			evaluate: d.evaluate,
		}
		console.log(data);
		wx.showLoading({
		    title: '提交中...',
		})
		req({
		    url: '/UserCall/evaluate',
		    method: 'POST',
		    data,
		    success: res => {
		        wx.hideLoading();
		        if(d.type == 1){
		        	//专车 顺风 代买
		        	wx.navigateTo({
		        	    url: '/pages/my/order/detail/detail?id=' + d.id,
		        	})
		        }else{
		        	//代驾
		        	wx.navigateTo({
		        	    url: '/pages/my/order/detaildj/detaildj?id=' + d.id,
		        	})
		        }
		        
		    },
		    fail: err => {
		        console.log(err);
		    }
		})
    }
})