// let initVaue;
// let fistRender = true;

// function useSate(a) {
//     if (fistRender) {
//         initVaue = a
//         fistRender = false
//     }
//     const dispatch = (value) => {
//         Promise.resolve().then(() => {
//             initVaue = value
//         })
//     }
//     return [initVaue, dispatch]
// }
// let [count, useCount] = useSate(0)

// function useEffect() {
//     useCount(2)
//     console.log(count);
// }
// useEffect()

// 实现useEffect
let firstEffect = true;
const useEffect = (callback, deps) => {
    if (deps.length === 0) {
        if (firstEffect) {
            setTimeout(() => {
                callback();
            }, 0)
            firstEffect = false;
        }
    }
}

// 实现useState
let firstState = true;
let state;
const useState = (initValue) => {
    if (firstState) {
        state = initValue;
        firstState = false;
    }
    const dispatch = (v) => {
        state = v;
        setTimeout(() => {
            Component()
        }, 50);;
    }
    return [state, dispatch];
}

// 实现函数组件
function Component() {
    const [a, setA] = useState(1)
    console.log("a_comp", a);

    useEffect(() => {
        setA(2);
        setTimeout(() => {
            console.log("a>>>", a);
        }, 1000)
    }, [])
}

Component();