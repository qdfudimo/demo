### Object.assign()
 * 将所有可枚举（Object.propertyIsEnumerable() 返回 true）的自有（Object.hasOwnProperty() 返回 true）属性从一个或多个源对象复制到目标对象，返回修改后的对象。
 ```js
        const target = {
            a: 1,
            b: 2
        };
        const source = {
            b: 4,
            c: 5
        };
        const returnedTarget = Object.assign(target, source);
        console.log(target);
        // Expected output: Object { a: 1, b: 4, c: 5 }
        console.log(returnedTarget === target); //true

```
### Object.entries()
* 返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。
```js
    const object1 = {
        a: 'somestring',
        b: 42
    };
    for (const [key, value] of Object.entries(object1)) {
        console.log(`${key}: ${value}`);
    }
    // Expected output:
    // "a: somestring"
    // "b: 42"

```
###  Object.getOwnPropertyNames()
 * 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组。
 ` Object.getOwnPropertyNames(obj) `
 ```js
    var arr = ["a", "b", "c"];
    console.log(Object.getOwnPropertyNames(arr).sort()); // ["0", "1", "2", "length"]
    // 类数组对象
    var obj = {
        0: "a",
        1: "b",
        2: "c"
    };
    console.log(Object.getOwnPropertyNames(obj).sort()); // ["0", "1", "2"]
    // 使用 Array.forEach 输出属性名和属性值
    Object.getOwnPropertyNames(obj).forEach(function (val, idx, array) {
        console.log(val + " -> " + obj[val]);
    });
    // 输出
    // 0 -> a
    // 1 -> b
    // 2 -> c
    //不可枚举属性
    var my_obj = Object.create({}, {
        getFoo: {
            value: function () {
                return this.foo;
            },
            enumerable: false
        }
    });
    my_obj.foo = 1;
    console.log(Object.getOwnPropertyNames(my_obj).sort()); // ["foo", "getFoo"]
 ```
### Object.getPrototypeOf()
* 返回指定对象的原型（内部[[Prototype]]属性的值）。
` Object.getPrototypeOf(object) `
```js
    const prototype1 = {};
    const object2 = Object.create(prototype1);
    console.log(Object.getPrototypeOf(object2) === prototype1);
    // Expected output: true
```
### Object.hasOwn()
* 如果指定的对象自身有指定的属性，则静态方法 Object.hasOwn() 返回 true。如果属性是继承的或者不存在，该方法返回 false。

` hasOwn(instance, prop) `
```js
    const object3 = {
        prop: 'exists'
    };
    console.log(Object.hasOwn(object3, 'prop'));
    // Expected output: true
    console.log(Object.hasOwn(object3, 'toString'));
    // Expected output: false
    console.log(Object.hasOwn(object3, 'undeclaredPropertyValue'));
    // Expected output: false
```
### Object.prototype.hasOwnProperty()
* hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。
`obj.hasOwnProperty(prop)`
```js
    o = new Object();
    o.hasOwnProperty('prop'); // 返回 false
    o.prop = 'exists';
    o.hasOwnProperty('prop'); // 返回 true
    delete o.prop;
    o.hasOwnProperty('prop'); // 返回 false
```
### Object.is() 
* 方法判断两个值是否为同一个值。

`Object.is(value1, value2);`

Object.is() 方法判断两个值是否为同一个值，如果满足以下任意条件则两个值相等：

* 都是 undefined
* 都是 null
* 都是 true 或都是 false
* 都是相同长度、相同字符、按相同顺序排列的字符串
* 都是相同对象（意味着都是同一个对象的值引用）
* 都是数字且
* 都是 +0
* 都是 -0
* 都是 NaN
* 都是同一个值，非零且都不是 NaN

Object.is() 与 == 不同。== 运算符在判断相等前对两边的变量（如果它们不是同一类型）进行强制转换（这种行为将 "" == false 判断为 true），而 Object.is 不会强制转换两边的值。


Object.is() 与 === 也不相同。差别是它们对待有符号的零和 NaN 不同，例如，=== 运算符（也包括 == 运算符）将数字 -0 和 +0 视为相等，而将 Number.NaN 与 NaN 视为不相等。
```js
    // Case 1: Evaluation result is the same as using ===
    Object.is(25, 25);                // true
    Object.is('foo', 'foo');          // true
    Object.is('foo', 'bar');          // false
    Object.is(null, null);            // true
    Object.is(undefined, undefined);  // true
    Object.is(window, window);        // true
    Object.is([], []);                // false
    var foo = { a: 1 };
    var bar = { a: 1 };
    Object.is(foo, foo);              // true
    Object.is(foo, bar);              // false
    // Case 2: Signed zero
    Object.is(0, -0);                 // false
    Object.is(+0, -0);                // false
    Object.is(-0, -0);                // true
    Object.is(0n, -0n);               // true
    // Case 3: NaN
    Object.is(NaN, 0/0);              // true
    Object.is(NaN, Number.NaN)        // true
```
**Polyfill**
```js
if (!Object.is) {
  Object.defineProperty(Object, "is", {
    value: function (x, y) {
      // SameValue algorithm
      if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
      } else {
        return x !== x && y !== y;
      }
    }
  });
}

```
### Object.prototype.isPrototypeOf()
* isPrototypeOf() 方法用于测试一个对象是否存在于另一个对象的原型链上。

`prototypeObj.isPrototypeOf(object)`
```js
function Foo() {}
function Bar() {}
function Baz() {}
Bar.prototype = Object.create(Foo.prototype);
Baz.prototype = Object.create(Bar.prototype);
var baz = new Baz();
console.log(Baz.prototype.isPrototypeOf(baz)); // true
console.log(Bar.prototype.isPrototypeOf(baz)); // true
console.log(Foo.prototype.isPrototypeOf(baz)); // true
console.log(Object.prototype.isPrototypeOf(baz)); // true

```

### Object.keys()
* Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致。

```js
// 简单数组
const arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']
// 类数组对象
const obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']
// 具有随机键顺序的类数组对象
const anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']
// getFoo 是一个不可枚举的属性
const myObj = Object.create({}, {
  getFoo: {
    value() { return this.foo; }
  }
});
myObj.foo = 1;
console.log(Object.keys(myObj)); // console: ['foo']

```
### Object.values()
* Object.values() 方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用 for...in 循环的顺序相同（区别在于 for-in 循环枚举原型链中的属性）。

`Object.values(obj)`
```js
var obj = { foo: 'bar', baz: 42 };
console.log(Object.values(obj)); // ['bar', 42]
// array like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(obj)); // ['a', 'b', 'c']
// array like object with random key ordering
// when we use numeric keys, the value returned in a numerical order according to the keys
var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.values(an_obj)); // ['b', 'c', 'a']
// getFoo is property which isn't enumerable
var my_obj = Object.create({}, { getFoo: { value: function() { return this.foo; } } });
my_obj.foo = 'bar';
console.log(Object.values(my_obj)); // ['bar']
// non-object argument will be coerced to an object
console.log(Object.values('foo')); // ['f', 'o', 'o']

```