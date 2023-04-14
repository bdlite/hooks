import { useCallback } from 'react'
import queryString from 'query-string'

export function useSearch() {
  const searchList = [] // 同一组件连续调用的缓冲区

  const getSearch = useCallback(() => queryString.parse(window.location.search), [ window.location.search ])

  const setSearch = useCallback((key, value = null) => {
    const search = getSearch()

    if (search[key] === `${value}` || typeof key !=='string') return

    searchList.push({ [key]: value })

    const nextSearchData = { ...search, ...searchList.reduce((before, current) => ({ ...before, ...current }), {}) }
    const nextSearch = queryString.stringify(nextSearchData, { skipNull: true })

    window.history.replaceState(queryString.parse(nextSearch), '', `?${nextSearch}`)
  }, [ getSearch, window.history ])

  return { getSearch, setSearch }
}