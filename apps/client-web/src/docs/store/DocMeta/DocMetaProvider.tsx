import { isEqual } from '@brickdoc/active-support'
import { FC, useRef, useMemo, useContext } from 'react'
import { DocMeta, DocMetaContext } from './types'

const emptyDocMeta: DocMeta = {
  id: undefined,
  domain: '',
  personalDomain: '',
  loginDomain: '',
  isAlias: false,
  alias: undefined,
  payload: {},
  snapshotVersion: 0,
  isAnonymous: false,
  isDeleted: false,
  isMine: false,
  isRedirect: false,
  pin: false,
  title: '',
  host: '',
  path: '',
  collaborators: [],
  pathArray: [],
  documentInfoLoading: false,
  shareable: false,
  editable: false,
  viewable: false
}

interface Props {
  docMeta: Partial<DocMeta>
  inherit?: boolean
}

export const DocMetaProvider: FC<Props> = ({ docMeta, inherit, children }) => {
  const ancestor = useContext(DocMetaContext)
  const defaultMeta = inherit && ancestor !== undefined ? ancestor : emptyDocMeta
  const cached = useRef(defaultMeta)
  const value = useMemo(() => {
    const finalDocMeta: DocMeta = { ...defaultMeta, ...docMeta }
    if (!isEqual(cached.current, finalDocMeta)) {
      cached.current = finalDocMeta
    }
    return cached.current
  }, [docMeta, defaultMeta])
  return <DocMetaContext.Provider value={value}>{children}</DocMetaContext.Provider>
}
