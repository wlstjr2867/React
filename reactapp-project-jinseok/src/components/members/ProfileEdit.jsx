import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../Config/firestoreConfig';

function commonFocusMove(thisObj, numLength, nextObj) {
  let input = document.getElementById(thisObj);
  let strLen = input.value.length;
  if (strLen == numLength) {
    document.getElementById(nextObj).focus();
  }
}

function ProfileEdit() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  
  const [form, setForm] = useState({
    userId: '', // 아이디는 보통 읽기 전용
    password: '',
    confirmPassword: '',
    name: '',
    emailId: '',
    emailDomain: '',
    phone1: '',
    phone2: '',
    phone3: '',
    zipcode: '',
    address: '',
    detailAddress: '',
  });

  const [docId, setDocId] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const snapshot = await getDocs(collection(firestore, 'members'));
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.userId === userId) {
          let emailId = '';
          let emailDomain = '';
          if(data.email.includes('@')){
            const parts = data.email.split('@');
            emailId = parts[0];
            emailDomain = parts[1];
          }

          let phone1, phone2, phone3;
          if(data.phone.includes('-')){
            [phone1, phone2, phone3] = data.phone.split('-');
          }
          setForm({
            userId : data.userId,
            name: data.name,
            password: data.password,
            confirmPassword: '', // 최초 불러올 땐 같게
            emailId: emailId,
            emailDomain: emailDomain,
            phone1: phone1,
            phone2: phone2,
            phone3: phone3,
            zipcode: data.zipcode,
            address: data.address,
            detailAddress: data.detailAddress,
          });
          setDocId(docSnap.id);
        }
      });
    };
    fetchUserData();
  }, [userId])

  const [lock, setLock] = useState(false);

  const Change = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const Submit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('패스워드가 일치하지 않습니다.');
      return;
    }
    if (!docId) {
      alert("회원 정보를 찾을 수 없습니다.")
      return;
    }

    try{
      const userRef = doc(firestore, 'members', docId);

      const email = `${form.emailId}@${form.emailDomain}`; 
      const phone = `${form.phone1}-${form.phone2}-${form.phone3}`;

      await updateDoc(userRef, {
        name: form.name,
        password: form.password,
        email: email,
        phone: phone,
        zipcode: form.zipcode,
        address: form.address,
        detailAddress: form.detailAddress,
      });
      alert('회원 정보가 수정되었습니다.')
      navigate("/mypage");
    }
    catch(error){
      alert('수정 중 오류가 발생했습니다.')
    }
    
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        const zipcode = data.zonecode;
        const address = data.address; // 사용자가 선택한 주소
        setForm((prev) => ({
          ...prev,
          zipcode: zipcode,
          address: address, // 기본주소에 자동입력
        }));
      },
    }).open();
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h2>회원정보 수정</h2>
      <form onSubmit={Submit}>

        <label htmlFor="userId">아이디</label>
        <div className='id-group'>
          <input type="text" id="userId" name="userId" placeholder='영문과 숫자 4~15자로 입력하세요' value={form.userId} readOnly />
        </div>

        <label htmlFor="password">패스워드</label>
        <input type="password" id="password" name="password" placeholder='새 비밀번호' value={form.password} onChange={Change} required />
        <p style={{ fontSize: '15px', margin: '0px' }}>영문소문자와 숫자, 특수문자 포함 8~15자로 입력하세요.</p>

        <label htmlFor="confirmPassword">패스워드 확인</label>
        <input type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={Change} required />
        <p style={{ fontSize: '15px', margin: '0px' }}>비밀번호 확인을 위해 한번 더 입력하세요.</p>

        <label htmlFor="name">이름</label>
        <input type="text" id="name" name="name" placeholder='이름' value={form.name} onChange={Change} required />

        <label>이메일</label>
        <div className="email-group">
          <input type="text" id="emailId" name="emailId" placeholder="이메일 아이디" value={form.emailId} onChange={Change} required />
          <span>@</span>
          <input type="text" id="emailDomain" name="emailDomain" value={form.emailDomain} onChange={Change} required readOnly={lock} style={{ width: "50px" }} />
          <select name="emailDomain" value={form.emailDomain} onChange={(e) => {
            const val = e.target.value;
            if (val !== "") {
              setForm((prev) => ({ ...prev, emailDomain: val }));
              setLock(true)
            }
            else {
              setForm((prev) => ({ ...prev, emailDomain: "" }));
              setLock(false)
            }
          }}>
            <option value="">직접입력</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
          </select>
        </div>

        <label htmlFor="phone">휴대전화번호</label>
        <div>
          <input type="text" id="phone1" maxLength={3} style={{ width: "50px" }} onKeyUp={() => commonFocusMove('phone1', 3, 'phone2')} value={form.phone1} onChange={Change} required />-
          <input type="text" id="phone2" maxLength={4} style={{ width: "50px" }} onKeyUp={() => commonFocusMove('phone2', 4, 'phone3')} value={form.phone2} onChange={Change} required />-
          <input type="text" id="phone3" maxLength={4} style={{ width: "50px" }} value={form.phone3} onChange={Change} required />
        </div>

        <label htmlFor="zipcode">우편번호</label>
        <div className="zipcode-group">
          <input type="text" id="zipcode" name="zipcode" value={form.zipcode} onChange={Change} readOnly required />
          <button type="button" className="small-button" onClick={handleAddressSearch}>우편번호 찾기</button>
        </div>

        <label htmlFor="address">기본주소</label>
        <input type="text" id="address" name="address" value={form.address} onChange={Change} readOnly required />

        <label htmlFor="detailAddress">상세주소</label>
        <input type="text" id="detailAddress" name="detailAddress" value={form.detailAddress} onChange={Change} />

        <button type="submit">수정완료</button>
      </form>
    </div>
  );
};

export default ProfileEdit;