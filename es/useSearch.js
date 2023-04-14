import _defineProperty from "@babel/runtime/helpers/defineProperty";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import { useCallback } from 'react';
import queryString from 'query-string';
export function useSearch() {
  var searchList = []; // 同一组件连续调用的缓冲区

  var getSearch = useCallback(() => queryString.parse(window.location.search), [window.location.search]);
  var setSearch = useCallback(function (key) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var search = getSearch();
    if (search[key] === "".concat(value) || typeof key !== 'string') return;
    searchList.push({
      [key]: value
    });
    var nextSearchData = _objectSpread(_objectSpread({}, search), searchList.reduce((before, current) => _objectSpread(_objectSpread({}, before), current), {}));
    var nextSearch = queryString.stringify(nextSearchData, {
      skipNull: true
    });
    window.history.replaceState(queryString.parse(nextSearch), '', "?".concat(nextSearch));
  }, [getSearch, window.history]);
  return {
    getSearch,
    setSearch
  };
}