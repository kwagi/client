<script>
    import { redirect } from "@roxi/routify"
    import { myInfo, host } from "../../stores"
    import axios from "axios"

    export let showModal // boolean
    export let isDeleteMyPost // boolean
    export let isDeleteReply // boolean
    export let isDeleteAnswer // boolean

    export let postId = 0
    export let replyId = 0
    export let answerId = 0
    let password = ""

    const deleteMyPost = () => {
        let requestURL = `http://${$host}/api/post/delete/${postId}`
        let data = {
            email: $myInfo.email,
            password,
        }
        axios
            .post(requestURL, data)
            .then(() => {
                isDeleteMyPost = false
                showModal = false
                alert("삭제완료!")
                $redirect("/")
            })
            .catch((e) => {
                if (e.response.data[0].message) {
                    isDeleteMyPost = false
                    showModal = false
                    alert(e.response.data[0].message)
                    dialog.close()
                    return
                }
                if (e.response.data) {
                    isDeleteMyPost = false
                    showModal = false
                    alert(e.response.data)
                    dialog.close()
                }
            })
    }
    const deleteReply = (replyId) => {
        let requestURL = `http://${$host}/api/post/reply-delete/${replyId}`
        let data = {
            password,
        }
        axios
            .post(requestURL, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(() => {
                isDeleteReply = false
                showModal = false
                alert("삭제완료!")
                dialog.close()
                location.reload()
            })
            .catch((e) => {
                if (e.response.data[0].message) {
                    isDeleteReply = false
                    showModal = false
                    alert(e.response.data[0].message)
                    dialog.close()
                    return
                }
                if (e.response.data) {
                    isDeleteReply = false
                    showModal = false
                    alert(e.response.data)
                    dialog.close()
                }
            })
    }

    function deleteAnswer(answerId) {
        let requestURL = `http://${$host}/api/post/delete-answer/${answerId}`
        let data = {
            password,
        }
        axios
            .post(requestURL, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(() => {
                isDeleteAnswer = false
                showModal = false
                alert("삭제완료!")
                dialog.close()
                location.reload()
            })
            .catch((e) => {
                if (e.response.data[0].message) {
                    isDeleteAnswer = false
                    showModal = false
                    alert(e.response.data[0].message)
                    dialog.close()
                    return
                }
                if (e.response.data) {
                    isDeleteAnswer = false
                    showModal = false
                    alert(e.response.data)
                    dialog.close()
                }
            })
    }
    let dialog // HTMLDialogElement

    $: if (dialog && showModal) dialog.showModal()
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this="{dialog}"
    on:close="{() => {
        showModal = false
        isDeleteMyPost = false
        isDeleteReply = false
        isDeleteAnswer = false
    }}"
    on:click|self="{() => dialog.close()}">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="main">
        <h1>비밀번호 입력</h1>
        <input type="password" bind:value="{password}" />
        <div class="main">
            {#if isDeleteMyPost === true}
                <button class="btn btn-outline-danger" on:click="{deleteMyPost}"
                    >게시글 삭제</button>
            {:else if isDeleteReply === true}
                <button
                    class="btn btn-outline-danger"
                    on:click="{() => deleteReply(replyId)}">댓글삭제</button>
            {:else if isDeleteAnswer === true}
                <button
                    class="btn btn-outline-danger"
                    on:click="{() => deleteAnswer(answerId)}">답글삭제</button>
            {/if}
        </div>
    </div>
</dialog>

<style>
    dialog {
        max-width: 50em;
        border-radius: 0.2em;
        border: none;
        padding: 0;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog > div {
        padding: 1em;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    button {
        display: block;
    }
</style>
