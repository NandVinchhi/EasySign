
import Script from 'next/script'
import React, {useEffect, useState} from 'react';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Center, Container } from '@chakra-ui/react'

export default function Home() {
  const [videoref, setVideoref] = useState(React.createRef());
  const [canvasref, setCanvasref] = useState(React.createRef());

  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      const s = document.createElement('script');
      let r = false;
      s.type = 'text/javascript';
      s.src = src;
      s.async = true;
      s.onerror = function(err) {
        reject(err, s);
      };
      s.onload = s.onreadystatechange = function() {
        // console.log(this.readyState); // uncomment this line to see which ready states are called.
        if (!r && (!this.readyState || this.readyState == 'complete')) {
          r = true;
          resolve();
        }
      };
      const t = document.getElementsByTagName('script')[0];
      t.parentElement.insertBefore(s, t);
  });

  }

  useEffect(() => {
    const videoElement = videoref.current;
    const canvasElement = canvasref.current;
    const canvasCtx = canvasElement.getContext('2d');
    let hands = null;
    let camera = null;
    let drawC = null;
    let drawL = null;


    function onResults(results) {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      
      canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          drawC(canvasCtx, landmarks, HAND_CONNECTIONS,
                         {color: '#00FF00', lineWidth: 1});
          // drawL(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 1});
        }
      }
      canvasCtx.restore();
    }
    loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js").then(() => {
      drawC = drawConnectors;
      drawL = drawLandmarks;
      loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js").then(() => {
        hands = new Hands({locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }})
        hands.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });
        hands.onResults(onResults);
        loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js").then(() => {
          camera = new window.Camera(videoElement, {
            onFrame: async () => {
              await hands.send({image: videoElement});
            },
            width: 1280,
            height: 720
          })
          camera.start();
        })

      })
    })
    
  
  
  }, [])
  
  return (
    <>
      
      <Container maxWidth="container.sm">
      <Center h='full' bg="green">
        <video ref={videoref} style={{display: "None"}}></video>
        <canvas ref={canvasref} style={{borderRadius: "10px"}} width="450px" height="337px"></canvas>
      </Center>
        
      </Container>
    </>
  )
}
