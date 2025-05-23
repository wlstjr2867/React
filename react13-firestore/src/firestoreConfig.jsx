//파이어베이스 서비스에 연결하기 위한 임포트
import {initializeApp} from "firebase/app";
//파이어스토어 데이터베이스 사용을 위한 임포트
import {getFirestore} from "firebase/firestore"

//파이어베이스 콘솔에서 발급받은 API정보(SDK정보)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId:  import.meta.env.VITE_measurementId
};

//firebase에 연결 후 앱 초기화 
const app = initializeApp(firebaseConfig)
//firestore 사용을 위한 객체 생성
const firestore = getFirestore(app);
//익스포트(내보내기)
export {firestore};