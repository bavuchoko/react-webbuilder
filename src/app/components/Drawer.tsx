import { type ReactNode, useEffect } from 'react'
import Close from "../../asstes/icons/close.tsx";

type DrawerProps = {
  open: boolean
  width: number | string
  accentColor?: string
  title?: ReactNode
  children?: ReactNode
  onClose: () => void
  closeOnOverlayClick?: boolean
  closeOnEsc?: boolean
}

export default function Drawer({
  open,
  width,
  accentColor,
  title,
  children,
  onClose,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}: DrawerProps) {
  useEffect(() => {
    if (!open || !closeOnEsc) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, closeOnEsc, onClose])

  return (
    <>
      <div
        className={open ? 'wb-drawer-overlay is-open' : 'wb-drawer-overlay'}
        aria-hidden={!open}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      <aside
        className={open ? 'wb-drawer is-open' : 'wb-drawer'}
        style={{ width: typeof width === 'number' ? `${width}px` : width }}
        aria-hidden={!open}
      >
        <div
          className="wb-drawer-accent"
          style={{ background: accentColor ?? 'transparent' }}
          aria-hidden
        />
        <div className="wb-drawer-header">
          <div className="wb-drawer-title">{title}</div>
          <Close
            onClick={onClose}
          />
        </div>
        {children}
      </aside>
    </>
  )
}

