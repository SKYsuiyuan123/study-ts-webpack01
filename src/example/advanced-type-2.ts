/*
 * @Author: sunpeiyuan
 * @Date: 2020-04-08 21:54:21
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-04-09 23:24:54
 * @FilePath: \study-ts-webpack01\src\example\advanced-type-2.ts
 * @Description: ts 高级类型 2
 */
export default 1;
console.clear();

/* 1. this 类型 */

class Counter {
  constructor(public count = 0) {}

  add(value: number) {
    this.count += value;
    return this;
  }

  subStract(value: number) {
    this.count -= value;
    return this;
  }
}

let counter1 = new Counter(10);
// console.log(counter1.add(3).subStract(5));

class PowCounter extends Counter {
  constructor(public count = 0) {
    super(count);
  }

  pow(value: number) {
    this.count = this.count ** value;
    return this;
  }
}

let powCounter = new PowCounter(2);
// console.log(powCounter.pow(3).add(10));

/* 2. keyof */

interface Info {
  name: string;
  age: number;
}

let infoPorp: keyof Info;
infoPorp = "age";
// infoPorp = 'sex'

function getValue<T, K extends keyof T>(obj: T, names: K[]): T[K][] {
  return names.map((name) => obj[name]);
}

const infoObj = {
  name: "lison",
  age: 18,
};

let values = getValue(infoObj, ["name", "age"]);
console.log(values); // ['lison]

/* 3. [] 索引访问操作符 */

type NameTypes = Info["name"];

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name];
}

console.log(getProperty({ a: "aa" }, "a"));

interface Objs<T> {
  [key: number]: T;
}

interface Objs2<T> {
  [key: string]: T;
}

let keys: keyof Objs<number>;
let keys2: keyof Objs2<number>;

const objs1: Objs2<number> = {
  age: 18,
};
let keys3: Objs2<number>["name"];

interface Type {
  a: never;
  b: never;
  c: string;
  d: number;
  e: undefined;
  f: null;
  g: object;
}

// keyof 返回 类型不为 never 的类型
type Test = Type[keyof Type];

/* 4. 映射类型 */

interface Info1 {
  age: number;
  sex: string;
}

type ReadonlyType<T> = {
  readonly [P in keyof T]: T[P];
  // readonly [P in keyof T]?: T[P]; // 并且可选
};

// 增加 / 移除 特定修饰符 - 去掉, + 增加。
type RemoveReadonly<T> = {
  -readonly [P in keyof T]: T[P];
  // -readonly [P in keyof T]-?: T[P];
};

// type ReadonlyInfo1 = ReadonlyType<Info1>;

// ts 内置的：Readonly Partial Pick Record
// 同态的：Readonly Partial Pick 是的，Record 不是的。
type ReadonlyInfo1 = Readonly<Info1>;
type ReadonlyInfo2 = Partial<Info1>;

type RemoveReadonlyInfo1 = RemoveReadonly<ReadonlyInfo1>;

let info1: ReadonlyInfo1 = {
  age: 18,
  sex: "man",
};
console.log(info1);

// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };
// type Record<K extends keyof any, T> = {
//   [P in K]: T;
// };

interface Info2 {
  name: string;
  age: number;
  address: string;
}

const info2: Info2 = {
  name: "lison",
  age: 18,
  address: "beijing",
};

function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  let res: any = {};

  keys.forEach((key) => {
    res[key] = obj[key];
  });

  return res;
}

const nameAndAddress = pick(info2, ["name", "address"]);
// console.log(nameAndAddress);

function mapObject<K extends string | number, T, U>(
  obj: Record<K, T>,
  f: (x: T) => U
): Record<K, U> {
  let res: any = {};

  for (const key in obj) {
    res[key] = f(obj[key]);
  }

  return res;
}

const names = { 0: "hello", 1: "world", 2: "bye" };
const lengths = mapObject(names, (s) => s.length);
console.log(lengths);

/* 5. 包装 & 拆包 */
type Proxy<T> = {
  get(): T;
  set(value: T): void;
};

type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>;
};

// 包装
function proxify<T>(obj: T): Proxify<T> {
  let result = {} as Proxify<T>;

  for (const key in obj) {
    result[key] = {
      get: () => obj[key],
      set: (value) => (obj[key] = value),
    };
  }

  return result;
}

let props = {
  name: "lison",
  age: 18,
};

let proxyProps = proxify(props);
console.log(proxyProps);
console.log(proxyProps.name.get());

// 拆包
function unproxify<T>(t: Proxify<T>): T {
  let resut = {} as T;

  for (const k in t) {
    resut[k] = t[k].get();
  }

  return resut;
}

let originalProps = unproxify(proxyProps);
console.log(originalProps);

//
const stringIndex = "a";
const numberIndex = 1;
const symbolIndex = Symbol();

type Objs3 = {
  [stringIndex]: string;
  [numberIndex]: number;
  [symbolIndex]: symbol;
};

type keysType = keyof Objs3;

type ReadonlyTypes<T> = {
  readonly [P in keyof T]: T[P];
};

let objs3: ReadonlyTypes<Objs3> = {
  a: "aa",
  1: 11,
  [symbolIndex]: Symbol(),
};
// objs3.a = 'bb'; // 只读，不可更改。
console.log(objs3);

type MapToPromise<T> = {
  [K in keyof T]: Promise<T[K]>;
};

type Tuple = [number, string, boolean];
type PromiseTuple = MapToPromise<Tuple>;

let tuple1: PromiseTuple = [
  new Promise((resolve, reject) => resolve(1)),
  new Promise((resolve, reject) => resolve("a")),
  new Promise((resolve, reject) => resolve(true)),
];

/* 6. unknown ts 顶级类型 */

// 1. 任何类型都可以赋值给 unknown 类型
let value1: unknown;
value1 = "a";
value1 = true;

// 2. 如果没有类型断言 或 基于控制流的类型细化时，unknown 不可以赋值给其它类型。
// 此时他 只能赋值给 unknown 和 any 类型。
let value2: unknown;
// let value3: string = value2;
value1 = value2;

// 3. 如果没有类型断言 或 基于控制流的类型细化时，不能在他上面 进行任何操作。
let value4: unknown;
// value4 += 1;

// 4. unknwon 与任何其它类型组成的 交叉类型，最后都等于其它类型。
type type1 = string & unknown;
type type2 = number[] & unknown;
type type4 = unknown & unknown;

// 5. unknown 与任何其它类型（除了any）组成的 联合类型，最后都等于 unknown类型。
type type5 = unknown | string;
type type6 = unknown | any;
type type7 = string[] | unknown;

// 6. never 类型是 unknown 的子类型
type type8 = never extends unknown ? true : false;
let type8: type8 = true;

// 7. keyof unknown 等于类型 never
type type9 = keyof unknown;

// 8. 只能对 unknown 进行 等 或 不等 操作，不能进行其它操作。
console.log(value1 === value2);
console.log(value1 !== value2);
// value1 += value2;

// 9. unknown 类型的值不能访问他的属性、作为函数调用 和 作为类创建实例。
let value10: unknown;
// value10.age;
// value10();
// new value10();

// 10. 使用 映射类型时 如果遍历的是 unknown 类型，则不会映射任何类型。
type Types1<T> = {
  [P in keyof T]: number;
};

type type11 = Types1<any>;
type type12 = Types1<unknown>;

/* 7. 条件类型 */

// T extends U ? X : Y

type Types2<T> = T extends string ? string : number;
let index1: Types2<"a">;
let index2: Types2<123>;
let index3: Types2<false>;

// 分布式条件类型

type TypeName<T> = T extends any ? T : never;
type Type3 = TypeName<string | number>;

type TypeName2<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends undefined
  ? undefined
  : T extends Function
  ? Function
  : object;

type Type4 = TypeName2<() => void>;
type Type5 = TypeName2<string[]>;
type Type6 = TypeName2<(() => void) | string>;

// 该 Diff 已经内置，名称叫 Exclude
type Diff<T, U> = T extends U ? never : T;
type Test2 = Diff<string | number | boolean, undefined | number>;

type Type7<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

interface Part {
  id: number;
  name: string;
  subparts: Part[];
  undatePart(newName: string): void;
  undatePart2(newName: number): void;
}

type Test3 = Type7<Part>;

// infer 类型推论
type Type8<T> = T extends any[] ? T[number] : T;

type Test4 = Type8<string[]>;
type Test5 = Type8<string>;

type Type9<T> = T extends Array<infer U> ? U : T;

type Test6 = Type9<string[]>;
type Test7 = Type9<boolean>;

// 内置条件类型 Exclude<T, U> 从 T 里面选出，不在 U 里面的类型。
type Type10 = Exclude<"a" | "b" | "c", "a" | "b">;

// 内置条件类型 Extract<T, U> 从 T 里面选出，可以赋值给 U 的类型。
type Type11 = Extract<"a" | "b" | "c", "c" | "B">;

// NonNullable<T> 从 T 中去掉 null 和 undefined 类型
type Type12 = NonNullable<string | number | null | undefined>;

// ReturnType<T> 获取函数类型返回值的类型
type Type13 = ReturnType<() => string>;
type Type14 = ReturnType<() => void>;

// InstanceType<T> 获取构造函数类型的 实例类型
class AClass {
  constructor() {}
}

type T1 = InstanceType<typeof AClass>;
type T2 = InstanceType<any>;
type T3 = InstanceType<never>;
// type T4 = InstanceType<string>;
