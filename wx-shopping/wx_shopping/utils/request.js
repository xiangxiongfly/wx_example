function request(params, isHeader = false) {
  return new Promise((resolve, reject) => {
    //显示loading
    wx.showLoading({
      title: "正在加载"
    })
    wx.request({
      ...params,
      url: 'http://localhost:5001' + params.url,
      success: (res) => {
        if (isHeader) {
          resolve({
            list: res.data,
            totle: res.header["X-Total-Count"]
          })
        } else {
          resolve(res.data)
        }
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        //隐藏loading    
        wx.hideLoading()
      }
    })
  })
}

export default request;