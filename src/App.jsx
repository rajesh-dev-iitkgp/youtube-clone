import Navbar from "./components/Navbar/Navbar"
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Home from "./Pages/Home/Home"
import Video from "./Pages/Video/Video"
import { useState } from "react"
import Search from "./Pages/Search/Search"

function App(){

  const [sidebar, setSidebar] = useState(true);
  const [category,setCategory] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Navbar setSidebar={setSidebar}/>
        <Routes>
          <Route path="/" element={<Home sidebar={sidebar} category={category} setCategory={setCategory}/>}/>
          <Route path="/video/:categoryId/:videoId" element={<Video />}/>
          <Route path="/search/:query" element={<Search category={category} setCategory={setCategory}/>}/>
        </Routes>
      </BrowserRouter>   
    </div>
  )
}

export default App