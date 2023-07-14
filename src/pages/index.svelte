<script>
    import { metatags, url } from "@roxi/routify"
    import axios from "axios"
    import { isLogin, host } from "../stores"

    metatags.title = "게시판"
    let page = 0
    const size = 5
    let requestURL = `http://${$host}/api/post/`
    const fd = new FormData()
    fd.append("page", page)
    fd.append("size", size)

    let posts = axios.post(requestURL, fd).then((res) => {
        console.log(res.data)
        content = res.data.content
        return content
    })
    let { content } = posts
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
    {:then content}
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
