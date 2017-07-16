# Instaurant

## Instaurant Introduction
Instaurant (portmanteau of “Instant” and “Restaurant”) is designed to
1. Allow restaurant owners to configure restaurant menus and services that are accessible to customers through mobile devices.
2. Turn every customer's mobile device into a menu and ordering machine with a scan of **QR Code**.
3. Provide insights into restaurant operations by presenting useful analytical data.
## Insturant Origin and Contributors
The idea is proposed by Zhuoran Li during a dinner with Xiaowei Deng and Kuan Lin, on 25th June, 2016.
Current contributors include:
* Zhuoran Li
* Kuan Lin
* Yuchen Xiao
* Jack Zheng

## Tech Stack
> [Babel](https://babeljs.io/) is the **compiler** for writing next generation JavaScript right now without waiting for browser support.

> [Bootstrap](http://getbootstrap.com/) is the world's most popular mobile first **front-end framework** for faster and easier web development.

> [ES6/ECMAScript 2015](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015) is an **ECMAScript standard** finalized in June 2015 that adds significant new syntax for writing complex JavaScript applications.

> [Firebase](https://www.firebase.com) is a mobile and web application **development platform** that lets developers build better applications fast without managing servers, and grow successful business.

> [React](https://www.firebase.com) is a **Javascript library** for building user interfaces.

> [React Router](https://reacttraining.com/react-router/) is a collection of **navigational components** that compose declaratively with your application.

> [Redux](http://redux.js.org/) Redux is a predictable **state container** for JavaScript apps.

> [Webpack](https://webpack.js.org/) is a **module bundler** for modern JavaScript applications.

## Quick Start
```shell
$ git clone https://bitbucket.org/hackinstaurant/instaurant.git
$ cd <your-path>/instaurant-dev
$ npm install
$ npm run build && npm run dev
```

## Commands
|Script|Description|
|---|---|
|`npm install`| Install all modules listed as dependencies in `package.json`|
|`npm run build`| Remove previous build files (if any), and then build the application to `./bundles`|
|`npm run dev`| Run development server with webpack-dev-server @ `http://localhost:8080/`|
|`npm start`| Start production ready app with Firebase @ `https://www.instaurant.ca/`|
