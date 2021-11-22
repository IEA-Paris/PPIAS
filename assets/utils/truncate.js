export default (str, num) => {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}
