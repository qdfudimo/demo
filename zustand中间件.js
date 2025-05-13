// 日志中间件
const log = (config) => (set, get, api) =>
  config(
    (args) => {
      console.log("处理数据");
      set(args);
    },
    get,
    api
  );

const immer = (config) => (set, get, api) =>
  config(
    (state) => {
      console.log("immer处理数据");
      return set(state);
    },
    get,
    api
  );
let state = {};
const create = (func) => {
  const set = (obj) => {
    // return state
    Object.assign(state, obj);
  };
  state = func(set);
  return state;
};
const middleWareText = create(
  log(
    immer((set) => ({
      count: 0,
      setCount: (num) => set({ count: num }),
    }))
  )
);
console.log(middleWareText);
middleWareText.setCount(2);
console.log(middleWareText);
