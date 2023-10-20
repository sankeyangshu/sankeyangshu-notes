---
date: 2023-03-20
title: React + TS 项目封装axios全过程
---

# React + TS 项目封装 axios 全过程

> 本项目完整的代码托管在 [GitHub](https://github.com/sankeyangshu/react-template-admin) / [码云](https://gitee.com/sankeyangshu/react-template-admin) ，欢迎点亮小星星 🌟🌟

## 前言

本文主要讲在 React + TS 项目中如何封装 axios，封装请求，封装公共的 api，页面如何调用请求。

## 安装 axios

::: code-group

```sh [pnpm]
$ pnpm add -S axios
```

```sh [npm]
$ npm i -S axios
```

```sh [yarn]
$ yarn add -S axios
```

:::

## 封装 axios 实例

在项目 src 目录下新建 `utils` 文件夹，然后再新建一个 `request` 文件夹，最后在其中新建 `request.ts` 文件，这个文件是主要书写 axios 的封装过程。

```ts
/****   request.ts   ****/
import axios, { AxiosError, AxiosResponse } from 'axios';
// 获取个人信息，主要是token
import { useSettingStore } from '@/store/user';
// 消息提示组件
import { Toast } from 'react-vant';

// 创建新的axios实例
const service = axios.create({
  // 公共接口
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时时间 单位是ms，这里设置了5s的超时时间
  timeout: 5000,
});

// 添加一个请求拦截器
service.interceptors.request.use(
  (config) => {
    // 发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等
    // 每次发送请求之前判断pinia中是否存在token,如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    const token = useSettingStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    //设置loading
    Toast.loading({
      message: '加载中...',
      duration: 0, //一直存在
      forbidClick: true, //禁止点击
    });

    // 数据转换，判断数据格式为formdata还是json格式，高版本的axios会默认转换，如果使用的是低版本的需要手动转换
    // json格式
    // config.data = JSON.stringify(config.data);
    return config;
  },
  (error: AxiosError) => {
    // 出现请求错误，清除toast
    Toast.clear();
    // 请求错误，这里可以用全局提示框进行提示
    Toast.fail({
      message: '请求错误，请稍后再试',
      duration: 5,
    });
    return Promise.reject(error);
  }
);

// 添加一个响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data } = response;
    if (status === 200) {
      // 接口网络请求成功，关闭等待提示
      if (data.code === 0) {
        // 接口请求结果正确
        return data;
      } else {
        return Promise.reject(data);
      }
    }
  },
  (error: AxiosError) => {
    const { response } = error;
    // 响应失败，关闭等待提示
    Toast.clear();
    // 提示错误信息
    if (JSON.stringify(error).includes('Network Error')) {
      Toast.fail({
        message: '网络超时',
        duration: 5,
      });
    }

    // 根据响应的错误状态码，做不同的处理，此处只是作为示例，请根据实际业务处理
    if (response) {
      if (response === 400) {
        Toast.fail({
          message: '报错信息。。。',
          duration: 5,
        });
      } else if (response === 401) {
        Toast.fail({
          message: '报错信息。。。',
          duration: 5,
        });
      } else {
        Toast.fail({
          message: '报错信息。。。',
          duration: 5,
        });
      }
    }

    return Promise.reject(error);
  }
);

export default service;
```

**特殊说明：**

代码中消息提示的组件使用的是 antd 的组件，如果大家使用了别的组件库，要替换成组件库中提供的消息组件。

## 封装请求

在项目 `src` 目录下的 `utils` 文件夹中新建 `index.ts` 文件，这个文件是主要书写几种请求的封装过程。

```ts
import request from './request';
import { AxiosRequestConfig } from 'axios';

/**
 * 网络请求响应格式，T 是具体的接口返回类型数据
 */
interface CustomSuccessData<T> {
  code?: number;
  msg?: string;
  message?: string;
  data: T;
  [keys: string]: any;
}

/**
 * @description: 封装get请求方法
 * @param {string} url url 请求地址
 * @param {string | object} params 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
const get = <T>(
  url: string,
  params?: string | object,
  config?: AxiosRequestConfig
): Promise<CustomSuccessData<T>> => {
  config = {
    method: 'get', // `method` 是创建请求时使用的方法
    url, // `url` 是用于请求的服务器 URL
    ...config,
  };
  if (params) {
    config.params = params;
  }
  return request(config);
};

/**
 * @description: 封装post请求方法
 * @param {string} url url 请求地址
 * @param {string | object} data 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
const post = <T>(
  url: string,
  data?: string | object,
  config?: AxiosRequestConfig
): Promise<CustomSuccessData<T>> => {
  config = {
    method: 'post',
    url,
    ...config,
  };
  if (data) {
    config.data = data;
  }
  return request(config);
};

/**
 * @description: 封装patch请求方法
 * @param {string} url url 请求地址
 * @param {string | object} data 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
const patch = <T>(
  url: string,
  data?: string | object,
  config?: AxiosRequestConfig
): Promise<CustomSuccessData<T>> => {
  config = {
    method: 'patch',
    url,
    ...config,
  };
  if (data) {
    config.data = data;
  }
  return request(config);
};

/**
 * @description: 封装delete请求方法
 * @param {string} url url 请求地址
 * @param {string | object} params 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
const remove = <T>(
  url: string,
  params?: string | object,
  config?: AxiosRequestConfig
): Promise<CustomSuccessData<T>> => {
  config = {
    method: 'delete',
    url,
    ...config,
  };
  if (params) {
    config.params = params;
  }
  return request(config);
};

// 包裹请求方法的容器,使用 http 统一调用
const http = {
  get,
  post,
  patch,
  remove,
};

export default http;
```

## 封装接口

在项目 `src` 目录下新建 `api` 文件夹，这个文件夹是主要用了存在接口文件。

示例：在 api 下新建 user.ts 文件

```ts
import { loginDataType, userInfoType } from '@/types/user';
import http from '@/utils/request';

// api接口 - 此处用了统一保存接口url路径
const api = {
  login: '/api/user/login', // 用户登录接口
  register: '/api/user/register', // 用户注册接口
  userInfo: '/api/user/get_userinfo', // 用户信息
};

/**
 * @description: 用户登录
 * @param {loginDataType} data 登录参数
 * @return 返回请求登录接口的结果
 */
export function postLoginAPI(data: loginDataType) {
  return http.post<{ token: string }>(api.login, data);
}

/**
 * @description: 用户注册
 * @param {loginDataType} data 注册参数
 * @return 注册结果
 */
export function postRegisterAPI(data: loginDataType) {
  return http.post(api.register, data);
}

/**
 * @description: 获取用户信息
 * @return 用户信息
 */
export function getUserInfoAPI() {
  return http.get<userInfoType>(api.userInfo);
}
```

## 结语

以上就详细介绍了，在 React + TS 项目中 如何封装 axios，封装请求，封装公共的 api，配置多个接口等问题，其他框架封装 axios 也是同理。
