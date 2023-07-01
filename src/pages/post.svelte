<script>
    import { host, isLogin, myData } from "../stores";
    import { redirect } from "@roxi/routify";

    const { email } = $myData;
    let title = "";
    let contents = "";
    let files;
    const postURL = `http://${$host}/api/board/post`;

    function postSubmit() {
        if ($isLogin === false) {
            alert("먼저 로그인 하세요.");
            return $redirect("/");
        }

        const formData = new FormData();
        formData.append("email", email);
        formData.append("title", title);
        formData.append("contents", contents);
        formData.append("files", files.files[0]);
    }

    $: if (contents.length > 1000) {
        alert("1000자를 넘길수없습니다.");
        contents = contents.substring(0, 1000);
    }
</script>

<div class="main">
    제목: <input type="text" bind:value={title} />
</div>

<div class="main">
    <p>내용입력</p>
    <textarea rows="10" class="content" bind:value={contents} />
</div>

<div class="main">
    maximum 100MB
    <input bind:this={files} type="file" />
</div>

<div class="main">
    <button class="btn btn-primary" on:click={postSubmit}>등록</button>
</div>
