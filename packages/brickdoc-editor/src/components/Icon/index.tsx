import React from 'react'
import { rgba } from 'polished'
import { Icon, IconProps, styled, theme } from '@brickdoc/design-system'

const createEditorIcon =
  (Icon: React.ReactElement): React.FC<IconProps> =>
  props =>
    React.cloneElement(Icon, props)

export const RteH1 = createEditorIcon(<Icon.RteH1 fill={theme.colors.blue4.value} />)
export const RteH2 = createEditorIcon(<Icon.RteH2 fill={theme.colors.deepPurple4.value} />)
export const RteH3 = createEditorIcon(<Icon.RteH3 fill={theme.colors.purple4.value} />)
export const RteH4 = createEditorIcon(<Icon.RteH4 fill={theme.colors.blue4.value} />)
export const RteH5 = createEditorIcon(<Icon.RteH5 fill={theme.colors.cyan4.value} />)
export const ListOrdered = createEditorIcon(<Icon.ListOrdered fill={theme.colors.blue4.value} />)
export const ListUnordered = createEditorIcon(<Icon.ListUnordered fill={theme.colors.purple4.value} />)
export const Code = createEditorIcon(<Icon.Code fill={theme.colors.cyan4.value} />)
export const Formula = createEditorIcon(<Icon.Formula fill={theme.colors.cyan4.value} />)
export const Divider = createEditorIcon(
  <Icon.Divider theme="multi-color" fill={[theme.colors.purple4.value, rgba(theme.colors.purple4.value, 0.3)]} />
)
export const Toc = createEditorIcon(
  <Icon.Toc theme="multi-color" fill={[theme.colors.blue4.value, rgba(theme.colors.blue4.value, 0.3)]} />
)
export const MindmapList = createEditorIcon(<Icon.MindmapList fill={theme.colors.deepPurple4.value} />)
export const Image = createEditorIcon(<Icon.Image fill={theme.colors.blue4.value} />)
export const Upload = createEditorIcon(<Icon.Upload fill={theme.colors.deepPurple4.value} />)
export const Link = createEditorIcon(<Icon.Link fill={theme.colors.deepPurple4.value} />)
export const Table = createEditorIcon(<Icon.Table fill={theme.colors.deepPurple4.value} />)
export const Unsplash = createEditorIcon(<Icon.Unsplash fill={theme.colors.deepPurple4.value} />)
export const DragSecondary = createEditorIcon(
  <Icon.DragSecondary theme="multi-color" fill={[theme.colors.primaryDefault.value, theme.colors.blue2.value]} />
)

export const iconBackgroundStyle = {
  background: 'linear-gradient(0deg, rgba(248, 251, 255, 0.36), rgba(248, 251, 255, 0.36)), rgba(255, 255, 255, 0.74)',
  backdropFilter: 'blur(16px)',
  borderRadius: '2px',
  boxShadow:
    '1px 1px 0px rgba(255, 255, 255, 0.8), 0px 2px 4px rgba(167, 167, 167, 0.3), inset 1px 1px 0px rgba(255, 255, 255, 0.25)'
}

export const IconBackground = styled('span', {
  include: ['flexCenter'],
  display: 'flex',
  ...iconBackgroundStyle
})