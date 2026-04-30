export type container = {
    layout: Layout
    grids:Grid[]
}
type Layout = 'normal' | 'narrow' | '2way' | '3way' | 'crown'

export type Grid = {
    id:number
    sections: Section[]
    axis: Axis
}

export  type Axis = {
    x: AxisType
    y: AxisType
}

type AxisType = 'auto' | 'scroll' | 'hidden'

export type Section = {
    elements:Element[]
}

export type Element = {
    isFullWidth : boolean
    component: Component
}

export type Component = {
    type: ComponentType
    index: number
}
export type ComponentType = 'input'| 'date' | 'object' | 'other'