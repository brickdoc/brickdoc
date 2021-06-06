import React, { useState } from "react"
import { Story } from "@storybook/react"
import { Drawer, DrawerProps, Button } from "../../"


export default {
  title: "ReactComponents/Drawer",
  component: Drawer,
  parameters: {
  docs: {
    description: {
      component: `
A panel which slides in from the edge of the screen.

#### When To Use
A Drawer is a panel that is typically overlaid on top of a page and slides in from the side.
It contains a set of information or actions. Since the user can interact with the Drawer without
leaving the current page, tasks can be achieved more efficiently within the same context.

* Use a Form to create or edit a set of information.
* Processing subtasks. When subtasks are too heavy for a Popover and we still want to keep the subtasks
 in the context of the main task, Drawer comes very handy.
* When the same Form is needed in multiple places.

#### API

| Props | Description | Type | Default |
| --- | --- | --- | --- |
| afterVisibleChange | Callback after the animation ends when switching drawers | function(visible) | - |
| bodyStyle | Style of the drawer content part | object | - |
| className | The class name of the container of the Drawer dialog | string | - |
| closable | Whether a close (x) button is visible on top right of the Drawer dialog or not | boolean | true |
| closeIcon | Custom close icon | ReactNode | &lt;CloseOutlined /> |
| contentWrapperStyle | Style of the drawer wrapper of content part | CSSProperties | - |
| destroyOnClose | Whether to unmount child components on closing drawer or not | boolean | false |
| drawerStyle | Style of the popup layer element | object | - |
| footer | The footer for Drawer | ReactNode | - |
| footerStyle | Style of the drawer footer part | CSSProperties | - |
| forceRender | Prerender Drawer component forcely | boolean | false |
| getContainer | Return the mounted node for Drawer | HTMLElement \\| () => HTMLElement \\| Selectors \\| false | body |
| headerStyle | Style of the drawer header part | object | - |
| height | Placement is \`top\` or \`bottom\`, height of the Drawer dialog | string \\| number | 256 |
| keyboard | Whether support press esc to close | boolean | true |
| mask | Whether to show mask or not | boolean | true |
| maskClosable | Clicking on the mask (area outside the Drawer) to close the Drawer or not | boolean | true |
| maskStyle | Style for Drawer's mask element | CSSProperties | {} |
| placement | The placement of the Drawer | \`top\` \\| \`right\` \\| \`bottom\` \\| \`left\` | \`right\` |
| push | Nested drawers push behavior | boolean \\| { distance: string \\| number } | { distance: 180 } |
| style | Style of wrapper element which **contains mask** compare to \`drawerStyle\` | CSSProperties | - |
| title | The title for Drawer | ReactNode | - |
| visible | Whether the Drawer dialog is visible or not | boolean | false |
| width | Width of the Drawer dialog | string \\| number | 256 |
| zIndex | The \`z-index\` of the Drawer | number | 1000 |
| onClose | Specify a callback that will be called when a user clicks mask, close button or Cancel button | function(e) | - |

`
    }
  }
}
}

const App: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}

const Template: Story<DrawerProps> = (_args) =>
  <App/>
export const Base = Template.bind({})




