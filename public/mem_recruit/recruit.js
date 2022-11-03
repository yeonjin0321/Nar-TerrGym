firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user.uid);
    console.log(user.email);
    console.log(user.displayName);

    $("#displayName").html(user.displayName + "님 접속중");
    
  }
});
/* 로그아웃 */
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