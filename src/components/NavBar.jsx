import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className=" bg-slate-400 px-4 py-8 flex justify-center items-center gap-7">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/search'  >Search</NavLink>
            <NavLink to='/list'  >List</NavLink>
        </nav>
      );
}
 
export default NavBar;