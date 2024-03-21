$(function () {
    // $(window).load(function () {
    //     $('#load').hide()
    // })
    // const loading_page = document.getElementById('load')
    // window.onload = function () {
    //     loading_page.fadeOut()
    //     // loading_page.style.display = 'none'
    // }

    new fullpage('#fullpage', {
        licenseKey: 'gplv3-license',
        autoScrolling: true,

        navigationTooltips: ['', 'intro', 'project 1', 'project 2', 'project 3', 'project 4', 'contact'],
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
        anchors: ['sect1', 'sect2', 'sect3', 'sect4', 'sect5', 'sect6', 'sect7'],

        // 섹션을 스크롤하거나 화면에 들어왔을 때 실행되는 콜백
        afterLoad: function (origin, destination, direction) {
            // destination.item이 현재 섹션을 나타냅니다.
            // 원하는 섹션에 대한 조건을 설정하여 해당 섹션이 화면에 들어왔을 때 동작을 수행합니다.
            if (destination.index == 0) {
                var line1 = $('.sect1 .tit')
                var line2 = $('.sect1 .tit-2')
                var box = $('.sect1 .box')

                var line1Spans = $('.sect1 .tit > span')
                var line2Spans = $('.sect1 .tit-2 > span')
                var nameBox = $('.sect1 .name-box')
                var subTxtBox = $('.sect1 .sub-txt-box')

                // Set tweens
                TweenMax.set([line1, line2, box], {
                    x: -15,
                })
                TweenMax.set([line1Spans, line2Spans, nameBox, subTxtBox], {
                    alpha: 0,
                })

                // Tween values
                var tl = new TimelineMax({
                    repeat: 0,
                })

                tl.add(
                    TweenMax.to(line1, 1.5, {
                        x: 0,
                    }),
                    'start'
                )

                tl.add(
                    TweenMax.to(line2, 1.5, {
                        x: 0,
                    }),
                    'start+=1'
                )

                tl.add(
                    TweenMax.staggerTo(
                        line1Spans,
                        1,
                        {
                            alpha: 1,
                        },
                        0.1
                    ),
                    'start'
                )

                tl.add(
                    TweenMax.staggerTo(
                        line2Spans,
                        1,
                        {
                            alpha: 1,
                        },
                        0.1
                    ),
                    'start+=1.5'
                )
                // tl.add(TweenMax.to(nameBox, 1, { x: 0 }, "start"), "start + 2");
                tl.add(TweenMax.staggerTo(nameBox, 1, { x: 20, alpha: 1 }, 0.1), 'start + 1.5')
                tl.add(TweenMax.staggerTo(subTxtBox, 1, { x: 10, alpha: 1 }, 0.1), 'start + 0.5')
            }
            if (destination.index == 1) {
                console.log('두 번째 섹션이 화면에 들어옵니다!')
                // 함수 호출
                typingAni()
                // setTimeout(function () {
                //   displayText(text, typingDelay, onComplete);
                // }, 1500);

                // typing animation1
                function typingAni() {
                    var txtline = $('.sect2 .txt-tit')
                    var txtlineSpans = $('.sect2 .txt-tit > span')
                    var txtline2 = $('.sect2 .txt-sec-box')
                    var txtline2Spans = $('.sect2 .txt-sec-box > span')

                    TweenMax.set([txtline, txtline2], {
                        x: -50,
                        opacity: 0,
                    })
                    TweenMax.set([txtlineSpans, txtline2Spans], {
                        opacity: 0,
                    })

                    var txttl = new TimelineMax({
                        repeat: 0,
                    })
                    txttl.add(
                        TweenMax.to(txtline, 0.6, {
                            x: 0,
                            opacity: 1,
                        }),
                        'start'
                    )
                    txttl.add(
                        TweenMax.staggerTo(
                            txtlineSpans,
                            1,
                            {
                                alpha: 1,
                                fontWeight: 700,
                            },
                            0.1
                        ),
                        'start'
                    )
                    txttl.add(
                        TweenMax.to(txtline2, 1, {
                            x: 0,
                            opacity: 1,
                            delay: 1.5,
                        }),
                        'start'
                    )
                    txttl.add(
                        TweenMax.staggerTo(
                            txtline2Spans,
                            1,
                            {
                                alpha: 1,
                                fontWeight: 600,
                                delay: 1.8,
                            },
                            0.1
                        ),
                        'start'
                    )
                }

                // typing animation2
                // 주석풀기
                // const text = document.getElementById("text");
                // const typingDelay = 150;
                // gsap.registerPlugin(ScrollTrigger);
                // // displayText(text, typingDelay, onComplete);

                // function displayText(target, delay, callback, nodes, index = 0) {
                //   if (index === 0) {
                //     nodes = [].slice.call(target.children);
                //     // console.log(nodes);
                //     target.innerHTML = "";
                //   }
                //   const currentNode = nodes[index];
                //   const currentNodeText = currentNode.innerHTML;
                //   currentNode.innerHTML = "";
                //   target.appendChild(currentNode);
                //   // 만약 현재 노드의 내용이 있다면
                //   if (currentNodeText) {
                //     let i = 0;
                //     const cars = currentNodeText.split("");
                //     const effect = setInterval(() => {
                //       currentNode.innerHTML += cars[i];
                //       i++;
                //       if (i === cars.length) {
                //         clearInterval(effect);
                //         // 만약 현재 노드가 마지막 노드가 아니라면 다음 노드 처리
                //         if (index < nodes.length - 1) {
                //           displayText(target, delay, callback, nodes, ++index);
                //         }
                //       }
                //     }, delay);
                //   } else {
                //     if (index < nodes.length - 1) {
                //       displayText(target, delay, callback, nodes, ++index);
                //     }
                //     // callback();
                //     //텍스트가 타이핑 애니메이션이 모두 완료된 후 콜백함수 실행
                //     else {
                //       callback();
                //       console.log("실행완료");
                //     }
                //   }
                // }
                // // 텍스트가 타이핑 애니메이션이 모두 완료된 후에 실행될 함수

                // function onComplete() {
                //   console.log("콜백 함수가 실행되었습니다.");
                //   const tl = gsap.timeline();
                //   tl.to(iconButterfly, { y: 0, autoAlpha: 1, duration: 1 });
                // }
            }
            if (destination.index == 2) {
                console.log('세 번째 섹션이 화면에 들어옵니다!')
                let x2y2vid = document.getElementById('x2y2')
                x2y2vid.play()
            }
            if (destination.index == 3) {
                console.log('project1 섹션이 화면에 들어옵니다!')
                let vid = document.getElementById('chVideo')
                vid.play()
            }
        },
    })

    // 커서
    // var $mouseX = 0,
    //   $mouseY = 0,
    //   $xp = 0,
    //   $yp = 0,
    //   $flag = $("#flag");

    // $(document).mousemove(function (e) {
    //   $mouseX = e.pageX;
    //   $mouseY = e.pageY;
    // });

    // var $loop = setInterval(function () {
    //   // change 12 to alter damping higher is slower
    //   $xp += ($mouseX - $xp) / 32;
    //   $yp += ($mouseY - $yp) / 32;
    //   $flag.css({
    //     left: $xp - $flag.width() * 0.5 + "px",
    //     top: $yp - $flag.height() * 0.5 + "px",
    //   });
    // }, 1);

    // $("a").hover(
    //   function () {
    //     $("#flag > div > img")
    //       .attr("src", "assets/img/comm/cursor-hover.png")
    //       .css({
    //         transform: "rotate(45deg)",
    //         /* "transform-origin": "center center", */
    //         transition: "all 0.2s",
    //         animation: "none",
    //       });
    //   },
    //   function () {
    //     $("#flag > div > img")
    //       .attr("src", "assets/img/comm/cursor-basic.png")
    //       .css({
    //         transform: "scale(1) rotate(0deg)",
    //         animation: "rotateAni 5s linear infinite",
    //       });
    //   }
    // );

    // cursor
    const cursor = document.getElementById('cursor')
    const links = document.getElementsByTagName('a')
    const buttons = document.getElementsByTagName('button')

    for (button of buttons) {
        button.addEventListener('mouseover', function (event) {
            cursor.classList.add('active')
        })
        button.addEventListener('mousemove', function (event) {
            cursor.classList.add('active')
        })
        button.addEventListener('mouseout', function (event) {
            cursor.classList.remove('active')
        })
    }

    for (link of links) {
        link.addEventListener('mouseover', function (event) {
            cursor.classList.add('active')
        })
        link.addEventListener('mousemove', function (event) {
            cursor.classList.add('active')
        })
        link.addEventListener('mouseout', function (event) {
            cursor.classList.remove('active')
        })
    }

    gsap.set('#cursor', { xPercent: -50, yPercent: -50 })
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const mouse = { x: pos.x, y: pos.y }
    const speed = 0.35

    const xSet = gsap.quickSetter(cursor, 'x', 'px')
    const ySet = gsap.quickSetter(cursor, 'y', 'px')

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x
        mouse.y = e.y
    })

    gsap.ticker.add(() => {
        const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio())

        pos.x += (mouse.x - pos.x) * dt
        pos.y += (mouse.y - pos.y) * dt
        xSet(pos.x)
        ySet(pos.y)
    })
})
