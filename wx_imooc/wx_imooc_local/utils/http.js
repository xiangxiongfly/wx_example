function getTabs() {
  return [{
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
  ]
}

function getBannerData() {
  return [{
      "imgUrl": "../../images/TS.jpeg"
    },
    {
      "imgUrl": "../../images/TS.jpeg"
    },
    {
      "imgUrl": "../../images/TS.jpeg"
    }
  ]
}

function getResultListData() {
  let resultList = []
  for (let i = 0; i < 30; i++) {
    resultList.push({
      "imgUrl": "../../images/TS.jpeg",
      "title": "标题" + i,
      "promotion": false,
      "price": 100 + i,
      "level": "hello world" + i,
      "sales": 8422,
      "id": i
    })
  }
  return resultList
}

function getActivities() {
  let activites = []
  for (let i = 0; i < 5; i++) {
    activites.push({
      "imgUrl": "../../images/TS.jpeg"
    })
  }
  return activites
}

export {
  getTabs,
  getBannerData,
  getResultListData,
  getActivities
}