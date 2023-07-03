<script>
    import axios from "axios"
    import { redirect } from "@roxi/routify"
    import { myInfo, isLogin, host } from "../stores"
    let email = ""
    let password = ""
    const doLogin = () => {
        let requestURL = `http://${$host}/api/member/login`
        let data = {
            email,
            password,
        }
        axios
            .post(requestURL, data)
            .then((res) => {
                isLogin.set(true)
                myInfo.set({ email })
                localStorage.setItem("token", res.data)
                localStorage.setItem("email", email)
                $redirect("/")
            })
            .catch((e) => {
                alert(e.response.data)
                alert(e.response.data.errors[0].defaultMessage)
            })
    }
</script>

<div class="container-fluid align-content-center main">
    <h1>로그인</h1>
    <label class="form-control-plaintext"
        >이메일:<input type="email" bind:value="{email}" /></label
    >
    <label class="form-control-plaintext"
        >비밀번호:<input type="password" bind:value="{password}" /></label
    >
</div>
<div class="main">
    <label
        ><button class="btn btn-outline-success" on:click="{doLogin}"
            >로그인</button
        ></label
    >
</div>
