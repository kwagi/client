<script>
    import { redirect } from "@roxi/routify"
    import { isLogin, myInfo, host } from "../stores"
    import axios from "axios"

    let password = ""
    const doDelete = () => {
        let data = {
            email: $myInfo.email,
            password,
        }
        let requestURL = `http://${$host}/api/member/delete`
        axios
            .post(requestURL, data)
            .then(() => {
                alert("삭제성공!")
                myInfo.set({})
                isLogin.set(false)
                localStorage.clear()
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

<div class="main">
    <label>비밀번호: <input bind:value="{password}" type="password" /></label>
</div>

<div class="main">
    <button class="btn btn-danger" on:click="{doDelete}">탈퇴</button>
</div>
