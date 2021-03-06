/*
 * @Author: sunpeiyuan
 * @Date: 2020-04-05 15:08:47
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-04-12 15:23:49
 * @FilePath: \study-ts-webpack01\src\example\generics-type.ts
 * @Description: ts 的泛型
 */
export default 1;
console.clear();

const getArray = <T>(value: T, times: number): T[] =>
  new Array(times).fill(value);

let rs1 = getArray<string>("23", 3);
console.log(rs1);

const getArray2 = <T extends string, U extends number>(
  params1: T,
  params2: U,
  times: number
): [T, U][] => new Array(times).fill([params1, params2]);

let rs2 = getArray2("66", 88, 1);
console.log(rs2);

const getProps = <T, U extends keyof T>(object: T, propName: U): T[U] =>
  object[propName];

let rs3 = getProps({ x: 1 }, "x");
console.log(rs3);

let obj = {
  a: "aa",
  b: 121,
  c: "ccccc",
};

let rs4 = getProps(obj, "c");
console.log(rs4);

interface Log<T = string> {
  (value: T): T;
}

let myLog: Log<number> = (value: number) => value;
console.log(myLog(1));

// 泛型约束
function log2<T extends { length: number }>(value: T): T {
  console.log(value, value.length);
  return value;
}

log2("abc");
log2({ length: 2, num: 22 });
