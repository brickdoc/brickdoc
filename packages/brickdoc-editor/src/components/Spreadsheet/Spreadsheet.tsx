import React from 'react'
import { NodeViewProps } from '@tiptap/react'
import { Input, Icon, devLog } from '@brickdoc/design-system'
import { useEditorI18n, useDocumentEditable } from '../../hooks'
import { BlockContainer, BlockContainerProps } from '../BlockContainer'
import { MenuIcon } from '../SlashMenu/styled'

import { useSpreadsheet } from './useSpreadsheet'
import { columnDisplayTitle } from './helper'

import {
  SpreadsheetContainer,
  SpreadsheetView,
  SpreadsheetHeader,
  SpreadsheetHeaderColumn,
  SpreadsheetBody,
  SpreadsheetRow,
  SpreadsheetCellContainer,
  SpreadsheetEditable
} from './SpreadsheetView'

import { useSpreadsheetContext } from './SpreadsheetContext'

import { SpreadsheetCell } from './SpreadsheetCell'
import './Spreadsheet.less'
import { useFormulaSpreadsheet } from './useFormulaSpreadsheet'

export const Spreadsheet: React.FC<NodeViewProps> = ({ editor, node, deleteNode, updateAttributes }) => {
  const [documentEditable] = useDocumentEditable(undefined)

  const parentId: string = node.attrs.uuid
  const prevData = node.attrs.data || {}

  const { t } = useEditorI18n()

  const [title, setTitle] = React.useState<string>(node.attrs.title ?? '')

  const updateAttributeData = (data: Record<string, any>): void => {
    updateAttributes({
      data: { ...prevData, ...data }
    })
  }

  const {
    columns,
    addColumn,
    updateColumn,
    removeColumn,
    moveColumn,
    rows,
    addRow,
    removeRow,
    moveRow,
    getCellBlock,
    saveCellBlock,
    cellsMap
  } = useSpreadsheet({
    isNew: node.attrs.isNew,
    parentId,
    data: prevData,
    updateAttributeData
  })

  const valuesMatrix = new Map(
    Array.from(cellsMap.entries()).map(([rowId, row]) => [
      rowId,
      new Map(Array.from(row.entries()).map(([columnId, cell]) => [columnId, cell.text]))
    ])
  )

  const spreadsheetContext = useSpreadsheetContext({
    columnIds: columns.map(c => c.uuid),
    rowIds: rows.map(r => r.id),
    columnHeaders: new Map(columns.map(c => [c.uuid, columnDisplayTitle(c)])),
    valuesMatrix
  })

  useFormulaSpreadsheet({ blockId: parentId, rows, columns, getCellBlock, title })

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const title = event.target.value
    updateAttributes({ title })
    devLog(title)
    setTitle(title)
  }

  const { dragging } = spreadsheetContext

  React.useEffect(() => {
    const onDraggingMouseMove = (e: MouseEvent): void => {
      if (dragging.rowId ?? dragging.columnId) {
        const newDragging = {
          ...dragging,
          movementX: (dragging.movementX ?? 0) + e.movementX,
          movementY: (dragging.movementY ?? 0) + e.movementY
        }
        if (dragging.rowId) {
          const trs = document.elementsFromPoint(e.clientX, e.clientY).map(el => el.closest('tr'))
          const tr = trs?.find(el => el?.dataset.rowId && el.dataset.rowId !== dragging.rowId)
          newDragging.overRowId = tr?.dataset?.rowId ?? dragging.rowId
        }
        if (dragging.columnId) {
          const ths = document.elementsFromPoint(e.clientX, e.clientY).map(el => el.closest('th'))
          const th = ths?.find(el => el?.dataset.columnId && el.dataset.columnId !== dragging.columnId)
          newDragging.overColumnId = th?.dataset?.columnId ?? dragging.columnId
        }
        spreadsheetContext.setDragging(newDragging)
      }
    }

    const onDraggingMouseUp = (e: MouseEvent): void => {
      if (dragging.rowId ?? dragging.columnId) {
        spreadsheetContext.setDragging({})
        if (dragging.rowId && dragging.overRowId) {
          moveRow(dragging.rowId, dragging.overRowId)
        }
        if (dragging.columnId && dragging.overColumnId) {
          moveColumn(dragging.columnId, dragging.overColumnId)
        }
      }
    }
    document.addEventListener('mousemove', onDraggingMouseMove)
    document.addEventListener('mouseup', onDraggingMouseUp)
    return () => {
      document.removeEventListener('mousemove', onDraggingMouseMove)
      document.removeEventListener('mouseup', onDraggingMouseUp)
    }
  }, [dragging, moveRow, moveColumn, spreadsheetContext])

  const actionOptions: BlockContainerProps['actionOptions'] = {
    options: documentEditable
      ? [
          'delete',
          {
            type: 'item',
            name: 'addRow',
            label: t('spreadsheet.row.add_below'),
            icon: (
              <MenuIcon>
                <Icon.ArrowDown />
              </MenuIcon>
            ),
            onAction: () => addRow(0)
          }
        ]
      : [],
    buttonClassName: 'spreadsheet-action'
  }

  return (
    <BlockContainer deleteNode={deleteNode} actionOptions={actionOptions}>
      <span>
        <SpreadsheetContainer>
          {documentEditable ? (
            <Input
              bordered={false}
              className="spreadsheet-title"
              value={title}
              placeholder="Untitled Spreadsheet"
              onChange={handleTitleChange}
            />
          ) : (
            <div className="spreadsheet-title">{title}</div>
          )}
          <SpreadsheetView>
            <SpreadsheetHeader rowId="first" context={spreadsheetContext}>
              <SpreadsheetHeaderColumn className="row-action-panel" context={spreadsheetContext} columnId="first" />
              {columns.map((column, i) => {
                const handleTitleSave = (value: string): void => {
                  updateColumn({ ...column, title: value })
                }
                return (
                  <SpreadsheetHeaderColumn
                    key={column.uuid}
                    context={spreadsheetContext}
                    columnId={column.uuid}
                    columnActions={
                      documentEditable
                        ? [
                            {
                              name: 'addColumnLeft',
                              title: t('spreadsheet.column.add_left'),
                              icon: <Icon.ArrowLeft />,
                              onAction: () => addColumn(i)
                            },
                            {
                              name: 'addColumnRight',
                              title: t('spreadsheet.column.add_right'),
                              icon: <Icon.ArrowRight />,
                              onAction: () => addColumn(i + 1)
                            },
                            {
                              name: 'deleteColumn',
                              title: t('spreadsheet.column.delete'),
                              icon: <Icon.Delete />,
                              onAction: () => removeColumn(column)
                            }
                          ]
                        : []
                    }
                    draggable={documentEditable}
                  >
                    {documentEditable ? (
                      <SpreadsheetEditable
                        context={spreadsheetContext}
                        className="column"
                        value={columnDisplayTitle(column)}
                        onSave={handleTitleSave}
                      />
                    ) : (
                      <div className="column">{columnDisplayTitle(column)}</div>
                    )}
                  </SpreadsheetHeaderColumn>
                )
              })}
            </SpreadsheetHeader>
            <SpreadsheetBody>
              {rows.map((rowBlock, rowIdx) => {
                return (
                  <SpreadsheetRow
                    key={rowIdx}
                    context={spreadsheetContext}
                    rowId={rowBlock.id}
                    rowNumber={`${rowIdx + 1}`}
                    rowActions={
                      documentEditable
                        ? [
                            {
                              name: 'addRowAbove',
                              title: t('spreadsheet.row.add_above'),
                              icon: <Icon.ArrowUp />,
                              onAction: () => addRow(rowIdx)
                            },
                            {
                              name: 'addRowBelow',
                              title: t('spreadsheet.row.add_below'),
                              icon: <Icon.ArrowDown />,
                              onAction: () => addRow(rowIdx + 1)
                            },
                            {
                              name: 'deleteRow',
                              title: t('spreadsheet.row.delete'),
                              icon: <Icon.Delete />,
                              onAction: () => removeRow(rowIdx)
                            }
                          ]
                        : []
                    }
                    draggable={documentEditable}
                  >
                    {columns.map((column, columnIdx) => {
                      const block = getCellBlock(rowBlock.id, column.uuid)
                      return (
                        <SpreadsheetCellContainer
                          key={block.id}
                          context={spreadsheetContext}
                          cellId={{ rowId: rowBlock.id, columnId: column.uuid }}
                        >
                          {documentEditable ? (
                            <SpreadsheetCell
                              context={spreadsheetContext}
                              parentId={parentId}
                              key={block.id}
                              block={block}
                              saveBlock={saveCellBlock}
                            />
                          ) : (
                            <div className="cell">{block.text}</div>
                          )}
                        </SpreadsheetCellContainer>
                      )
                    })}
                  </SpreadsheetRow>
                )
              })}
            </SpreadsheetBody>
          </SpreadsheetView>
        </SpreadsheetContainer>
      </span>
    </BlockContainer>
  )
}