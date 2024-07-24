import checkAuth from "../../utils/checkAuth"
import request from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideButtons: [{
      type: 'warn',
      text: '删除'
    }],
    cartList: []
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
      this.getCartList()
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
  getCartList() {
    let nickName = wx.getStorageSync('token').nickName
    let tel = wx.getStorageSync('tel')
    console.log(nickName, tel);
    request({
      url: `/carts?&tel=${tel}&username=${nickName}&_expand=goods`
    }).then(res => {
      console.log(res);
      this.setData({
        cartList: res
      })
    })
  },
  handleMinus(e) {
    let item = e.currentTarget.dataset.item
    if (item.number === 1) {
      return
    }
    item.number--;
    this.handleUpdate(item)
  },
  handleAdd(e) {
    var item = e.currentTarget.dataset.item
    item.number++
    this.handleUpdate(item)
  },
  slideButtonTap(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      cartList: this.data.cartList.filter(item => item.id != id)
    })
    request({
      url: `/carts/${id}`,
      method: "delete"
    })
  },
  handleCheckbox(e) {
    let item = e.currentTarget.dataset.item
    item.checked = !item.checked
    this.handleUpdate(item)
  },
  handleUpdate(item) {
    this.setData({
      cartList: this.data.cartList.map(data => {
        if (data.id === item.id) {
          return item
        }
        return data
      })
    })
    request({
      url: `/carts/${item.id}`,
      method: "put",
      data: {
        "username": item.username,
        "tel": item.tel,
        "goodsId": item.goodsId,
        "number": item.number,
        "checked": item.checked,
      }
    })
  },
  handleAllChecked(e) {
    if (e.detail.value.length === 0) {
      //未全选
      this.setData({
        cartList: this.data.cartList.map(item => ({
          ...item,
          checked: false
        }))
      })
    } else {
      //全选
      this.setData({
        cartList: this.data.cartList.map(item => ({
          ...item,
          checked: true
        }))
      })
    }
  }
})