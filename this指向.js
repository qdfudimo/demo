const {
    len,
    str
} = lengthOfLongestSubstring(s)
// console.log(len, str)
var obj = {
    val: 'test',
    sayHi: () => {
        console.log(this.val);
    },
    sayHi2() {
        (() => {
            console.log(this.val);
        })();
    },
    sayHi3() {
        console.log(this.val);
    },
}
obj.sayHi(); //undefined
obj.sayHi2(); //test
obj.sayHi3(); //test
const {
    sayHi3: sayHi4
} = obj;
sayHi4(); //undefined