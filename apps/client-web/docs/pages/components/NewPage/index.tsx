import React from 'react'
import { Add } from '@brickdoc/design-icons'
import { useDocsI18n } from '../../../common/hooks'
import { Button } from '@brickdoc/design-system'
import { useNavigate } from 'react-router-dom'
import { useBlockCreateMutation } from '@/BrickdocGraphQL'
import { queryPageBlocks } from '../../../common/graphql'
import { DocMetaProps } from '@/docs/pages/DocumentContentPage'

import { TEST_ID_ENUM } from '@brickdoc/test-helper'
import { sidebarButtonStyles } from '../../DocumentContentPage.style'

export const NewPage: React.FC<DocMetaProps> = ({ docMeta }) => {
  const { t } = useDocsI18n()

  const [blockCreate, { loading: createBlockLoading }] = useBlockCreateMutation({
    refetchQueries: [queryPageBlocks]
  })
  const navigate = useNavigate()

  const onClick = async (): Promise<void> => {
    const input = { title: '' }
    const { data } = await blockCreate({ variables: { input } })
    if (data?.blockCreate?.id) {
      navigate(`/${docMeta.domain}/${data?.blockCreate?.id}`)
    }
  }

  return (
    <Button
      data-testid={TEST_ID_ENUM.page.DocumentPage.addPageButton.id}
      type="text"
      css={sidebarButtonStyles}
      onClick={onClick}
      loading={createBlockLoading}
      icon={<Add />}
      disabled={createBlockLoading}
    >
      {t('blocks.create_pages')}
    </Button>
  )
}