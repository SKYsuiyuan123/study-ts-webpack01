/*
 * @Author: sunpeiyuan
 * @Date: 2020-04-05 11:47:26
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-04-05 12:22:40
 * @FilePath: \study-ts-webpack01\src\example\interface-type.ts
 * @Description: ts 的接口类型
 */
console.clear();

interface Vegetable {
  color?: string;
  type: string;
}

const getVegetable = ({ color, type }: Vegetable): string => {
  return `A ${color ? color : ""} ${type}`;
};

const rs1 = getVegetable({
  color: "red",
  type: "tomoto",
  size: 2,
} as Vegetable);
console.log(rs1);

const vegetableInfo = {
  color: "blue",
  type: "tomoto",
  size: 2,
};

const rs2 = getVegetable(vegetableInfo);
console.log(rs2);

let a = 3;

interface RoleDic {
  [id: string]: string;
}

const role1: RoleDic = {
  1: "334",
};

interface Vegetables {
  color: string;
}

interface Tomato extends Vegetables {
  radius: number;
}

interface Carrot {
  length: number;
}

const tomato1: Tomato = {
  color: "red",
  radius: 10,
};
console.log("-----------");
console.log(tomato1);

interface Counter {
  (): void;
  count: number;
}

const getCounter = (): Counter => {
  const c = () => {
    c.count++;
  };
  c.count = 0;
  return c;
};

const counter: Counter = getCounter();
counter();
counter();
counter();
console.log(counter.count);
