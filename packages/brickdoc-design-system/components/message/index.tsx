import * as React from 'react'
import classNames from 'classnames'
import RCNotification from 'rc-notification'

import './style'
import {
  IconProvider,
  Attention as ExclamationCircleFilled,
  Info as InfoCircleFilled,
  CheckOne as CheckCircleFilled,
  CloseOne as CloseCircleFilled,
  Rotation as LoadingOutlined
} from '../icon'
import { NotificationInstance as RCNotificationInstance, NoticeContent } from 'rc-notification/lib/Notification'

import createUseMessage from './hooks/useMessage'
import { globalConfig } from '../config-provider'

export type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading'

let messageInstance: RCNotificationInstance | null
let defaultDuration = 3
let defaultTop: number
let key = 1
let localPrefixCls = ''
let transitionName = 'move-up'
let hasTransitionName = false
let getContainer: () => HTMLElement
let maxCount: number
let rtl = false

export function getKeyThenIncreaseKey() {
  return key++
}

export interface ConfigOptions {
  top?: number
  duration?: number
  prefixCls?: string
  getContainer?: () => HTMLElement
  transitionName?: string
  maxCount?: number
  rtl?: boolean
}

function setMessageConfig(options: ConfigOptions) {
  if (options.top !== undefined) {
    defaultTop = options.top
    messageInstance = null // delete messageInstance for new defaultTop
  }
  if (options.duration !== undefined) {
    defaultDuration = options.duration
  }

  if (options.prefixCls !== undefined) {
    localPrefixCls = options.prefixCls
  }
  if (options.getContainer !== undefined) {
    getContainer = options.getContainer
  }
  if (options.transitionName !== undefined) {
    transitionName = options.transitionName
    messageInstance = null // delete messageInstance for new transitionName
    hasTransitionName = true
  }
  if (options.maxCount !== undefined) {
    maxCount = options.maxCount
    messageInstance = null
  }
  if (options.rtl !== undefined) {
    rtl = options.rtl
  }
}

function getRCNotificationInstance(
  args: ArgsProps,
  callback: (info: { prefixCls: string; rootPrefixCls: string; instance: RCNotificationInstance }) => void
) {
  const { prefixCls: customizePrefixCls, getPopupContainer: getContextPopupContainer } = args
  const { getPrefixCls, getRootPrefixCls } = globalConfig()
  const prefixCls = getPrefixCls('message', customizePrefixCls || localPrefixCls)
  const rootPrefixCls = getRootPrefixCls(args.rootPrefixCls, prefixCls)

  if (messageInstance) {
    // eslint-disable-next-line node/no-callback-literal
    callback({ prefixCls, rootPrefixCls, instance: messageInstance })
    return
  }

  const instanceConfig = {
    prefixCls,
    transitionName: hasTransitionName ? transitionName : `${rootPrefixCls}-${transitionName}`,
    style: { top: defaultTop }, // 覆盖原来的样式
    getContainer: getContainer || getContextPopupContainer,
    maxCount
  }

  RCNotification.newInstance(instanceConfig as any, (instance: any) => {
    if (messageInstance) {
      // eslint-disable-next-line node/no-callback-literal
      callback({ prefixCls, rootPrefixCls, instance: messageInstance })
      return
    }
    messageInstance = instance

    if (process.env.NODE_ENV === 'test') {
      ;(messageInstance as any).config = instanceConfig
    }

    // eslint-disable-next-line node/no-callback-literal
    callback({ prefixCls, rootPrefixCls, instance })
  })
}

export type ThenableArgument = (val: any) => void

export interface MessageType extends PromiseLike<any> {
  (): void
}

const typeToIcon = {
  info: InfoCircleFilled,
  success: CheckCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
  loading: LoadingOutlined
}
export interface ArgsProps {
  content: React.ReactNode
  duration?: number
  type: NoticeType
  prefixCls?: string
  rootPrefixCls?: string
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  onClose?: () => void
  icon?: React.ReactNode
  key?: string | number
  style?: React.CSSProperties
  className?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

function getRCNoticeProps(args: ArgsProps, prefixCls: string): NoticeContent {
  const duration = args.duration !== undefined ? args.duration : defaultDuration
  const IconComponent = typeToIcon[args.type]
  const messageClass = classNames(`${prefixCls}-custom-content`, {
    [`${prefixCls}-${args.type}`]: args.type,
    [`${prefixCls}-rtl`]: rtl
  })
  const isLoading = args.type === 'loading'
  return {
    key: args.key,
    duration,
    style: args.style || {},
    className: args.className,
    content: (
      <div className={messageClass}>
        {args.icon ||
          (IconComponent && (
            <IconProvider value={globalConfig().getIconDefaultConfig(rtl)}>
              <IconComponent spin={isLoading} theme={isLoading ? 'outline' : 'filled'} />
            </IconProvider>
          ))}
        <span>{args.content}</span>
      </div>
    ),
    onClose: args.onClose,
    onClick: args.onClick
  }
}

function notice(args: ArgsProps): MessageType {
  const target = args.key || key++
  const closePromise = new Promise(resolve => {
    const callback = () => {
      if (typeof args.onClose === 'function') {
        args.onClose()
      }
      return resolve(true)
    }

    getRCNotificationInstance(args, ({ prefixCls, instance }) => {
      instance.notice(getRCNoticeProps({ ...args, key: target, onClose: callback }, prefixCls))
    })
  })
  const result: any = () => {
    if (messageInstance) {
      messageInstance.removeNotice(target)
    }
  }
  result.then = async (filled: ThenableArgument, rejected: ThenableArgument) => await closePromise.then(filled, rejected)
  result.promise = closePromise
  return result
}

type ConfigContent = React.ReactNode | string
type ConfigDuration = number | (() => void)
type JointContent = ConfigContent | ArgsProps
export type ConfigOnClose = () => void

function isArgsProps(content: JointContent): content is ArgsProps {
  return Object.prototype.toString.call(content) === '[object Object]' && !!(content as ArgsProps).content
}

const api: any = {
  open: notice,
  config: setMessageConfig,
  destroy(messageKey?: React.Key) {
    if (messageInstance) {
      if (messageKey) {
        const { removeNotice } = messageInstance
        removeNotice(messageKey)
      } else {
        const { destroy } = messageInstance
        destroy()
        messageInstance = null
      }
    }
  }
}

export function attachTypeApi(originalApi: MessageApi, type: NoticeType) {
  originalApi[type] = (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => {
    if (isArgsProps(content)) {
      return originalApi.open({ ...content, type })
    }

    if (typeof duration === 'function') {
      // eslint-disable-next-line no-param-reassign
      onClose = duration
      // eslint-disable-next-line no-param-reassign
      duration = undefined
    }

    return originalApi.open({
      content,
      type,
      onClose,
      duration: duration as number
    })
  }
}

;(['success', 'info', 'warning', 'error', 'loading'] as NoticeType[]).forEach(type => attachTypeApi(api, type))

api.warn = api.warning
api.useMessage = createUseMessage(getRCNotificationInstance, getRCNoticeProps)

export interface MessageInstance {
  info: (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => MessageType
  success: (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => MessageType
  error: (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => MessageType
  warning: (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => MessageType
  loading: (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => MessageType
  open: (args: ArgsProps) => MessageType
}

export interface MessageApi extends MessageInstance {
  warn: (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => MessageType
  config: (options: ConfigOptions) => void
  destroy: (messageKey?: React.Key) => void
  useMessage: () => [MessageInstance, React.ReactElement]
}

/** @private test Only function. Not work on production */
export const getInstance = () => (process.env.NODE_ENV === 'test' ? messageInstance : null)

export default api as MessageApi
