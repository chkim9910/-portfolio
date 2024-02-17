$(function () {
  new fullpage("#fullpage", {
    licenseKey: "gplv3-license",
    autoScrolling: true,

    navigationTooltips: ["", "intro", "about", "project 1", "project 2"],
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
    anchors: ["sect1", "sect2", "sect3", "sect4", "sect5"],

    // 섹션을 스크롤하거나 화면에 들어왔을 때 실행되는 콜백
    afterLoad: function (origin, destination, direction) {
      // destination.item이 현재 섹션을 나타냅니다.
      // 원하는 섹션에 대한 조건을 설정하여 해당 섹션이 화면에 들어왔을 때 동작을 수행합니다.
      if (destination.index == 0) {
        var line1 = $(".tit");
        var line2 = $(".tit-2");

        var line1Spans = $(".tit > span");
        var line2Spans = $(".tit-2 > span");

        // Set tweens
        TweenMax.set([line1, line2], {
          x: -15,
        });
        TweenMax.set([line1Spans, line2Spans], {
          alpha: 0,
        });

        // Tween values
        var tl = new TimelineMax({
          repeat: 0,
        });

        tl.add(
          TweenMax.to(line1, 1.5, {
            x: 0,
          }),
          "start"
        );

        tl.add(
          TweenMax.to(line2, 1.5, {
            x: 0,
          }),
          "start+=1"
        );

        tl.add(
          TweenMax.staggerTo(
            line1Spans,
            1,
            {
              alpha: 1,
            },
            0.1
          ),
          "start"
        );

        tl.add(
          TweenMax.staggerTo(
            line2Spans,
            1,
            {
              alpha: 1,
            },
            0.1
          ),
          "start+=1.5"
        );
      }
      if (destination.index == 1) {
        // 두 번째 섹션이 화면에 들어왔을 때 실행할 코드를 작성합니다.
        console.log("두 번째 섹션이 화면에 들어옵니다!");
        // const sect2Inner = document.querySelector(".sect2 .inner");
        // sect2Inner.classList.add("show");
        // typing animation
        const text = document.getElementById("text");
        const typingDelay = 150;
        gsap.registerPlugin(ScrollTrigger);
        displayText(text, typingDelay, onComplete);

        function displayText(target, delay, callback, nodes, index = 0) {
          if (index === 0) {
            nodes = [].slice.call(target.children);
            // console.log(nodes);
            target.innerHTML = "";
          }
          const currentNode = nodes[index];
          const currentNodeText = currentNode.innerHTML;
          currentNode.innerHTML = "";
          target.appendChild(currentNode);
          // 만약 현재 노드의 내용이 있다면
          if (currentNodeText) {
            let i = 0;
            const cars = currentNodeText.split("");
            const effect = setInterval(() => {
              currentNode.innerHTML += cars[i];
              i++;
              if (i === cars.length) {
                clearInterval(effect);
                // 만약 현재 노드가 마지막 노드가 아니라면 다음 노드 처리
                if (index < nodes.length - 1) {
                  displayText(target, delay, callback, nodes, ++index);
                }
              }
            }, delay);
          } else {
            if (index < nodes.length - 1) {
              displayText(target, delay, callback, nodes, ++index);
            }
            // callback();
            //텍스트가 타이핑 애니메이션이 모두 완료된 후 콜백함수 실행
            else {
              callback();
              console.log("실행완료");
            }
          }
        }
        // 텍스트가 타이핑 애니메이션이 모두 완료된 후에 실행될 함수
        const iconButterfly = document.getElementsByClassName("em-butterfly");
        gsap.set(iconButterfly, { y: 50, autoAlpha: 0 });

        function onComplete() {
          console.log("콜백 함수가 실행되었습니다.");
          const tl = gsap.timeline();
          tl.to(iconButterfly, { y: 0, autoAlpha: 1, duration: 1 });
        }
      }
      if (destination.index == 2) {
        console.log("세 번째 섹션이 화면에 들어옵니다!");
      }
    },
  });

  // 커서
  var $mouseX = 0,
    $mouseY = 0,
    $xp = 0,
    $yp = 0,
    $flag = $("#flag");

  $(document).mousemove(function (e) {
    $mouseX = e.pageX;
    $mouseY = e.pageY;
  });

  var $loop = setInterval(function () {
    // change 12 to alter damping higher is slower
    $xp += ($mouseX - $xp) / 32;
    $yp += ($mouseY - $yp) / 32;
    $flag.css({
      left: $xp - $flag.width() * 0.5 + "px",
      top: $yp - $flag.height() * 0.5 + "px",
    });
  }, 1);
  // const rotationKeyframes = `
  //   @keyframes rotateAnimation {
  //       0% {
  //           transform: rotate(0deg);
  //       }
  //       100% {
  //           transform: rotate(360deg);
  //       }
  //   }
  // `;
  // $("<style>")
  //   .prop("type", "text/css")
  //   .html(rotationKeyframes)
  //   .appendTo("head");

  $("a").hover(
    function () {
      $("#flag > div > img")
        .attr("src", "../../assets/img/comm/cursor-hover.png")
        .css({
          transform: "rotate(45deg)",
          /* "transform-origin": "center center", */
          transition: "all 0.2s",
          animation: "none",
        });
    },
    function () {
      $("#flag > div > img")
        .attr("src", "../../assets/img/comm/cursor-basic.png")
        .css({
          transform: "scale(1) rotate(0deg)",
          animation: "rotateAni 5s linear infinite",
        });
    }
  );

  // $(".web").hover(
  //   function () {
  //     $("#flag > div")
  //       // .attr("src", "../../assets/img/comm/cursor-white.png")
  //       .css({
  //         background:
  //           'url("../../assets/img/comm/cursor-white.png") no-repeat 50% 50% / cover',
  //         width: "120px", // 원하는 너비 값으로 변경
  //         height: "120px", // 원하는 높이 값으로 변경
  //         // animation: "rotateAnimation 10s infinite linear", // 무한 회전 애니메이션을 적용
  //       });
  //     $("#flag > div > img")
  //       .attr("src", "../../assets/img/comm/click.png")
  //       .css({
  //         width: "500px", // 원하는 너비 값으로 변경
  //         height: "500px", // 원하는 높이 값으로 변경
  //         transform: "translate(-18.5%, -3%)",
  //         // animation: "none", // 애니메이션 제거
  //       });
  //   },
  //   function () {
  //     // 마우스가 떠날 때, 이미지를 원래 크기로 돌리고 다른 작업을 수행할 수 있습니다.
  //     $("#flag > div").css({
  //       animation: "none", // 애니메이션 제거
  //       background: "none",
  //       /* animation: "rotationKeyframes 2s infinite linear", // 무한 회전 애니메이션을 적용 */
  //     });
  //     $("#flag > div > img")
  //       .attr("src", "../../assets/img/comm/cursor-basic.png")
  //       .css({
  //         width: "100px", // 원하는 너비 값으로 변경
  //         height: "100px", // 원하는 높이 값으로 변경
  //         transform: "translate(0%, 0%)",
  //       });
  //   }
  // );

  /*  slide,click event section */
  // $(".bgRed")
  //   .mouseenter(function () {
  //     $("#flag > div img").attr("src", `../img/section01/w_ox_.png`);
  //   })
  //   .mouseleave(function () {
  //     $("#flag > div img").attr("src", `img/section01/ox_.png`);
  //   });

  // $(".title-wrapper")
  //   .mouseenter(function () {
  //     $("#flag > div img").attr("src", `img/section15/hover.png`);
  //   })
  //   .mouseleave(function () {
  //     $("#flag > div img").attr("src", `img/section01/ox_.png`);
  //   });

  // class BigCircle {
  //   constructor() {
  //     this.root = document.body;
  //     this.cursor = document.querySelector(".curzr-big-circle");
  //     this.circle = document.querySelector(".curzr-big-circle .circle");
  //     this.dot = document.querySelector(".curzr-big-circle .dot");

  //     this.pointerX = 0;
  //     this.pointerY = 0;
  //     this.cursorSize = 70;

  //     this.circleStyle = {
  //       boxSizing: "border-box",
  //       position: "fixed",
  //       top: `${this.cursorSize / -2}px`,
  //       left: `${this.cursorSize / -2}px`,
  //       zIndex: "2147483647",
  //       width: `${this.cursorSize}px`,
  //       height: `${this.cursorSize}px`,
  //       backgroundColor: "rgba(255,255,255,0.2)",
  //       borderRadius: "50%",
  //       transition: "500ms, transform 100ms",
  //       userSelect: "none",
  //       pointerEvents: "none",
  //     };

  //     this.dotStyle = {
  //       boxSizing: "border-box",
  //       position: "fixed",
  //       zIndex: "2147483647",
  //       width: "6px",
  //       height: "6px",
  //       backgroundColor: "#0000",
  //       // background: "url(../../../img/emoticion_7260029.png)",
  //       borderRadius: "50%",
  //       userSelect: "none",
  //       pointerEvents: "none",
  //       transition: "250ms, transform 75ms",
  //     };

  //     if (CSS.supports("backdrop-filter", "invert(1) grayscale(1)")) {
  //       this.circleStyle.backdropFilter = "invert(0.2) grayscale(1)";
  //       this.dotStyle.backdropFilter = "invert(1)";
  //       this.circleStyle.backgroundColor = "rgba(255,255,255,0.2)";
  //     } else {
  //       this.circleStyle.backgroundColor = "#000";
  //       this.circleStyle.opacity = "0.5";
  //     }

  //     this.init(this.circle, this.circleStyle);
  //     this.init(this.dot, this.dotStyle);
  //   }

  //   init(el, style) {
  //     Object.assign(el.style, style);
  //     setTimeout(() => {
  //       this.cursor.removeAttribute("hidden");
  //     }, 500);
  //     this.cursor.style.opacity = 1;
  //     // el.style.opacity = 1;
  //   }

  //   move(event) {
  //     this.pointerX = event.pageX;
  //     this.pointerY = event.pageY + this.root.getBoundingClientRect().y;

  //     this.circle.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`;
  //     this.dot.style.transform = `translate3d(calc(-50% + ${this.pointerX}px), calc(-50% + ${this.pointerY}px), 0)`;

  //     if (
  //       event.target.localName === "svg" ||
  //       event.target.localName === "a" ||
  //       event.target.onclick !== null ||
  //       Array.from(event.target.classList).includes("curzr-hover")
  //     ) {
  //       this.hover();
  //     }
  //   }

  //   hover() {
  //     this.circle.style.transform += ` scale(2.5)`;
  //   }

  //   click() {
  //     this.circle.style.transform += ` scale(0.75)`;
  //     setTimeout(() => {
  //       this.circle.style.transform = this.circle.style.transform.replace(
  //         ` scale(0.75)`,
  //         ""
  //       );
  //     }, 35);
  //   }

  //   hidden() {
  //     this.cursor.style.opacity = 0;
  //     setTimeout(() => {
  //       this.cursor.setAttribute("hidden", "hidden");
  //     }, 500);
  //   }
  // }
  // // 클래스 생성
  // const bigCircleCursor = new BigCircle();

  // // 이벤트 리스너 등록
  // document.addEventListener("mousemove", function (event) {
  //   bigCircleCursor.move(event);
  // });

  // document.addEventListener("click", function () {
  //   bigCircleCursor.click();
  // });
});
