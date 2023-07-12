<script>
    import { params } from "@roxi/routify"
    import { myInfo, isLogin, host } from "../../stores"
    import axios from "axios"
    import Modal from "./Modal.svelte"
    import Image from "./Image.svelte"

    let showModal = false
    let isDeleteMyPost = false
    let isDeleteReply = false
    let isDeleteAnswer = false
    let { email } = $myInfo
    let postId = $params.postId
    let replyId = 0
    let clickedId = 0
    let answerId = 0
    let answerContents = ""

    let requestURL = `http://${$host}/api/post/${postId}`
    const posting = axios.get(requestURL).then((res) => {
        console.log(res.data)
        post = res.data.post
        images = res.data.images
        reply = res.data.reply
        answer = res.data.answer
        return { post, images, reply, answer }
    })
    let { post, images, reply, answer } = posting

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
        let token = localStorage.getItem("token")
        let data = {
            writer: email,
            replyContents,
        }
        axios
            .post(requestURL, data, {
                headers: {
                    Token: token,
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
    let toggleAnswer = false

    function writeAnswer(replyId, answerContents) {
        let requestURL = `http://${$host}/api/post/write-answer/${replyId}`
        let data = {
            writer: email,
            answerContents,
        }
        axios
            .post(requestURL, data)
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
    bind:isDeleteAnswer="{isDeleteAnswer}"
    bind:postId="{postId}"
    bind:replyId="{replyId}"
    bind:answerId="{answerId}"
    ; />

{#await posting}
    <div class="text-center" style="padding: 10em"><h1>가져오는중...</h1></div>
{:then { post, images, reply, answer }}
    <ul class="list-group">
        <li class="list-group-item">제목: {post.title}</li>
        <li class="list-group-item">
            작성일: {post.postDate}
        </li>
    </ul>

    <div class="text-center p-5">
        {#each images as image}
            <div class="main">
                <Image src="{dataFormat}{image}" />
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
            {#each reply as { replyId: curReplyId, writer, replyContents, replyDate }}
                <tr>
                    <td class="text-break"
                        ><button
                            class="btn btn-outline-primary"
                            on:click="{() => {
                                toggleAnswer = !toggleAnswer
                                clickedId = curReplyId
                            }}">{writer}</button
                        ></td>
                    <td class="text-break">{replyContents}</td>
                    <td>{replyDate}</td>
                    <td
                        ><button
                            on:click="{() => {
                                showModal = true
                                isDeleteReply = true
                                replyId = curReplyId
                            }}"
                            class="btn btn-outline-danger">삭제</button
                        ></td>
                </tr>

                <tr>
                    {#if toggleAnswer === true && clickedId === curReplyId}
                        <input
                            type="text"
                            placeholder="답글"
                            bind:value="{answerContents}" />
                        <button
                            class="btn btn-outline-dark"
                            on:click="{() =>
                                writeAnswer(clickedId, answerContents)}"
                            >등록</button>
                    {/if}
                </tr>

                {#each answer as answers}
                    {#each answers as { answerId: curAnswerId, writer, answerContents, answerDate, reply }}
                        {#if curReplyId === reply.replyId}
                            <tr>
                                <td class="text-break">↳{writer}</td>
                                <td class="text-break">{answerContents}</td>
                                <td>{answerDate}</td>
                                <td
                                    ><button
                                        on:click="{() => {
                                            showModal = true
                                            isDeleteAnswer = true
                                            answerId = curAnswerId
                                        }}"
                                        class="btn btn-outline-danger"
                                        >삭제</button
                                    ></td>
                            </tr>
                        {/if}
                    {/each}
                {/each}
            {/each}
        </tbody>
    </table>

    {#if $isLogin === true}
        <div class="text-center" style="padding: 5em;">
            <textarea
                placeholder="댓글"
                class="col-10"
                style="width: 100%;"
                bind:value="{replyContents}"></textarea>
            <button on:click="{writeReply}" class="btn btn-outline-primary"
                >작성</button>
        </div>
    {/if}
{/await}
