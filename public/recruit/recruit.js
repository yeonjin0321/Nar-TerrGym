  const firebaseConfig = {
    apiKey: "AIzaSyDpbDj9hxz7rpZGLl-SY95w6U3xpfpP7io",
    authDomain: "nar--terrgym.firebaseapp.com",
    databaseURL: "https://nar--terrgym-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "nar--terrgym",
    storageBucket: "nar--terrgym.appspot.com",
    messagingSenderId: "32281889534",
    appId: "1:32281889534:web:f29fa1da8d794c01a7b3af"
    };
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const storage = firebase.storage(); // 이미지담기위한 storage 소환술


  /*======= firebase데이터 테이블에 담기 ======= recruit.html*/

  // Database에서 데이터 가져오기
  let num = 0;
  db.collection('recruit').orderBy('작성일','desc').get().then((info)=>{
    //console.log(info);
    info.forEach((doc)=> {
      console.log(doc.data());
      var d = doc.data().작성일.toDate();
      var time = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " 
                  +d.getHours() +":" + d.getMinutes()+" " 
                  +"("+ "일월화수목금토".charAt(d.getUTCDay())+"요일)";

      const template = `
            <tr>
              <th scope="row">${++num}</th>
              <td>
                  ${doc.data().이름}
              </td>
              <td>${time}</td>
            </tr>
      `;
      $(".recruit-content").append(template)
    })
  })
  

$('#write').click(function(){
    alert ("로그인 후 작성해주세요");
  })

  /*================데이터베이스에 db, 파일넣기 ========== recruit_write.html*/



    $('#send').click(function(){
      //이미지저장 코드
      const file = document.querySelector('#formFileMultiple').files[0];
      const storageRef = storage.ref();
      const storagePath = storageRef.child('File/' + file.name);
      const uploadFile = storagePath.put(file);
      const sel_val = document.getElementById("form-select");
      const select = sel_val.options[sel_val.selectedIndex].text;
            
      uploadFile.on ('state_changed',
      //변화시 동작하는 함수
      null,
      // 에러시 동작하는 함수
      (error)=> {
        console.log('실패사유는',error);
      },
      //성공시 동작하는 함수 
      ()=>{
        uploadFile.snapshot.ref.getDownloadURL().then((url)=>{
          //console.log('업로드 된 경로는', url); //url 담으려면 지역변수이기때문에 아래로 와야함.
            const apply = {
              이름 : $('#name').val(),
              연락처 : $('#tel').val(),
              지원분야 : $('#form-select option:selected').text(),
              작성일 : new Date(),
              이력서 : url,
            }
            db.collection('recruit').add(apply).then((result)=>{
            //성공후에 실행할 코드
              console.log(result.id);
            window.location.href = "./recruit.html"
            }).catch((err)=>{
            console.log(err);
            alert("파일 첨부는 필수입니다");
            })
        });
      })        
    })
    
    
    // uid: JSON.parse(localStorage.getItem('user')).displayName,

    /*add({이름:'나아름'}) document 이름 자동 지정해줌 
    doc('apply').set({이름 : '나아름'}) 문서이름 내가 결정*/

/*============ recruit_view에 data받아오기===========*/

  // 주소에 써진 id 값 가져오는 쿼리문 
  const obj = new URLSearchParams(window.location.search);
  //
  db.collection('recruit').doc(obj.get('id')). get().then((result)=> {
    console.log(result.data());

    var d = result.data().작성일.toDate();
    var time = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " 
              +d.getHours() +":" + d.getMinutes()+" " 
              +"("+ "일월화수목금토".charAt(d.getUTCDay())+"요일)";

    $('.name').html(result.data().이름);
    $('.date').html(time);
    $('.tel').html(result.data().연락처);
    $('.field').html(result.data().지원분야);
    $('.file').html(`<a href="${result.data().이력서}" >문서첨부</a>`);
    //$('.file').html(`url(${result.data().이력서})`);
    
  })
  
  // 수정버튼 누르면 이동
  $('#edit').click(function() {
    window.location.href='./recruit_edit.html?id='+ obj.get('id');
  })

  $('#delete').click(function(){
    db.collection('recruit').doc(obj.get('id')).delete().then(()=>{
      window.location.href='./recruit.html';
    })    
  })

/*****
 * <td>
                <a href="./recruit_view.html?id=${doc.id}" >
                  ${doc.data().이름}
                </a>
              </td>
 */