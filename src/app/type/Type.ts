import type {CSSProperties} from "react";

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
    key: string
}
export type ComponentType = 'input'| 'date' | 'object' | 'other'



export type IconProps = {
    style?: CSSProperties
    onClick?:()=>void
    className?:string
}