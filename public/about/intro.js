//슬라이더처리 제이쿼리 문법 사용했습니다.
setInterval(slide, 3000); //3초마다 넘어가게 했습니다.

function slide() {
  $("#slider").animate(
    {
      marginLeft: -800,
    },
    1000,
    slideNext
  );
}

function slideNext() {
  $("#slider>li").eq(0).appendTo("#slider");
  $("#slider").animate(
    {
      marginLeft: 0,
    },
    0
  );
}
