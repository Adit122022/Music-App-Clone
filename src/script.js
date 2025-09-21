console.log("hello ");
async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  let response = await a.text();
  // console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith("mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}
async function main() {
  let songs = await getSongs();
  console.log(songs);

  let songUL = document.querySelector(".songlist ul");

  for (const song of songs) {
    songUL.innerHTML += `
      <li class="hover text-grey transition">
        <img class="invert hover-invert" src="/assets/music.svg" alt="home">
        <div class="info">
          <div>${decodeURIComponent(song).replace(".mp3", "")}</div>
        </div>
        <div id="playBtn" class="play flex justify-center items-center">
          <i class="ri-play-large-fill"></i>
        </div>
      </li>`;
  }

  // Play first song (will only work if browser allows autoplay)
  document.querySelector("#playBtn").addEventListener("click", () => {
  const audio = new Audio(`/songs/${songs[0]}`);
  audio.play();
});
  audio.play().catch((err)=> {
    console.log("Autoplay blocked, wait for user interaction.",err);
  });

  audio.addEventListener("loadeddata", () => {
    console.log("Duration:", audio.duration);
  });
}

window.onload =()=>{
  main();
}


