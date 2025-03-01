```js
function flattenRoutes(
  routes,
  branches = [],
  parentsMeta = [],
  parentPath = []
) {}

/**
 * ['/user', '/add']
 * ['/user/', '/add']
 * ['/user', 'add']
 */

function joinPath(paths) {
  return paths.replace(/(\/\/)/g, '/').join('/')
}
```

update tar checksums and drop yarn, migrate to bun
```bash
bunx yarn --update-checksums
# remove all yarn config 
$HOME/.yarnrc
.config/yarn/global
# checksum file
$HOME/.yarn.lock
```


set directory ownership and file permission for zsh tab completion to work
```bash
# setting the current user as the owner of dir
compaudit | xargs chown -R "$(whoami)
# removing write permissions for group/others for the files in cause:
compaudit | xargs chmod go-w
```



eslint 
tslint
prettier
lint-staged
pre-commit hooks
commitlint


```bash
bun add -D eslint typescript-eslint prettier 
bun add -D simple-git-hooks lint-staged
```


eslint-config-prettier to use any ESLint config 
you want and turn off all rules that may conflict with Prettier