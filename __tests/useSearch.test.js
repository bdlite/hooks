/**
 * @jest-environment jsdom
 */
import { JSDOM } from 'jsdom';
import { renderHook, act } from '@testing-library/react-hooks';
import { useSearch } from 'es/useSearch';

describe('useSearch', () => {
  const { window } = new JSDOM();
//   let jsdom;

//   beforeEach(() => {
//     jsdom = new JSDOM();

//     global.window = jsdom.window;
//     global.document = jsdom.window.document;
//   });

//   afterEach(() => {
//     jsdom.window.close();
//     jsdom = null;
//     global.window = null;
//     global.document = null;
//   });


  it('should return an object with getSearch and setSearch functions', () => {
    const { result } = renderHook(() => useSearch())

    expect(result.current).toHaveProperty('getSearch')
    expect(result.current).toHaveProperty('setSearch')
  })

  it('should return an empty object when URL has no query parameters', () => {
    const { result } = renderHook(() => useSearch())

    expect(result.current.getSearch()).toEqual({})
  })

  it('should return the correct query parameters when URL has query parameters', () => {
    const { result } = renderHook(() => useSearch())
    
    window.history.replaceState({}, '', '?foo=bar&baz=qux')

    expect(result.current.getSearch()).toEqual({
      foo: 'bar',
      baz: 'qux',
    })
  })

  it('should update URL with new query parameters when calling setSearch', () => {
    const { result } = renderHook(() => useSearch())

    act(() => {
      result.current.setSearch('foo', 'bar')
    })

    expect(window.location.search).toEqual(expect.stringContaining('foo=bar'))
  })

  it('should merge new query parameters with existing ones when calling setSearch multiple times', () => {
    const { result } = renderHook(() => useSearch())

    act(() => {
      result.current.setSearch('foo', 'bar')
      result.current.setSearch('baz', 'qux')
    })

    expect(window.location.search).toMatch(/foo=bar.*baz=qux|baz=qux.*foo=bar/)
  })

  it('should match the last value when setting the same key multiple times', () => {
    const { result } = renderHook(() => useSearch())
  
    act(() => {
      result.current.setSearch('foo', 'bar')
      result.current.setSearch('foo', 'qux')
    })
  
    expect(window.location.search).toEqual(expect.stringContaining('foo=qux'))
    expect(window.location.search).not.toEqual(expect.stringContaining('foo=bar'))
  })

  it('should skip null or undefined values when calling setSearch', () => {
    const { result } = renderHook(() => useSearch())

    act(() => {
      result.current.setSearch('foo', undefined)
      result.current.setSearch('baz', null)
    })

    expect(window.location.search).toEqual(expect.not.stringMatching(/foo=.*|baz=.*/))
  });

  it('should update the query parameters when the URL changes', () => {
    // 设置 URL 中的初始查询参数
    window.history.replaceState({}, '', '?foo=bar');
  
    // 渲染使用 useSearch hook 的组件
    const { result, rerender } = renderHook(() => useSearch())
  
    // 验证 hook 返回正确的初始查询参数
    expect(result.current.getSearch()).toEqual({
      foo: 'bar',
    })
  
    // 更改 URL 中的查询参数
    window.history.replaceState({}, '', '?baz=qux')
  
    // 重新渲染组件
    rerender()
  
    // 验证 hook 返回更新后的查询参数
    expect(result.current.getSearch()).toEqual({
      baz: 'qux',
    })
  })

  it('should not call window.history.replaceState if setSearch does not change window.location.search', () => {
    // 设置 URL 中的初始查询参数
    window.history.replaceState({}, '', '?baz=qux')
  
    const { result } = renderHook(() => useSearch())

    // 获取初始的 window.location.search 值
    const initialSearch = window.location.search

    act(() => {
      result.current.setSearch('foo', 'bar')
      result.current.setSearch('baz', 'qux')
    })

    // 验证 setSearch 调用后 window.location.search 值是否改变
    expect(window.location.search).not.toEqual(initialSearch)

    // 监视 window.history.replaceState 方法
    const spy = jest.spyOn(window.history, 'replaceState')

    // 模拟 setSearch 调用后 window.location.search 值未改变
    const unchangedSearch = window.location.search
    act(() => {
      result.current.setSearch('foo', 'bar')
    })

    // 验证 window.history.replaceState 是否未被调用
    expect(spy).not.toHaveBeenCalled()
    expect(window.location.search).toEqual(unchangedSearch)

    // 模拟第二次调用 setSearch 后 window.location.search 值未改变
    act(() => {
      result.current.setSearch('baz', 'qux')
    })

    // 验证 window.history.replaceState 是否未被调用
    expect(spy).not.toHaveBeenCalled()
    expect(window.location.search).toEqual(unchangedSearch)
  })
});