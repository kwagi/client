<script>
    import { Router } from "@roxi/routify"
    import { routes } from "../.routify/routes"
    import axios from "axios"
    import { host, isLogin, myInfo } from "./stores"

    if (!(localStorage.getItem("token") == null)) {
        const requestURL = `http://${$host}/api/member/refresh`
        let token = localStorage.getItem("token")
        let headers = (axios.defaults.headers.common["token"] = token)
        axios.post(requestURL, headers).then((res) => {
            isLogin.set(true)
            myInfo.set(res.data)
        })
    }
</script>

<Router routes="{routes}" />
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
        crossorigin="anonymous" />
</head>
<body>
    <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
        crossorigin="anonymous"></script>
</body>
