 /**
  * 插入排序
  * @param {*} arr 
  * @returns 
  * 每轮会把最小的排到最前面
  */
 function insertSort(arr) {
     for (let i = 1; i < arr.length; i++) {
         let target = arr[i];
         let j = i;
         while (j > 0 && target < arr[j - 1]) {
             arr[j] = arr[j - 1];
             j--;
         }
         arr[j] = target;
     }
     return arr;
 }
 /**
  * 冒泡排序
  * @param {*} arr 
  * 每轮会把最大的放到最后面
  */
 function bubbleSort(arr) {
     let len = arr.length
     for (let i = 0; i < len; i++) {
         /**每一轮就会把最大的放到最后面 所以不需要再循环后面的 */
         for (let j = 0; j < len - i - 1; j++) {
             if (arr[j] > arr[j + 1]) {
                 [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
             }
         }
     }
     return arr
 }
 const arr = [12, 3, 6, 1, 7, 8, 9, 14, 28, 13]
 console.log(insertSort(arr));
 console.log(bubbleSort(arr));