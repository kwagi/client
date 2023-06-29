<script>
    import { myData } from "../stores";
    import { url } from "@roxi/routify";

    const { email, name, regDate } = $myData;
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
            <td>{regDate.replace("T", "::")}</td>
        </tr>
    </table>
</div>

<div class="main">
    <a class="btn btn-danger" href={$url("/delete")}>회원탈퇴</a>
</div>
