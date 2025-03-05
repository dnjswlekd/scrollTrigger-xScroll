$(function () {
  $('.animate').scrolla({
    // default
    mobile: true,
    once: false,
  });

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.matchMedia({
    '(min-width: 1024px)': function () {
      // 02 가로스크롤
      let list = gsap.utils.toArray('.work ul li');
      let scrollTween = gsap.to(list, {
        xPercent: -100 * (list.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: '.work',
          start: 'center center',
          end: '300%',
          // viewport위치의 300% => 클수록 느려짐
          pin: true,
          scrub: 1,
          markers: false,
        },
      });

      // img motion
      gsap.utils.toArray('.img-box').forEach(function (imgBox) {
        // 이미지 박스가 커지는 애니메이션 => 화면 오른쪽에서 부터 화면 중앙에서 끝남
        gsap
          .timeline({
            scrollTrigger: {
              trigger: imgBox,
              containerAnimation: scrollTween,
              start: 'center right',
              end: 'center center',
              scrub: true,
              markers: false,
            },
          })

          .to(
            imgBox,
            { 'clip-path': 'inset(0%)', ease: 'none', duration: 1 },
            0
          );

        // 이미지 박스가 작아지는 애니메이션 => 화면 중앙에서 부터 화면 왼쪽에서 끝남
        gsap
          .timeline({
            scrollTrigger: {
              trigger: imgBox,
              containerAnimation: scrollTween,
              start: 'center center',
              end: 'center left',
              scrub: true,
              markers: false,
            },
          })

          .to(
            imgBox,
            { 'clip-path': 'inset(30%', ease: 'none', duration: 1 },
            0
          );
      });
      // 03 이미지 박스 end

      // text motion start
      gsap.utils
        .toArray('.work ul li  a .text-box')
        .forEach(function (textBox) {
          // 텍스트 박스가 커지는 애니메이션 => 화면 오른쪽에서 부터 화면 중앙에서 끝남
          gsap
            .timeline({
              scrollTrigger: {
                trigger: textBox,
                containerAnimation: scrollTween,
                start: 'center 70%',
                end: 'center 40%',
                scrub: true,
                markers: false,
              },
            })

            .to(textBox, { opacity: '1', x: '-100', duration: 1 }, 0);

          // 텍스트 박스가 작아지는 애니메이션 => 화면 중앙에서 부터 화면 왼쪽에서 끝남
          gsap
            .timeline({
              scrollTrigger: {
                trigger: textBox,
                containerAnimation: scrollTween,
                start: 'center 30%',
                end: 'center 20%',
                scrub: true,
                markers: false,
              },
            })

            .to(textBox, { opacity: '0', x: '-100', duration: 1 }, 0);

          gsap.utils.toArray('.num').forEach(function (text) {
            let num = text.getAttribute('data-text');
            let counter = document.querySelector('.counter .now');

            ScrollTrigger.create({
              trigger: text,
              start: '0% center',
              end: '100% center',
              containerAnimation: scrollTween,
              onEnter: (self) => (counter.innerText = num), // 스크롤 위치가 start를 지나 앞으로 이동 할 때. .counter .now에 적어준다.
              onEnterBack: (self) => (counter.innerText = num), // 스크롤 위치가 end를 지나 뒤로 이동 할 때. .counter .now에 적어준다.
              markers: false,
            });
          });
        });
    },
  });
});
