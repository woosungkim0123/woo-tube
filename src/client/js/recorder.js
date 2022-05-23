import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let recordingVideo;

const handleDownload = async () => {
  // ffmpeg 인스턴스 만들어주기(콘솔에서 보기위해 true)
  const ffmpeg = createFFmpeg({
    corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
    log: true,
  });
  await ffmpeg.load();
  // await를 하는 이유는 사용자가 소프트웨어를 사용할 것이기 때문
  // js가 아닌 코드를 사용함. 웹사이트에서 다른 소프트웨어를 사용

  // 폴더와 파일이 많은 컴퓨터 안에 있다고 생각(브라우저가 아닌)
  // 웹 어셈블리를 사용하고 있기 때문에 더이상 브라우저에 있는 것이 아님

  // ffmpeg에 파일 만들기
  // ffmpeg의 가상의 세계에 파일을 생성해줌
  // 3번째 인자에는 binaryData를 줘야함(0과 1의 정보)
  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(recordingVideo));

  // 파일을 만들었지만 아무것도 하는 것이 없음 명령해야함
  // 콘솔에 쓰듯이 input, 파일명, (초당 60프레임으로 인코딩 [더 빠른 영상 인코딩 가능하게 해줌]),output
  // 가상 컴퓨터에 존재하는 파일을 input으로 받는것, output으로 mp4를 적으면 mp4로 변환
  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

  // 썸네일 만들기
  // -ss는 특정 시간대로 갈 수 있게 해줌
  // 첫 프레임의 스크린샷을 찍어줌
  // 이 파일은 FS의 메모리에 만들어지게됨
  await ffmpeg.run(
    "-i",
    "recording.webm",
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    "thumbnail.jpg"
  );

  // 메모리에있는 파일 가져오기
  const mp4File = ffmpeg.FS("readFile", "output.mp4");

  // 파일은 Uint8Array(array of 8-bit unsigned integers) 타입
  // unsigned integers은 양의정수
  // 즉 [12, 1, 3, 4 ...]이런식
  // 자바스크립트 세계에서 파일을 표현하는 방법
  // signed는 minus sign(음의 정수)
  // 이것만으로 아무것도 못하기때문에 blob을 만들어 줄 거임
  // blob은 자바스크립트 세계의 파일
  // blob은 immutable, raw data인 파일과 같은 객체
  // 한마디로 binary 정보를 가지고 있는 파일
  //Uint8Array로 부터 blob은 만들 수 없지만 ArrayBuffer로는 만들 수 이씅ㅁ
  // raw data, 즉 binary data에 접근하려면 mp4File.buffer를 사용해야한다
  // Array buffer는 raw binary data를 나타내는 object
  // 한마디로 우리 영상을 나타내는 bytes의 배열

  // 썸네일

  const thumbFile = ffmpeg.FS("readFile", "thumbnail.jpg");

  // blob은 배열 안에 배열을 받을 수 있음
  // 그리고 js한테 video/mp4라고 알려줘야함
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });
  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  const a = document.createElement("a");
  a.href = mp4Url;
  a.download = "MyRecording.mp4";
  document.body.appendChild(a);
  a.click();

  const thumbA = document.createElement("a");
  thumbA.href = thumbUrl;
  thumbA.download = "MyThumbnail.jpg";
  document.body.appendChild(thumbA);
  thumbA.click();
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
