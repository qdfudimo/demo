import {
    ref,
    reactive
} from 'vue'
const noop = Promise.resolve()

function usePage(api = noop) {
    const currentPage = reactive({
        currentPage: 1,
        pageSize: 10,
        total: 92
    })
    /**切换当前展示条数 */
    const handleSizeChange = (val) => {
        console.log(`${val} items per page`)
        currentPage.pageSize = val
    }
    /**切换当前页码触发 */
    const handleCurrentChange = (val) => {
        currentPage.currentPage = val
        api().then((data) => {
            console.log("请求了" + data);
            currentPage.total = 61
        })
    }
    return {
        currentPage,
        handleCurrentChange,
        handleSizeChange
    }
}
export default usePage