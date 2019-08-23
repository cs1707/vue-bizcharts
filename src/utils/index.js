export const debounce = (func, time) => {
  let timeoutId
  const debounceFunc = (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...args)
    }, time)
  }

  debounceFunc.cancel = () => {
    clearTimeout(timeoutId)
  }

  return debounceFunc
}

export const omit = (obj, props = []) => {
  const result = { ...obj }
  props.forEach(key => {
    delete result[key]
  })
  return result
}

export default {
  debounce,
  omit
}
