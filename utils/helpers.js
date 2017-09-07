export function toArray (obj) {
  return obj === null ? [] : Object.keys(obj)
    .map((key) => obj[key])
}