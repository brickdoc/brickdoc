/* eslint-disable max-nested-callbacks */
import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { usePageDiscussionContextValue } from '../PageDiscussionContext'

describe('PageDiscussionContext', () => {
  describe('usePageDiscussionContextValue', () => {
    it('triggers addConversation normally', async () => {
      const markId = 'markId'
      // eslint-disable-next-line max-nested-callbacks
      const { result } = renderHook(() => usePageDiscussionContextValue())
      const { addConversation } = result.current

      expect(result.current.discussion.conversations).toHaveLength(0)

      await act(
        async () =>
          await addConversation?.(
            {
              markId,
              quotedContent: 'content',
              state: 'OPENED',
              comments: []
            },
            {
              content: []
            }
          )
      )

      expect(result.current.discussion.conversations).toHaveLength(1)
      expect(result.current.discussion.conversations[0].markId).toEqual(markId)
      expect(result.current.discussion.conversations[0].comments).toHaveLength(1)
    })

    it('triggers addComment normally', async () => {
      const markId = 'markId'
      const { result } = renderHook(usePageDiscussionContextValue)
      const { addConversation, addComment } = result.current

      await act(
        async () =>
          await addConversation?.(
            {
              markId,
              quotedContent: 'content',
              state: 'OPENED',
              comments: []
            },
            {
              content: []
            }
          )
      )

      expect(result.current.discussion.conversations[0].comments).toHaveLength(1)

      await act(
        async () =>
          await addComment?.(result.current.discussion.conversations[0].id, {
            content: []
          })
      )

      expect(result.current.discussion.conversations[0].comments).toHaveLength(2)
    })

    it('triggers removeConversation normally', async () => {
      const markId = 'markId'
      const { result } = renderHook(usePageDiscussionContextValue)
      const { addConversation, removeConversation } = result.current

      await act(
        async () =>
          await addConversation?.(
            {
              markId,
              quotedContent: 'content',
              state: 'OPENED',
              comments: []
            },
            {
              content: []
            }
          )
      )

      expect(result.current.discussion.conversations).toHaveLength(1)

      await act(async () => await removeConversation?.(result.current.discussion.conversations[0].id))

      expect(result.current.discussion.conversations).toHaveLength(0)
    })

    it('triggers resolveConversation normally', async () => {
      const markId = 'markId'
      const { result } = renderHook(usePageDiscussionContextValue)
      const { addConversation, resolveConversation } = result.current

      await act(
        async () =>
          await addConversation?.(
            {
              markId,
              quotedContent: 'content',
              state: 'OPENED',
              comments: []
            },
            {
              content: []
            }
          )
      )
      await act(async () => await resolveConversation?.(result.current.discussion.conversations[0].id))

      expect(result.current.discussion.conversations[0].state).toBe('RESOLVED')
    })

    it('triggers openConversation normally', async () => {
      const markId = 'markId'
      const { result } = renderHook(usePageDiscussionContextValue)
      const { addConversation, resolveConversation, openConversation } = result.current

      await act(
        async () =>
          await addConversation?.(
            {
              markId,
              quotedContent: 'content',
              state: 'OPENED',
              comments: []
            },
            {
              content: []
            }
          )
      )

      await act(async () => await resolveConversation?.(result.current.discussion.conversations[0].id))

      await act(async () => await openConversation?.(result.current.discussion.conversations[0].id))

      expect(result.current.discussion.conversations[0].state).toBe('OPENED')
    })
  })
})
