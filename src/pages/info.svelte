<script>
    import { myInfo, isLogin } from "../stores"
    import { redirect, url } from "@roxi/routify"
    if ($isLogin === false) {
        alert("잘못된 접근입니다.")
        $redirect("/")
    }

    const { email, name, regDate } = $myInfo
</script>

<div class="main">
    <h1>내 정보</h1>
</div>

<div>
    <table class="main">
        <tr>
            <th>이메일</th>
            <td>{email}</td>
        </tr>
        <tr>
            <th>이름</th>
            <td>{name}</td>
        </tr>
        <tr>
            <th>가입일</th>
            <td>{regDate}</td>
        </tr>
    </table>
</div>

<div class="main">
    <a class="btn btn-danger" href="{$url('/delete')}">회원탈퇴</a>
</div>
