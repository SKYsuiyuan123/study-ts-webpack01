/*
 * @Author: sunpeiyuan
 * @Date: 2020-04-28 21:57:05
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-04-28 22:07:13
 * @FilePath: \study-ts-webpack01\src\example\class-type-use.ts
 * @Description: calss 实现单例模式
 */

export default 1;

/**
 *
 * 单例模式
 * 连接 Mysql
 * @class Mysql
 *
 */

class Mysql {
  public static instance: Mysql;

  host: string;
  port: number;
  username: string;
  password: string;
  dbname: string;

  private constructor(
    host = "127.0.0.1",
    port = 3306,
    username = "root",
    password = "",
    dbname = ""
  ) {
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.dbname = dbname;
  }

  public static getInstance() {
    if (!Mysql.instance) {
      const db = new Mysql();
      Mysql.instance = db;
    }

    return Mysql.instance;
  }
}

const db = Mysql.getInstance();
