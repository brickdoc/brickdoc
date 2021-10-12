import { Input, Popover, Icon, Tabs } from '@brickdoc/design-system'
import React, { useState } from 'react'
import { useDocsI18n } from '../../hooks'
import { PageTrash } from '../PageTrash'
import styles from './index.module.less'

interface TrashPopoverProps {
  webid: string
  docid: string | undefined
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const TrashPopover: React.FC<TrashPopoverProps> = ({ webid, docid, visible, setVisible }) => {
  const [searchObject, setSearchObject] = useState<object>({})

  const { t } = useDocsI18n()

  const handleVisibleChange = (value: boolean): void => {
    setVisible(value)
  }

  const handleSearch = (value: string, key: string): void => {
    setSearchObject({ ...searchObject, [key]: value })
  }

  const tabPaneSkelecton = (tab: string, key: string, docid: string | null): any => {
    return (
      <Tabs.TabPane tab={tab} key={key}>
        <Input.Search
          placeholder={t('trash.search')}
          onSearch={value => {
            handleSearch(value, key)
          }}
          allowClear
        />
        <div className={styles.list}>
          <PageTrash webid={webid} search={(searchObject as any)[key]} docid={docid} setVisible={setVisible} />
        </div>
        <div className={styles.footer}>
          <Icon.Help />
          <span>{t('trash.learn')}</span>
        </div>
      </Tabs.TabPane>
    )
  }

  const currentPageData = docid ? tabPaneSkelecton(t('trash.current_page'), 'currentPage', docid) : <></>
  const allPagesData = tabPaneSkelecton(t('trash.all_pages'), 'allPages', null)

  const popoverContent = (
    <Tabs className={styles.tabs} defaultActiveKey="allPages">
      {allPagesData}
      {currentPageData}
    </Tabs>
  )

  return (
    <Popover
      content={popoverContent}
      overlayClassName={styles.popover}
      destroyTooltipOnHide={true}
      trigger="click"
      placement="right"
      title={null}
      visible={visible}
      onVisibleChange={handleVisibleChange}
    />
  )
}