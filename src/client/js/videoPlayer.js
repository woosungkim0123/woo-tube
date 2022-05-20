const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handleplayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }

  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolume = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (second) =>
  new Date(second * 1000).toISOString().substring(11, 19);

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};
const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

/*
유튜브처럼 움직이는 도중 멈추기
let videoPlayStatus = false;
let setVideoPlayStatus = false;

const handleTimelineChange = (event) => {
const {
target: { value },
} = event;
if (!setVideoPlayStatus) {
videoPlayStatus = video.paused ? false : true;
setVideoPlayStatus = true;
}
video.pause();
video.currentTime = value;
};

const handleTimelineSet = () => {
videoPlayStatus ? video.play() : video.pause();
setVideoPlayStatus = false;
};

timeline.addEventListener("change", handleTimelineSet);


// 마우스 업다운
let videoStatus = false;

const handleTimelineMousedown = () => {
videoStatus = video.paused ? false : true;
video.pause();
};
const handleTimelineMouseup = () => {
if (videoStatus) {
video.play();
} else {
video.pause();
}
};

timeline.addEventListener("mousedown", handleTimelineMousedown);
timeline.addEventListener("mouseup", handleTimelineMouseup);
*/
const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};
const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Fullscreen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Fullscreen";
  }
};
document.onfullscreenchange = () => {
  const fullscreen = document.fullscreenElement;
  if (!fullscreen) {
    fullScreenBtn.innerText = "Enter Full Screen";
  }
};
const hideControls = () => {
  videoControls.classList.remove("showing");
};

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};
const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

playBtn.addEventListener("click", handleplayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolume);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);

if (video.readyState == 4) {
  handleLoadedMetadata();
}
