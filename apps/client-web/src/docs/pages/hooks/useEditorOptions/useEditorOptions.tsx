import { Node } from 'prosemirror-model'
import { EditorOptions } from '@brickdoc/editor'
import { Block } from '@brickdoc/schema'
import { DocMeta } from '@/docs/store/DocMeta'
import { useMentionCommands } from './useMentionCommands'
import { useEmbed } from './useEmbed'
import { useReactiveVar } from '@apollo/client'
import { FormulaContextVar } from '@/docs/reactiveVars'
import { useCallback, useMemo } from 'react'
import { PageTree } from '@/docs/common/components/PageTree'
import { blockProvider } from '../useBlockSyncProvider'

export interface UseEditorOptions {
  docMeta: DocMeta
  blocks: Block[]
  documentEditable: boolean
  provider: blockProvider | undefined
  onDocSave: (doc: Node) => Promise<void>
}

export function useEditorOptions({
  docMeta,
  documentEditable,
  blocks,
  provider,
  onDocSave
}: UseEditorOptions): EditorOptions {
  const embed = useEmbed(blocks, docMeta)
  const formulaContext = useReactiveVar(FormulaContextVar)
  const mentionCommands = useMentionCommands(docMeta)
  const renderView = useCallback(() => <PageTree mode="subPage" />, [])

  return useMemo(
    () => ({
      base: {
        collaboration: provider ? { document: provider.document } : false,
        collaborationCursor: provider
          ? {
              provider,
              user: {
                name: globalThis.brickdocContext.currentUser?.name,
                operatorId: globalThis.brickdocContext.uuid
              }
            }
          : false,
        embed,
        formula: {
          formulaContext
        },
        mentionCommands,
        pageLink: {
          pages: mentionCommands.pages
        },
        subPageMenu: {
          renderView
        },
        sync: {
          onSave: onDocSave
        }
      },
      editable: documentEditable
    }),
    [documentEditable, embed, formulaContext, mentionCommands, onDocSave, renderView, provider]
  )
}
