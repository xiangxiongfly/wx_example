// index.js

import {
  getNewsList
} from "../../utils/http"

Page({
  data: {
    tabs: ["推荐", "热门", "本地", "four", "five"],
    newsList: []
  },
  //生命周期
  onLoad() {
    this.setData({
      newsList : getNewsList()
    })
  },
  //事件
  handleTabTap(e) {
    let index = e.currentTarget.dataset.index
    let tabTitle = this.data.tabs[index]
    wx.showToast({
      title: tabTitle,
    })
  },
  loadMoreNews(e) {
    // this.data.newsList.push({
    //   imageUrl: "../../images/a.png",
    //   title: "新数据新闻标题"  ,
    //   description: "新数据这是一些新闻内容这是一些新闻内容这是一些新闻内容" 
    // })

    console.log("loadMoreNews..");    
  }, 
})