/*
 * @Author: sunpeiyuan
 * @Date: 2020-04-11 14:46:04
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-04-11 15:09:23
 * @FilePath: \study-ts-webpack01\src\example\merging.ts
 * @Description: ts 的声明合并
 */
export default 1;
console.clear();

/* 1. 接口合并 */

// 非函数成员不能重复，如果重复，则类型要相同
// 函数同名，则为函数重载
interface InfoInter {
  name: string;
  getRes(input: string): number;
}

interface InfoInter {
  age: number;
  getRes(input: number): string;
}

let info: InfoInter = {
  name: "sky",
  age: 18,
  getRes(input: string | number): any {
    return typeof input === "string" ? input.length : input.toString();
  },
};

let res1 = info.getRes("123");
let res2 = info.getRes(123);

console.log(res1);
console.log(res2);

/* 2. 命名空间 */
namespace Validations {
  export const numberReg = /^[0-9]+$/;
  export const checkNumber = () => {};
}

namespace Validations {
  console.log(numberReg);
  export const checkLetter = () => {};
}

console.log(Validations);
console.log("----------------------------------------------");

// 函数 和 命名空间 合并
function countUp() {
  countUp.count++;
}

namespace countUp {
  export let count = 0;
}

console.log(countUp.count);
countUp();
console.log(countUp.count);

// 枚举 和 命名空间合并，可以扩充 枚举，但是，跟真正的枚举是 不一样的。
enum Colors {
  red,
  green,
  blue,
}

namespace Colors {
  export const yellow = 3;
}

console.log(Colors);
console.log(Colors[1]);
console.log(Colors.yellow);
console.log(Colors[3]); // undefined
