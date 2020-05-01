/*
 * @Author: sunpeiyuan
 * @Date: 2020-04-05 11:47:26
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-05-01 12:59:47
 * @FilePath: \study-ts-webpack01\src\example\interface-type.ts
 * @Description: ts 的接口类型
 */
export default 1;
console.clear();

interface Vegetable {
  color?: string;
  type: string;
}

const getVegetable = ({ color, type }: Vegetable): string => {
  return `A ${color ? color : ""} ${type}`;
};

// 方法一 类型断言
const rs1 = getVegetable({
  color: "red",
  type: "tomoto",
  size: 2,
} as Vegetable);
console.log(rs1);

// 方法二 鸭式变形法
const vegetableInfo = {
  color: "blue",
  type: "tomoto",
  size: 2,
};

const rs2 = getVegetable(vegetableInfo);
console.log(rs2);

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

interface Result<T> {
  data: T;
}

function getData<T>(arg: T): Result<T> {
  const data = arg;

  return { data };
}

const data = getData<string>("sd").data;
const data2 = getData<number>(232).data;
console.log(data);
console.log(data2);

function getData2<T>(arg: T): Promise<Result<T>> {
  const data = arg;
  return Promise.resolve({ data });
}

const data3 = getData2<number>(232);
console.log(data3);

data3.then((res) => {
  const data = res.data;
  console.log(data);
});
