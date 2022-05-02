import request from "@/utils/request";

export function create(data) {
    return request({
        url: "/usuario/",
        method: "post",
        data
    });
}

export function deleteAll() {
    return request({
        url: "/usuario/",
        method: "delete"
    });
}

export function deleteOne(id) {
    return request({
        url: "/usuario/" + id,
        method: "delete"
    });
}

export function edit(id, data) {
    return request({
        url: "/usuario/" + id,
        method: "put",
        data
    });
}

export function findAll(page, size, filter) {
    return request({
        url: "/usuario/",
        method: "get",
        params: {
            page,
            size,
            filter
        }
    });
}
export function findOne(id) {
    return request({
        url: "/usuario/" + id,
        method: "get"
    });
}
