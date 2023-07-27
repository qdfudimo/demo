<template>
    <h2>测试 testSuspense</h2>
    <login-pop />
</template>
<script>
import { h, ref, defineAsyncComponent } from 'vue'
export default {
    name: "testSuspense",
    components: {
        loginPop: defineAsyncComponent({
            loader: () => import('./loadingPop.vue'),
            loadingComponent: h("div", "loading"),
            delay: 1000,
            errorComponent: h("div", "error"),
            timeout: 6000,
        })
    },
    setup(props) {
        const show = ref(false)
        return {
            show
        }
    }
}
</script>