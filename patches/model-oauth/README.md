# DSH 模型 OAuth 补丁

在官方 DeepSeek Harness 的干净 checkout 中执行（将 P 指向本目录的绝对路径）：

```sh
git switch -c local/model-oauth "$(cat "$P/BASE")"
git am --3way "$P"/000*.patch
```

按文件名顺序应用两个提交。第一个升级 pi-ai 并更新 pnpm 依赖补丁；第二个添加 OAuth 登录和模型设置集成。应用后按 DSH 仓库说明安装依赖并构建。

试用新版上游时，从新版提交创建临时分支，重新执行 git am。若有冲突，解决后 git add 并执行 git am --continue，或用 git am --abort 撤销。验证后从新基线重新导出补丁并更新 BASE。
