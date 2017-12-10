/**
 * Created by Z on 2017/12/10.
 */


let touchstart = 'touchstart';
let touchmove = 'touchmove';
let touchend = 'touchend';
const isMobile = /Mobile/i.test(navigator.userAgent)
if (!isMobile) {
  touchend = 'mouseup';
  touchstart = 'mousedown';
  touchmove = 'mousemove';
}

const viewHeight = $(window).height();
const $musicDetails = $('#musicDetails');
const $detailTipWrapper = $('.detail_tip_wrapper');
// 初始状态  隐藏歌曲详细窗口
function init() {
  bind()
  $musicDetails.css('transform',`translate3d(0,${viewHeight}px,0)`)
}
// 向上展开
function slideUp() {
  $musicDetails.css('transition',`.4s`);
  $musicDetails.css('transform',`translate3d(0,0,0)`)
}
// 向下收缩
function slideDown() {
  $musicDetails.css('transition',`.4s`);
  $musicDetails.css('transform',`translate3d(0,${viewHeight}px,0)`)
}

function bind() {
  $detailTipWrapper.on(touchstart,function () {
    slideDown();
  })
}
export default {
  init,
  slideDown,
  slideUp
};
