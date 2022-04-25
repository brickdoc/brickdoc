import { FC, Key, ReactElement, ReactNode, useMemo } from 'react'
import { CSS } from '@stitches/react'
import { styled, theme, Tooltip } from '@brickdoc/design-system'
import { ToolbarMenuItem } from './MenuItem'
import { ToolbarMenuSubMenuItem } from './MenuSubMenuItem'
import { useEditorI18n } from '../../../hooks'

export interface ToolbarOptionBase {
  type: 'item' | 'subMenu'
  name: string
  css?: CSS
  icon?: ReactElement
  label?: string
  content?: ReactNode
  onAction?: (key: Key) => void
  active?: boolean
  closeOnAction?: boolean
  tip?: ReactElement
  tooltip?:
    | boolean
    | string
    | {
        title: string
        description: string
      }
}

export interface ToolbarItemOption extends ToolbarOptionBase {
  type: 'item'
}

export interface ToolbarGroupOption {
  type: 'group'
  title?: string
  items: ToolbarOption[]
}

export interface ToolbarItemGroupOption {
  type: 'group'
  title?: string
  items: ToolbarItemOption[]
}

export type ToolbarSubMenuItemsRender = () => ReactNode

export interface ToolbarSubMenuOption extends ToolbarOptionBase {
  [x: string]: ReactNode
  type: 'subMenu'
  baseId?: string
  items: Array<ToolbarItemGroupOption | ToolbarItemOption> | ToolbarSubMenuItemsRender
}

export type ToolbarOption = ToolbarItemOption | ToolbarSubMenuOption

export type ToolbarItemOptionGroup = Array<ToolbarItemGroupOption | ToolbarItemOption>

export type ToolbarOptionGroup = Array<ToolbarGroupOption | ToolbarOption>

export interface ToolbarProps {
  type?: 'default' | 'transparent'
  options: ToolbarOptionGroup
}

const ToolbarMenu = styled('ul', {
  include: ['flexCenter'],
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '4px',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '8px',
  display: 'flex',
  flexDirection: 'row',
  listStyle: 'none',
  margin: 0,
  padding: '.375rem .5rem',
  'li + li': {
    marginLeft: '2px'
  },

  variants: {
    type: {
      default: {
        include: ['ceramicPrimary']
      },
      transparent: {}
    }
  }
})

const ToolbarMenuGroup = styled('ul', {
  include: ['flexCenter'],
  display: 'flex',
  flexDirection: 'row',
  listStyle: 'none',
  margin: 0,
  padding: 0
})

const ToolbarSeparator = styled('li', {
  background: theme.colors.dividerOverlayPrimary,
  height: '1rem',
  margin: '2px 4px',
  width: '1px'
})

const ToolbarMenuOptionInner: FC<{ option: ToolbarOption }> = ({ option, ...props }) => {
  if (option.type === 'item') {
    return <ToolbarMenuItem option={option} {...props} />
  }

  return <ToolbarMenuSubMenuItem option={option} {...props} />
}

const ToolbarMenuOption: FC<{ option: ToolbarOption }> = ({ option }) => {
  if (!option.tooltip) {
    return <ToolbarMenuOptionInner option={option} />
  }

  let tooltipTitle = ''
  let tooltipDescription = ''

  if (option.tooltip === true) {
    tooltipTitle = option.label ?? option.name
  } else if (typeof option.tooltip === 'string') {
    tooltipTitle = option.tooltip
  } else {
    tooltipTitle = option.tooltip.title
    tooltipDescription = option.tooltip.description
  }

  return (
    <Tooltip
      getPopupContainer={element => element}
      title={
        <>
          <div>{tooltipTitle}</div>
          <div>{tooltipDescription}</div>
        </>
      }
      placement="top"
    >
      <ToolbarMenuOptionInner option={option} />
    </Tooltip>
  )
}

// TODO: implement by menu
export const Toolbar: FC<ToolbarProps> = ({ type, options }) => {
  const [t] = useEditorI18n()

  const menuOptions = useMemo(
    () =>
      options?.reduce<ReactElement[]>((elements, option, index, array) => {
        if (option.type === 'group')
          return [
            ...elements,
            <ToolbarMenuGroup role="presentation" title={option.title} key={option.title ?? `section-${index}`}>
              {option.items.map((option, optionIndex) => (
                <ToolbarMenuOption key={`${index}-${optionIndex}`} option={option} />
              ))}
              {index < array.length - 1 && <ToolbarSeparator aria-label={t('toolbar.separator')} />}
            </ToolbarMenuGroup>
          ]

        return [...elements, <ToolbarMenuOption key={option.name} option={option} />]
      }, []),
    [options, t]
  )

  return (
    <ToolbarMenu type={type ?? 'default'} role="menu">
      {menuOptions}
    </ToolbarMenu>
  )
}
