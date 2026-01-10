import "./feed.css";
import {Link } from "react-router-dom";
import {API_key,value_convertor,formatDuration} from "../../data"
import { useState, useEffect } from "react";
import moment from "moment";
moment.updateLocale('en', {
  relativeTime : {
    past: '%s ago',
    s: '%d seconds',
    m: '1 minute',
    h: '1 hour',
    d: '1 day',
    M: '1 month',
    y: '1 year',
  }
});

function Feed({category}){

    const [data,setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=75&regionCode=IN&videoCategoryId=${category}&key=${API_key}`;

            const response = await fetch(videoList_url);
            const result = await response.json();
            setData(result.items);
        }

        fetchData();
        }, [category]);


    return(
        <div className="feed">
            {data?.map((item,index)=>{
                return (
                    <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="card" key={index}>
                        <div className="thumbnail-box">
                            <img src={item.snippet.thumbnails.medium.url} alt="" />
                            <span className="duration">{formatDuration(item.contentDetails.duration)}</span>
                        </div>
                        <h2>{item.snippet.title}</h2>
                        <h3>{item.snippet.channelTitle}</h3>
                        <p>{value_convertor(item?.statistics?.viewCount || 0)} views &bull; {moment(item?.snippet?.publishedAt).fromNow()}</p>
                   </Link>
                )
            })}  
        </div>   
    )
}

export default Feed