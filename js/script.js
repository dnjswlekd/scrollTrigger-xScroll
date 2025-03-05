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
          markers: true,
        },
      });
    },
  });
});
