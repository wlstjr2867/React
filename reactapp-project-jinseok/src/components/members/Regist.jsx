import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { firestore } from '../../Config/firestoreConfig';
import { useNavigate } from 'react-router-dom';

//전화번호 입력 시 자동으로 다음 칸으로 이동하는 기능
function commonFocusMove(thisObj, numLength, nextObj) {
  let input = document.getElementById(thisObj); //현재 입력 가져오기
  let strLen = input.value.length; //글자수
  if (strLen == numLength) {
    document.getElementById(nextObj).focus(); //지정한 글자수가 되면 다음입력
  }
}

function Regist() {
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState([]); //이미 등록된 userId 목록 저장

  //회원가입 폼에서 사용하는 모든 입력을 객체 형태로 관리
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
  
  //firestore에서 기존 회원 아이디 목록 가져오기
  const getCollection = async () => {
    let trArray = [];
    const querySnapshot = await getDocs(collection(firestore, "members"));
    querySnapshot.forEach((doc) => {
      // let memberInfo = doc.data();
      trArray.push (doc.id); //ID만 배열에 저장
    });
    setMemberId(trArray); // 중복체크에 사용
  }
  
  //오늘 날짜를 yyyy-mm-dd 형식으로 반환
  const nowDate = () => {
    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
    var day = ("0" + dateObj.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }
  
  //새 회원 정보를 firestore에 저장하는 함수
  const memberWrite = async (newMem) => {
    //doc으로 입력을 위한 컬렉션과 도큐먼트를 만든 후 JS객체로 정보 추가
    await setDoc(doc(firestore, 'members', newMem.userId), {...newMem, date:nowDate()});
    console.log('입력성공');
  }  

  //처음 렌더링될 때 getcollection 실행
  useEffect(()=>{
    getCollection();
  }, []);

  //아이디 중복 확인 기능
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

  //이메일 도메인 직접입력 or 선택기능
  const [lock, setLock] = useState(false);

  //form 상태값 갱신
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  //폼 제출시 실행되는 함수
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

    //이메일 주소와 전화번호를 문자열로 조합
    const email = `${form.emailId}@${form.emailDomain}`;
    const phone = `${document.getElementById('phone1').value}-${document.getElementById('phone2').value}-${document.getElementById('phone3').value}`

    //firestore에 저장할 새 회원 객체 구성
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
      await memberWrite(newMember); //firestore에 저장
      alert("회원가입완료!")
    }
    catch(error){
      console.error('회원가입실패', error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
    
    navigate('/');
    // console.log('가입정보', { ...form, email });
  };

  //다음 우편번호 API를 이용해 주소 검색
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
    }).open(); //팝업 열기
  };

  return (<>
    <h2>회원가입</h2>
    <form onSubmit={onSubmit}>
{/* 입력할때마다 onChage 로 form 바뀌고 화면도 자동 갱신 
value-> 현재입력값을 가져옴
onchange => 입력할 때마다 상태업데이트
required, readonly, placeholder, select 통해 유호성 검사 및 제어 */}
      <label htmlFor="userId">아이디</label>
      <div className='id-group'>
        <input type="text" id="userId" name="userId" placeholder='영문과 숫자 4~15자로 입력하세요' value={form.userId} onChange={onChange} required />
        &nbsp;&nbsp;
        {/* 클릭시 checkId 함수 실행 */}
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
        <input type="text" id="emailId" name="emailId" placeholder="이메일 아이디" value={form.emailId} onChange={onChange} style={{width:"70px"}} required />
        <span>@</span>
        {/* lock로 셀렉트박스에서 선택했으면 수정 불가 */}
        <input type="text" id="emailDomain" name="emailDomain" value={form.emailDomain} onChange={onChange} required readOnly={lock} style={{ width: "70px" }} />
        <select name="emailDomain" value={form.emailDomain} onChange={(e) => {
          const val = e.target.value;
          if (val !== "") {
            setForm((prev)=>({...prev, emailDomain: val}));
            setLock(true) //선택하면 수정불가
          }
          else {
            setForm((prev) =>({...prev, emailDomain: ""}));
            setLock(false) // 직접입력 선택 시 수정가능
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
        {/* 3자리까지 입력하면 두번째 포커스로 이동 */}
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