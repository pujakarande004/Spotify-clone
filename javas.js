const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const title = document.getElementById("song-title");
const songImg = document.getElementById("song-img");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const songs = [
  { name: "Top 50 Global", file: "songs/song1.mp3", img: "images/card1img.jpeg" },
  { name: "Top 50 India", file: "songs/song2.mp3", img: "images/card2img.jpeg" },
  { name: "Trending Hindi", file: "songs/song3.mp3", img: "images/card3img.jpeg" }
];

let songIndex = 0;
let isPlaying = false;

function loadSong(index) {
  title.textContent = songs[index].name;
  songImg.src = songs[index].img;
  audio.src = songs[index].file;
}

loadSong(songIndex);

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playBtn.src = "images/play_icon.png";
  } else {
    audio.play();
    playBtn.src = "images/pause_icon.png";
  }
  isPlaying = !isPlaying;
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  audio.play();
  playBtn.src = "images/pause_icon.png";
  isPlaying = true;
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  audio.play();
  playBtn.src = "images/pause_icon.png";
  isPlaying = true;
});

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;

  let curMin = Math.floor(audio.currentTime / 60);
  let curSec = Math.floor(audio.currentTime % 60);
  currentTimeEl.textContent = `${curMin}:${curSec < 10 ? "0" : ""}${curSec}`;

  let durMin = Math.floor(audio.duration / 60);
  let durSec = Math.floor(audio.duration % 60);
  if (durMin) {
    durationEl.textContent = `${durMin}:${durSec < 10 ? "0" : ""}${durSec}`;
  }
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    songIndex = card.getAttribute("data-index");
    loadSong(songIndex);
    audio.play();
    playBtn.src = "images/pause_icon.png";
    isPlaying = true;
  });
});
