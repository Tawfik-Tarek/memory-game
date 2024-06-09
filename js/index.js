const gameContainer = document.querySelector(".game");
const allBlocks = document.querySelectorAll(".game .game-block");
const wrongTries = document.querySelector(".info-container .tries span");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".modal .close");
const modalInput = document.querySelector(".modal input");
const playButton = document.querySelector(".modal .play-button");
const Time = document.querySelector(".info-container .time span");
let duration = 800;
let time = 0;

playButton.addEventListener("click", () => {
  const username = modalInput.value;
  if (username.trim() !== "") {
    document.querySelector(".info-container span").innerHTML = username;
    modal.remove();
    firstShowAndTimer();
  } else {
    alert("Please enter your name or click on close button");
  }
});

closeModal.addEventListener("click", () => {
  modal.remove();
  firstShowAndTimer();
});

allBlocks.forEach((block) => {
  block.style.order = Math.floor(Math.random() * 16); // 0-15
});

allBlocks.forEach((block) => {
  block.addEventListener("click", () => {
    block.classList.toggle("active");
    const activeBlocks = document.querySelectorAll(".game .game-block.active");
    if (activeBlocks.length === 2) {
      gameContainer.style.pointerEvents = "none";
      setTimeout(() => {
        gameContainer.style.pointerEvents = "auto";
      }, duration);
      const [firstBlock, secondBlock] = activeBlocks;
      if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
        setTimeout(() => {
          firstBlock.classList.remove("active");
          secondBlock.classList.remove("active");
          firstBlock.classList.add("done");
          secondBlock.classList.add("done");
        }, duration);
      } else {
        setTimeout(() => {
          wrongTries.innerHTML = parseInt(wrongTries.innerHTML) + 1;
          firstBlock.classList.remove("active");
          secondBlock.classList.remove("active");
        }, duration);
      }
    }
  });
});

const firstShowAndTimer = () => {
  setTimeout(() => {
    allBlocks.forEach((block) => block.classList.remove("active"));
    const timer = setInterval(() => {
      time++;
      Time.innerHTML = time;

      const doneBlocks = document.querySelectorAll(".game .game-block.done");
      if (doneBlocks.length === 16) {
        clearInterval(timer);
          alert("Congratulations! You won the game.");
          location.reload();
      }

      if (time === 60) {
        clearInterval(timer);
          alert("Time is up! You lost the game.");
          location.reload();
      }
    }, 1000);
  }, 1500);
};
