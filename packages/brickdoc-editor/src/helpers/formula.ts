import { CodeFragment } from '@brickdoc/formula'
import { JSONContent } from '@tiptap/core'

export const buildJSONContentByDefinition = (definition: string | undefined): JSONContent | undefined => {
  if (!definition) {
    return undefined
  }

  return buildJSONContentByArray([{ type: 'text', text: definition }])
}

export const maybeRemoveDefinitionEqual = (definition: string | undefined, formulaIsNormal: boolean): string => {
  if (!definition) {
    return ''
  }

  if (!formulaIsNormal) {
    return definition
  }

  if (definition.startsWith('=')) {
    return definition.substring(1)
  }

  return definition
}

export const maybeRemoveCodeFragmentsEqual = (
  codeFragments: CodeFragment[] | undefined,
  formulaIsNormal: boolean
): CodeFragment[] => {
  if (!codeFragments?.length) {
    return []
  }

  if (!formulaIsNormal) {
    return codeFragments
  }

  const firstCodeFragment = codeFragments[0]

  if (firstCodeFragment.code === 'Equal') {
    // HACK: parse `===`
    const secondCodeFragment = codeFragments[1]
    if (secondCodeFragment && secondCodeFragment.code === 'Equal2' && firstCodeFragment.display === '') {
      return [{ ...secondCodeFragment, display: '=' }, ...codeFragments.slice(2)]
    }
    return codeFragments.slice(1)
  }

  return codeFragments
}

export const buildJSONContentByArray = (content: JSONContent[]): JSONContent => {
  return { type: 'doc', content: [{ type: 'paragraph', content }] }
}

export const fetchJSONContentArray = (content: JSONContent | undefined): JSONContent[] => {
  return content?.content?.[0]?.content ?? []
}

export const codeFragmentsToJSONContentTotal = (codeFragments: CodeFragment[] | undefined): JSONContent | undefined => {
  if (!codeFragments) return undefined
  if (codeFragments.length === 0) return undefined

  return buildJSONContentByArray(codeFragmentsToJSONContentArray(codeFragments))
}

export const codeFragmentsToJSONContentArray = (codeFragments: CodeFragment[]): JSONContent[] => {
  const result: JSONContent[] = []

  codeFragments.forEach(codeFragment => {
    const attr = attrsToJSONContent(codeFragment)
    if (codeFragment.display) {
      result.push(attr)
    }
  })

  return result
}

export const attrsToJSONContent = (attrs: CodeFragment): JSONContent => {
  return { type: 'text', text: attrs.display, marks: [{ type: 'FormulaType', attrs }] }
}

export const positionBasedContentArrayToInput = (
  content: JSONContent[],
  position: number,
  pageId: string
): { prevText: string; nextText: string } => {
  const prevTexts: string[] = []
  const nextTexts: string[] = []
  let input = ''
  let firstTime = true

  content.forEach((c: JSONContent, idx) => {
    const text = JSONContentToText(c)
    const display = c.text ?? ''
    input = input.concat(display)
    if (!firstTime) {
      nextTexts.push(text)
      return
    }

    if (input.length <= position) {
      prevTexts.push(text)
      return
    }

    firstTime = false
    const nextSize = input.length - position
    const prevSize = text.length - nextSize
    const prevText = text.substring(0, prevSize)
    const nextText = text.substring(prevSize)
    if (display.includes(prevText) || !prevText.endsWith('.')) {
      prevTexts.push(prevText)
      nextTexts.push(nextText)
    } else if (nextSize <= display.length) {
      const prevDisplaySize = display.length - nextSize
      const prevDisplayText = display.substring(0, prevDisplaySize)
      const nextDisplayText = display.substring(prevDisplaySize)
      prevTexts.push(prevDisplayText)
      nextTexts.push(nextDisplayText)
    } else {
      nextTexts.push(text)
    }
  })

  // console.log('debug position', { prevTexts, nextTexts, input, position, content })
  return { prevText: prevTexts.join(''), nextText: nextTexts.join('') }
}

export const contentArrayToInput = (content: JSONContent[], pageId: string): string => {
  const input = content.map((c: JSONContent) => JSONContentToText(c)).join('') ?? ''
  // console.log('contentArrayToInput', { content, input })
  return input
}

const JSONContentToText = (c: JSONContent): string => {
  return c.text ?? ''
}
