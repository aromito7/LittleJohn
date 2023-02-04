import video from "../../videos/landingPageVideo.mp4"
import React, { useEffect, useRef } from "react";
const LandingPage = () => {
    const videoEl = useRef(null);

    const attemptPlay = () => {
      videoEl &&
        videoEl.current &&
        videoEl.current.play().catch(error => {
          console.error("Error attempting to play", error);
        });
    };

    useEffect(() => {
      attemptPlay();
    }, []);

    return(
        <>
            <div className="flex">
                <p>LittleJohn</p>
                <button className="flex-end light-button">Log in</button>
                <button className="flex-end dark-button">Sign up</button>
            </div>
            <video
                style={{ maxWidth: "100%", width: "800px", margin: "0 auto" }}
                playsInline
                muted
                alt="All the devices"
                src={video}  //"https://stream.mux.com/6fiGM5ChLz8T66ZZiuzk1KZuIKX8zJz00/medium.mp4"
                ref={videoEl}
                />
        </>
    )
}


export default LandingPage
