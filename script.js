let now_playing = document.querySelector(".now-playing")
let song_cover = document.querySelector(".song-cover");
let song_name = document.querySelector(".song-name");
let song_artist = document.querySelector(".song-artist")

let playpause_btn = document.querySelector(".playpause-song");
let next_btn = document.querySelector(".next-song")
let prev_btn = document.querySelector(".prev-song")

let seek_slider = document.querySelector(".seek_slider")
let volume_slider = document.querySelector(".volume_slider")
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration")
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let curr_song = document.getElementById("audio");

let song_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;
  
const music_list = [
  {
      id: '0',
      img: 'images/Dice.png',
      name: 'Dice',
      artist: 'artist 1',
      music: 'music/Dice.mp3'
  },
  {
      id: '1',
      img: 'images/Wanderlust.png',
      name: 'Wanderlust',
      artist: 'artist 2',
      music: 'music/Wanderlust.mp3'
  },
  {
      id: '2',
      img: 'images/Sugarsweet.png',
      name: 'Sugarsweet',
      artist: 'artist 3',
      music: 'music/Sugarsweet.mp3'
  }
];

loadSong(song_index);

function loadSong(song_index){
  clearInterval(updateTimer);
  reset();

  curr_song.src = music_list[song_index].music;
  curr_song.load();

  song_cover.style.backgroundImage = "url(" + music_list[song_index].img + ")";
  song_name.innerHTML = music_list[song_index].name;
  song_artist.textContent = music_list[song_index].artist;
  now_playing.textContent = "Playing " + (song_index + 1) + " of " + music_list.length;

  updateTimer = setInterval(setUpdate, 1000);

  curr_song.addEventListener('ended', nextSong);
  random_bg_color();
}

function random_bg_color(){
  let hex = ['0', '1','2','3','4','5','6','7','8','9','a','b','c','d','e']
  let a;

  function populate(a){
    for(let i=0; i<6; i++){
      let x = Math.round(Math.random()* 14);
      let y = hex[x];
      a += y;
    }
    return a;

  }
  let Color1 = populate('#');
  let Color2 = populate('#');
  var angle = 'to right';

  let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
  document.body.style.background = gradient;
}

function reset(){
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function randomSong(){
  isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
  isRandom = true;
  randomIcon.classList.add('randomActive');
}
function pauseRandom(){
  isRandom = false;
  randomIcon.classList.remove('randomActive');
}
function repeatSong(){
  let current_index = song_index;
  loadSong(current_index);
  playSong();
}
function playpauseSong(){
  isPlaying ? pauseSong() : playSong();
}
function playSong(){
  curr_song.play();
  isPlaying = true;
  song_cover.classList.add('rotate');
  wave.classList.add('loader');
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseSong(){
  curr_song.pause();
  isPlaying = false;
  song_cover.classList.remove('rotate');
  wave.classList.remove('loader');
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextSong() {
  if (isRandom) {
    let random_index = Math.floor(Math.random() * music_list.length);
    song_index = random_index;
  } else {
    song_index = (song_index + 1) % music_list.length;
  }

  loadSong(song_index);
  playSong();
}

function prevSong(){
  if(song_index > 0){
    song_index -= 1;
  }else{
    song_index = music_list.length -1;
  }
  loadSong(song_index);
  playSong();
}
    next_btn.addEventListener("click", nextSong);
    prev_btn.addEventListener("click", prevSong);

function seekTo(){
    let seekto = curr_song.duration * (seek_slider.value / 100);
    curr_song.currentTime = seekto;
}

function setVolume(){
  curr_song.volume = volume_slider.value / 100;
}
function setUpdate(){
  let seekPosition = 0;
  if(!isNaN(curr_song.duration)){
    seekPostion = curr_song.currentTime * (100 / curr_song.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_song.currentTime / 60);
    let currentSeconds = Math.floor(curr_song.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_song.duration / 60);
    let durationSeconds = Math.floor(curr_song.duration - durationMinutes * 60);

    if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
    if(durationSeconds < 10) {durationSeconds = "0" + durationSeconds; }
    if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
    if(durationMinutes < 10) {durationMinutes = "0" + durationMinutes; }
  
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationMinutes;

  }
}
