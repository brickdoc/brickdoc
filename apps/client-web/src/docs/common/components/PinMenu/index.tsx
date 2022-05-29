import { useBlockPinOrUnpinMutation } from '@/BrickdocGraphQL'
import { hiddenItemStyle } from '@/docs/pages/components/DocumentTopBar/DocumentTopBar.style'
import { useNonNullDocMeta } from '@/docs/store/DocMeta'
import { useApolloClient } from '@apollo/client'
import { Button, Tooltip, Icon } from '@brickdoc/design-system'
import React from 'react'
import { queryBlockPins } from '../../graphql'
import { useDocsI18n } from '../../hooks'
interface PinMenuProps {
  className?: string
}

export const PinMenu: React.FC<PinMenuProps> = ({ className }) => {
  const { id, pin } = useNonNullDocMeta()
  const client = useApolloClient()
  const [blockPinOrUnpin, { loading: blockPinOrUnpinLoading }] = useBlockPinOrUnpinMutation({
    refetchQueries: [queryBlockPins]
  })
  const { t } = useDocsI18n()

  const onClick = async (): Promise<void> => {
    const input = { blockId: id, pin: !pin }
    await blockPinOrUnpin({ variables: { input } })
    client.cache.modify({
      id: client.cache.identify({ __typename: 'BlockInfo', id }),
      fields: {
        pin() {
          return !pin
        }
      }
    })
  }

  const iconRender = pin ? <Icon.Pin /> : <Icon.Unpin />

  return (
    <>
      <Tooltip title={t(pin ? 'pin.remove_tooltip' : 'pin.add_tooltip')}>
        <Button
          className={className}
          type="text"
          aria-label={t('pin.name')}
          onClick={onClick}
          disabled={blockPinOrUnpinLoading}
          css={hiddenItemStyle}
        >
          {blockPinOrUnpinLoading ? <></> : iconRender}
        </Button>
      </Tooltip>
    </>
  )
}
