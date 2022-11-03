firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user.uid);
    console.log(user.email);
    console.log(user.displayName);

    $("#displayName").html(user.displayName + "님 접속중");

}///end of onAuthStateChanged
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

  
/********=======db 가져오기question에 있는   ques_view.html */

/* 
 */
  
  

/****** quse_edit.html 에 기존 데이터 받아서 수정후 데이터 넘기기==>ques_edit.html 페이지에서 ******* */

