import Layout from '../../asstes/icons/layout.tsx'
import Grid from '../../asstes/icons/grid.tsx'
import Section from '../../asstes/icons/section.tsx'
import { useEffect, useMemo, useState } from 'react'
import Drawer from './Drawer.tsx'
import LayoutDrawerContent from '../drawers/LayoutDrawerContent.tsx'
import GridDrawerContent from '../drawers/GridDrawerContent.tsx'
import SectionDrawerContent from '../drawers/SectionDrawerContent.tsx'

export type WbMenuKey = 'layout' | 'grid' | 'section'

type DrawerKey = WbMenuKey | null

type WbMenuProps = {
  /** 외부(예: 페이지 셀렉터)에서 드로어를 강제로 닫을 때 증가 */
  closeNonce: number
  /** 드로어가 열리려는 순간 호출(페이지 셀렉터 닫기용) */
  onOpenIntent: () => void
}

export default function WbMenu({ closeNonce, onOpenIntent }: WbMenuProps) {
  const [activeDrawer, setActiveDrawer] = useState<DrawerKey>(null)

  const drawerWidth = useMemo(() => {
    switch (activeDrawer) {
      case 'layout':
        return 500
      case 'grid':
        return 460
      case 'section':
        return 320
      default:
        return 360
    }
  }, [activeDrawer])

  useEffect(() => {
    setActiveDrawer(null)
  }, [closeNonce])

  const toggleDrawer = (key: WbMenuKey) => {
    setActiveDrawer((prev) => {
      const next = prev === key ? null : key
      if (next) onOpenIntent()
      return next
    })
  }

  const drawerTitle = useMemo(() => {
    if (activeDrawer === 'layout') return '레이아웃'
    if (activeDrawer === 'grid') return '그리드'
    if (activeDrawer === 'section') return '섹션'
    return ''
  }, [activeDrawer])

  const accentColorFor = (key: WbMenuKey) => {
    if (key === 'layout') return '#2563eb' // blue
    if (key === 'grid') return '#7c3aed' // violet
    if (key === 'section') return '#00a87e' // orange
    return 'transparent'
  }

  const drawerAccentColor = useMemo(() => {
    if (!activeDrawer) return 'transparent'
    return accentColorFor(activeDrawer)
  }, [activeDrawer])

  const drawerContent = useMemo(() => {
    if (activeDrawer === 'layout') return <LayoutDrawerContent />
    if (activeDrawer === 'grid') return <GridDrawerContent />
    if (activeDrawer === 'section') return <SectionDrawerContent />
    return null
  }, [activeDrawer])

  return (
    <>
      <div className="wb-menu">
        <ul>
          <li
            data-tooltip="레이아웃"
            className={activeDrawer === 'layout' ? 'is-active' : undefined}
            onClick={() => toggleDrawer('layout')}
            style={{ ['--wb-accent' as never]: accentColorFor('layout') }}
          >
            <Layout style={{ width: '24px' }} />
          </li>
          <li
            data-tooltip="그리드"
            className={activeDrawer === 'grid' ? 'is-active' : undefined}
            onClick={() => toggleDrawer('grid')}
            style={{ ['--wb-accent' as never]: accentColorFor('grid') }}
          >
            <Grid style={{ width: '24px' }} />
          </li>
          <li
            data-tooltip="섹션"
            className={activeDrawer === 'section' ? 'is-active' : undefined}
            onClick={() => toggleDrawer('section')}
            style={{ ['--wb-accent' as never]: accentColorFor('section') }}
          >
            <Section style={{ width: '24px' }} />
          </li>
        </ul>
      </div>

      <Drawer
        open={!!activeDrawer}
        width={drawerWidth}
        title={drawerTitle}
        accentColor={drawerAccentColor}
        onClose={() => setActiveDrawer(null)}
      >
        {drawerContent}
      </Drawer>
    </>
  )
}
