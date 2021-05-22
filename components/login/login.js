// components/login/login.js
const app = getApp();
const $req = app.globalData.$req;

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isHidden: {
            type: Boolean,
            default: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        verifyCode: '',
        phone: '',
        showCutDown: false,
        cutDownNum: 60,
        timer: null
    },

    /**
     * 组件的方法列表
     */
    methods: {
        getPhone(e) {
            let val = e.detail.value;
            this.setData({
                phone: val
            })
        },

        getVerifyCode(e) {
            let val = e.detail.value;
            this.setData({
                verifyCode: val
            })
        },

        sendVerifyCode() {
            let timer = this.data.timer;

            if (this.data.phone == '') return;

            $req({
                url: '/User/get_verify_code',
                method: 'POST',
                data: {
                    account: this.data.phone
                },
                success: res => {

                    wx.showToast({
                        title: '验证码已发送',
                    })
                },
                fail: err => {
                    console.log(err);
                }
            })

            this.setData({
                showCutDown: true
            })

            timer = setInterval(() => {
                let cutDownNum = this.data.cutDownNum;

                this.setData({
                    cutDownNum: --cutDownNum
                })

                if (cutDownNum == -1) {
                    this.setData({
                        showCutDown: false,
                        cutDownNum: 60
                    })
                }
            }, 1000)

            this.setData({
                timer
            })
        },

        debounce(func, wait, immediate) {
            let timer;
            return function() {
              let context = this,
                  args = arguments;
                   
              if (timer) clearTimeout(timer);
              if (immediate) {
                let callNow = !timer;
                timer = setTimeout(() => {
                  timer = null;
                }, wait);
                if (callNow) func.apply(context, args);
              } else {
                timer  = setTimeout(() => {
                  func.apply
                }, wait)
              }
            }
        },

        loginBtn() {

            if (this.data.verifyCode == '' || this.data.phone == '') return;

            wx.showLoading({
                title: '登录中...',
            })

            wx.login({
                success: code => {
                    $req({
                        url: '/User/login',
                        method: 'POST',
                        data: {
                            type: '1',
                            account: this.data.phone,
                            code: this.data.verifyCode,
                            md5: this.data.md5,
                            loginCode: code.code
                        },
                        success: res => {
                            wx.hideLoading();
       //                      if(res.data.msg == '登录成功啦'){
							// 	wx.setStorageSync('tabState', '3');
							// }else{
							// 	wx.setStorageSync('tabState', '6');
							// }
							// console.log(wx.getStorageSync('tabState'));
                            wx.showToast({
                                title: '登录成功',
                                success: () => {
                                    wx.setStorageSync('userId', res.data.result);
									wx.setStorageSync('agreement_flg', 0);
									wx.setStorageSync('agreement_flg2', 0);
									wx.setStorageSync('agreement_flg3', 0);
                                    this.triggerEvent('loginResult', {result: 'success'});
                                }
                            })
                        },
                        fail: err => {
                            console.log(err);
                        }
                    })
                },
            })
        },

        close() {
            this.triggerEvent('closeLogin');

            this.setData({
                cutDownNum: 60,
                showCutDown: false
            })
        }
    }
})
