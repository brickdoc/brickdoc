import { ColumnType } from '@brickdoc/formula'
import { FormulaSpreadsheet } from '../Render/FormulaSpreadsheet'

export interface ColumnPreviewProps {
  column: ColumnType
  rootId: string
}

export const ColumnPreview: React.FC<ColumnPreviewProps> = ({ column, rootId }) => {
  return (
    <div className="brickdoc">
      <div className="ProseMirror">
        <div className="autocomplete-preview-column">
          <FormulaSpreadsheet spreadsheet={column.spreadsheet} columnIds={[column.columnId]} />
        </div>
      </div>
    </div>
  )
}
