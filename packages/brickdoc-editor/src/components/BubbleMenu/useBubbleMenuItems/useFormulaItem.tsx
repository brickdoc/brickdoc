import React from 'react'
import { Icon } from '@brickdoc/design-system'
import { EditorContext } from '../../../context/EditorContext'
import { ToolbarItemOption, ToolbarOption, ToolbarSectionOption } from '../../Toolbar'
import { isBubbleMenuVisible } from './useBubbleMenuItems'

export function useFormulaItem(): [ToolbarOption | ToolbarSectionOption | null] {
  const { editor, t } = React.useContext(EditorContext)

  const option = React.useMemo<ToolbarOption | ToolbarSectionOption | null>(() => {
    if (!isBubbleMenuVisible(editor)) return null

    const formulaItem: ToolbarItemOption = {
      type: 'item',
      name: 'formula',
      icon: <Icon.Formula />,
      tooltip: t('bubble_menu.formula.title') as string,
      onAction: () => {
        editor.commands.toggleFormula()
      }
    }

    return formulaItem
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.state.selection])

  return [option]
}