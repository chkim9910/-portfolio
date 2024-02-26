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

  $("a").hover(
    function () {
      $("#flag > div > img")
        .attr("src", "/assets/img/comm/cursor-hover.png")
        .css({
          transform: "rotate(45deg)",
          /* "transform-origin": "center center", */
          transition: "all 0.2s",
          animation: "none",
        });
    },
    function () {
      $("#flag > div > img")
        .attr("src", "/assets/img/comm/cursor-basic.png")
        .css({
          transform: "scale(1) rotate(0deg)",
          animation: "rotateAni 5s linear infinite",
        });
    }
  );
});
