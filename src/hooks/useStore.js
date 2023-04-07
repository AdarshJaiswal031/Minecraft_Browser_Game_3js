import { nanoid } from "nanoid"
import create from "zustand"

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, value) => JSON.stringify(window.localStorage.setItem(key, JSON.stringify(value)))
export const useStore = create((set) => ({
    texture: 'dirt',
    cubes: getLocalStorage('cubes') || [],
    addCube: (x, y, z) => {
        set((prev) => ({
            cubes: [
                ...prev.cubes,
                {
                    key: nanoid(),
                    pos: [x, y, z],
                    texture: prev.texture
                }
            ]
        }))
    },
    removeCube: (x, y, z) => {
        set((prev) => ({
            cubes: prev.cubes.filter(cube => {
                const [X, Y, Z] = cube.pos
                return X !== x || Y !== y || Z !== z
            })
        }))
        console.log("remove", x, y, z)
    },
    setTexture: (texture) => {
        set(() => ({
            texture
        }))
    },
    saveWorld: () => {
        set((prev) => {
            // console.log(prev.cubes, "33333333333333")
            setLocalStorage('cubes', prev.cubes)
        })
    },
    resetWorld: () => {
        set(() => ({ cubes: [] }))
    }
}))