# voluntary  
![](https://img.shields.io/crates/l/rustc-serialize.svg)
![](https://img.shields.io/badge/version-v3.0.0-green.svg)
[![Build Status](https://travis-ci.org/D-lyw/voluntary.svg?branch=master)](https://travis-ci.org/D-lyw/voluntary)
[![codecov](https://codecov.io/gh/D-lyw/voluntary/branch/master/graph/badge.svg)](https://codecov.io/gh/D-lyw/voluntary)

> A volunteer management platform based on Vue.js and ElementUI. 

![](https://github.com/D-lyw/Notes/blob/master/img/volunteer_img1.png?raw=true)

## Project Structure

  + 控制台
  
    - 首页
    - 总队志愿活动
    - 全体志愿活动
    - 认证活动
    
  + 志愿者概览
  
    - 志愿者信息
    - 志愿者操作
    
  + 用户管理
  
    - 人员权限
    - 委员列表
    - 个人中心
    
  + 系统记录
  
    - 消息公告
    - 组织信息
    - 组织管理
    - 操作日志



## Start To Use It

``` bash
# download it to your local
git clone https://github.com/D-lyw/voluntary.git

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev || npm start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## TodoLists

- [x] 单元测试&自动化测试 (doing)
 
- [ ] 移动端优化与适配

- [ ] 性能、代码优化


## Version

***V3.1.6***

+ 修改批量导入学生信息时，学号和姓名顺序错误的问题
+ 修改在组织信息页面中修改组织信息接口错误问题
+ 解决人员权限页面翻页失败问题
+ 解决360浏览器等页面加载失败的问题

***V3.0.0***

+ 志愿管理平台项目需求均实现完成
+ 目前已知bug均已被解决
+ 后期将进行代码优化，性能优化，浏览器缓存，移动端适配等方面进行优化

***V2.3.0***

+ 添加委员管理部分的功能
+ 没有待处理事务时，添加人性化提示信息
+ 添加已完成活动的人员详情展示
+ 修复已知bug

***V2.0.0***

+ 使用Vue框架对 之前 原生写的 志愿管理平台 进行重构，删减与扩增；
+ 根据之间的使用反馈，添加了系列的新功能；

***origin***

> 最开始用基础的html，css & js 写了一个学院使用的志愿者工时管理系统