import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { firestore } from '../../Config/firestoreConfig';
import { useNavigate } from 'react-router-dom';

function commonFocusMove(thisObj, numLength, nextObj) {
  let input = document.getElementById(thisObj);
  let strLen = input.value.length;
  if (strLen == numLength) {
    document.getElementById(nextObj).focus();
  }
}

function Regist() {

  const navigate = useNavigate();
  const [memberId, setMemberId] = useState([]);

  const [form, setForm] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    name: '',
    emailId: '',
    emailDomain: '',
    phone: '',
    zipcode: '',
    address: '',
    detailAddress: '',
  });
  
  
  const getCollection = async () => {
    let trArray = [];
    const querySnapshot = await getDocs(collection(firestore, "members"));
    querySnapshot.forEach((doc) => {
      let memberInfo = doc.data();
      trArray.push (doc.id);
    });
    setMemberId(trArray);
  }
  
  const nowDate = () => {
    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
    var day = ("0" + dateObj.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }

  const memberWrite = async (newMem) => {
    //doc으로 입력을 위한 컬렉션과 도큐먼트를 만든 후 JS객체로 정보 추가
    await setDoc(doc(firestore, 'members', newMem.userId), {...newMem, date:nowDate()});
    console.log('입력성공');
  }  

  useEffect(()=>{
    getCollection();
  }, []);

  const checkId = () => {
    if(!form.userId){
      alert('아이디를 입력하세요');
      return;
    }
    if(memberId.includes(form.userId)){
      alert('이미 사용중인 아이디입니다.')
    }
    else{
      alert('사용 가능한 아이디입니다.')
    }
  }

  const [lock, setLock] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.userId || !form.password || !form.name) {
      alert("모든 항목을 입력해주세요")
      return;
    }
    if(form.userId.length<4 || form.userId.length>15){
      alert('아이디는 4~15자 사이어야 합니다.')
      return;
    }
    if(form.password.length<8 || form.password.length>15){
      alert('비밀번호는 8~15자 사이여야 합니다.')
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert('패스워드가 일치하지 않습니다.')
      return;
    }
    if (!form.zipcode || !form.address){
      alert('우편번호와 기본주소를 입력해주세요');
      return;
    }

    const email = `${form.emailId}@${form.emailDomain}`;
    const phone = `${document.getElementById('phone1').value}-${document.getElementById('phone2').value}-${document.getElementById('phone3').value}`

    const newMember = {
      userId: form.userId,
      password: form.password,
      name: form.name,
      email,
      phone,
      zipcode: form.zipcode,
      address: form.address,
      detailAddress: form.detailAddress
    };

    try{
      await memberWrite(newMember);
      alert("회원가입완료!")
    }
    catch(error){
      console.error('회원가입실패', error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
    
    navigate('/');
    // console.log('가입정보', { ...form, email });
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

  return (<>
    <h2>회원가입</h2>
    <form onSubmit={onSubmit}>

      <label htmlFor="userId">아이디</label>
      <div className='id-group'>
        <input type="text" id="userId" name="userId" placeholder='영문과 숫자 4~15자로 입력하세요' value={form.userId} onChange={onChange} required />
        &nbsp;&nbsp;
        <button type='button' style={{display: 'inline'}} onClick={checkId}>중복확인</button>
      </div>

      <label htmlFor="password">패스워드</label>
      <input type="password" id="password" name="password" placeholder='새 비밀번호' value={form.password} onChange={onChange} required />
      <p style={{ fontSize: '15px', margin: '0px' }}>영문소문자와 숫자, 특수문자 포함 8~15자로 입력하세요.</p>

      <label htmlFor="confirmPassword">패스워드 확인</label>
      <input type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={onChange} required />
      <p style={{ fontSize: '15px', margin: '0px' }}>비밀번호 확인을 위해 한번 더 입력하세요.</p>

      <label htmlFor="name">이름</label>
      <input type="text" id="name" name="name" placeholder='이름' value={form.name} onChange={onChange} required />

      <label>이메일</label>
      <div className="email-group">
        <input type="text" id="emailId" name="emailId" placeholder="이메일 아이디" value={form.emailId} onChange={onChange} required />
        <span>@</span>
        <input type="text" id="emailDomain" name="emailDomain" value={form.emailDomain} onChange={onChange} required readOnly={lock} style={{ width: "50px" }} />
        <select name="emailDomain" value={form.emailDomain} onChange={(e) => {
          const val = e.target.value;
          if (val !== "") {
            setForm((prev)=>({...prev, emailDomain: val}));
            setLock(true)
          }
          else {
            setForm((prev) =>({...prev, emailDomain: ""}));
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
        <input type="text" id="phone1" maxLength={3} style={{width: "50px"}} onKeyUp={()=>commonFocusMove('phone1', 3, 'phone2')} required/>-
        <input type="text" id="phone2" maxLength={4} style={{width: "50px"}} onKeyUp={()=>commonFocusMove('phone2', 4, 'phone3')} required/>-
        <input type="text" id="phone3" maxLength={4} style={{width: "50px"}} required />
      </div>

      <label htmlFor="zipcode">우편번호</label>
      <div className="zipcode-group">
        <input type="text" id="zipcode" name="zipcode" value={form.zipcode} onChange={onChange} readOnly required />
        <button type="button" className="small-button" onClick={handleAddressSearch}>우편번호 찾기</button>
      </div>

      <label htmlFor="address">기본주소</label>
      <input type="text" id="address" name="address" value={form.address} onChange={onChange} readOnly required />

      <label htmlFor="detailAddress">상세주소</label>
      <input type="text" id="detailAddress" name="detailAddress" onChange={onChange} />

      <button type="submit">가입하기</button>
    </form>
  </>);
}
export default Regist; 