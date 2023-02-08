import video from "../../videos/landingPageVideo.mp4"
import './LandingPage.css'
import React, { useEffect, useRef, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

const LandingPage = () => {
    const [login, setLogin] = useState(false)
    const [signup, setSignup] = useState(false)
    const videoEl = useRef(null);
    const history = useHistory();

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

    if(login){
      return <Redirect to="/login"/>
    }
    if(signup){
      return <Redirect to="/signup"/>
    }

    return(
        <>
            <div id="landing-menu" className="flex">
                <div id="landing-name-logo" className="flex align-center">
                  <h2>LittleJohn</h2>
                  <i className="fa-solid fa-feather fa-xl"/>
                </div>
                <div id="landing-buttons" className="flex-end align-center">
                  <button className="light-button cursor-pointer" onClick={e => setLogin(true)}>Log in</button>
                  <button className="dark-button cursor-pointer" onClick={e => history.push('/signup')}>Sign up</button>
                </div>
            </div>
            <div id="landing-page-container">
              <video
                  style={{ maxWidth: "100%", width: "100%", margin: "0 auto" }}
                  playsInline
                  muted
                  alt="All the devices"
                  src={video}  //"https://stream.mux.com/6fiGM5ChLz8T66ZZiuzk1KZuIKX8zJz00/medium.mp4"
                  ref={videoEl}
                  />
              <div className="flex-vertical">
                <p className="center font72 bold">Earn a 1% match.</p>
                <p className="center font72 bold">No employer necessary.</p>
                <div className="flex">
                  <button className="landing-button bold" onClick={e => history.push('/login')}>Get started</button>
                </div>
              </div>
            </div>
        </>
    )
}


export default LandingPage
