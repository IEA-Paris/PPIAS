export default (text) => {
  // fix footnotes
  const regex = /\\\[\^(\d|\d\d|\d\d\d)\\\]/gi
  return text.replace(regex, '[^$1]')

  // fix padded strings
  /*   const regex2 = /: '([a-zA-ZàáäâèéëêìíïîòóöôùúüûñÉç()-]*) '/gi
  return text.replace(regex, ": '$1'") */
}
