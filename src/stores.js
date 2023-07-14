import { readable, writable } from "svelte/store"

export const myInfo = writable({
    email: "",
    name: "",
    regDate: "",
    recentDate: "",
})

export const isLogin = writable(false)
export const host = readable("34.64.254.143")
// export const host = readable("localhost:8080")
