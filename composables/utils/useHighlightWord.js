import { highlight } from '~/assets/utils/transforms'

export default function useHighlightWord (text) {
  const highlightWord = (word = '') => text ? highlight(word, text || '') : word

  return { highlightWord }
}