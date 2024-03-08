// import React from "react";
// import { useParams } from "react-router-dom";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// const Room = () => {
//   // Changed 'r' to 'R' as component names should start with an uppercase letter
//   const { roomId } = useParams();
//   const myMeeting = async (element) => {
//     const appID = 524854465;
//     const serverSecret = "792eff583e2d26783498bc1bb7caecd0";
//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       appID,
//       serverSecret,
//       roomId,
//       Date.now().toString(),
//       "Arif"
//     );
//     const zp = ZegoUIKitPrebuilt.create(kitToken);
//     zp.joinRoom({
//       container: element,
//       scenario: {
//         mode: ZegoUIKitPrebuilt.VideoConference,
//       },
//     });
//   };
//   return (
//     <div className="room-page">
//       <div ref={myMeeting}></div>
//     </div>
//   );
// };

// export default Room; // Added semicolon at the end


import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {
  const { roomId } = useParams();
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  const elementRef = useRef(null); // Using useRef to access DOM element

  useEffect(() => {
if (!hasJoinedRoom) {
  const myMeeting = async () => {
    try {
      const appID = 524854465;
      const serverSecret = "792eff583e2d26783498bc1bb7caecd0";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        "Arif"
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      await zp.joinRoom({
        container: elementRef.current, // Accessing DOM element using ref
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        videoConfig: {
          captureWidth: 1280, // Set the width of the captured video
          captureHeight: 720, // Set the height of the captured video
          encodeWidth: 1280, // Set the width of the encoded video
          encodeHeight: 720, // Set the height of the encoded video
          bitrate: 2500, // Set the bitrate (in kbps)
          frameRate: 60, // Set the frame rate
          // Additional configuration options can be added as needed
        },
      });
      setHasJoinedRoom(true);
    } catch (error) {
      console.error("Error joining room:", error);
      // Handle error as per your application's requirement
    }
  };

  if (elementRef.current) {
    myMeeting();
  }
}

  }, [roomId, hasJoinedRoom]); // Re-run effect when roomId or hasJoinedRoom changes

  return (
    <div className="room-page">
      <header>
        <h1>Welcome to Room {roomId}</h1>
      </header>
      <div className="video-container" ref={elementRef}></div>
      <style jsx>{`
        .room-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #f0f0f0;
        }

        header {
          background-color: #333;
          color: #fff;
          padding: 20px;
          width: 100%;
          text-align: center;
        }

        .video-container {
          width: 90%;
          height: 85vh;
          background-color: #000;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default Room;
