/**
 * @jest-environment jsdom
 */
import { JSDOM } from 'jsdom';
import { renderHook, act } from '@testing-library/react-hooks';
import { useSearch } from 'es/useSearch';

describe('useSearch', () => {
  let jsdom;

  beforeEach(() => {
    jsdom = new JSDOM('http://localhost:3000');
  });

  afterEach(() => {
    jsdom.window.close();
    jsdom = null;
  });

  it('should return an object with getSearch and setSearch functions', () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current).toHaveProperty('getSearch');
    expect(result.current).toHaveProperty('setSearch');
  });

  it('should return an empty object when URL has no query parameters', () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.getSearch()).toEqual({});
  });

  it('should return the correct query parameters when URL has query parameters', () => {
    window.history.replaceState({}, '', '?foo=bar&baz=qux');
    // jsdom.reconfigure({ url: 'http://localhost:3000?foo=bar&baz=qux' });

    const { result } = renderHook(() => useSearch());

    expect(result.current.getSearch()).toEqual({
      foo: 'bar',
      baz: 'qux',
    });
  });

  it('should update URL with new query parameters when calling setSearch', () => {
    window.history.replaceState({}, '', '');
    // jsdom.reconfigure({ url: 'http://localhost:3000' });

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearch('foo', 'bar');
    });

    expect(window.location.search).toEqual(expect.stringContaining('foo=bar'));
  });

  it('should merge new query parameters with existing ones when calling setSearch multiple times', () => {
    window.history.replaceState({}, '', '');
    // jsdom.reconfigure({ url: 'http://localhost:3000' });

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearch('foo', 'bar');
      result.current.setSearch('baz', 'qux');
    });

    expect(window.location.search).toMatch(/foo=bar.*baz=qux|baz=qux.*foo=bar/);
  });

  it('should match the last value when setting the same key multiple times', () => {
    window.history.replaceState({}, '', '');
    // jsdom.reconfigure({ url: 'http://localhost:3000' });

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearch('foo', 'bar');
      result.current.setSearch('foo', 'qux');
    });

    expect(window.location.search).toEqual(expect.stringContaining('foo=qux'));
    expect(window.location.search).not.toEqual(expect.stringContaining('foo=bar'));
  });

  it('should skip null or undefined values when calling setSearch', () => {
    window.history.replaceState({}, '', '?foo=bar&baz=qux');
    // jsdom.reconfigure({ url: 'http://localhost:3000?foo=bar&baz=qux' });

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearch('foo', undefined);
      result.current.setSearch('baz', null);
    });

    expect(window.location.search).toEqual(expect.not.stringMatching(/foo=.*|baz=.*/));
  });

  it('should update the query parameters when the URL changes', () => {
    window.history.replaceState({}, '', '?foo=bar');
    // jsdom.reconfigure({ url: 'http://localhost:3000?foo=bar' });

    const { result, rerender } = renderHook(() => useSearch());

    expect(result.current.getSearch()).toEqual({
      foo: 'bar',
    });

    window.history.replaceState({}, '', '?baz=qux');

    rerender();

    expect(result.current.getSearch()).toEqual({
      baz: 'qux',
    });
  });

  it('should not call window.history.replaceState if setSearch does not change window.location.search', () => {
    window.history.replaceState({}, '', '?baz=qux');
    // jsdom.reconfigure({ url: 'http://localhost:3000?baz=qux' });

    const { result } = renderHook(() => useSearch());

    const initialSearch = window.location.search;

    act(() => {
      result.current.setSearch('foo', 'bar');
      result.current.setSearch('baz', 'qux');
    });

    expect(window.location.search).not.toEqual(initialSearch);

    const spy = jest.spyOn(window.history, 'replaceState');

    const unchangedSearch = window.location.search;
    act(() => {
      result.current.setSearch('foo', 'bar');
    });

    expect(spy).not.toHaveBeenCalled();
    expect(window.location.search).toEqual(unchangedSearch);
  });
});