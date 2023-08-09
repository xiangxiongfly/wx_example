const baseUrl = "http://localhost:3000"

function request(url, method, option) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method,
      ...option,
      success: res => {
        resolve(res.data)
      },
      fail: err => {
        reject(err)
      },
      complete: () => {}
    })
  })
}

function get(url, data) {
  return request(url, "GET", {
    data
  })
}

function post(url, data) {
  return request(url, "POST", {
    data
  })
}

export {
  get,
  post
}