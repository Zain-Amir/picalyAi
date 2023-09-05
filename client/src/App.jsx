import React from "react"
import { BrowserRouter,Router,Route,Routes ,Link } from "react-router-dom"
import {logo} from './assets'
import { Home, CreatePost } from "./pages"
function App() {
  return (
    <BrowserRouter>
          <header className="sticky top-0 w-full flex justify-between items-center  bg-black   sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] shadow-lg">
          <Link to="/">
            <div className="flex justify-between items-center"><img src={logo} alt="logo" className="w-10 object-contain" /> 
            
            <h2 className="bg-gradient-to-r from-purple-200 to-yellow-200 font-bold text-xl bg-clip-text text-transparent ml-4 tracking-widest">  Picaly</h2>
            
            </div> 
          </Link>
          <Link to="/create-post" className="font-inter font-bold bg-gradient-to-r from-purple-200 to-yellow-200  text-black-dark  hover:translate-y-0.5 hover:shadow-card shadow-white px-4 py-1 rounded" > Create Post</Link>
          </header>

          <main className=" sm:p-8 px-4 py-8 w-full bg-gradient-to-b from-black from-95% to-purple-950 min-h-[calc(100vh-73px)]">
            <Routes>
                  <Route path="/" element ={<Home/>}/>
                  <Route path="/create-post" element ={<CreatePost/>}/>
            </Routes>
          
          </main> 
    </BrowserRouter>
  )
}

export default App
