<script>
    import { url, redirect } from "@roxi/routify"
    import { host, isLogin, myInfo } from "../stores"
    import axios from "axios"
    let email = localStorage.getItem("email")

    const doLogout = () => {
        const requestURL = `http://${$host}/api/member/logout`
        let token = localStorage.getItem("token")
        let headers = (axios.defaults.headers.common["token"] = token)
        axios.post(requestURL, headers).then((res) => {
            isLogin.set(false)
            localStorage.clear()
            myInfo.set(res.data)
            $redirect("/")
        })
    }
</script>

<nav class="main">
    {#if $isLogin === true}
        <a href="{$url('/')}" class="btn">홈</a> |
        <a href="{$url('/info')}" class="btn">{email}</a> |
        <button on:click="{doLogout}">로그아웃</button>
    {:else}
        <a href="{$url('/')}" class="btn">홈</a> |
        <a href="{$url('/login')}" class="btn">로그인</a> |
        <a href="{$url('/register')}" class="btn">회원가입</a>
    {/if}
</nav>
