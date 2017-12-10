/**
 * Created by Z on 2017/12/10.
 */
import tinyControl from './music_little_control'
import audio from './audio'
function init() {

}
// 加载音乐
function loadMusic(id,index) {
  $.ajax({
    url: `/api/song/detail?ids=${id}`,
    method: 'get',
    success: function (data) {
      const songName = data.songs[0].name;
      const songAr = data.songs[0].ar[0].name;
      const songImg = data.songs[0].al.picUrl;
      tinyControl.show(songName,songAr,songImg)
    }
  });
  loadMusicUrl(id,index)
}
// 加载歌曲

function loadMusicUrl(id,index) {
  $.ajax({
    url: `/api/music/url?id=${id}`,
    method: 'get',
    success: function (result) {
      const songUrl = result.data[0].url;
      audio.insertUrl(songUrl,index);
    }
  });
}
export default {
  init,
  loadMusic,
}
