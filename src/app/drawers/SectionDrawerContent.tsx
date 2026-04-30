export default function SectionDrawerContent() {
  return (
    <div className="wb-drawer-content">
      <div className="wb-drawer-section">
        <div className="wb-drawer-section-title">섹션 추가</div>
        <div className="wb-drawer-grid">
          <button type="button" className="wb-drawer-chip">
            빈 섹션
          </button>
          <button type="button" className="wb-drawer-chip">
            텍스트
          </button>
          <button type="button" className="wb-drawer-chip">
            이미지
          </button>
          <button type="button" className="wb-drawer-chip">
            CTA
          </button>
        </div>
      </div>
      <div className="wb-drawer-section">
        <div className="wb-drawer-section-title">템플릿</div>
        <div className="wb-drawer-card">추천 섹션 템플릿 리스트</div>
      </div>
    </div>
  )
}

