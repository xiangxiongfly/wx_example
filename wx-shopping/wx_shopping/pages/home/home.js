import request from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideList: [],
    goodsList: []
  },
  current: 1,
  total: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.renderSwiper()
    this.renderGoods()
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
    console.log("下拉刷新");
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.goodsList.length === this.total) {
      return
    }
    console.log("到底了");
    this.current++
    this.renderGoods()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  //渲染轮播图
  renderSwiper() {
    request({
      url: "/slides"
    }).then(res => {
      // console.log(res);
      this.setData({
        slideList: res
      })
    })
  },
  //渲染商品列表
  renderGoods() {
    request({
      "url": `/goods?_page=${this.current}&_limit=5`
    }, true).then(res => {
      // console.log(res);
      this.total = parseInt(res.total)
      this.setData({
        goodsList: [...this.data.goodsList, ...res.list]
      })
    })
  },
  //跳转search页面
  handleEvent() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 跳转详情
  toDetail(e) {
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&title=${title}`,
    })
  }
})