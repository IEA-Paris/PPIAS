export const email =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// eslint-disable-next-line no-misleading-character-class
export const alpha =
  // eslint-disable-next-line no-misleading-character-class
  /^[-' a-zA-ZàâéêèìôùûçáéíóúäëïöüÄ'陳大文łŁőŐűŰZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹßÇŒÆČŠŽ.âê都道府県Федерацииআবাসযোগ্য জমির걸쳐 있는]*$/

export const url =
  // eslint-disable-next-line no-useless-escape
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
export const isValidPassword =
  // eslint-disable-next-line no-useless-escape
  /^(?=.*[a-z]){1,}(?=.*[A-Z]){1,}(?=.*[0-9]){1,}.{8,}$/
// eslint-disable-next-line no-useless-escape
// eslint-disable-next-line prefer-regex-literals
export const isValidCode = new RegExp('(^d{6})')
export const ytUrl =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/
