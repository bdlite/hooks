# useSearch

useSearch 是一个自定义 Hook，用于获取和设置 URL 中的查询参数。

## 返回值

useSearch 返回一个对象，包含以下两个属性：

### getSearch()

getSearch 是一个函数，用于获取当前 URL 中的查询参数。它返回一个对象，包含当前 URL 中的所有查询参数。

### setSearch(key: string, value: any)

setSearch 是一个函数，用于设置 URL 中的查询参数。它接受两个参数：

- key：要设置的查询参数的名称。
- value：要设置的查询参数的值。如果不传入该参数，则会将该查询参数的值设为 null。

如果 key 或 value 的类型不是字符串，则 setSearch 不会执行任何操作。

## 示例

```js
import { useSearch } from '@bdlite/hooks/es/useSearch'

function MyComponent() {
  const { getSearch, setSearch } = useSearch()

  const handleButtonClick = () => {
    setSearch('page', 2)
  }

  return (
    <div>
      <p>当前 URL 中的查询参数：</p>
      <pre>{JSON.stringify(getSearch(), null, 2)}</pre>
      <button onClick={handleButtonClick}>设置查询参数</button>
    </div>
  )
}
```
