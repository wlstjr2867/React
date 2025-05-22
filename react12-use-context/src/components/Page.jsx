import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

const Page = () => {
  //데이터 공유가 필요하다면 useContext 훅을 통해 즉시 사용할 수 있다.
  const data = useContext(ThemeContext);
  console.log('Page컴포넌트', data);
  //하위 컴포넌트로 프롭스를 통해 전달하는 데이터는 없는 상태
  return(
    <div className="page">
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
    </div>
  )
}

export default Page;