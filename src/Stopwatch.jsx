import { useState, useEffect, useRef } from "react"

function Stopwatch(){
    const [isRunning, setIsRunning] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const intervalID = useRef(null)
    const startTime = useRef(0)

    useEffect(()=>{
        if (isRunning){

            intervalID.current = setInterval(() => {
                setElapsedTime(Date.now() - startTime.current)
            }, 10);
        }

        return ()=>{
            clearInterval(intervalID.current)
        }

    }, [isRunning])

    function start(){
        setIsRunning(true)
        startTime.current = Date.now() - elapsedTime
    }

    function stop(){
        setIsRunning(false)
    }

    function reset(){
        setElapsedTime(0)
        setIsRunning(false)
    }

    function format(){
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60))
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60)
        let seconds = Math.floor(elapsedTime / 1000 % 60)
        let milseconds = Math.floor(elapsedTime % 1000 / 10)

        hours = String(hours).padStart(2, '0')
        minutes = String(minutes).padStart(2, '0')
        seconds = String(seconds).padStart(2, '0')
        milseconds = String(milseconds).padStart(2, '0')

        return `${hours}:${minutes}:${seconds}:${milseconds}`
    }


    return(
        <div id="container">
            <div id="display">{format()}</div>
            <div id="controls">
                <button id="startbtn" onClick={start}>start</button>
                <button id="stopbtn" onClick={stop}>stop</button>
                <button id="resetbtn" onClick={reset}>reset</button>
            </div>
        </div>
    )
}

export default Stopwatch