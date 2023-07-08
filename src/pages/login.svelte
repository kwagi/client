<script>
    import axios from "axios"
    import { redirect } from "@roxi/routify"
    import { myInfo, isLogin, host } from "../stores"

    if ($isLogin === true) {
        $redirect("/")
    }

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
                myInfo.set(res.data)
                localStorage.setItem("token", res.data.token)
                $redirect("/")
            })
            .catch((e) => {
                if (e.response.data[0].message) {
                    alert(e.response.data[0].message)
                    return
                }
                if (e.response.data) {
                    alert(e.response.data)
                }
            })
    }
</script>

<div class="container-fluid align-content-center main">
    <h1>로그인</h1>
    <label class="form-control-plaintext"
        >이메일:<input type="email" bind:value="{email}" /></label>
    <label class="form-control-plaintext"
        >비밀번호:<input type="password" bind:value="{password}" /></label>
</div>
<div class="main">
    <label
        ><button class="btn btn-outline-success" on:click="{doLogin}"
            >로그인</button
        ></label>
</div>
