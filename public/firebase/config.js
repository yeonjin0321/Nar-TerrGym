//localstorage에 넣고 꺼내기. 파베에서 검색하면 느림.
var 뺀거 = localStorage.getItem("user");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user.uid);
    //console.log(user.email);
    console.log(user.displayName);

    localStorage.setItem("user", JSON.stringify(user));
  }
  $("#displayName").html(JSON.parse(뺀거).displayName);
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
