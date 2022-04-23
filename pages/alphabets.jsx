import { SignRecognizing } from "../components/lessons/SignRecognizing";
import { Signing } from "../components/lessons/Signing";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { words3 } from "./data";
import { words4 } from "./data";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { Box, Spinner, Center } from "@chakra-ui/react";

export default function App() {

  const [email, setEmail] = useState("");
  const [data, setData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0);
  const [finalScore, setFinalScore] = useState(0);

  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();

  const calculateLevel = (points) => {
    let count = 0;
    let temp = 0;

    while (temp <=  points){
      temp += 200 + count * 20
      count += 1
    }

    if (count > 7){
      return 7;
    }
    return count;
  }

  const updateScore = (delta) => {
    setFinalScore(finalScore + delta);

    setPage(page + 1);

    if (page == 11){
      console.log("need to update db");
    }
  }

  const getRandom = (arr, n) => {
      let result = new Array(n)
      let len = arr.length
      let taken = new Array(len);
      
      while (n--) {
          var x = Math.floor(Math.random() * len);
          result[n] = arr[x in taken ? taken[x] : x];
          taken[x] = --len in taken ? taken[len] : len;
      }
      return result;
  }

  const levels = ["aeibcd", "aeibcdrstf", "aeibcdrstfmnop", "aeibcdrstfmnopuvgh", "aeibcdrstfmnopuvgh", "aeibcdrstfmnopuvghjklw", "aeibcdrstfmnopuvghjklwqxyz"]
  
  const generateQuiz = (level) => {
    const letters = levels[level - 1];

    let final1 = [];
    let final2 = [];

    words3.map(x => {
      if (letters.includes(x[0]) && letters.includes(x[1]) && letters.includes(x[2])){
        final1.push(x)
      }
    })

    words4.map(x => {
      if (letters.includes(x[0]) && letters.includes(x[1]) && letters.includes(x[2]) && letters.includes(x[3])){
        final2.push(x)
      }
    })

    return getRandom(letters, 5).concat(getRandom(final1, 4)).concat(getRandom(final2, 2))
  }

  useEffect(() => {
  
    auth.onAuthStateChanged(function (user) {
      if (!user) {
        router.push("/login");
      }
      else {
        setEmail(user.email);
        const q = query(collection(db, "users"), where("email", "==", user.email));
        getDocs(q).then((result) => {
            let data = {};
            result.forEach((doc) => {
              data = doc.data();
            });
            setData(data);
            const level = calculateLevel(data.points.alphabets);
            setQuestions(generateQuiz(level));
            
        })
      }
    });
  }, []);
  return (
    <>
      {questions.length == 0 && (
        <Center mt="10"><Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
        </Center>
      )}

      {questions.map((question, i) => {
        if (i == page){
          if (question.length == 1){
            return (<SignRecognizing questionNumber={i + 1} question={question} updateScore={updateScore}/>);
          }
          else {
            return (<Signing/>);
          }
        }
      })}
      {/* <Signing /> */}
      
    </>
  );
}
