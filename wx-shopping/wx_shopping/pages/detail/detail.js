import checkAuth from "../../utils/checkAuth"
import request from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailInfo: null,
    current: 0,
    commentList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.id = options.id
    this.title = options.title
    wx.setNavigationBarTitle({
      title: this.title,
    })
    this.getDetailInfo(this.id)
    this.getCommentInfo()
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
    wx.previewImage({
      current: e.currentTarget.dataset.current,
      urls: this.data.detailInfo.slides.map(item => `http://localhost:3000${item}`),
    })
  },
  handleActive(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      current: index
    })
  },
  // 获取商品详情
  getDetailInfo(id) {
    request({
      url: `/goods/${id}`
    }).then((res) => {
      // console.log(res);
      this.setData({
        detailInfo: res
      })
    })
  },
  // 获取评论信息
  getCommentInfo() {
    request({
      url: "/comments"
    }).then((res) => {
      // console.log(res);
      this.setData({
        commentList: res
      })
    })
  },
  // 跳转购物车
  handleShopCar() {
    wx.switchTab({
      url: '/pages/shopcar/shopcar',
    })
  },
  // 加入购物车
  handleAdd() {
    checkAuth(() => {
      let nickName = wx.getStorageSync('token').nickName
      let tel = wx.getStorageSync('tel')
      let goodsId = this.data.detailInfo.id
      //先查询
      request({
        url: "/carts",
        data: {
          tel,
          goodsId,
          nickName
        }
      }).then(res => {
        // console.log(res);
        if (res.length === 0) {
          //查询后没有数据，使用post，存username和number
          return request({
            url: "/carts",
            method: "post",
            data: {
              "username": nickName,
              "tel": tel,
              "goodsId": goodsId,
              "number": 1,
              "checked": false
            }
          })
        } else {
          //查询后有数据，使用put，添加number
          return request({
            url: `/carts/${res[0].id}`,
            method: "put",
            data: {
              ...res[0],
              number: res[0].number + 1
            }
          })
        }
      }).then(res => {
        wx.showToast({
          title: '加入购物车成功'
        })
      })
    })

  }

})