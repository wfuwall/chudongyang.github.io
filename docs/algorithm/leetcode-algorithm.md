### 算法-知识点
记录自己每天在解决的 [LeetCode](https://leetcode-cn.com/problemset/all/) 算法题时，遇到的问题或者 JavaScript 中不熟悉的知识点。

#### 数组异或操作
给你两个整数，n 和 start 。
数组 nums 定义为：nums[i] = start + 2*i（下标从 0 开始）且 n == nums.length 。
请返回 nums 中所有元素按位异或（XOR）后得到的结果。
解题思路: （1）先把 nums 数组遍历出来，然后通过递归调用的方式求异或操作 （2）其实每次 nums 的第一个值都是 start，所以我们在循环的时候直接进行异或操作
```js
// 解法一:
const xorOperation = function(n, start) {
  const nums = []
  for(let i = 0; i < n; i++ ) {
    nums.push(start + i * 2)
  }
  function recursive(index, arr) {
    if (index === arr.length) return arr[index]
    return arr[index] ^ recursive(index + 1, arr)
  }
  return recursive(0, nums)
};
// 解法二:
const xorOperation = function(n, start) {
  let result = start
  for(let i = 1; i < n; i++ ) {
    result = result ^ (start + i * 2)
  }
  return result
};
```
> 引申出 javascript 操作符：1、逻辑位运算符，位与（&）、位或（|）、位异或（^）、非位（~）；2、移位运算符：左移（<<）、右移（>>）、无符号右移（>>>）。理解用法可查看博客 [-梦珀-](https://www.cnblogs.com/seeks/p/7710977.html)