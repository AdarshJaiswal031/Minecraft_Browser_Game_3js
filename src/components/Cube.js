import { useBox } from "@react-three/cannon"
import { useState } from "react"
import { useStore } from "../hooks/useStore"
import * as textures from "../images/textures"
export const Cube = ({ texture, position }) => {
    const [ref] = useBox(() => ({
        type: 'Static',
        position
    }))
    const activeTexture = textures[texture + 'Texture']
    const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube])
    const [isHover, setIsHover] = useState(false)
    return (
        <mesh ref={ref}
            onPointerMove={(e) => {
                e.stopPropagation()
                setIsHover(true)
            }}
            onPointerOut={(e) => {
                e.stopPropagation()
                setIsHover(false)
            }}
            onClick={(e) => {
                e.stopPropagation()
                const clickedFace = Math.floor(e.faceIndex / 2)
                console.log("face ", clickedFace)
                const { x, y, z } = ref.current.position
                console.log(x)
                if (e.altKey) {
                    removeCube(x, y, z)
                    return
                }
                else if (clickedFace === 4) {
                    addCube(x, y, z + 1)
                    return
                }
                else if (clickedFace === 5) {
                    addCube(x, y, z - 1)
                    return
                }
                else if (clickedFace === 1) {
                    addCube(x - 1, y, z)
                    return
                }
                else if (clickedFace === 0) {
                    addCube(x + 1, y, z)
                    return
                }
                else if (clickedFace === 2) {
                    addCube(x, y + 1, z)
                    return
                }
            }}
        >
            <boxBufferGeometry attach="geometry" />
            <meshStandardMaterial color={isHover ? 'grey' : 'white'}
                transparent={true}
                opacity={texture === 'glass' ? 0.6 : 1}
                map={activeTexture} attach="material" />
        </mesh>
    )
}