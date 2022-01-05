import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { SubPageMenuBlock } from '../../components'
import { insertBlockAt } from '../../helpers/commands'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    subPageMenu: {
      /**
       * Set a subPage menu block
       */
      setSubPageMenuBlock: () => ReturnType
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SubPageMenuBlockOptions {}

export const SubPageMenuBlockExtension = Node.create<SubPageMenuBlockOptions>({
  name: 'subPageMenuBlock',

  group: 'block',

  selectable: false,

  allowGapCursor: false,

  parseHTML() {
    return [
      {
        tag: 'sub-page-menu-block'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['sub-page-menu-block', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(SubPageMenuBlock)
  },

  addCommands() {
    return {
      setSubPageMenuBlock:
        () =>
        ({ chain }) => {
          return insertBlockAt({ type: this.name }, chain)
        }
    }
  }
})