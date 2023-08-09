import checkAuth from "../../utils/checkAuth"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

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
    checkAuth(() => {
      this.setData({
        userInfo: wx.getStorageSync('token')
      })
    })
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
  handleTap() {
    wx.chooseMedia({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        let tempFiles = res.tempFiles
        let path = tempFiles[0].tempFilePath
        // console.log(path);
        this.setData({
          userInfo: {
            ...this.data.userInfo,
            avatarUrl: path
          }
        })
        wx.setStorageSync('token', {
          ...wx.getStorageSync('token'),
          avatarUrl: path
        })
      }
    })
  }
})