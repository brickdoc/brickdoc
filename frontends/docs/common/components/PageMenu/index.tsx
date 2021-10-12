import React from 'react'
import { Button, Dropdown, Menu, MenuProps, Tooltip } from '@brickdoc/design-system'
import { Link, useHistory } from 'react-router-dom'
import { useDocsI18n } from '../../hooks'
import { useBlockSoftDeleteMutation, BlockSoftDeleteInput, Scalars, useBlockCreateMutation } from '@/BrickdocGraphQL'
import { queryPageBlocks } from '../../graphql'
import { queryChildrenBlocks } from '@/docs/pages/graphql'
import { Add } from '@brickdoc/design-system/components/icon'
import styles from './styles.module.less'

type UUID = Scalars['UUID']

interface PageMenuProps {
  webid: string
  id: UUID
  title: Scalars['String']
}

export const PageMenu: React.FC<PageMenuProps> = ({ webid, id, title }) => {
  const [blockSoftDelete] = useBlockSoftDeleteMutation({ refetchQueries: [queryPageBlocks, queryChildrenBlocks] })
  const history = useHistory()

  const [blockCreate, { loading: createBlockLoading }] = useBlockCreateMutation({
    refetchQueries: [queryPageBlocks]
  })

  const deletePage = async (id: UUID): Promise<void> => {
    const input: BlockSoftDeleteInput = { id }
    await blockSoftDelete({ variables: { input } })
  }

  const onClickPlus = async (): Promise<void> => {
    const input = { parentId: id, title: '' }
    const { data } = await blockCreate({ variables: { input } })
    if (data?.blockCreate?.id) {
      history.push(`/${webid}/p/${data?.blockCreate?.id}`)
    }
  }

  const { t } = useDocsI18n()

  const onClick = (): MenuProps['onClick'] => {
    return ({ key }) => {
      switch (key) {
        case 'delete':
          void deletePage(id)
          break
        default:
          console.log(`unknown key ${key}`)
          break
      }
    }
  }

  const menu = (
    <Menu onClick={onClick()}>
      <Menu.Item danger key="delete">
        {t('blocks.delete')}
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Dropdown trigger={['contextMenu']} overlay={menu}>
        <div className={styles.menu}>
          <Link to={`/${webid}/p/${id}`}>{title}</Link>
          <Tooltip title={t('blocks.create_pages')}>
            <Button className={styles.addBtn} type="text" onClick={onClickPlus} loading={createBlockLoading} disabled={createBlockLoading}>
              <Add />
            </Button>
          </Tooltip>
        </div>
      </Dropdown>
    </>
  )
}