/**
 * Created by Z on 2017/12/10.
 */
import musicAudio from './music_audio';
import musicDetail from './music_detail';
import audio from './audio'
let touchstart = 'touchstart';
let touchmove = 'touchmove';
let touchend = 'touchend';
const isMobile = /Mobile/i.test(navigator.userAgent)
if (!isMobile) {
  touchend = 'mouseup';
  touchstart = 'mousedown';
  touchmove = 'mousemove';
}

const $listAudio = $('#list_audio');
const $listAudioImg = $('#list_audioImg');
const $listAudioText = $('#list_audioText');
const $listAudioBtn = $('#list_audioBtn');
const $listPlay = $('#list_play');
const $listPause = $('#list_pause');
const $musicDetails = $('#musicDetails');
const $detailTitle = $('.detail_name');
let onOff = true;

function show(songName,songAr,songImgUrl) {
  $listAudio.slideDown();
  $listAudioImg.attr('src',songImgUrl);
  $listAudioText.find('h3').html(songName);
  $listAudioText.find('p').html(songAr);
  $listAudioBtn.show();
  $detailTitle.html(`${songName}<span>${songAr}</span> `);
  $musicDetails.css('background-image',`url(${songImgUrl})`)
}



function bind() {
  $listAudio.on(touchstart, function () {
    musicDetail.slideUp();
  });
  $listAudioBtn.on(touchstart,function () {
    if(onOff) {
      audio.pause();
    } else {
      audio.play();
    }
    onOff = !onOff;

    return false;
  })
}
bind();

export default {
  show,
}
