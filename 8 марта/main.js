TweenLite.set("#petals", { perspective: 600 });

const petalsNumber = 50;
const petals = document.getElementById("petals");

const randomInRage = (min, max) => min + Math.random() * (max - min);

const animation = (element) => {
  TweenMax.to(element, randomInRage(6, 15), {
    y: window.innerHeight + 100,
    ease: Linear.easeNone,
    repeat: -1,
    delay: -15,
  });

  TweenMax.to(element, randomInRage(4, 8), {
    x: "+=100",
    rotationZ: randomInRage(0, 180),
    repeat: -1,
    yoyo: true,
    ease: Sine.easeInOut,
  });

  TweenMax.to(element, randomInRage(2, 8), {
    rotationX: randomInRage(0, 360),
    rotationY: randomInRage(0, 360),
    repeat: -1,
    yoyo: true,
    ease: Sine.easeInOut,
    delay: -5,
  });
};

for (let i = 0; i < petalsNumber; i++) {
  const petalElement = document.createElement("div");

  TweenLite.set(petalElement, {
    attr: { class: "petal" },
    x: randomInRage(0, window.innerWidth),
    y: randomInRage(-200, -150),
    z: randomInRage(-200, 200),
  });

  petals.appendChild(petalElement);
  animation(petalElement);
}

const typed = new Typed("#text", {
  strings: [
    "Дорогая мама! Ты - самое дорогое что есть в моей жизни, и я бесконечно благодарана за твою любовь и подержку! Спасибо тебе за всё! 💋💗",
  ],
  startDelay: 3000,
  typeSpeed: 50,
  backSpeed: 0,
  fadeOut: true,
  loop: false,
  showCursor: false,
  onComplete: () => {
    const author = document.getElementById("author");
    author.style.opacitly = 1;
  },
});
