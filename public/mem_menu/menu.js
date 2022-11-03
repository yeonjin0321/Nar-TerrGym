// user uid나 email  이름 정보 받으려면 if문 안에서 작성해야 함 !! 지역변수이기때문에!!
const firebaseConfig = {
  apiKey: "AIzaSyDpbDj9hxz7rpZGLl-SY95w6U3xpfpP7io",
  authDomain: "nar--terrgym.firebaseapp.com",
  databaseURL:
    "https://nar--terrgym-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nar--terrgym",
  storageBucket: "nar--terrgym.appspot.com",
  messagingSenderId: "32281889534",
  appId: "1:32281889534:web:f29fa1da8d794c01a7b3af",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user.uid);
    console.log(user.email);
    console.log(user.displayName);
    ///////////mypage 데이터받아오기
    $("#displayName").html(user.displayName + "님 접속중");
    $("#displayName1").html(user.displayName + "님 MYPAGE 입니다");
    db.collection("user")
      .doc(user.uid)
      .get()
      .then((result) => {
        console.log(result.data());

        $(".email").html(result.data().email);
        $(".password").html(result.data().pw);
        $(".name").html(result.data().name);
        $(".tel").html(result.data().tel);
        //$('.branch').html(result.data().select);
      });
    $("#edit").click(function () {
      window.location.href = "./mypage_edit.html";
    });

    $("#delete").click(function () {
      //let delete_confirm = window.confirm(message);
      if (window.confirm("정말 탈퇴하시겠습니까?")) {
        const cur_user = firebase.auth().currentUser;
        cur_user
          .delete()
          .then(() => {})
          .catch((error) => {
            console.log(error);
            alert("탈퇴에 실패하였습니다");
          });
        db.collection("user")
          .doc(user.uid)
          .delete()
          .then(() => {
            window.location.href = "../main/main.html";
          });
      } //end of if
      else {
        window.alert("탈퇴를 취소합니다");
      }
    }); // end of click delete
  } // end of if
}); // end of onAuthStateChanged
/////수정버튼 누르면 수정페이지넘어가기!

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
