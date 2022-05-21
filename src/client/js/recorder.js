const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;

const handleDownload = () => {};

const handleRecordStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleRecordStop);
  startBtn.addEventListener("click", handleDownload);

  recorder.stop();
};

const handleRecordStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleRecordStart);
  startBtn.addEventListener("click", handleRecordStop);

  recorder = new window.MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    const recordingVideo = URL.createObjectURL(event.data);
    // 브라우저 메모리에서만 가능한 url을 만들어줌
    // 이 url은 파일을 가르킴
    // url이 있지만 따라가보면 없다고 뜸(서버에 없음 왜? 이 파일은 브라우저 메모리상에있으니까)
    // 브라우저의 메모리상에 파일을 저장해두고 브라우저가 그 파일에 접근할 수있는 url을 준것
    video.srcObject = null;
    video.src = recordingVideo;
    video.loop = true;
    video.play();
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 10000);
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};
init();

startBtn.addEventListener("click", handleRecordStart);
