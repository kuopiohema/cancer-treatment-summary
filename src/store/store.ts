import { Data } from './data.ts'
import { FormStore } from './formStore'
import { NavStore } from './navStore'

export const data = new Data()
export const form = new FormStore()
export const nav = new NavStore()