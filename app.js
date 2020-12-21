//app.js
const { $req } = require('./utils/request.js');

App({
    onLaunch: function () {

       

        wx.getSystemInfo({
            complete: (res) => {
                this.globalData.systemInfo = res;
            },
        })
    },

    globalData: {
        systemInfo: null,
        userInfo: null,
        $req
    }
})