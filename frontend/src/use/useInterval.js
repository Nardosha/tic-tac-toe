import {useEffect, useRef} from "react";

export const useInterval = (callback, delay) => {
    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        function tick() {
            savedCallback?.current()
        }

        if (delay !== null) {
            const intervalId = setInterval(tick, delay)
            return () => clearInterval(intervalId)
        } else {
            return () => {}
        }
    }, [delay])
}