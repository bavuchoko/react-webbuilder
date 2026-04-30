export default function GridDrawerContent() {
  return (
    <div className="wb-drawer-content">
      <div className="wb-drawer-section">
        <div className="wb-drawer-section-title">그리드 설정</div>
        <div className="wb-drawer-form">
          <label className="wb-drawer-field">
            <span>컬럼</span>
            <input defaultValue="12" />
          </label>
          <label className="wb-drawer-field">
            <span>거터</span>
            <input defaultValue="24" />
          </label>
          <label className="wb-drawer-field">
            <span>마진</span>
            <input defaultValue="24" />
          </label>
        </div>
      </div>
      <div className="wb-drawer-section">
        <div className="wb-drawer-section-title">가이드</div>
        <div className="wb-drawer-card">중앙선 / 기준선 / 스냅 옵션</div>
      </div>
    </div>
  )
}

