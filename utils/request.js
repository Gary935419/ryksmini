const API_HOST = "https://ryks.ychlkj.cn/index.php/home";
// const API_HOST = "http://192.168.110.82/index.php/home";
const MD5 = '4EF82E3603825745124695977A46E8C2';

const $req = (obj) => {
    if (obj.method === undefined) {
        obj.method = 'GET';
    }

    if (obj.data === undefined) {
        obj.data = {}
    }

    if (obj.header === undefined) {
        obj.header = {
            'content-type': 'application/json'
        }

        if (obj.method === 'POST') {
            obj.header = {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }
    }

    if (obj.type == 'upload') {
        wx.uploadFile({
            url: `${API_HOST}${obj.url}`,
            filePath: obj.imgTempPath.path,
            name: 'ImageFile',
            header: {
                'content-type': 'multipart/form-data',
                Token: wx.getStorageSync('token')
            },
            formData: obj.data,
            success: res => {
                console.log(res);
                res.data = JSON.parse(res.data);
                if (res.data.success === 'true') {
                    if (obj.success) {
                        obj.success(res);
                    }
                } else {
                    console.error(res.data.msg);
                    console.error(res);

                    if (obj.fail) {
                        obj.fail(res);
                    }
                }
            },
            fail: err => {
                console.error('请求失败');
                console.error(err);
                // wx.showToast({
                //     title: '接口错误',
                //     icon: 'none'
                // })
            },
            complete: resp => {
                if (obj.complete) {
                    obj.complete(resp);
                }
            }
        })
    } else {
        obj.data.md5 = MD5;

        wx.request({
            url: `${API_HOST}${obj.url}`,
            method: obj.method,
            data: obj.data,
            header: obj.url == '/Login/userLogin' ? {
                'content-type': 'application/x-www-form-urlencoded'
            } : {
                'content-type': 'application/x-www-form-urlencoded',
                Token: wx.getStorageSync('token')
            },
            success: res => {
                if (res.data.status == 200) {
                    if (obj.success) {
                        obj.success(res);
                    }
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                    if (obj.fail) {
                        obj.fail(res);
                    }
                }
            },
            fail: err => {
                console.error('请求失败');
                console.error(err);
                // wx.showToast({
                //     title: '接口错误',
                //     icon: 'none'
                // })
            },
            complete: resp => {
                if (obj.complete) {
                    obj.complete(resp);
                }
            }
        })
    }
}

module.exports = {
    $req
}
