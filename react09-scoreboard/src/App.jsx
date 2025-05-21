import { useState } from 'react';
import Header from './components/Header';
import AddPlayerForm from './components/AddPlayerForm';
import Player from './components/Player';

function App() {
  //데이터로 사용할 객체형 배열을 state로 생성
  const [playerData, setPlayerData] = useState([
    {idx: 1, name: '홍길동', score: 10},
    {idx: 2, name: '손오공', score: 20},
    {idx: 3, name: '유비', score: 30},
    {idx: 4, name: '달타냥', score: 40},
  ]);
  //시퀀스로 사용할 state 생성 . 초깃값은 5부터 시작
  const [nextVal, setNextVal] = useState(5);

  //플레이어 추가를 위한 함수
  const addPlayerProcess = (pName) => {
    //이름만 매개변수로 받은 후 추가할 객체 생성
    console.log('onAddPlayer', pName);
    let addPlayer = {idx: nextVal, name: pName, score: 0};
    
    //방법 1
    //기존 데이터의 복사본 배열 생성
    // let copyPlayers = [...playerData];
    // //복사본에 새로운 데이터 추가
    // copyPlayers.push(addPlayer);
    // //setter함수를 호출해서 state 변경 후 리렌더링
    // setPlayerData(copyPlayers);

    //방법 2 : 방법1을 한줄의 코드로 수정할 수 있다.
    setPlayerData([...playerData, addPlayer]);



    //원본데이터를 변경하는 것은 권장하지 않음(얕은 참조 때문)
    // playerData.push(addPlayer);
    // setPlayerData(players);
    // console.log(players);

    //새로운 플레이어를 추가를 위해 시퀀스 증가
    setNextVal(nextVal+1);
  }

  //점수의 증감을 위한 함수. 매개변수는 증감을 위한 플래그, 선수의 일련번호
  const scoreChangeProcess = (flag, playerIdx)=>{
    console.log('idx', playerIdx, 'flag', flag);
    
    //원본데이터의 복사본 배열 생성
    let copyPlayers = [...playerData];
    //복사본을 통해 반복
    copyPlayers.forEach((row)=>{
      // console.log(row.idx, row.name);
      //현재 루프의 객체에서 수정할 일련번호와 일치 여부 확인
      if(row.idx === playerIdx){
        console.log(row.name);
        if(flag === '+'){
          row.score += 5;
        }
        else{
          row.score -= 5;
          //점수는 음수가 될 수 없으므로 0점으로 고정한다
          if(row.score<0){//row.scroe<0일때 
            alert("최소 점수는 0점입니다.")
            row.score= 0; //row.score의 값을 0으로 고정시킨다.
          } 

        }
      }
    });
    //수정된 복사본을 통해 state 변경
    setPlayerData(copyPlayers)
  }

  const deletePlayerProcess = (playerIdx) => { //playerIdx==player(row.idx)
    console.log('삭제idx', playerIdx);

    // //방법1 : 삭제하려는 일련번호와 일치하지 않는 데이터만 모아서 업데이트
    // let newPlayerData = [];
    // for(let i=0; i<playerData.length; i++){
    //   if(playerData[i].idx!==playerIdx){
    //     newPlayerData.push(playerData[i]);
    //   }
    // }

    //방법2 : reduce함수를 사용
    let newPlayerData = playerData.reduce((prev, curr)=>{
      /*
      prev는 초깃값으로 빈배열을 지정하고, 각 루프에서 삭제할 플레이어를
      제외한 나머지 객체를 추가한다.
      */
      if(curr.idx !== playerIdx){
        prev.push(curr);
      }
      //최종적으로 삭제할 플레이어가 제외된 배열을 반환한다.
      return prev;
    }, []);

    
    // console.log(newPlayerData);
    setPlayerData(newPlayerData);
  }
  
  //수정을 위한 함수
  const editPlayerProcess = (idx, name) => {
    console.log('수정', idx, name);
    let newPlayerData = playerData.filter((row) =>{
      //수정할 선수의 idx와 일치하면 이름을 수정한다.
      if(row.idx === idx){
        row.name = name;
      }
      //여기서 반환한 객체를 통해 새로운 배열이 생성된다.
      return row;
    });
    //state 변경 후 리렌더링
    setPlayerData(newPlayerData);
  }

  return (
    <div className="scoreboard">
      {/* 인원수, 점수합산을 위해 선수전체 데이터를 props로 전달 */}
      <Header title="My Scoreboard" playersData={playerData}/>
      {
        //map함수를 통해 인원수만큼 반복해서 Player컴포넌트 렌더링
        playerData.map((playerRow) => (
          //선수 한명의 정보를 담은 객체를 순차적으로 전달
          //unique한 key prop은 선수의 일련번호 사용
          //점수변경을 위한 함수를 props로 전달
          //선수 삭제를 위한 함수 전달
          <Player playerData={playerRow} key={playerRow.idx}
            onChangeScore = {scoreChangeProcess}
            onDeletePlayer = {deletePlayerProcess}
            onEditPlayer = {editPlayerProcess} />
        ))  
      }
      {/* 
      새로운 선수 등록을 위한 입력폼 
      플레이어 추가를 위한 함수를 props로 전달
      */}
      <AddPlayerForm onAddPlayer={addPlayerProcess}></AddPlayerForm>
    </div>
  );
}

export default App;
