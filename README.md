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
  return paths.join('/').replace(/(\/\/) | (\/\/\/)/g, '/')
}
```

在 package.json 中，imports 和 exports 是不同的概念：

    exports: 用于定义模块的导出路径，当你的包被其他项目使用时，它们将通过这些路径访问模块。exports 是用于管理对外暴露的 API。

    imports: 用于定义包内部模块的路径别名。imports 允许你为模块的导入路径创建别名，以便在包的内部使用。

Base/Root Directory in package.json 中没有明确的 baseURL 设置。路径解析通常是以 package.json 文件所在的目录为根目录。
