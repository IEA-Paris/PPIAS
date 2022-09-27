export default (text) => {
  const regex = /\\\[\^(\d|\d\d|\d\d\d)\\\]/gi
  return text.replace(regex, '[^$1]')
}
