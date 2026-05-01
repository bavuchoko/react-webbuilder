import PageSelect from './PageSelect.tsx'
import type { MenuData } from '../types/MenuData.ts'
import type { PageLayoutPayload } from '../utils/pageLayoutApi.ts'

type NavProps = {
  data: MenuData
  defaultSelectedId?: number | null
  fetchPageLayout: (pageId: number) => Promise<PageLayoutPayload>
  /** 외부(예: Drawer)에서 페이지 셀렉터를 강제로 닫을 때 증가 */
  closePageSelectNonce: number
  /** 페이지 셀렉터가 열리려는 순간 호출(Drawer 닫기용) */
  onOpenIntent: () => void
}

export default function Nav({ data, defaultSelectedId, fetchPageLayout, closePageSelectNonce, onOpenIntent }: NavProps) {
  return (
    <div className="wb-nav-bar">
      <div className="wb-nav-top">
        <span className="wb-logo">WB</span>
      </div>
      <div className="wb-nav-bottom">
        <PageSelect
          menuData={data}
          defaultSelectedId={defaultSelectedId}
          fetchPageLayout={fetchPageLayout}
          closeNonce={closePageSelectNonce}
          onOpenIntent={onOpenIntent}
        />
      </div>
    </div>
  )
}
