import { useReducer, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
};

const initialGamePlay = {
    status: 'START',
    quizNumberCurrent: 0,
    quizType: null,
    userAnswer: null,
    score: 0,
    timeLeft: 15,
    error: null,
    wrongAnswers: 0,
    quizList: []
}

function gameReducer(state, action){
    switch(action.type){
        case 'START_GAME':
            return {
                ...state,
                status: 'PLAY'
            }
        case 'SELECT_ANSWER':
            return {
                ...state,
                userAnswer: action.payload
            }
        case 'SET_TIME':
            return {
                ...state,
                timeLeft: action.payload
            }
        case 'SET_QUIZ_LIST':
            return {
                ...state,
                quizList: action.payload
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'RESET':
            return {
                ...initialGamePlay
            }
        case 'SUBMIT_ANSWER':
            const { isCorrect, isLastQuestion, duration, questionType } = action.payload;
            
            return {
                ...state,
                score: isCorrect ? state.score + 20 : state.score,
                wrongAnswers: isCorrect ? state.wrongAnswers : state.wrongAnswers + 1,
                userAnswer: null,
                timeLeft: duration ?? 15, 
                quizNumberCurrent: isLastQuestion ? state.quizNumberCurrent : state.quizNumberCurrent + 1,
                status: isLastQuestion ? 'FINISHED' : 'PLAY',
                quizType: questionType
            }
        default: 
            return state
    }
}

export default function useGamePlay(config) {
    const [isLoading, setIsLoading] = useState(false);
    const [game, dispatch] = useReducer(gameReducer, initialGamePlay);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const url = `https://opentdb.com/api.php?amount=${config.amount}&category=${config.category}&difficulty=${config.difficulty}&type=${config.type}`;
            const response = await fetch(url);

            if(!response.ok) throw new Error("Mode tidak berhasil di muat. Mode di set ke Default");
            
            const data = await response.json();
            
            const cleanedResults = data.results.map(quiz => ({
                ...quiz,
                question: decodeHTML(quiz.question),
                correct_answer: decodeHTML(quiz.correct_answer),
                incorrect_answers: quiz.incorrect_answers.map(ans => decodeHTML(ans))
            }));

            dispatch({
                type: 'SET_QUIZ_LIST',
                payload: cleanedResults
            })

        } catch(err) {
            console.log(err.message);
            dispatch({
                type: 'SET_ERROR',
                payload: err.message
            })
        }
    }

    const selectAnswer = (answer) => {
        dispatch({
            type: 'SELECT_ANSWER',
            payload: answer
        })
    }

    const setAnswer = (isTimeout = false) => {
        if (!game.userAnswer && !isTimeout) {
            return dispatch({
                type: 'SET_ERROR',
                payload: 'Pilih jawaban anda terlebih dahulu!'
            })
        }

        const nowQuestion = game.quizList[game.quizNumberCurrent]
        const questionType = nowQuestion.type
        
        const finalAnswer = isTimeout ? null : game.userAnswer;
        
        const isCorrect = finalAnswer === nowQuestion.correct_answer;
        const isLastQuestion = game.quizNumberCurrent === game.quizList.length - 1;

        dispatch({
            type: 'SUBMIT_ANSWER',
            payload: {
                isCorrect,
                isLastQuestion,
                questionType,
                duration: config.duration
            },
        })

        if (isLastQuestion) {
            return navigate('/finish')
        }
    }
    
    const startPerp = (e) => {
        e.preventDefault();
        setIsLoading(false);

        dispatch({ type: 'RESET' })
        dispatch({ type: 'SET_TIME', payload: config.duration })
        dispatch({ type: 'START_GAME' })
        
        navigate('/perp');
    }

    const startGame = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        dispatch({ type: 'RESET' }); 

        try {
            await fetchData();

            dispatch({ type: 'SET_TIME', payload: config.duration });
            dispatch({ type: 'START_GAME' });
            
            navigate('/play');
        } catch (error) {
            console.error("Error pas fetch data kuis cikk:", error);
            setIsLoading(false); 
        }
    }

    return {
        startGame,
        startPerp,
        selectAnswer,
        setAnswer,
        isLoading,
        game,
    }
}