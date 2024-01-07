import { defineStore } from "pinia"
const actions = {
  toggleAutopause(){
    this.autopause = !this.autopause
  }
}

const state = {
  autopause: true
}

export const useSettingStore = defineStore('settings', {
  state: () => state,
  actions
})
