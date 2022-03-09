import { Editor, Extension } from '@tiptap/core'
import { EditorView } from 'prosemirror-view'
import { Plugin, PluginKey } from 'prosemirror-state'
import { BrickdocEventBus, FormulaEditorHoverEventTrigger, FormulaKeyboardEventTrigger } from '@brickdoc/schema'
import { CodeFragment } from '@brickdoc/formula'

export type KeyDownHandlerType = (view: EditorView<any>, event: KeyboardEvent) => boolean
export type HandleKeyDownType = ({
  formulaId,
  rootId
}: {
  formulaId: string | undefined
  rootId: string | undefined
}) => Extension<any, any>

const formulaHandleKeyDown: ({
  formulaId,
  rootId
}: {
  formulaId: string | undefined
  rootId: string | undefined
}) => KeyDownHandlerType = ({ formulaId, rootId }) => {
  return (view, event) => {
    const key = event.key

    if (['Enter', 'Tab', 'ArrowUp', 'ArrowDown'].includes(key)) {
      if (rootId && formulaId) {
        BrickdocEventBus.dispatch(
          FormulaKeyboardEventTrigger({ key, formulaId, rootId, isEditor: true, completionIndex: -1 })
        )
      }
      return true
    }

    return false
  }
}

const gapHoverHandler = ({
  view,
  position,
  formulaId,
  rootId
}: {
  editor: Editor
  view: EditorView
  position: number
  event: MouseEvent
  formulaId: string
  rootId: string
}): void => {
  if (!formulaId || !rootId) return
  // if (!(event.target as HTMLElement)?.classList.contains('ProseMirror')) {
  //   return
  // }

  if (position - 1 < 0) {
    // BrickdocEventBus.dispatch(FormulaEditorHoverEventTrigger({ attrs: undefined, formulaId, rootId }))
    return
  }
  const node = view.state.doc.nodeAt(position)
  if (!node) {
    BrickdocEventBus.dispatch(FormulaEditorHoverEventTrigger({ attrs: undefined, formulaId, rootId }))
    return
  }

  const mark = node.marks[0]

  if (!mark) return

  if (mark.type.name !== 'FormulaType') return

  const { attrs } = mark.attrs as CodeFragment
  // if (!['Spreadsheet', 'Column', 'Variable', 'Block'].includes(code)) return

  BrickdocEventBus.dispatch(FormulaEditorHoverEventTrigger({ attrs, formulaId, rootId }))
}

export const HandleKeyDownExtension = Extension.create({
  name: 'handleKeyDown',

  addProseMirrorPlugins() {
    const {
      options: { formulaId, rootId },
      editor
    } = this

    return [
      new Plugin({
        key: new PluginKey('handleKeyDown'),
        props: {
          handleKeyDown: formulaHandleKeyDown({ formulaId, rootId }),
          handleClick(view, position, event) {
            gapHoverHandler({ editor, view, position, event, formulaId, rootId })
            return false
          },
          handleDOMEvents: {
            mouseover(view, event) {
              const position = view.posAtDOM(event.target as Node, 0)
              // console.log({ view, event, position })
              // TODO num1 + 1 bug
              gapHoverHandler({ editor, view, position, event, formulaId, rootId })
              return false
            },
            mouseleave(view, event) {
              BrickdocEventBus.dispatch(FormulaEditorHoverEventTrigger({ attrs: undefined, formulaId, rootId }))
              return false
            }
          }
        }
      })
    ]
  }
})
