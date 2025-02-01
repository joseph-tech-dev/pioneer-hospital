import { useState, useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import "../styles/VideoConference.css";


const APP_ID = "your-agora-app-id";
const API_URL = "your-backend-api-url"; // Replace with your backend API URL

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

export default function VideoConference() {
    const [joined, setJoined] = useState(false);
    const [channel, setChannel] = useState("");
    const localTracks = useRef([]);
   // const remoteUsers = useRef({});
    const token = useRef(null);

    useEffect(() => {
        client.on("user-published", handleUserPublished);
        client.on("user-unpublished", handleUserUnpublished);
    
        return () => {
            leaveCall();
            client.off("user-published", handleUserPublished);
            client.off("user-unpublished", handleUserUnpublished);
        };
    }, []);

    async function fetchToken(channelName) {
        const response = await fetch(`${API_URL}/get-agora-token?channel=${channelName}`);
        const data = await response.json();
        token.current = data.token;
    }

    async function joinCall() {
        if (!channel) return alert("Please enter a channel name");
        await fetchToken(channel);
        await client.join(APP_ID, channel, token.current, null);
        localTracks.current = await AgoraRTC.createMicrophoneAndCameraTracks();
        await client.publish(localTracks.current);
        setJoined(true);
    }

    async function leaveCall() {
        localTracks.current.forEach(track => track.stop() && track.close());
        await client.leave();
        setJoined(false);
    }

    function handleUserPublished(user, mediaType) {
        client.subscribe(user, mediaType).then(() => {
            if (mediaType === "video") {
                const videoTrack = user.videoTrack;
                const player = document.createElement("div");
                player.id = user.uid;
                document.getElementById("remote-container").appendChild(player);
                videoTrack.play(player.id);
            }
        });
    }

    function handleUserUnpublished(user) {
        const player = document.getElementById(user.uid);
        if (player) player.remove();
    }

    return (
        <div className="video-container">
            <input 
                type="text" 
                placeholder="Enter Channel Name" 
                value={channel} 
                onChange={(e) => setChannel(e.target.value)}
            />
            <div id="remote-container"></div>
            {joined ? (
                <button onClick={leaveCall}>Leave Call</button>
            ) : (
                <button onClick={joinCall}>Join Call</button>
            )}
        </div>
    );
}
