
## Usage

You can now consume the action by referencing the v1 branch
npx aglio -i hello.apib --theme-variables slate --theme-template triple -o hello.html
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
```

See the [actions tab](https://github.com/actions/api-documentation-action/actions) for runs of this action! :rocket:
