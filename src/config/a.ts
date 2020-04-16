/*
 * @Author: sunpeiyuan
 * @Date: 2020-04-14 22:21:18
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-04-15 23:17:31
 * @FilePath: \study-ts-webpack01\src\config\a.ts
 * @Description:
 */
let a = 3;
let arr1 = [1, 2].map((ele) => ele * 2);
let arr2 = [...arr1, ...[8, 9, 10]];
console.log(arr2);
