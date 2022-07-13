// Auto generated by bin/generate-routes.mjs, DO NOT change this file manually!
import { FC, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const MatchAll = lazy(async () => await import('@/routes/$'))
const Index = lazy(async () => await import('@/routes/index'))
const DomainIndex = lazy(async () => await import('@/routes/$domain/index'))
const DomainTrash = lazy(async () => await import('@/routes/$domain/trash'))
const DomainDocIdIndex = lazy(async () => await import('@/routes/$domain/$docId/index'))
const DomainJoinSecret = lazy(async () => await import('@/routes/$domain/join/$secret'))
const DomainSettingsLayout = lazy(async () => await import('@/routes/$domain/settings/_'))
const DomainSettingsIndex = lazy(async () => await import('@/routes/$domain/settings/index'))
const DomainSettingsAccountIndex = lazy(async () => await import('@/routes/$domain/settings/account/index'))
const DomainSettingsGeneralIndex = lazy(async () => await import('@/routes/$domain/settings/general/index'))
const DomainSettingsTeamIndex = lazy(async () => await import('@/routes/$domain/settings/team/index'))
const AccountsLayout = lazy(async () => await import('@/routes/accounts/_'))
const AccountsIndex = lazy(async () => await import('@/routes/accounts/index'))
const AccountsSignIn = lazy(async () => await import('@/routes/accounts/sign-in'))
const AccountsSignUp = lazy(async () => await import('@/routes/accounts/sign-up'))
const AccountsPasswordEdit = lazy(async () => await import('@/routes/accounts/password/edit'))
const AccountsPasswordForget = lazy(async () => await import('@/routes/accounts/password/forget'))

export const RootRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MatchAll />} />
        <Route index element={<Index />} />
        <Route path=":domain">
          <Route index element={<DomainIndex />} />
          <Route path="trash" element={<DomainTrash />} />
          <Route path=":docId/histories/:historyId" element={<DomainDocIdIndex />} />
          <Route path=":docId" element={<DomainDocIdIndex />} />
          <Route path="join">
            <Route path=":secret" element={<DomainJoinSecret />} />
          </Route>
          <Route path="settings" element={<DomainSettingsLayout />}>
            <Route index element={<DomainSettingsIndex />} />
            <Route path="account">
              <Route index element={<DomainSettingsAccountIndex />} />
            </Route>
            <Route path="general">
              <Route index element={<DomainSettingsGeneralIndex />} />
            </Route>
            <Route path="team">
              <Route index element={<DomainSettingsTeamIndex />} />
            </Route>
          </Route>
        </Route>
        <Route path="accounts" element={<AccountsLayout />}>
          <Route index element={<AccountsIndex />} />
          <Route path="sign_in" element={<AccountsSignIn />} />
          <Route path="sign_up" element={<AccountsSignUp />} />
          <Route path="password">
            <Route path="edit" element={<AccountsPasswordEdit />} />
            <Route path="forget" element={<AccountsPasswordForget />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
