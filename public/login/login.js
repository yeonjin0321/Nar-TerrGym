/* 안되면 삭제 */

/* 회원 로그인 */
$("#login").click(function () {
  //사용자가 입력한 이메일, 비번, 핸폰번호, 이름
  const email = $("#mem_email").val();
  const pw = $("#mem_pw").val();
  firebase
    .auth()
    .signInWithEmailAndPassword(email, pw)
    .then((result) => {
      const imsi = JSON.stringify(result); //문자열로 변환
      //console.log(imsi);
      const jsonDoc = JSON.parse(imsi);
      const email = jsonDoc.user.email;
      console.log(email);
      if (email) {
        $.cookie("c_name", email);
      }
      window.location.href = "../main/membermain.html";
    })
    .catch((error)=>{ ///가입오류
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log("회원가입실패");
      console.log(errorCode);
      console.log(errorMessage);

      if (errorCode =='auth/user-not-found'){
        alert('아이디가 존재하지않습니다.');

      }else if (errorCode=='auth/wrong-password'){
        alert('비밀번호가 틀렸습니다.');
      }else {
        alert ('예기치못한 오류 발생했습니다. 다시시도해주세요');
      } 
    })//end of try catch
}); // 회원 로그인 처리(쿠키 담아서)

/* 관리자 로그인 */
$("#admin-login").click(function () {
  //사용자가 입력한 이메일, 비번, 핸폰번호, 이름
  const email = $("#mem_email").val();
  const pw = $("#mem_pw").val();
  if (email=='admin@natergym.com' && pw =='111111'){
    console.log('관리자당');
  }else {
    alert ('관리자가 아닙니다');
    window.location.href="../main/main.html";
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(email, pw)
    .then((result) => {
      const imsi = JSON.stringify(result); //문자열로 변환
      //console.log(imsi);
      const jsonDoc = JSON.parse(imsi);
      const email = jsonDoc.user.email;
      console.log(email);
      if (email) {
        $.cookie("c_name", email);
      }
      window.location.href = "../main/adminmain.html";
    })
    .catch((error)=>{ ///가입오류
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log("회원가입실패");
      console.log(errorCode);
      console.log(errorMessage);

      if (errorCode =='auth/user-not-found'){
        alert('아이디가 존재하지않습니다.');

      }else if (errorCode=='auth/wrong-password'){
        alert('비밀번호가 틀렸습니다.');
      }else {
        alert ('예기치못한 오류 발생했습니다. 다시시도해주세요');
      } 
    })//end of try catch
}); //  로그인 처리(쿠키 담아서)

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
      window.location.href = "./main.html";
    })
    .catch((error) => {
      // An error happened.
      alert("오류입니다");
    });
});
