import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { Menu, MenuData } from '../types/MenuData.ts'
import type { PageLayoutPayload } from '../utils/pageLayoutApi.ts'
import { normalizePageLayoutPayload } from '../utils/pageLayoutApi.ts'

type PageSelectProps = {
  menuData: MenuData
  defaultSelectedId?: number | null
  fetchPageLayout: (pageId: number) => Promise<PageLayoutPayload>
  closeNonce: number
  onOpenIntent: () => void
}

function findFirstLeafId(menus: Menu[]): number | null {
  for (const m of menus) {
    if (m.childre.length === 0) return m.id
    const nested = findFirstLeafId(m.childre)
    if (nested !== null) return nested
  }
  return null
}

function findNameById(menus: Menu[], id: number): string | null {
  for (const m of menus) {
    if (m.childre.length === 0) {
      if (m.id === id) return m.name
      continue
    }
    const nested = findNameById(m.childre, id)
    if (nested !== null) return nested
  }
  return null
}

export default function PageSelect({
  menuData,
  defaultSelectedId,
  fetchPageLayout,
  closeNonce,
  onOpenIntent,
}: PageSelectProps) {
  const [open, setOpen] = useState(false)
  const initialSelectedId = useMemo(() => {
    if (defaultSelectedId != null) {
      const name = findNameById(menuData.menus, defaultSelectedId)
      if (name) return defaultSelectedId
    }
    return findFirstLeafId(menuData.menus)
  }, [defaultSelectedId, menuData.menus])

  const [selectedId, setSelectedId] = useState<number | null>(initialSelectedId)
  const [loading, setLoading] = useState(false)
  const loadSeq = useRef(0)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const listboxId = useId()

  const selectedLabel = useMemo(() => {
    if (selectedId == null) return ''
    return findNameById(menuData.menus, selectedId) ?? ''
  }, [menuData.menus, selectedId])

  useEffect(() => {
    setOpen(false)
    setLoading(false)
  }, [closeNonce])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: MouseEvent | PointerEvent) => {
      const el = rootRef.current
      if (!el) return
      const target = e.target as Node | null
      if (target && el.contains(target)) return
      setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className="wb-page-select" ref={rootRef}>
      <button
        type="button"
        className={`wb-page-select-trigger${loading ? ' is-loading' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-busy={loading}
        aria-controls={listboxId}
        disabled={loading}
        onClick={() =>
          setOpen((v) => {
            const next = !v
            if (next) onOpenIntent()
            return next
          })
        }
      >
        <span className="wb-page-select-label">페이지:</span>
        <span className="wb-page-select-value">{selectedLabel || '선택'}</span>
        <span className="wb-page-select-spinner-slot" aria-hidden="true">
          <span className={`wb-spinner${loading ? ' is-active' : ''}`} />
        </span>
        <span className="wb-page-select-chevron" aria-hidden />
      </button>

      <div className={`wb-page-select-dropdown${open ? ' is-open' : ''}`}>
        <div className="wb-page-select-dropdown-scroll" role="presentation">
          <ul className="wb-page-select-list" id={listboxId} role="listbox">
            {menuData.menus.map((group) => (
              <li key={group.id} role="presentation" className="wb-page-select-group">
                <div className="wb-page-select-group-title" role="presentation">
                  {group.name}
                </div>
                <ul role="group" aria-label={group.name} className="wb-page-select-items">
                  {group.childre.map((item) => {
                    const selected = item.id === selectedId
                    return (
                      <li key={item.id} role="none">
                        <button
                          type="button"
                          role="option"
                          aria-selected={selected}
                          disabled={loading}
                          id={`wb-page-opt-${item.id}`}
                          className={selected ? 'wb-page-select-item is-selected' : 'wb-page-select-item'}
                          onClick={() => {
                            const seq = ++loadSeq.current
                            setLoading(true)

                            ;(async () => {
                              try {
                                const payload = await fetchPageLayout(item.id)
                                void normalizePageLayoutPayload(payload)

                                if (loadSeq.current !== seq) return
                                setSelectedId(item.id)
                                setOpen(false)
                              } catch (e) {
                                console.warn('[PageSelect] fetchPageLayout 실패:', e)
                              } finally {
                                if (loadSeq.current !== seq) return
                                setLoading(false)
                              }
                            })()
                          }}
                        >
                          <span>{item.name}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div className="wb-page-select-footer">
          <div className="wb-page-select-manage">
            <p>페이지 관리</p>
          </div>
        </div>
      </div>
    </div>
  )
}
