function getNewsList() {
  let newsList = []
  for (let i = 0; i < 10; i++) {
    newsList.push({
      imageUrl: "../../images/a.png",
      title: "新闻标题" + i,
      description: "这是一些新闻内容这是一些新闻内容这是一些新闻内容" + i
    })
  }
  return newsList
}

export {
  getNewsList
}