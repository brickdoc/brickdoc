import React from 'react'
import { Story } from '@storybook/react'
import { Slider } from '../'
export default {
  title: 'ReactComponents/Slider',
  component: Slider,
  parameters: {
    docs: {
      description: {
        component: `
A Slider component for displaying current value and intervals in range.

## When To Use

To input a value in a range.

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| autoFocus | Whether get focus when component mounted | boolean | false |
| defaultValue | The default value of slider. When \`range\` is false, use number, otherwise, use \\[number, number] | number \\| \\[number, number] | 0 \\| \\[0, 0] |
| disabled | If true, the slider will not be interactable | boolean | false |
| dots | Whether the thumb can drag over tick only | boolean | false |
| getTooltipPopupContainer | The DOM container of the Tooltip, the default behavior is to create a div element in body | (triggerNode) => HTMLElement | () => document.body |
| included | Make effect when \`marks\` not null, true means containment and false means coordinative | boolean | true |
| marks | Tick mark of Slider, type of key must be \`number\`, and must in closed interval \\[min, max], each mark can declare its own style | object | { number: ReactNode } \\| { number: { style: CSSProperties, label: ReactNode } } |
| max | The maximum value the slider can slide to | number | 100 |
| min | The minimum value the slider can slide to | number | 0 |
| range | Dual thumb mode | boolean | false |
| reverse | Reverse the component | boolean | false |
| step | The granularity the slider can step through values. Must greater than 0, and be divided by (max - min) . When \`marks\` no null, \`step\` can be null | number \\| null | 1 |
| tipFormatter | Slider will pass its value to \`tipFormatter\`, and display its value in Tooltip, and hide Tooltip when return value is null | value => ReactNode \\| null | IDENTITY |
| tooltipPlacement | Set Tooltip display position. Ref [Tooltip](/components/tooltip/) | string | - |
| tooltipVisible | If true, Tooltip will show always, or it will not show anyway, even if dragging or hovering | boolean | - |
| value | The value of slider. When \`range\` is false, use number, otherwise, use \\[number, number] | number \\| \\[number, number] | - |
| vertical | If true, the slider will be vertical | boolean | false |
| onAfterChange | Fire when onmouseup is fired | (value) => void | - |
| onChange | Callback function that is fired when the user changes the slider's value | (value) => void | - |

### range

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| draggableTrack | Whether range track can be drag | boolean | false |

## Methods

| Name | Description |
| --- | --- |
| blur() | Remove focus |
| focus() | Get focus |
`
      }
    }
  }
}

const Template: Story = () => (
  <>
    <Slider defaultValue={10} disabled />
    <Slider defaultValue={30} />
    <Slider
      range
      defaultValue={[20, 50]}
      marks={{
        0: '0°C',
        26: '26°C',
        37: '37°C',
        100: {
          style: {
            color: '#f50'
          },
          label: <strong>100°C</strong>
        }
      }}
    />
  </>
)
export const Base = Template.bind({})
