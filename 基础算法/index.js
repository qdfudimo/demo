const s = 'abcababcdef'
// const s = 'abcabcbb'
// const s = "bbbbb"
// const s = "pwwkew"
// const s = ''
const lengthOfLongestSubstring = (s) => {
    let str = ''
    let index = 0
    let obj = {
        len: index,
        str
    }
    if (!s) return obj
    s.split('').forEach(item => {
        //判断str是否有重复的字符
        if (str.includes(item)) {
            //有重复的就会让已经生成的作为一段数据
            const {
                len
            } = obj
            //下面再有重复的 大于已经存有的数据 替换
            if (index > len) obj = {
                len: index,
                str
            }
            //同时重置数据
            index = 1
            str = item
        } else {
            //没有就继续拼接
            str += item
            index++
        }
    })
    if(index > obj.len) {
        obj = {
            len: index,
            str
        }
    }
    return obj
}
console.log(lengthOfLongestSubstring(s));