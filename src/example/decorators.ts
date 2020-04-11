/*
 * @Author: sunpeiyuan
 * @Date: 2020-04-11 15:16:17
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-04-11 15:19:30
 * @FilePath: \study-ts-webpack01\src\example\decorators.ts
 * @Description: ts 装饰器
 */
export default 1;
console.clear();

function setName() {
  console.log("get setName");
  return (target: any) => {
    console.log("setName");
  };
}

function setAge() {
  console.log("get setAge");
  return (target: any) => {
    console.log("setAge");
  };
}

@setName()
@setAge()
class ClassDec {}
