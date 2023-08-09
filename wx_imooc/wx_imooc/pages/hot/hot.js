import {
  get
} from "../../utils/http"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankType: "project",
    rankTypes: [{
        title: "实战排行",
        type: "project"
      },
      {
        title: "路径排行",
        type: "path"
      }
    ],
    timeType: "week",
    timeTypes: [{
        title: "周",
        value: "week"
      },
      {
        title: "月",
        value: "month"
      },
    ],
    resultList: [],
    currentList: []
  },
  projectWeek: [],
  projectMonth: [],
  pathWeek: [],
  pathMonth: [],
  onLoad(options) {
    get("/hot").then(res => {
      console.log(res);
      this.projectWeek = res.projectWeek
      this.projectMonth = res.projectMonth
      this.pathWeek = res.pathWeek
      this.pathMonth = res.pathMonth
      this.changeList("project", "week");
    }).catch(err => {
      console.log("err", err);
    })
  },
  handleTab(e) {
    let rankType = e.currentTarget.dataset.type;
    this.setData({
      rankType
    })
    this.changeList(rankType, this.data.timeType)
  },
  handleTimeTab(e) {
    let timeType = e.currentTarget.dataset.value;
    this.setData({
      timeType
    })
    this.changeList(this.data.rankType, timeType)
  },
  changeList(rankType, timeType) {
    console.log("rankType", rankType);
    console.log("timeType", timeType);
    let currentList = []
    if (rankType === "project") {
      if (timeType === "week") {
        currentList = this.projectWeek
      } else if (timeType === "month") {
        currentList = this.projectMonth
      }
    } else if (rankType === "path") {
      if (timeType === "week") {
        currentList = this.pathWeek
      } else if (timeType === "month") {
        currentList = this.pathMonth
      }
    }
    console.log(currentList);
    this.setData({
      currentList
    })
  }
})