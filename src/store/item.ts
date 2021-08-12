import { defineStore } from 'pinia'

export type Item = {
  id: number;
  name: string;
  description: string;
}

export const useItemStore = defineStore({
  id: 'items',
  state: () => ({
    items: [] as Item[],
  }),
  getters: {
    getItems(state) {
      return state.items
    },
  },
  actions: {
    setItems(items: Item[]) {
      console.time('setItems')
      this.items = [...items]
      console.timeEnd('setItems')
    },
    updateItem(item: Item) {
      const index = this.items.findIndex((i) => i.id === item.id)
      console.time('updateItem')
      this.items.splice(index, 1, { ...item })
      console.timeEnd('updateItem')
    },
  },
})
