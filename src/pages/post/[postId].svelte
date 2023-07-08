<script>
    import { params } from "@roxi/routify"
    import { myInfo, isLogin, host } from "../../stores"
    import axios from "axios"
    import Modal from "./Modal.svelte"

    let showModal = false
    let isDeleteMyPost = false
    let isDeleteReply = false
    let { email } = $myInfo
    let postId = $params.postId
    let replyId = 0

    let requestURL = `http://${$host}/api/post/${postId}`
    const posting = axios.get(requestURL).then((res) => {
        console.log(res.data)
        post = res.data.post
        images = res.data.images
        reply = res.data.reply
        return { post, images, reply }
    })
    let { post, images, reply } = posting

    const clickLikes = () => {
        let requestURL = `http://${$host}/api/post/click-likes/${postId}`
        let token = localStorage.getItem("token")
        let headers = (axios.defaults.headers.common["token"] = token)
        axios
            .post(requestURL, headers)
            .then(() => {
                alert("추천완료!")
                location.reload()
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
    const dataFormat = "data:image/png;base64,"
    let replyContents = ""

    const writeReply = () => {
        if (replyContents.length > 500) {
            alert("최대길이는 500자입니다.")
            replyContents = replyContents.substring(0, 500)
        }
        let requestURL = `http://${$host}/api/post/write-reply/${postId}`
        let data = {
            writer: email,
            replyContents,
        }
        axios
            .post(requestURL, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(() => {
                alert("작성완료!")
                location.reload()
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

<Modal
    bind:showModal="{showModal}"
    bind:isDeleteMyPost="{isDeleteMyPost}"
    bind:isDeleteReply="{isDeleteReply}"
    bind:postId="{postId}"
    bind:replyId="{replyId}" />
{#await posting}
    <div class="main">
        <img
            src="https://c.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif"
            alt="Loading" />
    </div>
{:then { post, images, reply }}
    <ul class="list-group">
        <li class="list-group-item">제목: {post.title}</li>
        <li class="list-group-item">
            작성일: {post.postDate}
        </li>
    </ul>

    <div class="text-center p-5">
        {#each images as image}
            <div class="main">
                <img src="{dataFormat}{image}" alt="" />
            </div>
        {/each}
    </div>
    <div class="text-center p-5 text-break">
        <h5>{post.contents}</h5>
    </div>

    <div class="text-center" style="padding: 10em">
        {#if $isLogin === true}
            <button class="btn btn-outline-dark" on:click="{clickLikes}"
                >추천: {post.likes}</button>
            {#if email === post.poster}
                <button
                    on:click="{() => {
                        showModal = true
                        isDeleteMyPost = true
                    }}"
                    class="btn btn-outline-danger">글 삭제</button>
            {/if}
        {/if}
    </div>
    <table class="type09 text-dark">
        <thead>
            <tr>
                <th>작성자</th>
                <th>내용</th>
                <th>작성일</th>
                {#if $isLogin === true}
                    <th>삭제</th>
                {/if}
            </tr>
        </thead>

        <tbody>
            {#each reply as { writer, replyDate, replyContents, postReplyStatus, replyId: myReplyId }}
                {#if postReplyStatus === "ALL"}
                    <tr>
                        {#if writer === email}
                            <td class="text-break">나</td>
                        {:else}
                            <td class="text-break">{writer}</td>
                        {/if}
                        <td class="text-break">{replyContents}</td>
                        <td>{replyDate}</td>
                        <td
                            ><button
                                on:click="{() => {
                                    showModal = true
                                    isDeleteReply = true
                                    replyId = myReplyId
                                }}"
                                class="btn btn-outline-danger">삭제</button
                            ></td>
                    </tr>
                {:else}
                    <td>삭제된 댓글입니다.</td>
                {/if}
            {/each}
        </tbody>
    </table>

    {#if $isLogin === true}
        <div class="text-center">
            <textarea class="col-6" bind:value="{replyContents}"></textarea>
            <button on:click="{writeReply}" class="btn btn-outline-primary"
                >작성</button>
        </div>
    {/if}
{/await}
