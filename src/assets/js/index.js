console.log(1653526523)

$.ajax({
  type:'GET',
  url: '/posts',
  contentType: "application/json; charset=utf-8",
  success: function(res) {
    console.log(res)
  }
})