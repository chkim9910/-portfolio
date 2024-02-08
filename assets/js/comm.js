$(function () {
  new fullpage("#fullpage", {
    licenseKey: "gplv3-license",
    autoScrolling: true,

    navigationTooltips: ["", "intro", "about", "work"],
    showActiveTooltip: true,
    navigation: true,

    scrollingSpeed: 700,
    // autoScrolling: true,
    fitToSection: true,

    // 접근성
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: true,

    // page setting
    anchors: ["sect1", "sect2", "sect3", "sect4"],

    // 섹션을 스크롤하거나 화면에 들어왔을 때 실행되는 콜백
    afterLoad: function (origin, destination, direction) {
      // destination.item이 현재 섹션을 나타냅니다.
      // 원하는 섹션에 대한 조건을 설정하여 해당 섹션이 화면에 들어왔을 때 동작을 수행합니다.
      if (destination.index == 1) {
        // 두 번째 섹션이 화면에 들어왔을 때 실행할 코드를 작성합니다.
        console.log("두 번째 섹션이 화면에 들어옵니다!");

        // typing animation
        const text = document.getElementById("text");
        const typingDelay = 150;
        function onComplete() {
          gsap.to("#text", { y: "50px", autoAlpha: 1, duration: 1 });
        }

        displayText(text, typingDelay, onComplete);

        function displayText(target, delay, callback, nodes, index = 0) {
          if (index === 0) {
            nodes = [].slice.call(target.children);
            target.innerHTML = "";
          }
          const currentNode = nodes[index];
          const currentNodeText = currentNode.innerHTML;

          currentNode.innerHTML = "";
          target.appendChild(currentNode);

          if (currentNodeText) {
            let i = 0;
            const cars = currentNodeText.split("");
            const effect = setInterval(() => {
              currentNode.innerHTML += cars[i];
              i++;

              if (i === cars.length) {
                clearInterval(effect);

                if (index < nodes.length - 1) {
                  displayText(target, delay, callback, nodes, ++index);
                }
              }
            }, delay);
          } else {
            if (index < nodes.length - 1) {
              displayText(target, delay, callback, nodes, ++index);
            }
          }
        }

        // 텍스트가 타이핑 애니메이션이 모두 완료된 후에 실행될 함수
        // gsap.set("#text", { y: "50px", autoAlpha: 0 });

        // gsap
        const secondText = document.getElementsByClassName("txt-sec-box");
        gsap.registerPlugin(ScrollTrigger);
        gsap.set(secondText, { autoAlpha: 0 });
        // gsap.to();
      }
    },
  });

  // 1. sect2로 왔을 때 1초 delay를 준 후
  // 2. .first가 위로 사라지게 하고, .bracket-rt의 x값을 늘린 후, .next가 위로 올라와 보이게 함
  // 3. 다시 처음으로 돌아옴

  // 커서
  class BigCircle {
    constructor() {
      this.root = document.body;
      this.cursor = document.querySelector(".curzr-big-circle");
      this.circle = document.querySelector(".curzr-big-circle .circle");
      this.dot = document.querySelector(".curzr-big-circle .dot");

      this.pointerX = 0;
      this.pointerY = 0;
      this.cursorSize = 70;

      this.circleStyle = {
        boxSizing: "border-box",
        position: "fixed",
        top: `${this.cursorSize / -2}px`,
        left: `${this.cursorSize / -2}px`,
        zIndex: "2147483647",
        width: `${this.cursorSize}px`,
        height: `${this.cursorSize}px`,
        backgroundColor: "#fff",
        borderRadius: "50%",
        transition: "500ms, transform 100ms",
        userSelect: "none",
        pointerEvents: "none",
      };

      this.dotStyle = {
        boxSizing: "border-box",
        position: "fixed",
        zIndex: "2147483647",
        width: "6px",
        height: "6px",
        backgroundColor: "#0000",
        borderRadius: "50%",
        userSelect: "none",
        pointerEvents: "none",
        transition: "250ms, transform 75ms",
      };

      if (CSS.supports("backdrop-filter", "invert(1) grayscale(1)")) {
        this.circleStyle.backdropFilter = "invert(0.85) grayscale(1)";
        this.dotStyle.backdropFilter = "invert(1)";
        this.circleStyle.backgroundColor = "#fff0";
      } else {
        this.circleStyle.backgroundColor = "#000";
        this.circleStyle.opacity = "0.5";
      }

      this.init(this.circle, this.circleStyle);
      this.init(this.dot, this.dotStyle);
    }

    init(el, style) {
      Object.assign(el.style, style);
      setTimeout(() => {
        this.cursor.removeAttribute("hidden");
      }, 500);
      this.cursor.style.opacity = 1;
      // el.style.opacity = 1;
    }

    move(event) {
      this.pointerX = event.pageX;
      this.pointerY = event.pageY + this.root.getBoundingClientRect().y;

      this.circle.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`;
      this.dot.style.transform = `translate3d(calc(-50% + ${this.pointerX}px), calc(-50% + ${this.pointerY}px), 0)`;

      if (
        event.target.localName === "svg" ||
        event.target.localName === "a" ||
        event.target.onclick !== null ||
        Array.from(event.target.classList).includes("curzr-hover")
      ) {
        this.hover();
      }
    }

    hover() {
      this.circle.style.transform += ` scale(2.5)`;
    }

    click() {
      this.circle.style.transform += ` scale(0.75)`;
      setTimeout(() => {
        this.circle.style.transform = this.circle.style.transform.replace(
          ` scale(0.75)`,
          ""
        );
      }, 35);
    }

    hidden() {
      this.cursor.style.opacity = 0;
      setTimeout(() => {
        this.cursor.setAttribute("hidden", "hidden");
      }, 500);
    }
  }
  // 클래스 생성
  const bigCircleCursor = new BigCircle();

  // 이벤트 리스너 등록
  document.addEventListener("mousemove", function (event) {
    bigCircleCursor.move(event);
  });

  document.addEventListener("click", function () {
    bigCircleCursor.click();
  });
});
