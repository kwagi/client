<script>
    let email = "";
    let password = "";
    let name = "";

    const doReg = () => {};
</script>

<title>회원가입</title>
<div class="main">
    <h1>회원가입</h1>
    <label class="form-control-plaintext"
        >이메일 <input
            bind:value={email}
            placeholder="example@domain.com"
            type="email"
        /></label
    >
    <label class="form-control-plaintext"
        >비밀번호 <input bind:value={password} type="password" /></label
    >
    <label class="form-control-plaintext"
        >이름<input bind:value={name} type="text" /></label
    >
</div>

<div class="main">
    <label
        ><button on:click={doReg} class="btn btn-outline-primary"
            >회원가입</button
        ></label
    >
</div>
