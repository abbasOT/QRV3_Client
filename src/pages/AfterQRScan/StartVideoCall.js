import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import doorman from "../../assests/logo.svg";
import "./qrstyle.css";
function StartCall() {
  const { call_id } = useParams();
  const { token } = useParams();
  const meetingRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (call_id) {
      myMeeting(meetingRef.current);
    } else {
      // Handle the case where  is empty
      console.log("call_id is empty");
    }
  }, []);

  const onDeleteRoom = async () => {
    try {
      // Make the DELETE request
      const response = await axios.delete(
        `https://ot-technologies.com/commercialAdmin/deleteToken/${token}`
      );
      console.log(response);
      console.log("Left the room");
      console.log(call_id);
      // navigate(`/property/${call_id}`);
      window.location.href = `/property/${call_id}`;
    } catch (error) {
      console.error("Error leaving the room:", error);
      // Handle the error if needed
    }
  };

  const myMeeting = async (element) => {
    const appID = 2019657299;
    const serverSecret = "e5cc924db34f7cd147a6133247099e7b";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      token,
      // "111",
      Date.now().toString(),
      "visitor"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      maxUsers: 2,
      showPreJoinView: false,
      showLeavingView: false,
      showLeaveRoomConfirmDialog: false,
      // autoHideFooter:false,

      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },

      onJoinRoom: () => { },
      onLeaveRoom: () => {
        onDeleteRoom();
      },
      onUserLeave: (users) => {
        console.log("Leave the room");
      },
    });
  };
  console.log("room id :" + call_id);

  return (
    <center style={{ marginBottom: "5%" }}>
      <div
        style={{
          maxWidth: "576px",
          backgroundColor: "#011B33",
          height: "100vh",
          paddingTop: "30%",
        }}
      >
        <div ref={meetingRef} />
      </div>
    </center>
  );
}

export default StartCall;
