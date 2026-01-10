import "./playvideo.css"
import like from "../../assets/like.png"
import dislike from "../../assets/dislike.png"
import share from "../../assets/share.png"
import save from "../../assets/save.png"
import jack from "../../assets/jack.png"
import { useState, useEffect } from "react"
import { API_key } from "../../data"
import { value_convertor } from "../../data"
import { useParams } from "react-router-dom"
import moment from "moment"
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

 function PlayVideo(){

    const {videoId}=useParams();

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState(null);

    useEffect(()=>{

        if(!videoId) return ;

        async function fetchVideoData(){
            try {
                const video_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_key}`;
                const response = await fetch(video_url);
                const data = await response.json();
                if (!data?.items || data.items.length === 0) return;
                setApiData(data.items[0]);
            }
            catch (err) {
                console.log(err)
            }
        }
        
       fetchVideoData();
    },[videoId]);

    useEffect(()=>{
        async function fetchOtherData(){ 

            try{
                // fetching channel data
                const channel_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData?.snippet?.channelId}&key=${API_key}`;
                const response = await fetch(channel_url);
                const data = await response.json();
                if (data?.items?.length > 0) {
                    setChannelData(data.items[0]);
                }

                // Comment data
                const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=30&videoId=${videoId}&key=${API_key}`;
                const response2 = await fetch(comment_url);
                const data2 = await response2.json();

                setCommentData(data2?.items || []);
            }
            catch (error) {
                console.error("Other data fetch error:", error);
            }
        }

        fetchOtherData();
    },[apiData,videoId]);

    return (
        <div className="play-video">
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3>{apiData?apiData.snippet.title : "Title here"}</h3>
            <div className="play-video-info">
                <p>{apiData?value_convertor(apiData.statistics.viewCount) : "16K"} Views &bull; {moment(apiData?.snippet?.publishedAt).fromNow()}</p>
                <div>
                    <span><img src={like} alt="" />{apiData?value_convertor(apiData.statistics.likeCount) : 155 }</span>
                    <span><img src={dislike} alt="" /></span>
                    <span><img src={share} alt="" />Share</span>
                    <span><img src={save} alt="" />Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData?channelData.snippet.thumbnails.medium.url : jack} alt="" />
                <div>
                    <p>{apiData?apiData.snippet.channelTitle : "Channel Name"}</p>
                    <span>{channelData?value_convertor(channelData.statistics.subscriberCount) : "100K"} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData?apiData.snippet.description.slice(0,300) : "Description here"}</p>
                <hr />
                <h4>{apiData?value_convertor(apiData.statistics.commentCount) : 101} Comments</h4>

                {commentData?.map((item,index)=>{
                    return(
                        <div className="comment" key={index}>
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                            <div>
                                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.updatedAt).fromNow()} </span></h3>
                                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                <div className="comment-action">
                                    <img src={like} alt="" />
                                    <span>{value_convertor(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                    <img src={dislike} alt="" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PlayVideo