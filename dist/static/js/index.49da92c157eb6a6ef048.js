webpackJsonp([0],[function(t,n,a){"use strict";function i(){g=!1,f.addClass("rotate"),p.fadeOut(300),m.fadeOut(300),v.fadeIn(300),h.fadeIn(300),d.play()}function e(){f.removeClass("rotate"),v.fadeOut(300),h.fadeOut(300),p.fadeIn(300),m.fadeIn(300),d.pause()}function o(){var t=$("#list_contentUl").find("li").length;return _===t?0:_-1}function s(){var t=$("#list_contentUl").find("li").length;return 0===_?t-1:_+1}function r(){}function c(t,n){d.src=t,_=n,g||i()}function u(t){t=parseInt(t);var n=Math.floor(t%3600/60),a=Math.floor(t%60);return l(n)+":"+l(a)}function l(t){return t<10?"0"+t:""+t}/Mobile/i.test(navigator.userAgent);var d=document.querySelector("#myAudio"),f=$("#list_audioImg"),p=($("#list_audioBtn"),$("#list_play")),v=$("#list_pause"),m=$("#detailPlay #play"),h=$("#detailPlay #pause"),g=!0,_=void 0;!function(){r()}(),n.a={play:i,pause:e,insertUrl:c,formatTime:u,next:o,prev:s}},function(t,n,a){"use strict";function i(){}function e(t,n){$.ajax({url:"/api/song/detail?ids="+t,method:"get",success:function(t){var n=t.songs[0].name,a=t.songs[0].ar[0].name,i=t.songs[0].al.picUrl;s.a.show(n,a,i)}}),o(t,n)}function o(t,n){$.ajax({url:"/api/music/url?id="+t,method:"get",success:function(t){var a=t.data[0].url;r.a.insertUrl(a,n)}})}var s=a(10),r=a(0);n.a={init:i,loadMusic:e}},function(t,n,a){"use strict";function i(){s(),v.css("transform","translate3d(0,"+p+"px,0)")}function e(){v.css("transition",".4s"),v.css("transform","translate3d(0,0,0)")}function o(){v.css("transition",".4s"),v.css("transform","translate3d(0,"+p+"px,0)")}function s(){m.on(l,function(){o()}),h.on(l,function(){return b?c.a.pause():c.a.play(),b=!b,!1}),T.on(l,function(t){c.a.pause();var n=this,a=t.originalEvent.changedTouches?t.originalEvent.changedTouches[0]:t;E=a.pageX-$(this).position().left,$(document).on(d+".move",function(t){var a=t.originalEvent.changedTouches?t.originalEvent.changedTouches[0]:t,i=a.pageX-E;i<0?i=0:i>Y&&(i=Y),U=i/Y>.99?.99:i/Y,$(n).css("left",100*U+"%"),w.css("width",100*U+"%"),I.currentTime=I.duration*U,y.html(c.a.formatTime(I.currentTime))}),$(document).on(f+".move",function(){I.currentTime=I.duration*U,c.a.play(),$(this).off(".move")})}),g.on(l,function(){var t=c.a.prev(),n=$("#list_contentUl").find("li").eq(t).attr("data-id");return u.a.loadMusic(n,t),r(t),!1}),_.on(l,function(){var t=c.a.prev(),n=$("#list_contentUl").find("li").eq(t).attr("data-id");return u.a.loadMusic(n,t),r(t),!1}),$(I).on("canplaythrough",function(){c.a.play();var t=c.a.formatTime(I.duration);x.html(t)}),$(I).on("playing",function(){clearInterval(M),M=setInterval(function(){y.html(c.a.formatTime(I.currentTime)),U=I.currentTime/I.duration,w.css("width",100*U+"%"),T.css("left",100*U+"%")},1e3)}),$(I).one("pause",function(){c.a.pause(),clearInterval(M)}),$(I).on("ended",function(){clearInterval(M);var t=c.a.next(),n=$("#list_contentUl").find("li").eq(t).attr("data-id");u.a.loadMusic(n,t),r(t)})}function r(t){console.log("change"),$("#list_contentUl").find("li").eq(t).addClass("active").siblings().attr("class","")}var c=a(0),u=a(1),l="touchstart",d="touchmove",f="touchend";/Mobile/i.test(navigator.userAgent)||(f="mouseup",l="mousedown",d="mousemove");var p=$(window).height(),v=$("#musicDetails"),m=$(".detail_tip_wrapper"),h=$("#detailPlay"),g=$("#detailPrev"),_=$("#detailNext"),w=$("#detailProUp"),T=$("#detailProBar"),y=$("#detailNowTime"),x=$("#detailAllTime"),I=document.querySelector("#myAudio"),M=void 0,U=void 0,b=!0,E=0,Y=T.parent().width();n.a={init:i,slideDown:o,slideUp:e}},,function(t,n,a){"use strict";var i=a(9),e=a(2);$(function(){function t(){n>a&&o.css("width","640px")}var n=$(window).width(),a=($(window).height(),640),o=$("#main");!function(){t(),i.a.init(),e.a.init()}()})},,function(t,n){},function(t,n){},function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=a(5),e=(a.n(i),a(7)),o=(a.n(e),a(6));a.n(o),a(4)},function(t,n,a){"use strict";function i(){e(),s(),o()}function e(){$.ajax({url:"api/artists?id=6452",success:function(t){var n=t.hotSongs;$.each(n,function(t,n){var a="<li data-id="+n.id+'>\n          <h3 class="title">'+n.name+'</h3><p class="name"><span>'+n.ar[0].name+"</span> - "+n.al.name+"</p></li>";c.append(a)}),g=c.height()}})}function o(){c.on(f,"li",function(){if(T){$(this).addClass("active").siblings().removeClass("active");var t=$(this).attr("data-id");I=$(this).index(),r.a.loadMusic(t,I)}})}function s(){$(document).on(d,function(t){t.preventDefault()}),c.on(l,function(t){if(h>g)return!1;clearInterval(x);var n=t.originalEvent.changedTouches?t.originalEvent.changedTouches[0]:t,a=this;return p=n.pageY,m=n.pageY,v=$(this).position().top,_=!0,w=!0,T=!0,$(this).css("transition",""),$(document).on(d+".move",function(t){T=!1;var n=t.originalEvent.changedTouches?t.originalEvent.changedTouches[0]:t;y=n.pageY-m,m=n.pageY;var i=$(a).position().top;i>=0?(_&&(_=!1,p=n.pageY),$(a).css("transform","translate3d(0,"+(n.pageY-p)/3+"px,0")):i<=h-g?(w&&(w=!1,p=n.pageY),$(a).css("transform","translate3d(0,"+((n.pageY-p)/3+h-g)+"px,0")):$(a).css("transform","translate3d(0,"+(n.pageY-p+v)+"px,0")}),$(document).on(f+".move",function(t){$(this).off(".move"),T||(clearInterval(x),x=setInterval(function(){var t=$(a).position().top;Math.abs(y)<=1||t>50||t<h-g-50?(clearInterval(x),t>=0?($(a).css("transition",".2s"),$(a).css("transform","translate3d(0,0,0")):t<=h-g&&($(a).css("transition",".2s"),$(a).css("transform","translate3d(0,"+(h-g)+"px,0"))):(y*=.9,$(a).css("transform","translate3d(0,"+(t+y)+"px,0"))},13))}),!1}),c.on("transitionend webkitTransitionEnd",function(){$(this).css("transition","")})}var r=(a(2),a(1)),c=$("#list_contentUl"),u=$(".list_content"),l=($("#list_audio"),"touchstart"),d="touchmove",f="touchend";/Mobile/i.test(navigator.userAgent)||(f="mouseup",l="mousedown",d="mousemove");var p=0,v=0,m=0,h=u.height(),g=c.height(),_=!0,w=!0,T=!0,y=1,x=void 0,I=void 0;n.a={init:i}},function(t,n,a){"use strict";function i(t,n,a){r.slideDown(),c.attr("src",a),u.find("h3").html(t),u.find("p").html(n),l.show(),f.html(t+"<span>"+n+"</span> "),d.css("background-image","url("+a+")")}var e=(a(1),a(2)),o=a(0),s="touchstart";/Mobile/i.test(navigator.userAgent)||(s="mousedown");var r=$("#list_audio"),c=$("#list_audioImg"),u=$("#list_audioText"),l=$("#list_audioBtn"),d=($("#list_play"),$("#list_pause"),$("#musicDetails")),f=$(".detail_name"),p=!0;!function(){r.on(s,function(){e.a.slideUp()}),l.on(s,function(){return p?o.a.pause():o.a.play(),p=!p,!1})}(),n.a={show:i}}],[8]);
//# sourceMappingURL=index.49da92c157eb6a6ef048.js.map