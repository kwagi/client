<script>
    import { url, redirect } from "@roxi/routify"
    import { host, isLogin, myInfo } from "../stores"
    import axios from "axios"

    const doLogout = () => {
        const requestURL = `http://${$host}/api/member/logout`
        let token = localStorage.getItem("token")
        let headers = (axios.defaults.headers.common["token"] = token)

        axios.post(requestURL, headers).then(() => {
            isLogin.set(false)
            localStorage.clear()
            myInfo.set({})
            $redirect("/")
        })
    }
</script>

<nav class="main">
    {#if $isLogin === true}
        <a href="{$url('/')}" class="btn">홈</a> |
        <a href="{$url('/info')}" class="btn">내 정보</a> |
        <button class="btn btn-warning" on:click="{doLogout}">로그아웃</button>
    {:else}
        <a href="{$url('/')}" class="btn">홈</a> |
        <a href="{$url('/login')}" class="btn">로그인</a> |
        <a href="{$url('/register')}" class="btn">회원가입</a>
    {/if}
</nav>
