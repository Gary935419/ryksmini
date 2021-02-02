// pages/my/order/order.js
const app = getApp();
const req = app.globalData.$req;
let that;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        navIndex: 0,
        navArr: [
            // {
            //     name: '全部'
            // },
            {
                name: '专车送'
            },
            {
                name: '顺路送'
            },
            {
                name: '代买订单'
            },
            {
                name: '代驾订单'
            }
        ],
        list: [],
        preList: [],
        page: 1,
        pageLength: 10,
        category: 1,
		tabState: wx.getStorageSync('tabState'),
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;
        that._getOrderList({
            id: wx.getStorageSync('userId'),
            page: 1,
            category_id: that.data.category
        }, res => {
            console.log(res);
            that.setData({
                list: res.data.result,
                preList: res.data.result
            })
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
        let page = that.data.page;
        page++;

        if (that.data.preList.length == that.data.pageLength) {
            that._getOrderList({
                id: wx.getStorageSync('userId'),
                page,
                category_id: that.data.category
            }, res => {
                console.log(res);
                that.setData({
                    list: that.data.list.concat(res.data.result),
                    preList: res.data.result,
                    page
                })
            });
        }
    },

    _getOrderList(data, callback) {
        wx.showLoading({
            title: '加载中...',
        })

        req({
            url: '/UserCall/my_order',
            method: 'POST',
            data,
            success: res => {
                wx.hideLoading();
                callback(res);
            },
            fail: err => {
                console.log(err);
            }
        })
    },

    changeNav(e) {
        let index = e.currentTarget.dataset.index;

        that.setData({
            navIndex: index,
            page: 1,
            category: Number(index) + 1
        })

        that._getOrderList({
            id: wx.getStorageSync('userId'),
            page: 1,
            category_id: that.data.category
        }, res => {
            console.log(res);
            that.setData({
                list: res.data.result,
                preList: res.data.result
            })
        });
    },
	jumppage(e) {
	    let id = e.currentTarget.dataset.id;
	    let type = e.currentTarget.dataset.type;
	    if(type == 1 || type == 2 || type == 3){
			//专车 顺风 代买
			wx.navigateTo({
			    url: '/pages/my/order/detail/detail?id=' + id,
			})
		}else{
			//代驾
			wx.navigateTo({
			    url: '/pages/my/order/detaildj/detaildj?id=' + id,
			})
		}
	}
})
