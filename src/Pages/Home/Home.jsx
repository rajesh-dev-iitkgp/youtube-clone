import "./home.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import Feed from "../../components/Feed/Feed"

function Home({sidebar,category,setCategory}){

    return(
     <>
        <Sidebar sidebar={sidebar} category={category} setCategory={setCategory}/>
        <div className={`container ${sidebar ? "" : "large-container"}`}>
            <Feed category={category}/>
        </div>
     </>
    ) 
}

export default Home