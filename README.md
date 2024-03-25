## webpack配置模板

手动配置webpack和各种格式化 commit lint工具

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

// package.json
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

// commitlint.config.js
module.exports = {
  extends: ["@commitlint/config-conventional"],
};

// 运行
pnpm i

因为对commit message有限制 提交代码请采用命令行方式提交git commit -m "test"
```
