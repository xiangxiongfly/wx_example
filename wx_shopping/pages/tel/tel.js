import request from "../../utils/request"

// pages/tel/tel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  tel: "",

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  handleInputChange(e) {
    this.tel = e.detail.value
  },
  handleSubmit() {
    if (this.tel.length === 0) {
      wx.showToast({
        title: '请输入手机号',
        icon: "none"
      })
      return
    }

    request({
      url: `/users?tel=${this.tel}&nickName=${wx.getStorageSync('token').nickName}`
    }).then(res => {

      if (res.length === 0) {
        console.log("wu");
        request({
          url: '/users',
          method: "post",
          data: {
            ...wx.getStorageSync('token'),
            tel: this.tel
          }
        }).then(res => {
          wx.setStorageSync('tel', this.tel)
          wx.navigateBack({
            delta: 1
          })
        })
      } else {
        wx.setStorageSync('tel', this.tel)
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
})