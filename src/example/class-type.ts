/*
 * @Author: sunpeiyuan
 * @Date: 2020-04-07 23:24:51
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-04-12 14:52:12
 * @FilePath: \study-ts-webpack01\src\example\class-type.ts
 * @Description:
 */
export default 1;

console.clear();

class People {
  constructor(public name: string) {}
}

let p1 = new People("lison");
console.log(p1);

class Animal {
  constructor(public name: string) {}
}

p1 = new Animal("haha");
console.log(p1);

interface FoodInterface {
  type: string;
}

class FoodClass implements FoodInterface {
  type: string;
  constructor(type: string) {
    this.type = type;
  }
}

let food1 = new FoodClass("tomato");
console.log(food1);

class A {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

interface I extends A {}

class B extends A implements I {
  public name: string;
  constructor(name: string) {
    super(name);
    this.name = name;
  }
}

// const create = <T>(c: any): T => {
//   return new c();
// };

class Info {
  age: number;
  constructor(age: number) {
    this.age = age;
  }
  // constructor(public age: number) {}
}

// let info1 = create<Info>(Info);
// console.log(info1);
// console.log(info1.age);

// type InfoType<T> = new () => T;

// function create2<T>(c: InfoType<T>): T {
//   return new c();
// }

// let info2 = create2<Info>(Info);

function create3<T>(c: { new (...arg: any[]): T }): T {
  return new c();
}

let info3 = create3(Info);
console.log(info3);

class AA {
  constructor(protected name: string) {}
}

let aa = new AA("aa");
console.log(aa);

// 抽象类 只能被继承，不能被实例化的类。
abstract class Animail {
  eat() {
    console.log("eating....");
  }

  // 抽象方法，不具体实现，子类去实现
  abstract sleep(): void;
}

// 不能实例化
// let animail = new Animail();

class Dog extends Animail {
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  run() {
    console.log(`${this.name} is running...`);
  }

  sleep() {
    console.log("dog is sleep");
  }
}

let dog = new Dog("wangwang");

dog.eat();
dog.sleep();

class Cat extends Animail {
  sleep() {
    console.log("Cat Sleep.");
  }
}

let cat = new Cat();
cat.sleep();

let animails: Animail[] = [dog, cat];

animails.forEach((ele) => ele.sleep());

// 接口只能约束类的共有成员
