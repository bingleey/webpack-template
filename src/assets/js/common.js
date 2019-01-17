// jquery
require('jquery');

require('../css/reset.css');
require('../css/style.less');

$(function() {
  // 控制头部菜单
  var $first = $(".nav-item.active");
  $(".nav-item").hover(function() {
    $(this).children('.nav-item_menu').slideDown('fast');
  }, function() {
    $(this).children('.nav-item_menu').slideUp('fast');
  }).click(function() {
    $first.removeClass('active');
    $(this).addClass('active');
    $first = $(this);
  })
});