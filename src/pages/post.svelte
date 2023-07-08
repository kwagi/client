<script>
    import axios from "axios"
    import { host, isLogin, myInfo } from "../stores"
    import { redirect } from "@roxi/routify"

    if ($isLogin === false) {
        alert("먼저 로그인 하세요.")
        $redirect("/")
    }

    let { email } = $myInfo
    let title = ""
    let contents = ""
    let image
    const requestURL = `http://${$host}/api/post/do-posting`

    function postSubmit() {
        const formData = new FormData()
        let data = {
            title,
            contents,
            poster: email,
        }
        formData.append(
            "data",
            new Blob([JSON.stringify(data)], {
                type: "application/json",
            })
        )
        Array.from(image.files).forEach((image) => {
            formData.append("images", image)
        })
        axios
            .post(requestURL, formData)
            .then(() => {
                alert("작성완료!")
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

    $: if (contents.length > 1000) {
        alert("1000자를 넘길수없습니다.")
        contents = contents.substring(0, 1000)
    }
</script>

<div class="main">
    제목: <input type="text" bind:value="{title}" />
</div>

<div class="main">
    <p>내용입력</p>
    <textarea rows="10" class="content" bind:value="{contents}"></textarea>
</div>

<div class="main">
    maximum 100MB
    <input bind:this="{image}" type="file" multiple />
</div>

<div class="main">
    <button class="btn btn-primary" on:click="{postSubmit}">등록</button>
</div>
