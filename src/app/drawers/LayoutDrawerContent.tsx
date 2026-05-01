import { useState } from 'react'

export default function LayoutDrawerContent() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="wb-drawer-content">
      <div className={`wb-drawer-menu`} style={{width:'150px'}}>
        <ul>
          <li
            className={selectedIndex === 0 ? 'is-selected' : undefined}
            onClick={() => setSelectedIndex(0)}
          >
            <span>일반</span>
          </li>
          <li
            className={selectedIndex === 1 ? 'is-selected' : undefined}
            onClick={() => setSelectedIndex(1)}
          >
            <span>좁은형태</span>
          </li>
          <li
            className={selectedIndex === 2 ? 'is-selected' : undefined}
            onClick={() => setSelectedIndex(2)}
          >
            <span>2열</span>
          </li>
          <li
            className={selectedIndex === 3 ? 'is-selected' : undefined}
            onClick={() => setSelectedIndex(3)}
          >
            <span>3열</span>
          </li>
          <li
            className={selectedIndex === 4 ? 'is-selected' : undefined}
            onClick={() => setSelectedIndex(4)}
          >
            <span>크라운</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

