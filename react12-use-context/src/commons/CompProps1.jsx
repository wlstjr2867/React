import CompState2 from './CompProps2';

//부모에서 전달된 2개의 props를 개별 매개변수로 받아서 사용
const CompProps1 = ({propData, myNumber}) =>{
  return(
    <div>
      <h4>Props1 컴포넌트</h4>
      {propData}
      {/* 프롭 드릴링으로 자식 컴포넌트로 재전달 */}
      <CompState2 propData2={propData} myNumber={myNumber} />
    </div>
  )
}

export default  CompProps1;