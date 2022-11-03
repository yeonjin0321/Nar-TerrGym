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

/* 안되면 삭제 */
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user.uid);
    console.log(user.email);
    console.log(user.displayName);

    $("#displayName").html(user.displayName + "님 접속중");
  }
});
$("#member-logout").click(function () {
  //로그아웃 기능
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("로그아웃성공");
      window.location.href = "../main/main.html";
    })
    .catch((error) => {
      // An error happened.
      alert("오류입니다");
    });
});

//$.cookie("uid", "2CE7BB53C5D5BE81F6BC5329928F39CE");
