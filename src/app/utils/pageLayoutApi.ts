import type { PageLayoutContainer } from '../types/PageLayout.ts'

export type PageLayoutPayload = PageLayoutContainer | string

export function normalizePageLayoutPayload(payload: PageLayoutPayload): PageLayoutContainer {
  if (typeof payload === 'string') {
    return JSON.parse(payload) as PageLayoutContainer
  }
  return payload
}
