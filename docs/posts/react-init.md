---
date: 2024-06-24
title: 从零开始搭建一套规范的 Vite + React + TypeScript 前端工程化项目环境
---

<h1 align="center">
  从零开始搭建一套规范的 Vite + React + TypeScript 前端工程化项目环境
</h1>

本文从以下几个方面展开：

- 架构搭建
- 代码规范
- 提交规范

> 本项目完整的代码托管在 [GitHub](https://github.com/sankeyangshu/react-template)，欢迎点亮小星星 🌟🌟

### 技术栈

- 编程语言：[TypeScript](https://www.typescriptlang.org/zh/) + [JavaScript](https://www.javascript.com/)
- 构建工具：[Vite](https://cn.vitejs.dev/)
- 前端框架：[React](https://react.dev/)
- 路由工具：[React Router V6](https://reactrouter.com/en/main)
- 状态管理：[Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- CSS 预编译：[Less](https://lesscss.org/) + [UnoCSS](https://unocss.dev/)
- Git Hook 工具：[husky](https://typicode.github.io/husky/#/) + [lint-staged](https://github.com/okonet/lint-staged)
- 代码规范：[EditorConfig](http://editorconfig.org) + [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/) + [Stylelint](https://stylelint.io/)
- 提交规范：[Commitlint](https://commitlint.js.org/#/)
- 开发工具：[Vscode](https://code.visualstudio.com/)

### 架构搭建

请确保你的电脑上成功安装 Node.js，本项目使用 Vite 构建工具，需要 Node.js 版本 >= 12.0.0。

查看 Node.js 版本：

```sh
node -v
```

推荐使用 Nvm 将 Node.js 升级到最新的稳定版本：

```bash
# 使用 nvm 安装最新稳定版 Node.js
nvm install stable
```

#### 使用 Vite 快速初始化项目雏形

```bash
# npm 6.x
npm create vite@latest my-react-app --template react-ts

# npm 7+（需要额外的双横线）
npm create vite@latest my-react-app -- --template react-ts

# yarn
yarn create vite my-react-app --template react-ts

# pnpm，推荐使用pnpm
pnpm create vite my-react-app --template react-ts
```

#### 修改 Vite 配置文件

Vite 配置文件 `vite.config.ts` 位于根目录下，项目启动时会自动读取。

关于 Vite 更多配置项及用法，请查看 [Vite](https://cn.vitejs.dev/) 官网。

```ts
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import react from '@vitejs/plugin-react';
import path from 'path'; // 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> pnpm i @types/node -D

function resolve(dir: string) {
  return path.join(__dirname, '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 配置别名
  resolve: {
    alias: {
      '@': resolve('src'), // 设置 `@` 指向 `src` 目录
    },
  },
});
```

#### 规范目录文件

```sh
├── publish/
└── src/
    ├── assets/                    // 静态资源目录
    ├── components/                // 公共组件目录
    ├── hooks/                     // hooks函数目录
    ├── plugins/                   // 插件目录
    ├── router/                    // 路由配置目录
    ├── store/                     // 状态管理目录
    ├── styles/                    // 通用 CSS 目录
    ├── utils/                     // 工具函数目录
    ├── views/                     // 页面组件目录
    ├── App.tsx
    ├── main.tsx
├── tests/                         // 单元测试目录
├── index.html
├── tsconfig.json                  // TypeScript 配置文件
├── vite.config.ts                 // Vite 配置文件
└── package.json
```

#### 集成路由工具 React Router

1. 安装支持 React 的路由工具 **react-router-dom**

::: code-group

```bash [pnpm]
pnpm add react-router-dom
```

```bash [yarn]
yarn add react-router-dom
```

```bash [npm]
npm install react-router-dom
```

:::

2. 创建 src/router/index.tsx 文件

```sh
└── src/
     ├── router/
         ├── index.tsx  // 路由配置文件
```

```ts
import { RouteObject, useRoutes } from 'react-router-dom';
import Home from '@/views/Home';

/**
 * 公共路由
 */
export const constantRoutes: RouteObject[] = [
  {
    path: '/',
    id: 'Home',
    element: <Home />,
  },
];

// 创建一个可以被 React 应用程序使用的路由实例
const router = () => {
  const routes = useRoutes(constantRoutes);
  return routes;
};

export default router;
```

根据本项目路由配置的实际情况，你需要在 src 下创建 views 目录，用来存储页面组件。

我们在 views 目录下创建 `home.tsx`。

3. 在 App.tsx 文件中挂载路由配置

```ts
import { HashRouter } from 'react-router-dom';
import Router from './routers';

const App = () => {
  return (
    <HashRouter>
      <Router />
    </HashRouter>
  );
};

export default App;
```

#### 集成状态管理工具 Zustand

1. 用你喜欢的包管理器安装 **zustand：**

::: code-group

```bash [pnpm]
pnpm install zustand
```

```bash [yarn]
yarn add zustand
```

```bash [npm]
npm install zustand
```

:::

2. 创建 src/store/setting.ts 文件

```sh
└── src/
    ├── store/
        ├── setting.ts
```

```ts
import { create } from 'zustand';

/**
 * 系统设置store类型
 */
export interface settingsStoreType {
  isDark: boolean;
  setThemeDark: (value: boolean) => void;
}

export const useSettingStore = create<settingsStoreType>()((set) => ({
  isDark: false, // 深色模式 切换暗黑模式

  // 设置暗黑模式
  setThemeDark: (value: boolean) => set({ isDark: value }),
}));
```

#### 集成 即时原子 CSS 引擎 UnoCSS

本项目使用 即时原子 CSS 引擎 UnoCSS。

1. 安装

::: code-group

```bash [pnpm]
pnpm add -D unocss
```

```bash [yarn]
yarn add -D unocss
```

```bash [npm]
npm install -D unocss
```

:::

2. 安装插件：

```
// vite.config.ts
import React from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
    React(),
  ],
})
```

3. 创建 `uno.config.ts` 文件：

```
// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
})
```

4. 将 `virtual:uno.css` 添加到您的主入口文件：

```
// main.tsx
import 'virtual:uno.css'
```

### 代码规范

本文讲解如何使用 EditorConfig + Prettier + ESLint + Stylelint 组合来实现代码规范化。

这样做带来好处：

- 解决团队之间代码不规范导致的可读性差和可维护性差的问题。
- 解决团队成员不同编辑器导致的编码规范不统一问题。
- 提前发现代码风格问题，给出对应规范提示，及时修复。
- 减少代码审查过程中反反复复的修改过程，节约时间。
- 自动格式化，统一编码风格，从此和脏乱差的代码说再见。

#### 集成 EditorConfig 配置

EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。

在项目根目录下增加 `.editorconfig` 文件：

```bash
# Editor configuration, see http://editorconfig.org

# 表示是最顶层的 EditorConfig 配置文件
root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

注意：VSCode 使用 EditorConfig 需要去插件市场下载插件 [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) 。

#### 集成 Prettier 配置

Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、JSON、Markdown 等语言。

1. 安装 Prettier

::: code-group

```bash [pnpm]
pnpm i prettier -D
```

```bash [yarn]
yarn add -D prettier
```

```bash [npm]
npm install -D prettier
```

:::

2. 创建 Prettier 配置文件

在本项目根目录下创建 `.prettierrc` 文件。关于更多配置项信息，请前往[官网](https://prettier.io/docs/en/options.html)查看

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "semi": true
}
```

3. Prettier 安装且配置好之后，就能使用命令来格式化代码

```bash
# 格式化所有文件（. 表示所有文件）
npx prettier --write .
```

`package.json` 文件中添加

```json
// package.json
"sricpts": {
  // ...
  "lint:prettier": "prettier --write --loglevel warn \"src/**/*.{js,ts,json,tsx,css,less,scss,html,md}\"",
}

```

注意：VSCode 编辑器使用 Prettier 配置需要下载插件 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

#### 集成 ESLint 配置

ESLint 是一款用于查找并报告代码中问题的工具，并且支持部分问题自动修复。

安装并配置 Eslint

::: code-group

```bash [pnpm]
pnpm i eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-simple-import-sort -D
```

```bash [yarn]
yarn add -D eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-simple-import-sort
```

```bash [npm]
npm install -D eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-simple-import-sort
```

:::

:::tip
请安装 Eslint@8 版本，Eslint 9 弃用了一些配置，可能会出现问题。
:::

安装成功后创建 `.eslintrc.js` 配置文件，并写入以下内容。

```js
module.exports = {
  root: true,
  env: { browser: true, node: true, es2020: true },

  /* 继承某些已有的规则 */
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // 添加 prettier 插件
  ],

  /* 指定如何解析语法 */
  parser: '@typescript-eslint/parser',

  /* 优先级低于 parse 的语法解析配置 */
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },

  /* 插件 */
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'react-refresh', 'simple-import-sort'],

  /**
   * 自定义规则
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    'react-refresh/only-export-components': 'warn',
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/ban-types': 'off', // 禁止使用特定类型
    '@typescript-eslint/no-non-null-assertion': 'off', // 不允许使用后缀运算符的非空断言(!)
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            // 以字母(或数字或下划线)或“@”后面跟着字母开头的东西,通常为内置模块引入
            '^@?\\w',
            // 内部导入 "@/"
            '^@(/.*|$)',
            `^@/assets$`,
            `^@/components$`,
            `^@/config$`,
            `^@/hooks$`,
            `^@/plugins$`,
            `^@/routers$`,
            `^@/store$`,
            `^@/styles$`,
            `^@/utils$`,
            // 父级导入. 把 `..` 放在最后.
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            // 同级导入. 把同一个文件夹.放在最后
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
            // 样式导入.
            '^.+\\.?(css|less|scss)$',
            // 带有副作用导入，比如import 'a.css'这种.
            '^\\u0000',
          ],
        ],
      },
    ],
    'simple-import-sort/exports': 'error', // 导出
    'import/order': 'off',
  },
};
```

根据项目实际情况，如果我们有额外的 ESLint 规则，也在此文件中追加。

`package.json` 文件中添加

```json
// package.json
"sricpts": {
  // ...
  "lint:eslint": "eslint \"{src}/**/*.{ts,tsx}\" --fix",
}

```

注意：VSCode 使用 ESLint 配置文件需要去插件市场下载插件 [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 。

#### 集成 Stylelint 配置

Stylelint 是一个强大的，现代的代码检查工具，与 ESLint 类似，Stylelint 能够通过定义一系列的编码风格规则帮助我们避免在样式表中出现错误。

- 提供默认的代码检查规则
- 提供 CLI 工具， 快速调用
- 通过插件支持 Sss Less PostCSS

1. 安装 Stylelint

::: code-group

```bash [pnpm]
pnpm add -D stylelint stylelint-config-recess-order stylelint-config-standard stylelint-less stylelint-prettier
```

```bash [yarn]
yarn add -D stylelint stylelint-config-recess-order stylelint-config-standard stylelint-less stylelint-prettier
```

```bash [npm]
npm install -D stylelint stylelint-config-recess-order stylelint-config-standard stylelint-less stylelint-prettier
```

:::

2. 创建 `.stylelintrc.js` 配置文件

```js
// @see: https://stylelint.io

module.exports = {
  root: true,

  /* 继承某些已有的规则 */
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-prettier/recommended', // 在 Stylelint 中集成 Prettier，使其成为 Stylelint 规则的一部分。
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
  ],

  plugins: ['stylelint-less', 'stylelint-prettier'], // 配置stylelint less拓展插件

  /* 自定义规则 */
  rules: {},
  // overrides: [
  //   // 若项目中存在less文件，添加以下配置
  //   {
  //     files: ['*.less', '**/*.less'],
  //     customSyntax: 'postcss-less',
  //   },
  // ],
};
```

`package.json` 文件中添加

```json
// package.json
"sricpts": {
  // ...
   "lint:stylelint": "stylelint --fix \"**/*.{less,postcss,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/",
}

```

注意：VSCode 使用 Stylelint 配置文件需要去插件市场下载插件 [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) 。

#### 解决 Prettier 和 ESLint 的冲突

通常大家会在项目中根据实际情况添加一些额外的 ESLint 和 Prettier 配置规则，难免会存在规则冲突情况。

解决两者冲突问题，需要用到 **eslint-plugin-prettier** 和 **eslint-config-prettier**。

- **eslint-plugin-prettier** 将 Prettier 的规则设置到 ESLint 的规则中。

- **eslint-config-prettier** 关闭 ESLint 中与 Prettier 中会发生冲突的规则。

最后形成优先级：Prettier 配置规则 > ESLint 配置规则。

- 安装插件

```bash
npm i eslint-plugin-prettier eslint-config-prettier -D
```

- 在 `.eslintrc.js` 添加 prettier 插件

```js
module.exports = {
  ...
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // 添加 prettier 插件
  ],

  plugins: ['react', '@typescript-eslint', 'react-hooks', 'react-refresh', 'simple-import-sort'],
  ...
}
```

这样，我们在执行 **eslint --fix** 命令时，ESLint 就会按照 Prettier 的配置规则来格式化代码，轻松解决二者冲突问题。

#### 集成 husky 和 lint-staged 对本地代码进行拦截检查

通过这两个工具配合操作，使用 husky 拦截 git 的一系列操作，监听到提交命令之后，然后交给 lint-staged 对本地提交的代码进行格式检查，检查通过则正常提交，不通过则提示错误信息，取消代码暂存。

> [husky](https://typicode.github.io/husky/#/) —— Git Hook 工具，可以设置在 git 各个阶段（pre-commit、commit-msg、pre-push 等）触发我们的命令。
> [lint-staged](https://github.com/okonet/lint-staged) —— 在 git 暂存的文件上运行 linters。

##### 配置 husky

- 自动配置（推荐）

使用 husky-init 命令快速在项目初始化一个 husky 配置。

::: code-group

```bash [pnpm]
pnpm dlx husky-init && pnpm install
```

```bash [yarn]
yarn dlx husky-init --yarn2 && yarn
```

```bash [npm]
npx husky-init && npm install
```

:::

它会：

1. 添加 prepare 脚本到 package.json
2. 创建一个 pre-commit 可以编辑的示例挂钩（默认情况下，npm test 将在提交时运行）
3. 配置 Git 钩子路径

:::tip
注意这里的 husky 需要安装版本 8，版本 9 不再支持自动创建钩子文件。
:::

##### 配置 lint-staged

lint-staged 这个工具一般结合 husky 来使用，它可以让 husky 的 hook 触发的命令只作用于 git add 那些文件（即 git 暂存区的文件），而不会影响到其他文件。

接下来，我们使用 lint-staged 继续优化项目。

1. 安装 lint-staged

::: code-group

```bash [pnpm]
pnpm add -D lint-staged
```

```bash [yarn]
yarn add -D lint-staged
```

```bash [npm]
npm install -D lint-staged
```

:::

2. 在 `package.json` 里增加 **lint-staged** 配置项

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": [
    "prettier --write--parser json"
  ],
  "package.json": [
    "prettier --write"
  ],
  "*.{scss,less,styl}": [
    "stylelint --fix",
    "prettier --write"
  ],
  "*.md": [
    "prettier --write"
  ]
},
```

3. 修改 **.husky/pre-commit** hook 的触发命令为：**pnpm exec lint-staged**

### 提交规范

前面我们已经统一代码规范，并且在提交代码时进行强约束来保证仓库代码质量。多人协作的项目中，在提交代码这个环节，也存在一种情况：不能保证每个人对提交信息的准确描述，因此会出现提交信息紊乱、风格不一致的情况。

如果 git commit 的描述信息精准，在后期维护和 Bug 处理时会变得有据可查，项目开发周期内还可以根据规范的提交信息快速生成开发日志，从而方便我们追踪项目和把控进度。

#### 集成 commitlint 验证提交规范

尽管制定了规范，但在多人协作的项目中，总有些人依旧我行我素，因此提交代码这个环节，我们也增加一个限制：只让符合 Angular 规范的 commit message 通过，我们借助 @commitlint/config-conventional 和 @commitlint/cli 来实现。

##### 安装 commitlint

安装 **@commitlint/config-conventional** 和 **@commitlint/cli**

::: code-group

```bash [pnpm]
pnpm add -D @commitlint/config-conventional @commitlint/cli
```

```bash [yarn]
yarn add -D @commitlint/config-conventional @commitlint/cli
```

```bash [npm]
npm install -D @commitlint/config-conventional @commitlint/cli
```

:::

##### 配置 commitlint

- 在项目根目录下创建 `commitlint.config.ts` 文件，并填入以下内容：

```js
module.exports = { extends: ['@commitlint/config-conventional'] };
```

或直接使用快捷命令：

```bash
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.ts
```

- 使用 husky 的 **commit-msg** hook 触发验证提交信息的命令

我们使用 husky 命令在 .husky 目录下创建 commit-msg 文件，并在此执行 commit message 的验证命令。

```bash
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

:::tip
这里的快捷命令必须是 husky8 才支持的，新版本移除了这个命令。
:::

### 最后

本文从技术选项到架构搭建、从代码规范约束到提交信息规范约束，一步一步带领大家如何从一个最简单的前端项目骨架到规范的前端工程化环境，基本涵盖前端项目开发的整个流程。
