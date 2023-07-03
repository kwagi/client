import { readable, writable } from "svelte/store"

export const myInfo = writable({
    email: "",
    name: "",
    regDate: "",
    recentDate: "",
})

export const isLogin = writable(false)
// export const host = readable("localhost")
export const host = readable("localhost:8080")
