import "./searchresults.css";
import { Link, useParams } from "react-router-dom";
import { API_key, value_convertor } from "../../data";
import { useEffect, useState } from "react";
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


function SearchResults() {

    const {query} = useParams();
    const [apiData, setApiData] = useState([]);


    useEffect(() => {
       async function showResults(){
        const search_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&type=video&key=${API_key}`;
        const response = await fetch(search_url);
        const data = await response.json();
        const videoIds = data.items.map(item => item.id.videoId).join(",");

        const videos_url =
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${API_key}`;

        const videosResponse = await fetch(videos_url);
        const videosData = await videosResponse.json();

        setApiData(videosData.items);
    }
    showResults();
    }, [query]);

    return (
        <div className="search-results">
            {apiData?.map((item,index) => {
                return (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="search-results-card" key={index}>
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <div className="search-video-info">
                            <h2>{item.snippet.title}</h2>
                            <p>{value_convertor(item?.statistics?.viewCount || 0)} views &bull; {moment(item?.snippet?.publishedAt).fromNow()}</p>
                            <p className="search-channel">{item.snippet.channelTitle}</p>
                        </div>
                    </Link>
                ) 
            })}   
        </div>
    );
}

export default SearchResults

