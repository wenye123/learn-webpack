编写一个vue相关的模板配置
编写一个loader

学习webpack好处

- 学习一种理念
- 下次出问题知道怎么解决
- 可以webpack基础上自己编写插件等工具 提高效率

- 研究style-loader 和 css-loader写法
  编写一个plugin

### 观念更新

- webpack默认是可以打包js和json 而不需要额外的loader
- publicPath可以通过运行时赋值 -- 不能针对index.html生效 毫无卵用
- 可以通过webpack init初始化配置文件 -- 没啥卵用
- 默认打包格式就是iife

## vscode

- vscode开启保存自动格式化

### 需要安装的vscode插件

- stylelint
  - 默认不支持scss需要修改配置
- prettier
- eslint
- prettier-eslint
- editorconfig
- volar

### commit相关

```bash
// 添加格式化命令
npm pkg set scripts.format="prettier --write \"src/**/*\" --ignore-unknown"
npm run format

// 使用commitlint是因为vscode直接编写会绕过去
pnpm i -D commitizen cz-conventional-changelog husky lint-staged @commitlint/cli @commitlint/config-conventional commit-and-tag-version
npx husky install
npm pkg set scripts.prepare="husky install"
npx husky add .husky/pre-commit "npx lint-staged --allow-empty && git add -A"
npx husky add .husky/prepare-commit-msg "exec < /dev/tty && npx git-cz --hook || true"
npx husky add .husky/commit-msg "npx commitlint -e $HUSKY_GIT_PARAMS"

package.json
{
  "lint-staged": {
    "src/**/*": "prettier --write --ignore-unknown"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}

commitlint.config.js
module.exports = {
  extends: ["@commitlint/config-conventional"],
};
```

## 运行方式

```bash
pnpm i

因为对commit message有限制 提交代码请采用命令行方式提交git commit -m "test"
```
