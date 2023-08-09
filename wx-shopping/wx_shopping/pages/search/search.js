const {
  default: request
} = require("../../utils/request")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      search: this.search.bind(this)
    })
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
  search(value) {
    // console.log("search");
    return Promise.all([
      request({
        url: `/categories?title_like=${value}`
      }),
      request({
        url: `/goods?title_like=${value}`
      })
    ]).then((res) => {
      // console.log("res", res);
      let a = res[0].map((item) => ({
        ...item,
        text: item.title,
        type: 1
      }))
      let b = res[1].map((item) => ({
        ...item,
        text: item.title,
        type: 2
      }))
      return [...a, ...b]
    })
  },
  handleSelectResult(e) {
    console.log(e);
    if (e.detail.item.type === 1) {
      console.log("跳转搜索列表");
      let id = e.detail.item.id
      let title = e.detail.item.title
      wx.navigateTo({
        url: `/pages/search_list/search_list?id=${id}&title=${title}`,
      })
    } else if (e.detail.item.type === 2) {
      console.log("跳转详情");
      let id = e.detail.item.id
      let title = e.detail.item.title
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}&title=${title}`,
      })
    }
  }
})