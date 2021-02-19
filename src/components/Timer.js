import React, {useEffect, useState} from 'react'
import moment from 'moment'

const Timer = ({seconds, timeOut}) => {
    const [secondsLeft, setSecondsLeft] = useState(seconds)

    useEffect(() => {
        if(!secondsLeft) {return timeOut()}
        const intervalId = setInterval(() => {
            setSecondsLeft(secondsLeft - 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [secondsLeft,timeOut])

    return (
        <div className = "timer">
            {secondsLeft && moment.utc(secondsLeft * 1000).format('HH:mm:ss')}
        </div>
    )
}

export default Timer