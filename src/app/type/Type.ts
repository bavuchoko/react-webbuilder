import type {CSSProperties} from "react";
import type {
  Axis,
  Component,
  ComponentType,
  Element,
  Grid,
  PageLayoutContainer,
  PageLayoutType,
  Section,
} from '../types/PageLayout.ts'

/** @deprecated Prefer `PageLayoutContainer` from `src/app/types/PageLayout.ts` */
export type container = PageLayoutContainer

/** @deprecated Prefer `PageLayoutType` from `src/app/types/PageLayout.ts` */
export type Layout = PageLayoutType

export type { Axis, Component, ComponentType, Element, Grid, Section }



export type IconProps = {
    style?: CSSProperties
    onClick?:()=>void
    className?:string
}

