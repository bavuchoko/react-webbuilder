export type MenuData = {
  menus: Menu[]
}

export type Menu = {
  id: number
  name: string
  childre: Menu[]
}
