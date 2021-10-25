import { FC, lazy, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { BrickdocContext } from '@/common/brickdocContext'
import { rootPath } from '@/common/utils'
import { SidebarLayoutPage } from '@/common/layouts/SidebarLayoutPage'

const AccountsModule = lazy(async () => await import('@/accounts/Module'))
const SettingsModule = lazy(async () => await import('@/settings/Module'))
const DocsModule = lazy(async () => await import('@/docs/Module'))

const RequireLogin: FC = ({ children }) => {
  const context = useContext(BrickdocContext)
  return context.currentUser ? <>{children}</> : <Navigate replace={true} to="/accounts/sign_in" />
}

export const RootRoutes: FC = () => {
  const context = useContext(BrickdocContext)
  return (
    <Router>
      <Routes>
        <Route path="accounts/*" element={<AccountsModule />} />
        <Route path=":webid/*" element={<SidebarLayoutPage />}>
          <Route
            path="settings/*"
            element={
              <RequireLogin>
                <SettingsModule />
              </RequireLogin>
            }
          />
          <Route path=":kind/:docid/*" element={<DocsModule />} />
          <Route
            path="*"
            element={
              <RequireLogin>
                <DocsModule />
              </RequireLogin>
            }
          />
        </Route>
        <Route
          path="/"
          element={
            <RequireLogin>
              <Navigate replace to={rootPath(context)} />
            </RequireLogin>
          }
        />
      </Routes>
    </Router>
  )
}