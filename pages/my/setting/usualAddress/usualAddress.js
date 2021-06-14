const app = getApp();
let req = app.globalData.$req;
let that;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId: wx.getStorageSync('userId'),
		address_result:[],//订单详情
		type:'',//1 起点 2终点
		startTime:'',
		endTime:'',
		
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
		console.log(options.type);
        that.setData({
          type: options.type,
        });
        that.get_address_lists();
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
	//获得地址信息
	get_address_lists() {
		var that = this;
		let d = that.data;
		let data = {
			userId: d.userId,
			user_type: d.type,
		}
	    wx.showLoading({
	        title: '加载中...',
	    })
	    console.log(data);
	    req({
	        url: '/UserCall/my_address',
	        method: 'POST',
	        data,
	        success: res => {
	            wx.hideLoading();
	            console.log(res);
	            that.setData({
	                address_result: res.data.result,
	            })
	        },
	        fail: err => {
	            console.log(err);
	        }
	    })
	},
	
	//touch start
	handleTouchStart: function(e) {      
	    console.log(" startTime = " + e.timeStamp);
		var that = this;
		that.setData({
		  startTime: e.timeStamp,
		});
	},  
	 
	//touch end
	handleTouchEnd: function(e) {
	    console.log(" endTime = " + e.timeStamp);  
		var that = this;
		that.setData({
		  endTime: e.timeStamp,
		});
		console.log("endTime - startTime = " + (that.data.endTime - that.data.startTime));
		if (that.data.endTime - that.data.startTime >= 350) {
		   console.log("长按");
		   wx.showModal({
		       title: '温馨提示',
		       content: '确认是否删除当前选中地址?',
		       success: function (res) {
		         if (res.confirm) {
		   		  wx.showLoading({
		   		      title: '提交中...',
		   		  })
		           req({
		               url: '/UserCall/cancel_delete',
		               method: 'POST',
		           	data: {
		           	  id: e.currentTarget.dataset.id,
		           	},
		               success: res => {
		                   wx.hideLoading();
		                   wx.showModal({
		                       title: '温馨提示',
		                       content: '删除成功',
		                       showCancel: false,
		                       success: () => {
		                           wx.redirectTo({
		                               url: '/pages/my/setting/usualAddress/usualAddress?type=' + that.data.type,
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
		}  
	},  
	handleClick(e) {
		      var that = this;
		      console.log("endTime - startTime = " + (that.data.endTime - that.data.startTime));
		      if (that.data.endTime - that.data.startTime < 350) {      
		          console.log("点击");
		          let d = that.data;
		          let pages = getCurrentPages();
		          let prevPage = pages[pages.length - 2];
		          if (d.type == 1) {
		              prevPage.setData({
		          					  [`writeItemArr[0].value`]: e.currentTarget.dataset.addressname,
		                  [`writeItemArr[0].start_longitude`]: e.currentTarget.dataset.longitude,
		                  [`writeItemArr[0].start_latitude`]: e.currentTarget.dataset.latitude,
		                  [`writeItemArr[0].address`]: e.currentTarget.dataset.address,   // 详细地址
		          		  [`writeItemArr[0].addressDetail`]: e.currentTarget.dataset.address,  // 详细地址
		              })
		          } else if (d.type == 2) {
		              prevPage.setData({
		          					  [`writeItemArr[1].value`]: e.currentTarget.dataset.addressname,
		          					  [`writeItemArr[1].end_longitude`]: e.currentTarget.dataset.longitude,
		          					  [`writeItemArr[1].end_latitude`]: e.currentTarget.dataset.latitude,
		          					  [`writeItemArr[1].address`]: e.currentTarget.dataset.address,   // 详细地址
		          					  [`writeItemArr[1].addressDetail`]: e.currentTarget.dataset.address,  // 详细地址
		              })
		          }
		          wx.navigateBack({
		               delta: 1,
		          })
		      }  
	     },
})