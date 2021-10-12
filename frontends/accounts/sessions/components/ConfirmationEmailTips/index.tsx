import React from 'react'
import { useCountDown } from 'ahooks'
import { useAccountsI18n } from '@/accounts/common/hooks'
import { Button, message } from '@brickdoc/design-system'
import { Success } from '@brickdoc/design-system/components/icon'
import { mutationResultHandler, millisecondsToSeconds } from '@/utils'
import { useUserConfirmationEmailResendMutation } from '@/BrickdocGraphQL'
import dayjs from 'dayjs'

import styles from './index.module.less'

export const ConfirmationEmailTips: React.FC<{ email: string }> = ({ email }) => {
  const [countdown, setTargetDate] = useCountDown()
  const { t } = useAccountsI18n()
  const [resendEmail, { loading }] = useUserConfirmationEmailResendMutation()

  const onClick = async (): Promise<void> => {
    const { data } = await resendEmail({ variables: { input: { email } } })
    const result = data?.userConfirmationEmailResend
    mutationResultHandler(result, () => {
      void message.success(t('devise:confirmations.send_paranoid_instructions'))
    })
    setTargetDate(dayjs().add(1, 'minute').toDate())
  }

  return (
    <div className={styles.container}>
      <Success theme="filled" className={styles.icon} />
      <h1>{t('sessions.confirmation_email_required_heading')}</h1>
      <p>{t('devise:registrations.signed_up_but_unconfirmed')}</p>
      <Button loading={loading} onClick={onClick} disabled={countdown !== 0}>
        {countdown === 0 ? t('sessions.resend_confirmed_email') : t('sessions.resend_after', { seconds: millisecondsToSeconds(countdown) })}
      </Button>
    </div>
  )
}