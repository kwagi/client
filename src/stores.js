import { readable, writable } from "svelte/store"

export const myData = writable({
    email: "",
    name: "",
    status: "",
    regDate: "",
    recentDate: "",
})

export const isLogin = writable(false)
export const showOnlyMe = writable(false)
// export const host = readable("localhost")
export const host = readable("localhost:8080")
