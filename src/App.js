import  { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

const initialState = {
  questions: [],

  status: "loading",
  index: 0
}

function reducer(state, action) {
  switch (action.type) {
    case "dateReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
      case "dataFailed": 
      return {
        ...state,
        status: "error",
      };
      case "start":
        return {...state, status: "active"};
      default: 
      throw new Error("Action unkonwn")
  }
}


export default function App() {
const [{question, status , index},  dispatch] = useReducer(reducer, initialState);

const numQuestions = question.length

  useEffect(() => {
    fetch(`http://localhost:9000/questions`)
    .then((res) => res.json())
    .then((data) => dispatch({type: "dataReceived", payload: data}))
    .catch((err) => dispatch({type: 'dataFailed'}));
  }, []);


  return (
    <div className="app">
      <Header />

      <Main>
       {status === 'loading' && <Loader />}
       {status === 'error' && <Error />}
       {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
       {status === "active" && <Question question={questions[index]} />}
      </Main>
    </div>
  )
} 