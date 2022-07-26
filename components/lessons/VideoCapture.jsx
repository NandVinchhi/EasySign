import Script from "next/script";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { Center, Container, Text, Spinner } from "@chakra-ui/react";
import { NavbarLanding } from "../navbar/NavbarLanding.jsx";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

export const VideoCapture = (props) => {
  const [videoref, setVideoref] = useState(React.createRef());
  const [canvasref, setCanvasref] = useState(React.createRef());
  const [detecting, setDetecting] = useState(false);
  
  const router = useRouter();
  const auth = getAuth();

  function findAngle(A,B,C) {
      var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
      var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
      var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
      let final = Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB)) * (180 / Math.PI);

      if (final > 180){
        final = 360 - final;
      }
      return final;
  }

  function getRelativeCoords(landmarks){
    let final = []
    let quotient = (landmarks[0].x - landmarks[17].x) * (landmarks[0].x - landmarks[17].x) + (landmarks[0].y - landmarks[17].y) * (landmarks[0].y - landmarks[17].y) + (landmarks[0].z - landmarks[17].z) * (landmarks[0].z - landmarks[17].z) 
    quotient = Math.sqrt(quotient)
    for (let i = 0 ; i < landmarks.length; i++){
      let distancex = Math.abs(landmarks[i].x - landmarks[0].x)
      let distancey = Math.abs(landmarks[i].y - landmarks[0].y)
      final.push(distancex/quotient);
      final.push(distancey/quotient);
    }
    return final;
  }

  function getAngles(landmarks){
    let angleSets = [[4, 3, 2], [3, 2, 1], [8, 7, 6], [7, 6, 5], [6, 5, 0], [12, 11, 10], [11, 10, 9], [10, 9, 0], [16, 15, 14], [15, 14, 13], [14, 13, 0], [20, 19, 18], [19, 18, 17], [18, 17, 0]];
    let final = []

    angleSets.map(angleSet => {
      final.push(findAngle(landmarks[angleSet[0]], landmarks[angleSet[1]], landmarks[angleSet[2]]))
    })
    return final;
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      const s = document.createElement("script");
      let r = false;
      s.type = "text/javascript";
      s.src = src;
      s.async = true;
      s.onerror = function (err) {
        reject(err, s);
      };
      s.onload = s.onreadystatechange = function () {
        // console.log(this.readyState); // uncomment this line to see which ready states are called.
        if (!r && (!this.readyState || this.readyState == "complete")) {
          r = true;
          resolve();
        }
      };
      const t = document.getElementsByTagName("script")[0];
      t.parentElement.insertBefore(s, t);
    });
  }

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (!user) {
        router.push("/login");
      }
    });

    const videoElement = videoref.current;
    const canvasElement = canvasref.current;
    const canvasCtx = canvasElement.getContext("2d");
    let hands = null;
    let camera = null;
    let drawC = null;
    let drawL = null;
    

    function onResults(results) {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

    

      if (results.multiHandLandmarks) {
        
        let f = []

        
        for (let landmark_i = 0; landmark_i < results.multiHandLandmarks.length; landmark_i++) {
          
          const landmarks = results.multiHandLandmarks[landmark_i];
          f.push(getAngles(landmarks));
          
          drawC(canvasCtx, landmarks, HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 2,
          });
          // drawL(canvasCtx, landmarks, {color: '#00FF00', lineWidth: 1});
        }
        // if (f.length > 0){
        //   console.log(f)
        // }
        props.updateData(f)
        if (f.length > 0){
          setDetecting(true);
        }
        else {
          setDetecting(false);
        }
      }
      canvasCtx.restore();
    }
    loadScript(
      "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
    ).then(() => {
      drawC = drawConnectors;
      drawL = drawLandmarks;
      loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js").then(
        () => {
          hands = new Hands({
            locateFile: (file) => {
              return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            },
          });
          hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
          });
          hands.onResults(onResults);
          loadScript(
            "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"
          ).then(() => {
            camera = new window.Camera(videoElement, {
              onFrame: async () => {
                
                await hands.send({ image: videoElement });
              },
              width: 1280,
              height: 720,
            });
            camera.start();
            
          });
        }
      );
    });
  }, []);

  return (
    <>
      <Center h="full" bg="white">
        <video ref={videoref} style={{ display: "None" }}></video>
        <canvas
          ref={canvasref}
          style={{ borderRadius: "10px" }}
          width="640px"
          height="360px"
        ></canvas>
        
      </Center>
      {detecting == true && (<Center><Spinner mr="3"/><Text fontWeight="bold" fontSize="l">Detecting...</Text></Center>)}
      {detecting == false && (<Center><Text fontWeight="bold" fontSize="l">No hands detected</Text></Center>)}
    </>
  );
};
