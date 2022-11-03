// 파이어베이스 공통코드
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
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

export const firebaseApp = initializeApp(firebaseConfig);
console.log(firebaseApp);
