<script>
    import axios from "axios"
    import { redirect } from "@roxi/routify"
    import { host } from "../stores"
    let email = ""
    let password = ""
    let name = ""
    const doReg = () => {
        let requestURL = `http://${$host}/api/member/register`
        let data = {
            email,
            password,
            name,
        }
        axios
            .post(requestURL, data)
            .then(() => {
                alert("가입성공!")
                $redirect("/login")
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

<title>회원가입</title>
<div class="main">
    <h1>회원가입</h1>
    <label class="form-control-plaintext"
        >이메일:<input
            bind:value="{email}"
            placeholder="example@domain.com"
            type="email" /></label>
    <label class="form-control-plaintext"
        >비밀번호:<input bind:value="{password}" type="password" /></label>
    <label class="form-control-plaintext"
        >이름:<input bind:value="{name}" type="text" /></label>
</div>

<div class="main">
    <label
        ><button on:click="{doReg}" class="btn btn-outline-primary"
            >회원가입</button
        ></label>
</div>
