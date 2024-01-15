function binarySearch(arr, target) {
    let left = 0; // 左边界索引
    let right = arr.length - 1; // 右边界索引
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2); // 计算中间位置索引
        
        if (arr[mid] === target) {
            return mid; // 如果目标值等于当前中间位置的值，返回该索引
        } else if (arr[mid] < target) {
            left = mid + 1; // 如果目标值大于当前中间位置的值，将左边界移动到中间位置的后一个位置
        } else {
            right = mid - 1; // 如果目标值小于当前中间位置的值，将右边界移动到中间位置的前一个位置
        }
    }
    
    return -1; // 若未找到目标值，则返回-1表示不存在
}
// let arr = [1, 2, 4, 5, 6, 3, 7].sort((a, b) => a - b)
let arr = [1, 2, 4, 5, 8, 9, 14]
console.log(binarySearch(arr, 4));