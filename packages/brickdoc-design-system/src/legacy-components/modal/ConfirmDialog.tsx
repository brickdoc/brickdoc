import { cx as classNames } from '../../utilities'
import Dialog, { ModalFuncProps } from './Modal'
import ActionButton from '../_util/ActionButton'
import devWarning from '../_util/devWarning'

interface ConfirmDialogProps extends ModalFuncProps {
  afterClose?: () => void
  close: (...args: any[]) => void
  autoFocusButton?: null | 'ok' | 'cancel'
  rootPrefixCls: string
}

/**
 * @deprecated Legacy Component.
 * @param props
 * @returns
 */
const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    icon,
    onCancel,
    onOk,
    close,
    zIndex,
    afterClose,
    visible,
    keyboard,
    centered,
    getContainer,
    maskStyle,
    okText,
    okButtonProps,
    cancelText,
    cancelButtonProps,
    direction,
    prefixCls,
    rootPrefixCls,
    bodyStyle,
    closable = false,
    closeIcon,
    modalRender,
    focusTriggerAfterClose
  } = props

  devWarning(
    !(typeof icon === 'string' && icon.length > 2),
    'Modal',
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`
  )

  // 支持传入{ icon: null }来隐藏`Modal.confirm`默认的Icon
  const okType = props.okType || 'text'
  const contentPrefixCls = `${prefixCls}-confirm`
  // 默认为 true，保持向下兼容
  const okCancel = 'okCancel' in props ? props.okCancel : true
  const width = props.width || 336
  const style = props.style || {}
  const mask = props.mask === undefined ? true : props.mask
  // 默认为 false，保持旧版默认行为
  const maskClosable = props.maskClosable === undefined ? false : props.maskClosable
  const autoFocusButton = props.autoFocusButton === null ? false : props.autoFocusButton || 'ok'

  const classString = classNames(
    contentPrefixCls,
    `${contentPrefixCls}-${props.type}`,
    { [`${contentPrefixCls}-rtl`]: direction === 'rtl' },
    props.className
  )

  const cancelButton = okCancel && (
    <ActionButton
      actionFn={onCancel}
      close={close}
      type="text"
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autoFocusButton === 'cancel'}
      buttonProps={cancelButtonProps}
      prefixCls={`${rootPrefixCls}-btn`}
    >
      {cancelText}
    </ActionButton>
  )

  return (
    <Dialog
      prefixCls={prefixCls}
      className={classString}
      wrapClassName={classNames({ [`${contentPrefixCls}-centered`]: !!props.centered })}
      onCancel={() => close({ triggerCancel: true })}
      visible={visible}
      title=""
      footer=""
      mask={mask}
      maskClosable={maskClosable}
      maskStyle={maskStyle}
      style={style}
      width={width}
      zIndex={zIndex}
      afterClose={afterClose}
      keyboard={keyboard}
      centered={centered}
      getContainer={getContainer}
      closable={closable}
      closeIcon={closeIcon}
      modalRender={modalRender}
      focusTriggerAfterClose={focusTriggerAfterClose}
    >
      <div className={`${contentPrefixCls}-body-wrapper`}>
        <div className={`${contentPrefixCls}-body`} style={bodyStyle}>
          {icon}
          {props.title === undefined ? null : <span className={`${contentPrefixCls}-title`}>{props.title}</span>}
          <div className={`${contentPrefixCls}-content`}>{props.content}</div>
        </div>
        <div className={`${contentPrefixCls}-btns`}>
          <ActionButton
            type={okType}
            actionFn={onOk}
            close={close}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autoFocusButton === 'ok'}
            buttonProps={okButtonProps}
            prefixCls={`${rootPrefixCls}-btn`}
          >
            {okText}
          </ActionButton>
          {cancelButton}
        </div>
      </div>
    </Dialog>
  )
}

export default ConfirmDialog
