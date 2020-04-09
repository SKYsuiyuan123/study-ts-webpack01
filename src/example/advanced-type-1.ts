/*
 * @Author: sunpeiyuan
 * @Date: 2020-04-08 21:54:21
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-04-09 23:27:06
 * @FilePath: \study-ts-webpack01\src\example\advanced-type-1.ts
 * @Description: ts 高级类型 1
 */
export default 1;
console.clear();

/* 1. 交叉类型 */

const mergeFunc = <T, U>(arg1: T, arg2: U): T & U => {
  return Object.assign({}, arg1, arg2);
};

let res1 = mergeFunc({ a: 1 }, { b: 2 });
console.log(res1);
let res2 = Object.assign({ a: 2 }, { b: 3 });
console.log(res2);

// type 判断类型保护 只能是 string/number/boolean/symbol 中的一种
console.log(typeof res1 === "object");

class CreateByClass1 {
  constructor(public age = 18) {}
}

class CreateByClass2 {
  constructor(public name = "lison") {}
}

function getRandomItem() {
  return Math.random() < 0.5 ? new CreateByClass1() : new CreateByClass2();
}

let item1 = getRandomItem();

// instanceof 类型保护
if (item1 instanceof CreateByClass1) {
  console.log(item1.age);
} else {
  console.log(item1.name);
}

const getLengthFunction = (value: string | null): number =>
  (value || "").length;

let aa = getLengthFunction("");
console.log(aa);

function getSplicedStr(num: number | null): string {
  function getRes(prefix: string) {
    return prefix + num?.toFixed().toString();
  }

  num = num || 0.1;

  return getRes("lison-");
}

console.log(getSplicedStr(3.03));

type PositionType<T> = {
  x: T;
  y: T;
};

const position1: PositionType<number> = {
  x: 1,
  y: -1,
};
console.log(position1);

let position2: {
  x: number;
  y: number;
};

position2 = {
  x: 1,
  y: 2,
};
console.log(position2);

type Name = "lison";
const name1: Name = "lison";
console.log(name1);

type Age = 18;
interface InfoInterface {
  name: string;
  age: Age;
}

const info1: InfoInterface = {
  name: "haha",
  age: 18,
};
console.log(info1);

/* 3. 可辨识联合类型 */
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  height: number;
  width: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function getArea(s: Shape): number {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
  }
}

console.log(getArea({ kind: "circle", radius: 2 }));
