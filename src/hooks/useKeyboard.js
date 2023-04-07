import { useCallback, useEffect, useState } from "react"

function actionsByKey(key) {
    const keyActionsMap = {
        KeyW: "moveForward",
        KeyS: "moveBackward",
        KeyA: "moveLeft",
        KeyD: "moveRight",
        Space: "jump",
        Digit1: "dirt",
        Digit2: "grass",
        Digit3: "glass",
        Digit4: "wood",
        Digit5: "log"
    }
    return keyActionsMap[key]
}
export const useKeyboard = () => {
    const [actions, setactions] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jumb: false,
        dirt: false,
        grass: false,
        glass: false,
        wood: false,
        log: false,
    })
    const handleKeyDown = useCallback((e) => {
        const action = actionsByKey(e.code)
        if (actions) {
            setactions((prev) => {
                return ({
                    ...prev,
                    [action]: true
                })
            })
        }
    }, [])
    const handleKeyUp = useCallback((e) => {
        const action = actionsByKey(e.code)
        if (actions) {
            setactions((prev) => {
                return ({
                    ...prev,
                    [action]: false
                })
            })
        }
    }, [])
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("keyup", handleKeyUp)
        return () => {
            document.addEventListener("keydown", handleKeyDown)
            document.addEventListener("keyup", handleKeyUp)
        }
    }, [handleKeyDown, handleKeyUp])
    return actions
}