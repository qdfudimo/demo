/**
 * 假如我们有一块内存，专门用来缓存我们最近发访问的网页，访问一个新网页，
 * 我们就会往内存中添加一个网页地址，随着网页的不断增加，内存存满了，
 * 这个时候我们就需要考虑删除一些网页了。这个时候我们找到内存中最早访问的那个网页地址，然后把它删掉。
 * Vue的keep-alive缓存就是超过max时候删除第一个元素
 */
let map = new Map([
    ['key1', 'value1']
])
//Map 原生提供三个遍历器:
//keys()：返回键名的遍历器。
//values()：返回键值的遍历器。
//entries()：返回所有成员的遍历器。

//map获取第一个元素
console.log(map.entries().next().value)

//map获取第一个元素的key
console.log(map.keys().next().value)

//map获取第一个元素的value
console.log(map.values().next().value)
class LRUCache {
    constructor(lenght) {
        this.length = lenght; // 存储长度
        this.data = new Map(); // 存储数据
    }
    // 存储数据，通过键值对的方式
    set(key, value) {
        const data = this.data;
        if (data.has(key)) {
            data.delete(key)
        }
        data.set(key, value);


        // 如果超出了容量，则需要删除最久的数据
        if (data.size > this.length) {
            const delKey = data.keys().next().value;
            data.delete(delKey);
        }
    }
    // 获取数据
    get(key) {
        const data = this.data;
        // 未找到
        if (!data.has(key)) {
            return null;
        }
        const value = data.get(key); // 获取元素
        data.delete(key); // 删除元素
        data.set(key, value); // 重新插入元素
    }
}
const lruCache = new LRUCache(5);