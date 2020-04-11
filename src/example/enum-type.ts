/*
 * @Author: sunpeiyuan
 * @Date: 2020-04-11 23:14:08
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-04-11 23:54:27
 * @FilePath: \study-ts-webpack01\src\example\enum-type.ts
 * @Description: ts 的枚举类型
 */
export default 1;
console.clear();

/* 1. 枚举类型 */

// 数字枚举 -- 原理：反向映射
enum Role {
  Reporter = 1,
  Developer,
  Maintainer,
  Owner,
  Guest,
}
console.log(Role.Reporter);

// 字符串枚举
enum Message {
  Success = "成功",
  Fail = "失败",
}
console.log(Message);

// 异构枚举
enum Answer {
  N,
  Y = "Yes",
}
console.log(Answer);

/* 2. 枚举成员的性质 */

// 枚举成员是只读的，不允许修改。
// Role.Reporter = 3;

/* 3. 枚举成员分类 */
enum Char {
  // const number 常量枚举 会在编译时计算好结果，以常量的形式出现在运行时环境
  a, // 没有初始值
  b = a, // 对已有成员的引用
  c = 1 + 3, // 常量表达式

  // computed number 需要被计算的 枚举成员，是一些非常量的表达式，不会在编译阶段进行计算，而是在保留到程序的执行阶段。
  d = Math.random(),
  e = "123".length,

  g = 6, // 非常量枚举成员，后边跟的枚举成员 必须具有 初始值
}
console.log(Char);

// 常量枚举 作用：当我们不需要对象，而只需要 对象的值时，就可以使用常量枚举。可以减少编译环境的代码。
const enum Month {
  Jan,
  Feb,
  Mar,
}

let month = Month.Feb;
console.log(month);

// 枚举类型
enum E {
  a,
  b,
}
enum F {
  a = 0,
  b = 1,
}
enum G {
  a = "apple",
  b = "banana",
}

let e: E = 3; // 可以把 任意的数字，赋值给 数字枚举类型。
let f: F = 3;

// e = f; // 不同的枚举类型，不可以互相赋值、比较。

let e1: E.a;
let e2: E.b;
let e3: E.a;

e1 = 1;
e2 = 2;
e3 = 3;

// e1 = e2; // 报错，类型不同，不可赋值。
e1 = e3;
console.log(e1 === e3); // 相同的枚举类型，可以进行相互比较、赋值。

let g1: G; // 字符串枚举，取值 只能是 枚举成员的类型。
let g2: G.a; // 值 只能是 G.a

g1 = G.a;
console.log(g1);

g2 = G.a;
// g2 = G.b; // 取值错误。
console.log(g2);
