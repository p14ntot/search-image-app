import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Search from "./components/Search"
import List from "./components/List"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* root to home page */}
        <Route path="/" element={<>
          <p className=" mt-9 font-bold  text-center text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-red-950 px-16">
            This is the home page of an application that displays images by retrieving data from the public API of the Unsplash page.
          </p>
          <p className="italic mt-8 text-center xl:text-xl ">Created by Giorgos Ntotsios</p>
        </>} />

          {/* root to search page */}
        <Route path="search" element={<Search />}></Route>



        {/* root to list page */}
        <Route path="list" element={<List />}></Route>
      </Routes>

    </>
  )
}

export default App
