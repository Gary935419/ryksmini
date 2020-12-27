const app = getApp();
const req = app.globalData.$req;
let that;
Page({
    data: {
        hideLogin: true,
        userId: wx.getStorageSync('userId'),
		agreement_flg: wx.getStorageSync('agreement_flg'),
		agreement_flg2: wx.getStorageSync('agreement_flg2'),
		agreement_flg3: wx.getStorageSync('agreement_flg3'),
        currentTab: 0,//0:专车送 1:顺风送 2:代买 3:代驾
        currentBtn: 0,//0:日常代驾 1:包时代驾
		currentBtn1: 0,//0:指定地址 1:附近地址
        currentPrice: -1,
        rewardPrice: '',
        hideReward: true,
		hideProtect: true,
		hideGoodname:true,
		hideRemark: true,
		hideDetail:true,
        couponItemData: null,
        totalPrice: 0,
		totalDistance:0,
        navData: [
            {
                name: '专车送'
            },
            {
                name: '顺路送'
            },
            {
                name: '代买'
            },
            {
                name: '代驾'
            },
        ],
        latitude: 39.913828,
        longitude: 116.402544,
        mapCtx: null,
        locationName: '',
        markers: [
            {
                iconPath: "/static/images/icon-map-mark.png",
                id: 0,
                latitude: 39.913828,
                longitude: 116.402544,
                width: 40,
                height: 40,
				callout:{
					content:'加载中~~~',
					color:'#FFFFFF',
					fontSize:16,
					display:'ALWAYS',
					textAlign:'center',
					borderRadius:10,
					padding:8,
					borderWidth:3,
					bgColor:'#ff0000',
					borderColor:'#ff0000'
				},
          }
        ],
        radio2Index: 1,   // 代买
        writeItemArr: [   // 帮我取
            {
                value: '',   // location
                start_longitude: '',
                start_latitude: '',
                address: '',   // 地图获取的地址
                addressDetail: '',   // 手动输入的地址详情
				name:'',
				tel:'',
            },
            {
                value: '',
                end_longitude: '',
                end_latitude: '',
                address: '',
                addressDetail: '',   // 手动输入的地址详情
				name:'',
				tel:'',
            },
        ],
        tipsArr: [
            { price: '2' },
            { price: '6' },
            { price: '10' },
            { price: '12' },
        ],
        remarks: '', //备注
        goods_name: '',//物品名称
		protect_price: 0,//保价费
		tip_price: 0,//小费
		protect_price_now:'',//被保费
		protect_price_proportion:1/100,//保价比例
        pickerDate: '请选择(必填项)',
        pickerTime: '请选择(必填项)',
    },
    //初始化页面
    onLoad: function () {
        that = this;
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.userLocation']) {
                    wx.authorize({
                        scope: 'scope.userLocation',
                        success: () => {
                            that.getUserLocation();
                        },
                        fail: () => {
                            wx.showToast({
                                title: '拒绝获取地理位置，将会影响您使用小程序',
                                icon: 'none',
                                success: res => {
                                    wx.openSetting({
                                        complete: (res) => {},
                                    })
                                }
                            })
                        }
                    })
                } else {
                    that.getUserLocation();
                }
            }
        })
    },
	/**
	* 生命周期函数--监听页面显示
	*/
	onShow: function() {
		let d = this.data;
	   console.log(this.data.writeItemArr);
	   if(d.currentBtn1 == 1){
	   	if (d.writeItemArr[1].address != '') {
	   		if(d.pickerDate != '请选择(必填项)' && d.pickerTime != '请选择(必填项)'){
	   			that.calTotalPrice();
	   		}else{
	   			wx.showToast({
	   			    title: '请完善时间信息',
	   			    icon: 'none'
	   			})
	   			return;
	   		}
	   	}
	   }else{
	   	if (d.writeItemArr[0].address != '' && d.writeItemArr[1].address != '') {
	   	    if(d.pickerDate != '请选择(必填项)' && d.pickerTime != '请选择(必填项)'){
	   	    	that.calTotalPrice();
	   	    }else{
	   	    	wx.showToast({
	   	    	    title: '请完善时间信息',
	   	    	    icon: 'none'
	   	    	})
	   	    	return;
	   	    }
	   	}
	   }
	   if(d.couponItemData != null){
		   that.calTotalPrice();
	   }
	},
    //获得用户当前坐标
    getUserLocation(){
        wx.getLocation({
            success: resp => {
                console.log(resp);
				var num = Math.floor(Math.random()*10 + 1);
				var content_new = '有'+num+'名司机正在附近服务~~~';
				console.log(content_new);
                that.setData({
                    latitude: resp.latitude,
                    longitude: resp.longitude,
					markers: [
					    {
					        iconPath: "/static/images/icon-map-mark.png",
					        id: 0,
					        latitude: resp.latitude,
					        longitude: resp.longitude,
					        width: 40,
					        height: 40,
							callout:{
								content:content_new,
								color:'#FFFFFF',
								fontSize:16,
								display:'ALWAYS',
								textAlign:'center',
								borderRadius:10,
								padding:8,
								borderWidth:3,
								bgColor:'#ff0000',
								borderColor:'#ff0000'
							},
					  }
					],
                })
            }
        })
    },
    //顶部菜单点击选中
    switchNav(e) {
        let index = e.currentTarget.dataset.current;
        let name = e.currentTarget.dataset.name;
        that.setData({
            currentTab: index,
			hideLogin: true,
			agreement_flg: wx.getStorageSync('agreement_flg'),
			agreement_flg2: wx.getStorageSync('agreement_flg2'),
			agreement_flg3: wx.getStorageSync('agreement_flg3'),
			userId: wx.getStorageSync('userId'),
			currentBtn: 0,//0:日常代驾 1:包时代驾
			currentBtn1: 0,//0:指定地址 1:附近地址
			currentPrice: -1,
			rewardPrice: '',
			hideReward: true,
			hideProtect: true,
			hideGoodname:true,
			hideRemark: true,
			hideDetail:true,
			couponItemData: null,
			totalPrice: 0,
			totalDistance:0,
			mapCtx: null,
			locationName: '',
			writeItemArr: [   // 帮我取
			    {
			        value: '',   // location
			        start_longitude: '',
			        start_latitude: '',
			        address: '',   // 地图获取的地址
			        addressDetail: '',   // 手动输入的地址详情
					name:'',
					tel:'',
			    },
			    {
			        value: '',
			        end_longitude: '',
			        end_latitude: '',
			        address: '',
			        addressDetail: '',   // 手动输入的地址详情
					name:'',
					tel:'',
			    },
			],
			remarks: '', //备注
			goods_name: '',//物品名称
			protect_price: 0,//保价费
			tip_price: 0,//小费
			protect_price_now:'',//被保费
			protect_price_proportion:1/100,//保价比例
			pickerDate: '请选择(必填项)',
			pickerTime: '请选择(必填项)',
        })
    },
    //地图移动
    mapRegionChange(e) {
        console.log(e);
        let mapCtx = that.data.mapCtx;
        if (!mapCtx) {
            mapCtx = wx.createMapContext("hook-map");
            that.setData({
                mapCtx
            })
        }
        if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')) {
            wx.chooseLocation({
                success: resp => {
					var num = Math.floor(Math.random()*10 + 1);
					var content_new = '有'+num+'名司机正在附近服务~~~';
					console.log(content_new);
					that.setData({
					    latitude: resp.latitude,
					    longitude: resp.longitude,
					    'markers[0].latitude': resp.latitude,
					    'markers[0].longitude': resp.longitude,
					    locationName: resp.name,
						markers: [
						    {
						        iconPath: "/static/images/icon-map-mark.png",
						        id: 0,
						        latitude: resp.latitude,
						        longitude: resp.longitude,
						        width: 40,
						        height: 40,
								callout:{
									content:content_new,
									color:'#FFFFFF',
									fontSize:16,
									display:'ALWAYS',
									textAlign:'center',
									borderRadius:10,
									padding:8,
									borderWidth:3,
									bgColor:'#ff0000',
									borderColor:'#ff0000'
								},
						  }
						],
					})
                }
            })
        }
    },
    //日期选择
    bindDateChange(e) {
		let d = that.data;
        that.setData({
            pickerDate: e.detail.value
        })
		if(d.currentBtn1 == 1){
			if (d.writeItemArr[1].address != '') {
				if(d.pickerDate != '请选择(必填项)' && d.pickerTime != '请选择(必填项)'){
					that.calTotalPrice();
				}else{
					wx.showToast({
					    title: '请完善时间信息',
					    icon: 'none'
					})
					return;
				}
			}
		}else{
			if (d.writeItemArr[0].address != '' && d.writeItemArr[1].address != '') {
			    if(d.pickerDate != '请选择(必填项)' && d.pickerTime != '请选择(必填项)'){
			    	that.calTotalPrice();
			    }else{
			    	wx.showToast({
			    	    title: '请完善时间信息',
			    	    icon: 'none'
			    	})
			    	return;
			    }
			}
		}
    },
    //时间选择
    bindTimeChange(e) {
		let d = that.data;
        that.setData({
            pickerTime: e.detail.value
        })
		if(d.currentBtn1 == 1){
			if (d.writeItemArr[1].address != '') {
				if(d.pickerDate != '请选择(必填项)' && d.pickerTime != '请选择(必填项)'){
					that.calTotalPrice();
				}else{
					wx.showToast({
					    title: '请完善时间信息',
					    icon: 'none'
					})
					return;
				}
			}
		}else{
			if (d.writeItemArr[0].address != '' && d.writeItemArr[1].address != '') {
			    if(d.pickerDate != '请选择(必填项)' && d.pickerTime != '请选择(必填项)'){
			    	that.calTotalPrice();
			    }else{
			    	wx.showToast({
			    	    title: '请完善时间信息',
			    	    icon: 'none'
			    	})
			    	return;
			    }
			}
		}
    },
    //选择地图具体位置
    onInputTap(e) {
        let type = e.currentTarget.dataset.type;
        let index = e.currentTarget.dataset.index;
        let d = that.data;
		var lat = d.latitude;
		var lon = d.longitude;
        wx.chooseLocation({
            latitude: lat,
            longitude: lon,
            success: (res) => {
                console.log(res);
                let addressName = res.name;
                let address = res.address;
                let latitude = res.latitude;
                let longitude = res.longitude;

                that.setData({
                    [`writeItemArr[${index}].value`]: addressName
                })

                if (index == 0) {
                    that.setData({
                        [`writeItemArr[${index}].start_longitude`]: longitude,
                        [`writeItemArr[${index}].start_latitude`]: latitude,
                        [`writeItemArr[${index}].address`]: address,   // 详细地址
						[`writeItemArr[${index}].addressDetail`]: address,   // 详细地址
                    })
                } else if (index == 1) {
                    that.setData({
                        [`writeItemArr[${index}].end_longitude`]: longitude,
                        [`writeItemArr[${index}].end_latitude`]: latitude,
                        [`writeItemArr[${index}].address`]: address,   // 详细地址
						[`writeItemArr[${index}].addressDetail`]: address,   // 详细地址
                    })
                }
                if(d.currentBtn1 == 1){
					if (d.writeItemArr[1].address != '') {
						if(d.pickerDate != '请选择(必填项)' && d.pickerTime != '请选择(必填项)'){
							that.calTotalPrice();
						}else{
							wx.showToast({
							    title: '请完善时间信息',
							    icon: 'none'
							})
							return;
						}
					}
				}else{
					if (d.writeItemArr[0].address != '' && d.writeItemArr[1].address != '') {
					    if(d.pickerDate != '请选择(必填项)' && d.pickerTime != '请选择(必填项)'){
					    	that.calTotalPrice();
					    }else{
					    	wx.showToast({
					    	    title: '请完善时间信息',
					    	    icon: 'none'
					    	})
					    	return;
					    }
					}
				}
            },
        })
    },
	//常用地址跳转
	jumpaddresspage(e) {
	    let type = e.currentTarget.dataset.type;
	    if(type == 1){
	    	//起点
	    	wx.navigateTo({
	    	    url: '/pages/my/setting/usualAddress/usualAddress?type=' + type,
	    	})
	    }else{
	    	//终点
	    	wx.navigateTo({
	    	    url: '/pages/my/setting/usualAddress/usualAddress?type=' + type,
	    	})
	    }
	},
    //第一个输入详细地址
    inputAddressDetailFirst(e) {
        that.setData({
            [`writeItemArr[0].addressDetail`]: e.detail.value
        })
    },
	//第一个输入姓名
	inputNameFirst(e) {
	    that.setData({
	        [`writeItemArr[0].name`]: e.detail.value
	    })
	},
	//第一个输入电话
	inputTelFirst(e) {
	    that.setData({
	        [`writeItemArr[0].tel`]: e.detail.value
	    })
	},
    //第二个输入详细地址
    inputAddressDetailSecond(e) {
        that.setData({
            [`writeItemArr[1].addressDetail`]: e.detail.value
        })
    },
	//第二个输入姓名
	inputNameSecond(e) {
	    that.setData({
	        [`writeItemArr[1].name`]: e.detail.value
	    })
	},
	//第二个输入电话
	inputTelSecond(e) {
	    that.setData({
	        [`writeItemArr[1].tel`]: e.detail.value
	    })
	},
    //设置备注
    inputRemarks(e) {
        that.setData({
            remarks: e.detail.value
        })
    },
	//设置物品信息
    inputGoodname(e) {
        that.setData({
            goods_name: e.detail.value
        })
    },
	//计算价格
    calTotalPrice() {
        let d = that.data;
        let data = {
            start_longitude: d.writeItemArr[0].start_longitude,
            start_latitude: d.writeItemArr[0].start_latitude,
            end_longitude: d.writeItemArr[1].end_longitude,
            end_latitude: d.writeItemArr[1].end_latitude,
            category_type: Number(d.currentTab) + 1,   // 帮我取 帮我送.. 依次类推
			category_type_buy: d.currentBtn1,
			pickerDate: d.pickerDate,
			pickerTime: d.pickerTime,
			name: d.writeItemArr[1].name,
			tel: d.writeItemArr[1].tel,
        }

        d.couponItemData == null ? false : data.couponId = d.couponItemData.id;
        d.currentPrice == -1 ? ( d.rewardPrice == '' ? false : data.tip = d.rewardPrice) : data.tip = d.tipsArr[d.currentPrice].price; 
        d.protect_price == '' ? '0' : data.protect_price = d.protect_price;
		
		console.log(data);
        req({
            url: '/UserCall/order_money',
            method: 'POST',
            data,
            success: res => {
                wx.hideLoading();
                console.log(res);
                that.setData({
                    totalPrice: res.data.result.money,
					totalDistance: res.data.result.distance,
					tip_price:res.data.result.tip_price,
                })
            },
            fail: err => {
                console.log(err);
            }
        })
    },
    //提交订单（专车送 顺丰送 代买）
    submitGetOrder() {
        let userId = that.data.userId;
        let d = that.data;
        if (!wx.getStorageSync('userId')) {
            that.setData({
                hideLogin: false
            })
            return;
        }
        if (d.writeItemArr[0].value == '' && d.currentBtn1 != 1) {
            if (d.currentTab == 0) {
                wx.showToast({
                    title: '请完善地址信息',
                    icon: 'none'
                })
                return;
            } else if (d.currentTab == 1 || d.currentTab == 2) {
                wx.showToast({
                    title: '请完善地址信息',
                    icon: 'none'
                })
                return;
            }
        }

        if (d.writeItemArr[1].value == '') {
            if (d.currentTab == 0) {
                wx.showToast({
                    title: '请完善地址信息',
                    icon: 'none'
                })
                return;
            } else if (d.currentTab == 1 || d.currentTab == 2) {
                wx.showToast({
                    title: '请完善地址信息',
                    icon: 'none'
                })
                return;
            }
        }
        if (d.writeItemArr[0].value == d.writeItemArr[1].value) {
            wx.showToast({
                title: '地点不能为同一个',
                icon: 'none'
            })
            return;
        }
		if(d.pickerDate == '请选择(必填项)' || d.pickerTime == '请选择(必填项)'){
			wx.showToast({
			    title: '请完善时间信息',
			    icon: 'none'
			})
			return;
		}
		if (d.writeItemArr[1].name == '') {
		    wx.showToast({
		        title: '请完善必填项姓名',
		        icon: 'none'
		    })
		    return;
		}
		if (d.writeItemArr[1].tel == '') {
		    wx.showToast({
		        title: '请完善必填项电话',
		        icon: 'none'
		    })
		    return;
		}
		if (d.goods_name == '') {
		    wx.showToast({
		        title: '请完善物品名称',
		        icon: 'none'
		    })
		    return;
		}
		if(d.currentTab === '2'){
			if (d.agreement_flg2 != 1) {
			    wx.showToast({
			        title: '请先勾选代买用户协议',
			        icon: 'none'
			    })
			    return;
			}
		}else if(d.currentTab === '3'){
			if (d.agreement_flg3 != 1) {
			    wx.showToast({
			        title: '请先勾选代驾用户协议',
			        icon: 'none'
			    })
			    return;
			}
		}else{
			if (d.agreement_flg != 1) {
			    wx.showToast({
			        title: '请先勾选用户协议',
			        icon: 'none'
			    })
			    return;
			}
		}
        wx.showLoading({
            title: '提交中...',
        })
        let data = {
            id: d.userId,
            start_location: d.writeItemArr[0].value,
            start_address: d.writeItemArr[0].address,
            start_longitude: d.writeItemArr[0].start_longitude,
            start_latitude: d.writeItemArr[0].start_latitude,
			address1: d.writeItemArr[0].addressDetail,
            end_location: d.writeItemArr[1].value,
            end_address: d.writeItemArr[1].address,
            end_longitude: d.writeItemArr[1].end_longitude,
            end_latitude: d.writeItemArr[1].end_latitude,
			address2: d.writeItemArr[1].addressDetail,
            price: d.totalPrice,
            category_type: Number(d.currentTab) + 1,
			pickerDate: d.pickerDate,
			pickerTime: d.pickerTime,
			name1: d.writeItemArr[0].name,
			tel1: d.writeItemArr[0].tel,
			name: d.writeItemArr[1].name,
			tel: d.writeItemArr[1].tel,
			goods_name: d.goods_name,
			goods_remarks: d.remarks,
			distribution_km: d.totalDistance,
			protect_price:d.protect_price,
			tip_price:d.tip_price,
        }
        d.couponItemData == null ? false : data.couponId = d.couponItemData.id;
        req({
            url: '/UserCall/call_traffic',
            method: 'POST',
            data,
            success: res => {
                wx.hideLoading();
                wx.showModal({
                    title: '提示',
                    content: res.data.msg,
                    showCancel: false,
                    success: () => {
                        wx.navigateTo({
                            url: `/pages/pay/pay?orderId=${res.data.result}`,
                        })
                    }
                })
            },
            fail: err => {
                console.log(err);
            }
        })
    },
    //提交订单（代驾）
    submitDriverOrder() {
        let userId = that.data.userId;
        let d = that.data;
        if (!wx.getStorageSync('userId')) {
            that.setData({
                hideLogin: false
            })
            return;
        }
        if (d.writeItemArr[0].value == '') {
            wx.showToast({
                title: '请完善地址信息',
                icon: 'none'
            })
            return;
        }
        if (d.writeItemArr[1].value == '') {
            wx.showToast({
                title: '请完善地址信息',
                icon: 'none'
            })
            return;
        }
        if (d.writeItemArr[0].value == d.writeItemArr[1].value) {
            wx.showToast({
                title: '地点不能为同一个',
                icon: 'none'
            })
            return;
        }
        if(d.pickerDate == '请选择(必填项)' || d.pickerTime == '请选择(必填项)'){
        	wx.showToast({
        	    title: '请完善时间信息',
        	    icon: 'none'
        	})
        	return;
        }
        if (d.writeItemArr[1].name == '') {
            wx.showToast({
                title: '请完善必填项姓名',
                icon: 'none'
            })
            return;
        }
        if (d.writeItemArr[1].tel == '') {
            wx.showToast({
                title: '请完善必填项电话',
                icon: 'none'
            })
            return;
        }
		if(d.currentTab === '2'){
			if (d.agreement_flg2 != 1) {
			    wx.showToast({
			        title: '请先勾选代买用户协议',
			        icon: 'none'
			    })
			    return;
			}
		}else if(d.currentTab === '3'){
			if (d.agreement_flg3 != 1) {
			    wx.showToast({
			        title: '请先勾选代驾用户协议',
			        icon: 'none'
			    })
			    return;
			}
		}else{
			if (d.agreement_flg != 1) {
			    wx.showToast({
			        title: '请先勾选用户协议',
			        icon: 'none'
			    })
			    return;
			}
		}
        wx.showLoading({
            title: '提交中...',
        })

        let data = {
            id: d.userId,
            car_type_id: Number(d.currentBtn) + 1,
            start_location: d.writeItemArr[0].value,
            start_address: d.writeItemArr[0].address,
            start_longitude: d.writeItemArr[0].start_longitude,
            start_latitude: d.writeItemArr[0].start_latitude,
			address1: d.writeItemArr[0].addressDetail,
            end_location: d.writeItemArr[1].value,
            end_address: d.writeItemArr[1].address,
            end_longitude: d.writeItemArr[1].end_longitude,
            end_latitude: d.writeItemArr[1].end_latitude,
			address2: d.writeItemArr[1].addressDetail,
			price: d.totalPrice,
			pickerDate: d.pickerDate,
			pickerTime: d.pickerTime,
			name1: d.writeItemArr[0].name,
			tel1: d.writeItemArr[0].tel,
			name: d.writeItemArr[1].name,
			tel: d.writeItemArr[1].tel,
			distribution_km: d.totalDistance,
			tip_price:d.tip_price,
			remarks: d.remarks,
        }
        d.couponItemData == null ? false : data.couponId = d.couponItemData.id;
        req({
            url: '/UserCall/call_town',
            method: 'POST',
            data,
            success: res => {
                wx.hideLoading();
                wx.showModal({
                    title: '提示',
                    content: res.data.msg,
                    showCancel: false,
                    success: () => {
                        wx.navigateTo({
                            url: `/pages/pay/pay?orderId=${res.data.result}`,
                        })
                    }
                })
            },
            fail: err => {
                console.log(err);
            }
        })
    },
    //提交订单
    submitOrder() {
        let type = Number(that.data.currentTab);
        if (type == 3) {
			//提交订单（代驾）
            that.submitDriverOrder();
        } else {
            //提交订单（专车送 顺丰送 代买）
            that.submitGetOrder();
        }
    },
    //小费金额修改
    changePrice(e) {
        let index = e.currentTarget.dataset.index;

        that.setData({
            currentPrice: index
        })
    },
    //小费金额 录入
    priceInputFocus() {
        that.setData({
            currentPrice: -1
        })
    },
	//小费金额 录入
    priceInput(e) {
        let val = e.detail.value;
        let reg = new RegExp(/^[0-9]*$/);

        if (reg.exec(val)) {
            that.setData({
                rewardPrice: val
            })
        } else {
            wx.showToast({
                title: '请输入数字',
                icon: 'none'
            })

            that.setData({
                rewardPrice: ''
            })
        }
    },
	//代保金额录入
    priceInputhideProtect(e) {
        let val = e.detail.value;
        let reg = new RegExp(/^[0-9]*$/);
        let d = that.data;
        if (reg.exec(val)) {
			let val_now = val * d.protect_price_proportion;
            that.setData({
                protect_price_now: val,
				protect_price: val_now.toFixed(2)
            })
        } else {
            wx.showToast({
                title: '请输入数字',
                icon: 'none'
            })
        }
    },
	//login check 
    loginResult(e) {
        console.log(e);
        let result = e.detail.result;

        if (result == 'success') {
            that.setData({
                hideLogin: true,
                userId: wx.getStorageSync('userId')
            })
        }
    },
    //login check
    closeLogin() {
        that.setData({
            hideLogin: true
        })
    },
    //小费  确定或取消处理
    closeReward(e) {
        let type = e.currentTarget.dataset.type;
        let d = that.data;

        that.setData({
            hideReward: true
        })

        if (type == 'sure') {
            if (d.writeItemArr[0].address != '' &&  d.writeItemArr[1].address != '') {
                that.calTotalPrice();
            }else{ 
				if(d.writeItemArr[1].address != '' && d.currentBtn1 == 1){
					that.calTotalPrice();
				}else{
					that.setData({
						currentPrice: -1,
					    rewardPrice: ''
					});
					wx.showToast({
					  title: '请完善地址信息!',
					  icon: 'none',
					  duration: 2000
					})
				}
			}
        }else{
			that.setData({
				rewardPrice: ''
			});
		}
    },
	//保价费 确定或者取消处理
    closeProtect(e) {
        let type = e.currentTarget.dataset.type;
        let d = that.data;

        that.setData({
            hideProtect: true
        })

        if (type == 'sure') {
            if (d.writeItemArr[0].address != '' &&  d.writeItemArr[1].address != '') {
                that.calTotalPrice();
            }else{
				that.setData({
				    protect_price: ''
				});
				wx.showToast({
				  title: '请完善地址信息!',
				  icon: 'none',
				  duration: 2000
				})
			}
        }else{
			that.setData({
				protect_price: ''
			});
		}
    },
	//物品信息 确定或者取消处理
	closeGoodname(e) {
	    let type = e.currentTarget.dataset.type;
	    let d = that.data;
	    that.setData({
	        hideGoodname: true
	    })
	    if (type == 'sure') {
	        if (d.goods_name == '') {
	            wx.showToast({
	              title: '请完善物品信息!',
	              icon: 'none',
	              duration: 2000
	            })
	        }
	    }else{
			that.setData({
				goods_name: ''
			});
		}
	},
	//备注信息 确定或者取消处理
	closeRemark(e) {
	    let type = e.currentTarget.dataset.type;
	    let d = that.data;
	    that.setData({
	        hideRemark: true
	    })
	    if (type == 'sure') {
	        if (d.remarks == '') {
	            wx.showToast({
	              title: '请完善备注信息!',
	              icon: 'none',
	              duration: 2000
	            })
	        }
	    }else{
			that.setData({
				remarks: ''
			});
		}
	},
	//价格明细 确定或者取消处理
	closeDetail(e) {
	    let d = that.data;
	    that.setData({
	        hideDetail: true
	    })
	},
	//弹窗类型处理
    toNext(e) {
        let name = e.currentTarget.dataset.name;
        let userId = that.data.userId;

        if (!wx.getStorageSync('userId')) {
            that.setData({
                hideLogin: false
            })

            return;
        }

        switch (name) {
            case '优惠券':
                wx.navigateTo({
                    url: '/pages/index/coupon/coupon',
                })
                break;
            case '小费':
                that.setData({
                    hideReward: false
                })
                break;
			case '保价费':
				that.setData({
					hideProtect: false
				})
				break;
			case '物品信息':
				that.setData({
					hideGoodname: false
				})
				break;
			case '备注信息':
				that.setData({
					hideRemark: false
				})
				break;
			case '价格明细':
				that.setData({
					hideDetail: false
				})
				break;
        }
    },
	//代买模块 模式选择
	changeBtn1(e) {
	    let index = e.currentTarget.dataset.index;
	    that.setData({
	        currentBtn1: index,
			hideLogin: true,
			agreement_flg: wx.getStorageSync('agreement_flg'),
			agreement_flg2: wx.getStorageSync('agreement_flg2'),
			agreement_flg3: wx.getStorageSync('agreement_flg3'),
			userId: wx.getStorageSync('userId'),
			currentBtn: 0,//0:日常代驾 1:包时代驾
			currentPrice: -1,
			rewardPrice: '',
			hideReward: true,
			hideProtect: true,
			hideGoodname:true,
			hideRemark: true,
			hideDetail: true,
			couponItemData: null,
			totalPrice: 0,
			totalDistance:0,
			mapCtx: null,
			locationName: '',
			writeItemArr: [   // 帮我取
			    {
			        value: '',   // location
			        start_longitude: '',
			        start_latitude: '',
			        address: '',   // 地图获取的地址
			        addressDetail: '',   // 手动输入的地址详情
					name:'',
					tel:'',
			    },
			    {
			        value: '',
			        end_longitude: '',
			        end_latitude: '',
			        address: '',
			        addressDetail: '',   // 手动输入的地址详情
					name:'',
					tel:'',
			    },
			],
			remarks: '', //备注
			goods_name: '',//物品名称
			protect_price: 0,//保价费
			tip_price: 0,//小费
			protect_price_now:'',//被保费
			protect_price_proportion:1/100,//保价比例
			pickerDate: '请选择(必填项)',
			pickerTime: '请选择(必填项)',
	    })
	},
    //代驾模块 模式选择
    changeBtn(e) {
        let index = e.currentTarget.dataset.index;
        that.setData({
            currentBtn: index
        })
		if(index == 1){
			wx.showToast({
			    title: '开发中，敬请等待......',
			    icon: 'none'
			})
			return;
		}
    },
    //去我的个人中心
    toMy() {
        wx.navigateTo({
            url: '/pages/my/my',
        })
    }
})
