import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App-06Modules.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)
//render 렌더링 : 데이터 -> HTML로 변환해서 브라우저에 보여주는것(눈에 보이게 만들어주는 작업)