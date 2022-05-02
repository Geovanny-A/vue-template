import request from "@/utils/request";

export function requestLogin(data) {
    return request({
        url: "/auth/signin",
        method: "post",
        data
    });
}

export function googleLogin(token) {
    return request({
        url: `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`,
        method: "get"
    });
}
