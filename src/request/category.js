import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取菜单列表
 */
export async function getCate() {
    let res = await $axios.get("/catelist?istree=1")
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }
}
/**
 * 添加菜单
 * @param {*} data  添加的数据
 */
export function addCate(data) {
    return $axios.post("/cateadd", data)
}
/**
 * 修改菜单
 * @param {*} data  修改的数据
 */
export function editCate(data) {
    return $axios.post("/cateedit", data)
}
/**
 * 删除菜单
 * @param {*} id  删除的ID
 */
export function delCate(id) {
    return $axios.post("/catedelete", { id })
}