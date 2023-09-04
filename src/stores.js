import { readable, writable } from "svelte/store"

export const myInfo = writable({
    email: "",
    name: "",
    regDate: "",
    recentDate: "",
})

export const isLogin = writable(false)
// export const host = readable("localhost:8080")
// export const host = readable("34.125.120.123")
// export const host = readable("springsveltedocker.com")
export const host = readable(window.location.host)
