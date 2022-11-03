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
      window.location.href = "../../main.html";
    })
    .catch((error) => {
      // An error happened.
      alert("오류입니다");
    });
});

var gall = setInterval(galleryFun, 2000);
var inter = true;
var idx = 2;

function galleryFun() {
  $(".gallery ul").animate(
    {
      left: -300 * idx + "px",
    },
    300
  );
  $(".g_item ul li")
    .eq(idx - 1)
    .addClass("on")
    .siblings()
    .removeClass("on");
  idx++;
  if (idx > $(".gallery ul li").length - 3) {
    $(".gallery ul").animate(
      {
        left: 0,
      },
      0
    );
    idx = 0;
  }
}

$(".gallery , .g_item").hover(
  function () {
    if (inter == true) {
      clearInterval(gall);
      inter = false;
    }
  },
  function () {
    if (inter == false) {
      gall = setInterval(galleryFun, 2000);
      inter = true;
    }
  }
);

$(".g_item ul li").on("click", function () {
  $(this).addClass("on").siblings().removeClass("on");
  idx = $(this).index() + 1;
  $(".gallery ul").animate(
    {
      left: -300 * idx + "px",
    },
    1000
  );
});
