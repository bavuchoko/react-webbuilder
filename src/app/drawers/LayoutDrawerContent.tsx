export default function LayoutDrawerContent() {
  return (
    <div className="wb-drawer-content">
      <div className="wb-drawer-section">
        <div className="wb-drawer-section-title">페이지</div>
        <div className="wb-drawer-card">캔버스 크기 / 디바이스 프리셋</div>
        <div className="wb-drawer-card">여백 / 패딩 / 배경</div>
      </div>
      <div className="wb-drawer-section">
        <div className="wb-drawer-section-title">레이아웃 프리셋</div>
        <div className="wb-drawer-grid">
          <button type="button" className="wb-drawer-chip">
            2 컬럼
          </button>
          <button type="button" className="wb-drawer-chip">
            3 컬럼
          </button>
          <button type="button" className="wb-drawer-chip">
            Hero
          </button>
          <button type="button" className="wb-drawer-chip">
            Pricing
          </button>
        </div>
      </div>
    </div>
  )
}

