import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取管理员列表
 */
export async function getUser(page = 1, size = 4) {
    let res = await $axios.get("/userlist", {
        params: {
            size, page
        }
    })
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }
}
export async function getCount() {
    let res = await $axios.get("/usercount")
    return res.list[0].total
}
/**
 * 添加管理员
 * @param {*} data  添加的数据
 */
export function addUser(data) {
    return $axios.post("/useradd", data)
}
/**
 * 修改管理员
 * @param {*} data  修改的数据
 */
export function editUser(data) {
    return $axios.post("/useredit", data)
}
/**
 * 删除管理员
 * @param {*} id  删除的ID
 */
export function delUser(uid) {
    return $axios.post("/userdelete", { uid })
}


/**
 * 管理员登陆
 * @param {*} data
 */
export function Login(data) {
    return $axios.post("/userlogin", data)
}
