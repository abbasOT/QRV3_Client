import React from "react";
import { useParams ,useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
// import doorman from '../../Images/doorman.svg'
import "./qrstyle.css";
function StartCall() {
  const { call_id } = useParams();
  
  const meetingRef = useRef(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (call_id) {
      myMeeting(meetingRef.current);
    } else {
      // Handle the case where  is empty
      console.log("call_id is empty");
    }
  }, [call_id]);

  const myMeeting = async (element) => {
    const appID = 217138010;
    const serverSecret = "493f68df7cc30d71c2e23036abd5b695";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      "111",
      Date.now().toString(),
      "visitor"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showPreJoinView:false,
      onJoinRoom: () => {
        // Add your custom logic for joining the room
      },
      onLeaveRoom: () => {
        // Custom logic when leaving the room
        console.log("Left the room");

        // Use navigate to redirect to the specified URL
        navigate(`/property/${call_id}`);
        // navigate(`/property/ab4`);
      },
    });
  };
  console.log("room id :" + call_id);

  return (
    <center style={{ marginBottom: "5%" }}>
      <div
        style={{ maxWidth:"576px", backgroundColor: "#011B33", height: "100vh", paddingTop:"30%" }}
      >
       <div ref={meetingRef} />
      </div>
    </center>
  );
}

export default StartCall;
