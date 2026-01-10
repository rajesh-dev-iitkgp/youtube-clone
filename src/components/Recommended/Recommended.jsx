import "./recommended.css"
import { useEffect, useState } from "react";
import { API_key, value_convertor } from "../../data";
import { Link } from "react-router-dom";

function Recommended({categoryId}) {

    const [apiData, setApiData] = useState(null);

    useEffect(()=>{
        async function fetchData(){
            try{
                const relatedvideo_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=75&regionCode=IN&videoCategoryId=${categoryId}&key=${API_key}`;
                const response = await fetch(relatedvideo_url);
                const data = await response.json();
                if (data?.items?.length) {
                    setApiData(data.items);
                }
                else {
                    setApiData([]);
                }
            }
            catch(err){
                console.log(err);
                setApiData([]);
            }
        
    }
    fetchData();
    },[categoryId]);

    return (
        <div className="recommended">
            {apiData?.map((item,index)=>{
                return (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={index}>
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <div className="vid-info">
                            <h4 className="side-title">{item.snippet.title}</h4>
                            <p className="recommended-channel">{item.snippet.channelTitle}</p>
                            <p>{value_convertor(item?.statistics?.viewCount || 0)} Views</p>
                        </div>
                    </Link>
                )
            })} 
        </div> 
    )
}

export default Recommended