import Script from "next/script";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { Center, Container } from "@chakra-ui/react";
import { NavbarLanding } from "../navbar/NavbarLanding.jsx";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

export const VideoCapture = () => {
  const [videoref, setVideoref] = useState(React.createRef());
  const [canvasref, setCanvasref] = useState(React.createRef());
  const [leftAngles, setLeftAngles] = useState([]);
  const [rightAngles, setRightAngles] = useState([]);
  const router = useRouter();
  const auth = getAuth();

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
      function findAngle(A, B, C) {
        let AB = Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2);
        let BC = Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2);
        let AC = Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2);
        return (BC * BC + AB * AB - AC * AC) / (2 * Math.sqrt(BC * AB));
      }

      if (results.multiHandLandmarks) {

        const lines = [
          [4, 3, 2],
          [3, 2, 1],
          [2, 1, 0],
          [8, 7, 6],
          [7, 6, 5],
          [6, 5, 0],
          [12, 11, 10],
          [11, 10, 9],
          [16, 15, 14],
          [15, 14, 13],
          [20, 19, 18],
          [19, 18, 17],
          [18, 17, 0],
        ];
        for (
          let landmark_i = 0;
          landmark_i < results.multiHandLandmarks.length;
          landmark_i++
        ) {
          let ang = [];
          const landmarks = results.multiHandLandmarks[landmark_i];
          for (let i = 0; i < lines.size; i++) {
            let angle = findAngle(
              landmarks[lines[i][0]],
              landmarks[lines[i][1]],
              landmarks[lines[i][2]]
            );
            console.log(angle);
            ang.push(angle);
          }

          if (landmark_i === 0) {
            setLeftAngles(ang);
          } else {
            setRightAngles(ang);
          }


          drawC(canvasCtx, landmarks, HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 3,
          });
          // drawL(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 1});
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
    </>
  );
};
