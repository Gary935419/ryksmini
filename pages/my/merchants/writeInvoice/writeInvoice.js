// pages/my/wallet/applyInvoice/selectItem/writeInvoice/writeInvoice.js
const app = getApp();
let req = app.globalData.$req;
let that;

Page({

    /**
     * 页面的初始数据
     */
    data: {
		imgs: [],
		upload_picture_list: [],
		tabChangeNameValue:'',
		tabChangeNumberValue:'',
		tabChangeContentValue:'',
		tabChangePnameValue:'',
		tabChangePtelValue:'',
		tabChangePname1Value:'',
		tabChangePtel1Value:'',
		tabChangePcardValue:'',
		tabChangeNumber1Value:'',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
	tabChangeName(e) {
		var that = this;
		that.setData({
		    tabChangeNameValue: e.detail.value
		})
	},
	tabChangeNumber(e) {
		var that = this;
		that.setData({
		    tabChangeNumberValue: e.detail.value
		})
	},
	tabChangeContent(e) {
		var that = this;
		that.setData({
		    tabChangeContentValue: e.detail.value
		})
	},
	tabChangePname(e) {
		var that = this;
		that.setData({
		    tabChangePnameValue: e.detail.value
		})
	},
	tabChangePtel(e) {
		var that = this;
		that.setData({
		    tabChangePtelValue: e.detail.value
		})
	},
	tabChangePname1(e) {
		var that = this;
		that.setData({
		    tabChangePname1Value: e.detail.value
		})
	},
	tabChangePtel1(e) {
		var that = this;
		that.setData({
		    tabChangePtel1Value: e.detail.value
		})
	},
	tabChangePcard(e) {
		var that = this;
		that.setData({
		    tabChangePcardValue: e.detail.value
		})
	},
	tabChangeNumber1(e) {
		var that = this;
		that.setData({
		    tabChangeNumber1Value: e.detail.value
		})
	},
	//选择图片方法
	uploadpic: function (e) {
	  let that = this //获取上下文
	  let upload_picture_list = that.data.upload_picture_list
	  //选择图片
	  wx.chooseImage({
	    count: 9, // 默认9，这里显示一次选择相册的图片数量 
	    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
	    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	    success: function (res) { // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
		  
	      let tempFiles = res.tempFiles
	      //把选择的图片 添加到集合里
	      for (let i in tempFiles) {
	        tempFiles[i]['upload_percent'] = 0
	        tempFiles[i]['path_server'] = ''
	        upload_picture_list.push(tempFiles[i])
	      }
	      //显示
	      that.setData({
	        upload_picture_list: upload_picture_list,
	      });
			that.uploadimages();
	    },
	  });
	},
	//点击上传图片
	uploadimages() {
	  let page = this
	  let upload_picture_list = page.data.upload_picture_list
		var jsonLength = 0;
		for (var i in upload_picture_list) {
			jsonLength++;
		}
	  //循环把图片上传到服务器 并显示进度       
	  for (let j in upload_picture_list) {
	    if (upload_picture_list[j]['upload_percent'] == 0) {
	      //上传图片后端地址
	      upload_file_server('https://ryks.ychlkj.cn/index.php/home/UserCall/pushFIle', page, upload_picture_list, j,jsonLength)
	    }
	  }
	},
	// 点击删除图片
	deleteImg(e) {
	  let upload_picture_list = this.data.upload_picture_list;
	  let index = e.currentTarget.dataset.index;
	  upload_picture_list.splice(index, 1);
	  this.setData({
	    upload_picture_list: upload_picture_list
	  });
	},
	// 预览图片
	previewImg(e) {
	  //获取当前图片的下标
	  let index = e.currentTarget.dataset.index;
	  //所有图片
	  let imgs = this.data.imgs;
		console.log(imgs);
	  wx.previewImage({
	    //当前显示图片
	    current: imgs[index],
	    //所有图片
	    urls: imgs
	  })
	},
	//提交信息
	submitOrder() {
		var that = this;
	    let d = that.data;
	    let data = {
			user_id:wx.getStorageSync('userId'),
			upload_picture_list: JSON.stringify(d.upload_picture_list),
			tabChangeNameValue:d.tabChangeNameValue,
			tabChangeNumberValue:d.tabChangeNumberValue,
			tabChangeContentValue:d.tabChangeContentValue,
			tabChangePnameValue:d.tabChangePnameValue,
			tabChangePtelValue:d.tabChangePtelValue,
			tabChangePname1Value:d.tabChangePname1Value,
			tabChangePtel1Value:d.tabChangePtel1Value,
			tabChangePcardValue:d.tabChangePcardValue,
			tabChangeNumber1Value:d.tabChangeNumber1Value,
	    }
		console.log(data);
	    req({
	        url: '/UserCall/insert_merchants',
	        method: 'POST',
	        data,
	        success: res => {
	            wx.hideLoading();
	            wx.showToast({
	              title: res.data.msg,
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
	            title: res.data.msg,
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
/**
 * 上传图片方法
 */
function upload_file_server(url, that, upload_picture_list, j,jsonLength) {
  //上传返回值
  const upload_task = wx.uploadFile({
    // 模拟https
    url: url, //需要用HTTPS，同时在微信公众平台后台添加服务器地址  
    filePath: upload_picture_list[j]['path'], //上传的文件本地地址    
    name: 'file',
    formData: {
      'num': j,
	  'md5':'4EF82E3603825745124695977A46E8C2'
    },
    //附近数据，这里为路径     
    success: function(res) {
      var data = JSON.parse(res.data);
	   console.log(data);
      // //字符串转化为JSON  
      if (data.code == '200') {
        var filename = data.src //存储地址 显示
        upload_picture_list[j]['path_server'] = filename
      } else {
        upload_picture_list[j]['path_server'] = filename
      }
      that.setData({
        upload_picture_list: upload_picture_list
      });
    }
  })
  //上传 进度方法
  upload_task.onProgressUpdate((res) => {
    upload_picture_list[j]['upload_percent'] = res.progress
    that.setData({
      upload_picture_list: upload_picture_list
    });
  });
}