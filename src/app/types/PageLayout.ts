export type PageLayoutType = 'normal' | 'narrow' | '2way' | '3way' | 'crown'

export type AxisType = 'auto' | 'scroll' | 'hidden'

export type Axis = {
  x: AxisType
  y: AxisType
}

export type ComponentType = 'input' | 'date' | 'object' | 'other'

export type Component = {
  type: ComponentType
  key: string
}

export type Element = {
  isFullWidth: boolean
  component: Component
}

export type Section = {
  elements: Element[]
}

export type Grid = {
  id: number
  sections: Section[]
  axis: Axis
}

/**
 * 페이지(캔버스) 레이아웃 문서(JSON)의 최상위 형태입니다.
 */
export type PageLayoutContainer = {
  layout: PageLayoutType
  grids: Grid[]
}

export function stringifyPageLayout(layout: PageLayoutContainer): string {
  return JSON.stringify(layout)
}

export function parsePageLayoutJson(raw: string): PageLayoutContainer {
  return JSON.parse(raw) as PageLayoutContainer
}
