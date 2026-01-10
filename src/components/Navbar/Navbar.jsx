import "./navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notifications_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";
import { Link,useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

function Navbar({setSidebar}) {

    const inputsearch = useRef(null);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if(search.trim() === "") return;
        navigate(`/search/${search}`);
    };
    
    return (
        <nav className="flex-div">
            <div className="nav-left flex-div">
                <img className="menu-icon" onClick={()=>setSidebar(prev=>{ return !prev})} src={menu_icon} alt="" />
                <Link to="/">
                    <img className="logo" src={logo} alt="" />
                </Link>
            </div>

            <div className="nav-middle flex-div">
                <div className="search-box">
                    <input 
                    type="text" placeholder="Search" 
                    ref={inputsearch} 
                    onChange={()=>setSearch(inputsearch.current.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />

                   <img src={search_icon} alt="" onClick={handleSearch}/>
                </div>    
            </div>

            <div className="nav-right flex-div">
                <img src={upload_icon} alt="" />
                <img src={more_icon} alt="" />
                <img src={notifications_icon} alt="" />
                <img src={profile_icon} className="user-icon" alt="" />
            </div>
        </nav>
    )
}

export default Navbar