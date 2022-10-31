
## 📜 API-DOCUMENTATION

[![units-test](https://github.com/betrybe/api-documentation-action/actions/workflows/test.yml/badge.svg)](https://github.com/betrybe/api-documentation-action/actions/workflows/test.yml)

### ⚙️ Usage

```yaml
uses: actions/api-documentation-action@v1
with:
  owner: 'my-org'
  repo: 'my-repo'
  ref: 'my-branch'
  token: 'my-pat'
  targetOwner: 'my-target-owner'
  targetRepo: 'my-target-repo'
  targetRef: 'my-target-ref'
  targetWorkflowId: 'main.yml'
  themeVariables: 'default'
  themeTemplate: 'default'
```

### 🖼️ Themes available

- Default theme [two column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/danielgtaylor/aglio/blob/master/examples/default.html) or [three column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/danielgtaylor/aglio/blob/master/examples/default-triple.html)
- Streak theme [two column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/danielgtaylor/aglio/blob/master/examples/streak.html) or [three column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/danielgtaylor/aglio/blob/master/examples/streak-triple.html)
- Flatly theme [two column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/danielgtaylor/aglio/blob/master/examples/flatly.html) or [three column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/danielgtaylor/aglio/blob/master/examples/flatly-triple.html)
- Cyborg theme [two column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/danielgtaylor/aglio/blob/master/examples/cyborg.html) or [three column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/danielgtaylor/aglio/blob/master/examples/cyborg-triple.html)
- Slate theme [two column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/danielgtaylor/aglio/blob/master/examples/slate.html) or [three column](http://htmlpreview.github.io/?https://raw.githubusercontent.com/danielgtaylor/aglio/blob/master/examples/slate-triple.html)
  - Ex: 
  ```yaml
    themeVariables: 'slate' # theme name
    themeTemplate: 'triple' # number of columns [two or triple] Default: 'two'
  ```

#### 🪖 Full command
```shell
npx aglio -i hello.apib --theme-variables slate --theme-template triple -o hello.html
```