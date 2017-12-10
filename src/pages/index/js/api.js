import musicList from './music_list'
import musicDetail from './music_detail'
$(function () {
  const viewWidth = $(window).width()
  const viewHeight = $(window).height()
  const designWidth = 640;
  const $main = $('#main');
  // 整个项目初始化
  function init() {
    device();
    musicList.init();
    musicDetail.init()
  }

  // 宽度处理
  function device() {

    if (viewWidth > designWidth) {
      $main.css('width', '640px')
    }

  }
  init()
});
