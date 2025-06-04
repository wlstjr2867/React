import { firestore } from '../Config/firestoreConfig'; // Firestore 인스턴스
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';

// 게시글 전체 가져오기
export const getAllPosts = async () => {
  const querySnapshot = await getDocs(collection(firestore, "posts")); // "posts" 컬렉션 전체 문서 가져오기
  let postList = []; //저장할 빈 배열 생성

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data(); // 각 문서 데이터 추출
    postList.push({
      id: docSnap.id,             // ID
      ...data                     // 데이터
    });
  });

  return postList;
};

// 단일 게시글 가져오기
export const getPostById = async (id) => {
  const docRef = doc(firestore, "posts", id);   // 특정 문서 참조
  const docSnap = await getDoc(docRef);         // 문서 가져오기

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }; // 문서 id와 내용 함께 반환
  } else {
    return null; // 없으면 null 반환
  }
};

// 게시글 작성
export const createPost = async ({ title, content }) => {
  const newPost = {
    title,
    content,
    createdAt: Timestamp.now(), // 서버 타임스탬프 사용
  };

  const docRef = await addDoc(collection(firestore, "posts"), newPost); // 문서 추가
  return docRef.id; // 새 문서 ID 반환
};

// 게시글 수정
export const updatePost = async (id, { title, content }) => {
  const docRef = doc(firestore, "posts", id); // 수정할 문서 참조
  await updateDoc(docRef, { title, content }); // title과 content만 수정
};

// 게시글 삭제
export const deletePost = async (id) => {
  const docRef = doc(firestore, "posts", id); // 삭제할 문서 참조
  await deleteDoc(docRef); // 문서 삭제
};