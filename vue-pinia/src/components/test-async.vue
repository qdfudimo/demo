<script>
import { h, ref, defineAsyncComponent } from 'vue'
/**
 * defineAsyncComponent 这样就不用Suspense 
 * 可以用defineAsyncComponent这些参数
 */
export default {
    name: "testAsync",
    setup(props) {
        const show = ref(false)
        return () => {
            return h("div", [
                h("button", { onClick: () => (show.value = !show.value) }, "show" + show.value),
                show.value &&
                h(
                    defineAsyncComponent({
                        loader: () =>
                            new Promise((resolve,reject) => {
                                setTimeout(() => {
                                    resolve(() => h("div", "asyncComponent"));
                                    // reject(() => h("div", "asyncComponent"));
                                }, 3000);
                            }),
                        delay: 1000,
                        loadingComponent: h("div", "loading正在加载"),
                        errorComponent: h("div", "error"),
                        timeout: 4000,
                    })
                ),
            ]);
        }
    }
}
</script>