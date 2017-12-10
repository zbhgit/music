import musicDetail from './music_detail';

const $listContentUl = $('#list_contentUl');
const $listContent = $('.list_content');
const $list_audio = $('#list_audio');
let touchstart = 'touchstart';
let touchmove = 'touchmove';
let touchend = 'touchend';
const isMobile = /Mobile/i.test(navigator.userAgent)
if (!isMobile) {
  touchend = 'mouseup';
  touchstart = 'mousedown';
  touchmove = 'mousemove';
}
// s手指按下坐标
let downY = 0;
// 缓存移动距离
let downTop = 0;
let prevY = 0;
// 父级高度
let parentHeight = $listContent.height();
let childHeight = $listContentUl.height();

let onOff1 = true;
let onOff2 = true;
let onOff3 = true;
let timer;
// 手指离开时的速度
let speed = 1;

function init() {
  data();
  moveScroll();
  bind();
}

function data() {
  $.ajax({
    url: 'api/artists?id=6452',
    success: function (result) {
      let data = result.hotSongs
      $.each(data, function (i, obj) {
        let $li = `<li data-id=${obj.id}>
          <h3 class="title">${obj.name}</h3><p class="name"><span>${obj.ar[0].name}</span> - ${obj.al.name}</p></li>`;
        $listContentUl.append($li)
      });
      childHeight = $listContentUl.height();
    }
  })
}

function bind() {
  $listContentUl.on(touchend, 'li', function () {
    if (onOff3) {
      $(this).addClass('active').siblings().removeClass('active')
    }
  });
  $list_audio.on(touchstart,function () {
    musicDetail.slideUp();
  })
}

// 滑动列表
function moveScroll() {
  $(document).on(touchmove, function (e) {
    e.preventDefault();
  });
  // 手指按下
  $listContentUl.on(touchstart, function (ev) {
    if (parentHeight > childHeight) {
      return false
    }
    clearInterval(timer);
    const touch = ev.originalEvent.changedTouches ? ev.originalEvent.changedTouches[0] : ev;
    const This = this;
    downY = touch.pageY;
    prevY = touch.pageY;
    downTop = $(this).position().top;
    onOff1 = true;
    onOff2 = true;
    onOff3 = true;
    $(this).css('transition', '');
    // 滑动
    $(document).on(touchmove + '.move', function (ev) {
      onOff3 = false;
      const touch = ev.originalEvent.changedTouches ? ev.originalEvent.changedTouches[0] : ev;
      // 获取速度
      speed = touch.pageY - prevY;
      prevY = touch.pageY;

      // 判断边界
      const iTop = $(This).position().top;
      if (iTop >= 0) {
        if (onOff1) {
          onOff1 = false;
          downY = touch.pageY
        }
        $(This).css('transform', `translate3d(0,${(touch.pageY - downY) / 3}px,0`)
      } else if (iTop <= (parentHeight - childHeight)) {
        if (onOff2) {
          onOff2 = false;
          downY = touch.pageY
        }
        $(This).css('transform', `translate3d(0,${(touch.pageY - downY) / 3 + parentHeight - childHeight}px,0`)
      } else {
        $(This).css('transform', `translate3d(0,${touch.pageY - downY + downTop}px,0`)
      }

    });
    $(document).on(touchend + '.move', function (ev) {
      $(this).off('.move');
      if (!onOff3) {
        clearInterval(timer);
        timer = setInterval(function () {
          let iTop = $(This).position().top;
          if (Math.abs(speed) <= 1 || iTop > 50 || iTop < parentHeight - childHeight - 50) {
            clearInterval(timer);
            if (iTop >= 0) {
              $(This).css('transition', '.2s');
              $(This).css('transform', `translate3d(0,0,0`)
            } else if (iTop <= parentHeight - childHeight) {
              $(This).css('transition', '.2s');
              $(This).css('transform', `translate3d(0,${parentHeight - childHeight}px,0`)
            }
          } else {

            speed *= 0.9;
            $(This).css('transform', `translate3d(0,${iTop + speed}px,0`)
          }

        }, 13)
      }

    });
    return false
  });
  $listContentUl.on('transitionend webkitTransitionEnd', function () {
    $(this).css('transition', '')
  })
}

export default {
  init
}
