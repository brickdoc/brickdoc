import { MouseEvent, ReactNode, useMemo, useState, forwardRef, ForwardRefRenderFunction } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import type { Identifier } from 'dnd-core'
import { rem } from 'polished'
import { Right } from '@brickdoc/design-icons'
import { useMemoizedFn } from '../../hooks'
import { useForwardedRef } from '../../hooks/useForwardedRef'

import { NodeMovement, NodeRelativeSpot, InternalTreeNode, TreeNodeRenderer, TreeNode } from './constants'
import { TreeRoot } from './style'
import { calculateRelativeSpot } from './helpers'

export interface NodeProps {
  data: InternalTreeNode
  className?: string
  emptyNode?: string | ReactNode
  onToggleExpansion: (node: InternalTreeNode) => void
  onSelect?: (node: InternalTreeNode) => void
  nodeRenderer?: TreeNodeRenderer
  selected?: boolean
  index: number
  onMoveNode: (item: NodeMovement) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

const DND_NODE_TYPE = 'node'

/** Tree
 * @example
 */
export const InternalNode: ForwardRefRenderFunction<HTMLDivElement, NodeProps> = (
  { data, className, onToggleExpansion, onSelect, nodeRenderer, selected, emptyNode, index, onMoveNode },
  _ref
) => {
  const { id, icon = '', parentId, rootId, isExpanded, hasChildren, indent } = data
  const [ref, updateCallback] = useForwardedRef(_ref)
  const [dropSpot, setDropSpot] = useState<NodeRelativeSpot | null>(null)

  const handleSelect = useMemoizedFn(_e => onSelect?.(data))

  const handleToggleExpand = useMemoizedFn((e: MouseEvent) => {
    e.stopPropagation()
    onToggleExpansion(data)
  })

  const hasEmptyNode = useMemo(() => !parentId && rootId === id && !hasChildren, [parentId, rootId, id, hasChildren])

  const emptyItem = typeof emptyNode === 'string' ? <TreeRoot.EmptyNode>{emptyNode}</TreeRoot.EmptyNode> : emptyNode

  const showEmptyItem = hasEmptyNode && isExpanded ? emptyItem : null

  const [{ isDragging }, drag] = useDrag({
    type: DND_NODE_TYPE,
    item: { id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [{ handlerId, isOver, isOverCurrent }, drop] = useDrop<
    DragItem,
    void,
    {
      handlerId: Identifier | null
      isOver: boolean
      isOverCurrent: boolean
    }
  >({
    accept: DND_NODE_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver()
      }
    },
    hover(item, monitor: any) {
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      setDropSpot(calculateRelativeSpot(monitor.getClientOffset(), ref.current))
    },
    drop(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      const dropSpot = calculateRelativeSpot(monitor.getClientOffset(), ref.current)

      // Time to actually perform the action
      if (dropSpot !== null) {
        onMoveNode?.({
          sourceIndex: dragIndex,
          sourceId: item.id,
          targetIndex: hoverIndex,
          targetId: id,
          targetSpot: dropSpot
        })
      }
    }
  })

  const renderBorder = useMemo(() => {
    let css = {}
    switch (dropSpot) {
      case NodeRelativeSpot.Before:
        css = {
          borderTop: isOver && isOverCurrent ? '2px dashed blue' : 'none'
        }
        break
      case NodeRelativeSpot.AsChild:
        css = {
          border: isOver && isOverCurrent ? '1px dashed blue' : 'none'
        }
        break
      case NodeRelativeSpot.After:
        css = {
          borderBottom: isOver && isOverCurrent ? '2px dashed blue' : 'none'
        }
        break
      default:
        css = {}
        break
    }
    return css
  }, [isOver, isOverCurrent, dropSpot])

  drag(drop(ref))

  return (
    <>
      <TreeRoot.Base
        ref={updateCallback}
        data-handler-id={handlerId}
        dragging={isDragging}
        selected={selected}
        role="button"
        tabIndex={0}
        data-testid="BrkTree"
        className={className}
        css={renderBorder}>
        <TreeRoot.Indent
          css={{
            width: rem(`${16 * indent}px`)
          }}
          data-testid="indent"
        />
        <TreeRoot.PageItem
          data-testid="page-item"
          css={{
            width: `calc(100% - ${rem(`${16 * indent}px`)})`
          }}>
          <TreeRoot.ItemContent data-testid="item-content" onClick={handleSelect}>
            <TreeRoot.Content data-testid="content">
              {hasChildren || hasEmptyNode ? (
                <TreeRoot.ContentArrow isExpanded={isExpanded} data-testid="content-arrow" onClick={handleToggleExpand}>
                  <Right data-testid="content-icon" />
                </TreeRoot.ContentArrow>
              ) : (
                <TreeRoot.ContentArrow data-testid="content-arrow" onClick={handleToggleExpand}>
                  <TreeRoot.LeafDot data-testid="leaf-dot" />
                </TreeRoot.ContentArrow>
              )}
              {icon ? <TreeRoot.ContentIcon data-testid="content-icon">{icon}</TreeRoot.ContentIcon> : <></>}
              {/* Todo: fixed TS2769: No overload matches this call. pressProps.css */}
              <TreeRoot.ContentAction data-testid="content-action">
                {(nodeRenderer ?? defaultNodeRenderer)(data)}
              </TreeRoot.ContentAction>
            </TreeRoot.Content>
          </TreeRoot.ItemContent>
        </TreeRoot.PageItem>
      </TreeRoot.Base>
      {showEmptyItem}
    </>
  )
}

export const Node = forwardRef(InternalNode)
Node.displayName = 'Node'

function defaultNodeRenderer(node: TreeNode): ReactNode {
  return <div>{node.text}</div>
}
