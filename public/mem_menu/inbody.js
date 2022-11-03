// user uid나 email  이름 정보 받으려면 if문 안에서 작성해야 함 !! 지역변수이기때문에!!
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user.uid);
    console.log(user.email);
    console.log(user.displayName);

    $("#displayName").html(user.displayName + "님 접속중");
    $("#displayName1").html(user.email + "님 MYPAGE 입니다");
    db.collection("user")
      .doc(user.uid)
      .get()
      .then((result) => {
        console.log(result.data());
        $(".email").html(result.data().email);
        $(".password").html(result.data().pw);
        $(".name").html(result.data().name);
        $(".tel").html(result.data().tel);
      });
  } // end of if
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
