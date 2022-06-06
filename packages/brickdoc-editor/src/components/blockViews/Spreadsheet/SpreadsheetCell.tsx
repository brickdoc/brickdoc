import React from 'react'

import { BrickdocEventBus, BlockInput, SpreadsheetUpdateCellValue, FormulaEditorSavedTrigger } from '@brickdoc/schema'
import { FormulaBlockRender, useFormula, UseFormulaInput } from '../FormulaView'
import {
  columnDisplayIndex,
  displayValue,
  dumpDisplayResultForDisplay,
  fetchResult,
  SpreadsheetReloadViaId,
  VariableDisplayData,
  VariableInterface
} from '@brickdoc/formula'
import { SpreadsheetContext } from './SpreadsheetContext'
import { devLog } from '@brickdoc/design-system'
import { useEditorPropsContext } from '../../../hooks/useEditorPropsContext'
import { FormulaDisplay } from '../../ui/Formula'

export interface SpreadsheetCellProps {
  context: SpreadsheetContext
  block: BlockInput
  rowIdx: number
  columnSort: number
  columnTitle: string | undefined
  tableId: string
  saveBlock: (block: BlockInput) => void
  width?: number
  height?: number
}

export const SpreadsheetCell: React.FC<SpreadsheetCellProps> = ({
  context,
  tableId,
  block,
  rowIdx,
  columnSort,
  columnTitle,
  saveBlock,
  width,
  height
}) => {
  const editorProps = useEditorPropsContext()
  const formulaContext = editorProps.formulaContext
  const rootId = editorProps.rootId
  const minHeight = height ? height - 3 : undefined

  const [currentBlock, setCurrentBlock] = React.useState(block)
  const rowId = block.parentId as string
  const columnId = block.data.columnId

  const cellId = `${rowId},${columnId}`
  const formulaId = currentBlock.data.formulaId
  const formulaName = `Cell_${rowId}_${columnId}`.replaceAll('-', '')

  const editing = context?.editingCellId === formulaName
  const [editingCell, setEditingCell] = React.useState(editing)
  const { setEditingCellId } = context
  const setEditing = React.useCallback(
    (newEditing: boolean) => {
      if (newEditing) {
        setEditingCellId(formulaName)
      } else if (editing) {
        setEditingCellId('')
      }
      setEditingCell(newEditing)
    },
    [setEditingCellId, formulaName, editing]
  )

  const onUpdateFormula = React.useCallback(
    (variable: VariableInterface | undefined): void => {
      if (!variable) return
      // TODO check no persist
      const value = displayValue(fetchResult(variable.t), rootId, true)
      const oldValue = block.text
      if (value === oldValue) return
      devLog('Spreadsheet cell formula updated', { cellId, value })
      const newBlock = { ...block, text: value }
      setCurrentBlock(newBlock)
      saveBlock(newBlock)

      BrickdocEventBus.dispatch(
        SpreadsheetReloadViaId({
          id: tableId,
          scope: {
            rows: [String(rowIdx + 1), rowId],
            columns: [block.data.columnId, columnDisplayIndex(columnSort), ...(columnTitle ? [columnTitle] : [])]
          },
          meta: null,
          namespaceId: rootId,
          key: variable?.currentUUID ?? tableId
        })
      )
      // console.log('dispatch update cell', variable)
      // setEditing(false)
    },
    [tableId, rowIdx, rowId, block, columnSort, rootId, cellId, saveBlock, columnTitle]
  )

  const meta: UseFormulaInput['meta'] = {
    namespaceId: rootId,
    variableId: formulaId,
    name: formulaName,
    richType: {
      type: 'spreadsheet',
      meta: {
        spreadsheetId: tableId,
        columnId,
        rowId
      }
    }
  }

  const { temporaryVariableT, savedVariableT, content, onSaveFormula, commitFormula, completion } = useFormula({
    meta,
    onUpdateFormula,
    formulaContext
  })

  const eventId = `${tableId},${cellId}`

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      SpreadsheetUpdateCellValue,
      e => {
        const { value } = e.payload
        devLog('Spreadsheet update cell', { eventId, value })
        void commitFormula(value)
      },
      { eventId, subscribeId: eventId }
    )
    return () => listener.unsubscribe()
  }, [commitFormula, eventId])

  const handleEnterEdit = (): void => {
    context.clearSelection()
    setEditing(true)
  }

  React.useEffect(() => {
    const listener = BrickdocEventBus.subscribe(
      FormulaEditorSavedTrigger,
      e => {
        setEditing(false)
      },
      {
        eventId: `${rootId},${formulaId}`,
        subscribeId: `FormulaMenu#${rootId},${formulaId}`
      }
    )
    return () => listener.unsubscribe()
  }, [formulaId, rootId, setEditing])

  const handleSaveFormula = async (): Promise<void> => {
    await onSaveFormula()
    setEditing(false)
  }

  if (editingCell || editing) {
    return (
      <FormulaBlockRender
        onSaveFormula={handleSaveFormula}
        meta={meta}
        temporaryVariableT={temporaryVariableT}
        content={content}
        completion={completion}
        width={width}
        minHeight={minHeight}
      />
    )
  }

  const display = savedVariableT ? displayValue(fetchResult(savedVariableT), rootId) : currentBlock.text
  const fallbackDisplayData: VariableDisplayData | undefined = display
    ? {
        definition: display,
        display,
        version: 0,
        meta: { ...meta, input: display, position: 0 },
        result: { type: 'literal', result: display }
      }
    : undefined
  const displayData: VariableDisplayData | undefined = savedVariableT
    ? dumpDisplayResultForDisplay(savedVariableT)
    : currentBlock.data.displayData ?? fallbackDisplayData

  return (
    <div className="cell" style={{ ...(width ? { width: `${width}px` } : {}) }} onDoubleClick={handleEnterEdit}>
      <FormulaDisplay display={display} displayData={displayData} formulaType="spreadsheet" />
    </div>
  )
}
