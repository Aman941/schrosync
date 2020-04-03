import React , {useState} from 'react';
import Youtube from 'react-youtube';
import SearchBar from './SearchBar';

const Youtubeplayer = () =>{
    const [videoId , setvideoId] = useState('XxVg_s8xAms');
    const [player , setplayer]   = useState('');

    function handleUrl(url){
        console.log(`url of the selected video is ${url}`);
        setvideoId(url);
    }

    return(
        <div>
        <SearchBar url = {videoId} onUrlChange = {handleUrl} />
        <Youtube
        videoId = {videoId}
        onReady = {(e) => setplayer(e.target)}
        />
        </div>
    )
}
export default Youtubeplayer;