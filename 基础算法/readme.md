* 给定一个字符串 s ，请你找出其中不含有重复字符的 最长连续子字符串 的长度。
```
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子字符串是 "abc"，所以其长度为 3。

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子字符串是 "b"，所以其长度为 1。

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

输入: s = ""
输出: 0
```

```js
// 方便参考，输出连带字符串结果
const s = 'abcabcbb'
// const s = "bbbbb"
// const s = "pwwkew"
// const s = ''
const lengthOfLongestSubstring = (s) => {
  let str = ''
  let index = 0
  let obj = { len: index, str }
  if (!s) return obj
  s.split('').forEach(item => {
    //判断str是否有重复的字符
    if(str.includes(item)) {
    //有重复的就会让已经生成的作为一段数据
      const { len } = obj
    //下面再有重复的 大于已经存有的数据 替换
      if (index > len) obj = { len: index, str }
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
const { len, str } = lengthOfLongestSubstring(s)
console.log(len, str)
```
* 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
你可以按任意顺序返回答案。

```
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

输入：nums = [3,2,4], target = 6
输出：[1,2]

输入：nums = [3,3], target = 6
输出：[0,1]
```

```js
  const nums = [2, 7, 11, 15], target = 9;
  // const nums = [3, 2, 4], target = 6
  // const nums = [3, 3], target = 6
  // const twoSum = function(nums, target) {
  //   let i = 0
  //   let next
  //   let isFind = false
  //   while(i < nums.length - 1 && !next) {
  //     const current = nums[i]
  //     if (current >= 9) {
  //       i++
  //     } else {
  //       nums.forEach((item, index) => {
  //         if (i !== index && item + current === target) {
  //           next = index
  //         }
  //       })
  //       if (!next) i++
  //     }
  //   }
  //   if (next) {
  //     return [i, next]
  //   }
  // }
  // console.log(twoSum(nums, target))
  // 减少一层循环（时间复杂度）
  var twoSum = function(nums, target) {
    const map = new Map();
    for(let i = 0, len = nums.length;i < len;i++) {
      if(map.has(target - nums[i])) {
          return [map.get(target - nums[i]), i];
      }
      map.set(nums[i], i);
    }
    return [];
  };
  console.log(twoSum(nums, target))
```
* 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。 有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合

```
示例 1：
输入：s = "()"
输出：true

示例 2：
输入：s = "()[]{}"
输出：true

示例 3：
输入：s = "(]"
输出：false

示例 4：
输入：s = "([)]"
输出：false

示例 5：
输入：s = "{[]}"
输出：true
```
思路：对称性符合栈后入先出特性
```js
// const s = '{[()]}'
const s = '()[]{}'
const arr = s.split('')
const obj = {
  "(": ")",
  "[": "]",
  "{": "}"
}
const stack = []
const valdate = data => {
  if (!data || data.length % 2 !== 0) return false
  let isRight = true
  data.split('').forEach(item => {
    if (obj[item]) {
      stack.push(item)
    } else {
      if (!stack.length || obj[stack.pop()] !== item) {
        isRight = false
      }
    }
  })
  if (stack.length) isRight = false
  return isRight
}
console.log(valdate(s)) // true
```
#### JSON.stringify() 7 个鲜为人知的坑

 https://juejin.cn/post/7330289404731047936