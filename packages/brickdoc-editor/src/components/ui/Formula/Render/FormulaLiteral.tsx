import { AnyTypeResult, FormulaSourceType } from '@brickdoc/formula'

export interface FormulaLiteralProps {
  result: AnyTypeResult
  formulaType: FormulaSourceType
}

export const FormulaLiteral: React.FC<FormulaLiteralProps> = ({ result }) => {
  const displayValue = result.result
  if (typeof displayValue === 'string') {
    // use dummy div to escape html chars
    const dummyDiv = document.createElement('div')
    dummyDiv.textContent = displayValue
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: dummyDiv.innerHTML.replaceAll('\n', '<br />')
        }}
      />
    )
  } else {
    return <span>{displayValue}</span>
  }
}