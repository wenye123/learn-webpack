编写一个vue相关的模板配置
编写一个loader

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

pnpm i -D commitizen cz-conventional-changelog husky lint-staged
npx husky install
npm pkg set scripts.prepare="husky install"
npx husky add .husky/pre-commit "npx lint-staged && git add -A && npx git-cz"

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
```
