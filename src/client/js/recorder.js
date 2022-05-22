const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let recordingVideo;

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = recordingVideo;
  a.download = "My Recording.webm";
  document.body.appendChild(a);
  a.click();
};

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

  recorder = new window.MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    recordingVideo = URL.createObjectURL(event.data);
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

/*
ffmpeg 로 mp4 만들기

비디오나 오디오 같은 종류의 미디어 파일을 다룰 수 있음
비디오 압축 비디오 포맷변환 비디오에서 오디오 추출 비디오 스크린샷 할 수 있음
ff는 컴퓨터에서 실행해야함 즉, 백엔드에서 실행해야한다는 말

유튜브도 ff 사용하는 것 같음 여러가지 화질을 저장할 수 있으니까 ff가

유튜브가 비디오를 압축하고 4개의 복사본을 모두 만들려면 자체 서버를 써야함

서버를 이용한 만큼 돈을 내야함....

그렇게 하기 싫음!

좋은 방법 : web assembly

웹어셈블리는 개방형 표준. 기본적으로 웹사이트가 매우 빠른 코드를 실행할 수 있게 해줌

프론트는 html,css,js 만 쓸 수 있음
c, go.. 못씀

웹 어셈블리는 우리가 프론트엔드에서 매우 빠른 코드를 실행할 수 있게 해줌

js를 쓰지않고 다른 종류의 프로그램을 사용할 수 있음

웹어셈블리는 매우 복잡함 

대부분 웹어셈블리로 컴파일 되는 go 또는 rust를 작성하게됨

실행 비용이 큰 프로그램을 브라우저에서 실행할 수 있는 것

javascript로는 매우 빠른 물리엔진을 프로그래밍할 수 없기 때문

ffmpeg.wasm를 사용할 것임

ffmpeg.wasm(웹어셈블리)는 비디오를 변환하기위해 사용자의 컴퓨터를 사용함
-> 사용자의 처리능력을 사용 (우리 서버를 사용하지않고)


webm -> mp4로 바꾸는 이유

모든 기기들이 webm을 이해하지는 못하기 때문

ios는 못볼 수도 있음

*/
