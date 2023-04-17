import { useCallback } from 'react'
import { parse, stringify } from 'query-string'

export function useSearch() {
  const searchList = [] // 同一组件连续调用的缓冲区

  const getSearch = useCallback(() => parse(window.location.search), [ window.location.search ])

  const setSearch = useCallback((key, value = null) => {
    const val = `${value}`
    const search = getSearch()

    if (search[key] === val) return

    if (typeof key !=='string' || value === null) return

    searchList.push({ [key]: val })

    const nextSearchData = { ...search, ...searchList.reduce((before, current) => ({ ...before, ...current }), {}) }
    const nextSearch = stringify(nextSearchData, { skipNull: true })

    if (nextSearch) {
      window.history.replaceState(parse(nextSearch), '', `?${nextSearch}`)
    }
  }, [ getSearch, window.history ])

  return { getSearch, setSearch }
}