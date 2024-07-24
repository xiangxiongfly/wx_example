import {
  getTabs,
  getBannerData,
  getResultListData,
  getActivities
} from "../../utils/http"

Page({
  data: {
    showIcon: true,
    tabs: [],
    currentType: "recommend",
    swiperIndex: 0,
    swiperList: [],
    resultList: [],
    activities: []
  },
  totalResultList: [],
  onLoad() {
    this.totalResultList = getResultListData()
    this.setData({
      tabs: getTabs(), //tabs
      swiperList: getBannerData(), //banner
      resultList: this.totalResultList, //result
      activities: getActivities()
    })
  },
  handleInputChange(e) {
    let value = e.detail.value
    let resultList = null;
    if (value) {
      resultList = this.totalResultList.filter(item => item.title.indexOf(value) > -1)
    } else {
      resultList = this.totalResultList
    }
    this.setData({
      resultList,
      showIcon: value ? false : true
    })
  },
  handleType(e) {
    let currentType = e.currentTarget.dataset.type;
    this.setData({
      currentType
    })
  },
  swiperChange(e) {
    let swiperIndex = e.detail.current;
    this.setData({
      swiperIndex
    })
  },
  handleCourseItem(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  }
})