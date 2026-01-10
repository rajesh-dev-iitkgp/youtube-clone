import "./search.css";
import SearchResults from "../../components/SearchResults/SearchResults";
import Sidebar from "../../components/Sidebar/Sidebar";

function Search({category,setCategory}) {
    return (
        <>
            <Sidebar sidebar={true} category={category} setCategory={setCategory} />
            <SearchResults />
        </>
        
    )
}

export default Search