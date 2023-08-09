import request from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: []
  },
  priceOrder: true,
  commentOrder: true,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options);
    let title = options.title
    let id = options.id
    wx.setNavigationBarTitle({
      title: title,
    })
    this.getGoodsList(id)
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
  handleTap(e) {
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&title=${title}`,
    })
  },
  getGoodsList(id) {
    request({
      url: `/categories/${id}?_embed=goods`
    }).then(res => {
      // console.log(res);
      this.setData({
        goodsList: res.goods
      })
    })
  },
  handlePrice(e) {
    console.log("handlePrice");
    this.priceOrder = !this.priceOrder
    this.setData({
      goodsList: this.priceOrder ? this.data.goodsList.sort((item1, item2) => item1.price - item2.price) : this.data.goodsList.sort((item1, item2) => item2.price - item1.price)
    })
  },
  handleComment(e) {
    console.log("handleComment");
    this.commentOrder = !this.commentOrder
    this.setData({
      goodsList: this.commentOrder ? this.data.goodsList.sort((item1, item2) => parseInt(item1.goodscomment) - parseInt(item2.goodscomment)) : this.data.goodsList.sort((item1, item2) => parseInt(item2.goodscomment) - parseInt(item1.goodscomment))
    })
  }
})