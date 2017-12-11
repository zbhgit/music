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

const myAudio = document.querySelector('#myAudio');
const $listAudioImg = $('#list_audioImg');
const $listAudioBtn = $('#list_audioBtn');
const $listPlay = $('#list_play');
const $listPause = $('#list_pause');
const $detailPlay = $('#detailPlay #play');
const $detailPause = $('#detailPlay #pause');

let onOff = true;

let currentIndex;

// 播放
function play() {
  onOff = false;
  $listAudioImg.addClass('rotate');
  $listPlay.fadeOut(300);
  $detailPlay.fadeOut(300);
  $listPause.fadeIn(300);
  $detailPause.fadeIn(300);
  myAudio.play();
}
// 暂停
function pause() {
  $listAudioImg.removeClass('rotate');
  $listPause.fadeOut(300);
  $detailPause.fadeOut(300);
  $listPlay.fadeIn(300);
  $detailPlay.fadeIn(300);
  myAudio.pause();

}
// 下一首歌儿
function next() {
  const length = $('#list_contentUl').find('li').length;
  const target = currentIndex === length ? 0 : currentIndex - 1;
  return target;
}
// 上一首歌儿

function prev() {
  const length = $('#list_contentUl').find('li').length;
  const target2 = currentIndex === 0 ? length - 1 : currentIndex + 1;
  return target2;
}


function bind() {
  const a = 1;
}
function insertUrl(url, index) {
  myAudio.src = url;
  currentIndex = index;
  if (!onOff) {
    play()
  }
}
function formatTime(num) {
  num = parseInt(num);
  const iM = Math.floor(num % 3600 / 60);
  const iS = Math.floor(num % 60);
  return `${addZero(iM)}:${addZero(iS)}`;
}
function addZero(num) {
  if (num < 10) {
    return '0' + num
  } else {
    return '' + num
  }
}

function init() {
  bind()
}
init();
export default {
  play,
  pause,
  insertUrl,
  formatTime,
  next,
  prev,
}


