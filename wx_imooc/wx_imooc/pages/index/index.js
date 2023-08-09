import {
  get
} from "../../utils/http"

Page({
  data: {
    showIcon: true,
    tabs: [{
        name: "推荐",
        type: "recommend"
      },
      {
        name: "路径",
        type: "path"
      },
      {
        name: "实战",
        type: "project"
      },
      {
        name: "活动",
        type: "activity"
      },
    ],
    currentType: "recommend",
    swiperIndex: 0,
    swiperList: [],
    resultList: [],
    activities: []
  },
  courseList: [],
  onLoad() {
    get("/swiperList").then(data => {
      let swiperList = data
      this.setData({
        swiperList
      })
    }).catch(err => {
      console.log("err", err);
    })
    get("/courses").then(data => {
      this.courseList = data
      this.setData({
        resultList: this.courseList
      })
    }).catch(err => {
      console.log("err", err);
    })
    get("/activities").then(data => {
      let activities = data
      this.setData({
        activities
      })
    }).catch(err => {
      console.log("err", err);
    })
  },
  handleInputChange(e) {
    let value = e.detail.value
    let resultList = null;
    if (value) {
      resultList = this.courseList.filter(item => item.title.indexOf(value) > -1)
    } else {
      resultList = this.courseList
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