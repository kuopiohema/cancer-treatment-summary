import { Entity } from "../form/entity"

export type AddCallback = () => void
export type UpdateCallback<E extends Entity> = (item: E) => void
export type SwapCallback = (firstIndex: number, secondIndex: number) => void
export type RemoveCallback = (id: string) => void