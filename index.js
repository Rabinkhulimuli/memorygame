const firstfig = [1, 2, 3, 4, 5, 6, 7, 8];
const secondfig = [10, 20, 30, 40, 50, 60, 70, 80];
const imgArray = [
  "https://artlogic-res.cloudinary.com/w_1200,c_limit,f_auto,fl_lossy,q_auto/artlogicstorage/oneonefiveagallery/images/view/6250e44b311c06674916d5a79c17cf32j/155agallery-comhghall-casey-small-vienna-poppy-seed-2018.jpg",
  "https://i.pinimg.com/236x/8c/89/02/8c89023e2e235bdd28c0ba8a6fb76b0f.jpg",
  "https://artlogic-res.cloudinary.com/w_1200,c_limit,f_auto,fl_lossy,q_auto/artlogicstorage/oneonefiveagallery/images/view/5ed4434f95207e126757460f0a4bb22ej/155agallery-james-bland-tiny-crimson-roses-2020.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiMo3JPPHsTBclogitoUm9lE_PoNjKXTBBXw&s",
  "https://www.roots.gov.sg/CollectionImages/1025947.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHQzZWvWE1nFQDhcQjvJ5d3GGOVIbLSOImKB6zvep7s3GVt8Nuc_odPS4knwDBp7q8sec&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfTg6K0bW7AwxklLaEZvAuNZyIAAWTgOssrKv_UF8OhSgrNr3nRsDTHy78vb9P3ykOUpk&usqp=CAU",
  "https://www.saatchiart.com/saatchi-images/saatchi/314404/art/8969999/8033367-LLWCJDRG-7.jpg",
];

let matched = 0;
let moves = 0;
let matchfig = [];
let timerInterval = null;
let startTime;

document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("onee").innerHTML = "";
  document.getElementById("over").innerHTML = "";
  moves = 0;
  matched = 0;
  matchfig = [];
  document.getElementById("moves").textContent = moves;
  clearInterval(timerInterval);
  startGame();
});

function startGame() {
  const a1 = shuffle([...firstfig]);
  const a2 = shuffle([...secondfig]);
  const combinedArray = [...a1, ...a2];
  const div = document.getElementById("onee");

  combinedArray.forEach((curr) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add(`on${curr}`, "fig");
    const img = document.createElement("img");
    const index = curr >= 10 ? curr / 10 - 1 : curr - 1;
    img.src = imgArray[index];
    newDiv.appendChild(img);

    const cover = document.createElement("div");
    cover.classList.add(`outer${curr}`, "outer");
    cover.id = `outer${curr}`;
    cover.addEventListener("click", () => handleClick(curr));
    newDiv.appendChild(cover);
    div.appendChild(newDiv);
  });

  startTimer();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startTimer() {
  startTime = new Date().getTime();
  timerInterval = setInterval(() => {
    let distance = new Date().getTime() - startTime;
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById(
      "timer"
    ).innerText = `Time: ${hours}:${minutes}:${seconds}s`;
  }, 1000);
}

function handleClick(curr) {
  const cover = document.getElementById(`outer${curr}`);
  if (!cover.classList.contains("outer")) return;

  cover.classList.remove("outer");
  matchfig.push(curr);

  if (matchfig.length === 2) {
    const [first, second] = matchfig;
    const firstIndex = first >= 10 ? first / 10 - 1 : first - 1;
    const secondIndex = second >= 10 ? second / 10 - 1 : second - 1;

    moves++;
    document.getElementById("moves").textContent = moves;

    if (firstIndex === secondIndex) {
      matched++;
      if (matched === 8) {
        clearInterval(timerInterval);
        setTimeout(() => showCompletion(), 800);
      }
    } else {
      setTimeout(() => {
        document.getElementById(`outer${first}`).classList.add("outer");
        document.getElementById(`outer${second}`).classList.add("outer");
      }, 800);
    }
    matchfig = [];
  }
}

function showCompletion() {
  const totalTime = (new Date().getTime() - startTime) / 1000;
  const rating = moves <= 12 ? "⭐⭐⭐" : moves <= 18 ? "⭐⭐" : "⭐";
  const message = `
     Game Completed!<br/>
     Time: ${Math.floor(totalTime)} seconds<br/>
     Moves: ${moves}<br/>
     Rating: ${rating}<br/>
    <button onclick="document.getElementById('over').style.display='none'">Close</button>
  `;
  const overDiv = document.getElementById("over");
  overDiv.innerHTML = message;
  overDiv.style.display = "block";
}

