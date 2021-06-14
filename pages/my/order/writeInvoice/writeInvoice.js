// pages/my/wallet/applyInvoice/selectItem/writeInvoice/writeInvoice.js
const app = getApp();
let req = app.globalData.$req;
let that;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        type:1,//1专车送 2顺风送 3代买 4代驾
		id:0,//订单id
		price:0,//订单价格
		tabChooseValue:2,//发票类型 1：电子 2：纸质
		tabChooseTypeValue:2,//抬头类型 1：单位 2：个人
		tabChangeNameValue:'',//抬头名称
		tabChangeNumberValue:'',//纳税人识别号
		tabChangeContentValue:'',//发票内容
		tabChangePnameValue:'',//联系人
		tabChangeMarksValue:'',//备注信息
		tabChangePtelValue:'',//电话
		tabChangePemailValue:'',//邮箱
		tabChangePaddressValue:'',//地址
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        console.log(options.type);
		console.log(options.id);
		console.log(options.price);
        if(options.type != undefined){
        	that.setData({
        	  type: options.type,
        	});
        }
		if(options.id != undefined){
			that.setData({
			  id: options.id,
			});
		}
		if(options.price != undefined){
			that.setData({
			  price: options.price,
			});
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
    //发票类型
    tabChange(e) {
		var that = this;
        let val = e.detail.value;
        that.setData({
            tabChooseValue: val
        })
    },
	//抬头类型
	tabChangeType(e) {
		var that = this;
	    let val = e.detail.value;
	    that.setData({
	        tabChooseTypeValue: val
	    })
	},
	//抬头名称
	tabChangeName(e) {
		var that = this;
		that.setData({
		    tabChangeNameValue: e.detail.value
		})
	},
	//纳税人识别号
	tabChangeNumber(e) {
		var that = this;
		that.setData({
		    tabChangeNumberValue: e.detail.value
		})
	},
	//发票内容
	tabChangeContent(e) {
		var that = this;
		that.setData({
		    tabChangeContentValue: e.detail.value
		})
	},
	//联系人
	tabChangePname(e) {
		var that = this;
		that.setData({
		    tabChangePnameValue: e.detail.value
		})
	},
	//备注信息
	tabChangeMarks(e) {
		var that = this;
		that.setData({
		    tabChangeMarksValue: e.detail.value
		})
	},
	//电话
	tabChangePtel(e) {
		var that = this;
		that.setData({
		    tabChangePtelValue: e.detail.value
		})
	},
	//邮箱
	tabChangePemail(e) {
		var that = this;
		that.setData({
		    tabChangePemailValue: e.detail.value
		})
	},
	//地址
	tabChangePaddress(e) {
		var that = this;
		that.setData({
		    tabChangePaddressValue: e.detail.value
		})
	},
	
	//提交信息
	submitOrder() {
		var that = this;
	    let d = that.data;
	    let data = {
			user_id:wx.getStorageSync('userId'),
			type:d.type,//1专车送 2顺风送 3代买 4代驾
			id:d.id,//订单id
			price:d.price,//订单价格
			tabChooseValue:d.tabChooseValue,//发票类型 1：电子 2：纸质
			tabChooseTypeValue:d.tabChooseTypeValue,//抬头类型 1：单位 2：个人
			tabChangeNameValue:d.tabChangeNameValue,//抬头名称
			tabChangeNumberValue:d.tabChangeNumberValue,//纳税人识别号
			tabChangeContentValue:d.tabChangeContentValue,//发票内容
			tabChangePnameValue:d.tabChangePnameValue,//联系人
			tabChangeMarksValue:d.tabChangeMarksValue,//备注信息
			tabChangePtelValue:d.tabChangePtelValue,//电话
			tabChangePemailValue:d.tabChangePemailValue,//邮箱
			tabChangePaddressValue:d.tabChangePaddressValue,//地址
	    }
		console.log(data);
		if(data.tabChangeNameValue == '' || 
		data.tabChangeNumberValue == '' || 
		data.tabChangeContentValue == '' || 
		data.tabChangePnameValue == '' || 
		data.tabChangeMarksValue == '' || 
		data.tabChangePtelValue == '' || 
		data.tabChangePemailValue == '' || data.tabChangePaddressValue == ''){
			wx.showToast({
			    title: '请完善发票信息',
			    icon: 'none'
			})
			return;
		}
	    req({
	        url: '/UserCall/insert_invoice',
	        method: 'POST',
	        data,
	        success: res => {
	            wx.hideLoading();
	            wx.showToast({
	              title: '申请成功，2s后自动跳转',
	              icon: 'none',
	              duration: 3000
	            })
	            setTimeout(function() {
	              wx.reLaunch({
	                  url: '/pages/my/order/order',
	              })
	            }, 2000)
	        },
	        fail: function(res) {
	          wx.showToast({
	            title: '申请失败，2s后自动跳转',
	            icon: 'none',
	            duration: 3000
	          })
	          setTimeout(function() {
	           wx.reLaunch({
	              url: '/pages/my/order/order',
	            })
	          }, 2000)
	        },
	    })
	},
})