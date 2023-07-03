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
