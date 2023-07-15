<script>
    import { metatags, url } from "@roxi/routify"
    import axios from "axios"
    import { isLogin, host } from "../stores"

    metatags.title = "게시판"
    const size = 5
    $: page = 0
    $: requestURL = `http://${$host}/api/post?page=${page}&size=${size}`
    let content
    let totalPages

    $: posts = axios.get(requestURL).then((res) => {
        content = res.data.content
        totalPages = res.data.totalPages
    })
    $: if (page < 0) {
        alert("첫페이지입니다.")
        page = 0
    }
</script>

<div class="main">
    <h1>게시판</h1>
</div>

<div class="main">
    {#if $isLogin === true}
        <div class="text-end fs-5">
            <a
                class="badge bg-primary text-wrap"
                style="width: 5rem"
                href="{$url('/post')}">글쓰기</a>
        </div>
    {/if}
</div>
<div class="main">
    {#await posts}
        <p>불러오는중...</p>
    {:then}
        <table class="type09">
            <thead class="type09">
                <tr>
                    <th>id</th>
                    <th>작성자</th>
                    <th>제목</th>
                    <th>조회수</th>
                    <th>추천</th>
                </tr>
            </thead>
            <tbody class="type09">
                {#each content as { postId, poster, title, hits, likes, postStatus }}
                    {#if postStatus === "ALL"}
                        <tr>
                            <td>{postId}</td>
                            <td>{poster}</td>
                            <td
                                ><a href="{$url('/post/:postId', { postId })}"
                                    >{title}</a
                                ></td>
                            <td>{hits}</td>
                            <td>{likes}</td>
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
    {/await}
</div>
<div class="main">
    <button class="btn btn-outline-dark" on:click="{() => (page -= 1)}"
        >prev</button>
    <button
        class="btn btn-outline-dark"
        on:click="{() => {
            if (page >= totalPages - 1) {
                alert('마지막 페이지입니다.')
                page = totalPages - 1
            } else {
                page += 1
            }
        }}">next</button>
</div>
