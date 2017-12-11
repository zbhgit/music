/**
 * Created by Z on 2017/12/10.
 */
import audio from './audio'
import musicAjax from './music_audio';
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
const $detailPlay = $('#detailPlay');
const $detailPrev = $('#detailPrev');
const $detailNext = $('#detailNext');
const $detailProUp = $('#detailProUp');
const $detailProBar = $('#detailProBar');
const $detailNowTime = $('#detailNowTime');
const $detailAllTime = $('#detailAllTime');
const myAudio = document.querySelector('#myAudio');
let timer;
let scale;
let onOff = true;
// 拖动差值
let disX = 0;
let index;


const parentWidth = $detailProBar.parent().width();

// 初始状态  隐藏歌曲详细窗口
function init() {
  bind();
  $musicDetails.css('transform', `translate3d(0,${viewHeight}px,0)`)
}
// 向上展开
function slideUp() {
  $musicDetails.css('transition', `.4s`);
  $musicDetails.css('transform', `translate3d(0,0,0)`)
}
// 向下收缩
function slideDown() {
  $musicDetails.css('transition', `.4s`);
  $musicDetails.css('transform', `translate3d(0,${viewHeight}px,0)`)
}


function bind() {
  $detailTipWrapper.on(touchstart, function () {
    slideDown();
  });
  $detailPlay.on(touchstart, function () {
    if (onOff) {
      audio.pause();
    } else {
      audio.play();
    }
    onOff = !onOff;
    return false;
  });
  $detailProBar.on(touchstart, function (ev) {
    audio.pause();
    const This = this;
    const touch = ev.originalEvent.changedTouches ? ev.originalEvent.changedTouches[0] : ev;
    disX = touch.pageX - $(this).position().left;
    $(document).on(touchmove + '.move', function (ev) {
      const touch = ev.originalEvent.changedTouches ? ev.originalEvent.changedTouches[0] : ev;

      let L = touch.pageX - disX;
      if (L < 0) {
        L = 0;
      } else if (L > parentWidth) {
        L = parentWidth;
      }
      scale = L / parentWidth > 0.99 ? 0.99 : L / parentWidth;
      $(This).css('left', `${scale * 100}%`);
      $detailProUp.css('width', `${scale * 100}%`);
      myAudio.currentTime = myAudio.duration * scale;
      $detailNowTime.html(audio.formatTime(myAudio.currentTime));

    });
    $(document).on(touchend + '.move', function () {
      myAudio.currentTime = myAudio.duration * scale;
      audio.play();
      $(this).off('.move');
    })
  });
  $detailPrev.on(touchstart, function () {
    const targetIndex = audio.prev();
    const id = $('#list_contentUl').find('li').eq(targetIndex).attr('data-id');
    musicAjax.loadMusic(id, targetIndex);
    changeActiveLi(targetIndex);
    return false
  });
  $detailNext.on(touchstart, function () {
    const targetIndex = audio.prev();
    const id = $('#list_contentUl').find('li').eq(targetIndex).attr('data-id');
    musicAjax.loadMusic(id, targetIndex);
    changeActiveLi(targetIndex);
    return false
  });

  // 加载结束可播放
  $(myAudio).on('canplaythrough', function () {
    audio.play();
    const allTime = audio.formatTime(myAudio.duration);
    $detailAllTime.html(allTime)
  });
//  播放中
  $(myAudio).on('playing', function () {
    clearInterval(timer);
    timer = setInterval(function () {
      $detailNowTime.html(audio.formatTime(myAudio.currentTime));
      scale = myAudio.currentTime / myAudio.duration;
      $detailProUp.css('width', `${scale * 100}%`);
      $detailProBar.css('left', `${scale * 100}%`);
    }, 1000)
  });
  // 暂停
  $(myAudio).one('pause', function () {
    audio.pause();
    clearInterval(timer);
  });
  // 播放结束
  $(myAudio).on('ended', function () {
    clearInterval(timer);
    const targetIndex = audio.next();
    const id = $('#list_contentUl').find('li').eq(targetIndex).attr('data-id');
    musicAjax.loadMusic(id, targetIndex);
    changeActiveLi(targetIndex);
  });
}

function changeActiveLi(index) {
  console.log('change');
  $('#list_contentUl').find('li').eq(index).addClass('active').siblings().attr('class', '')
}
export default {
  init,
  slideDown,
  slideUp
};
