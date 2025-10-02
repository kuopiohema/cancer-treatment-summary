import { Entity } from "../../types/form/entity";

export interface ItemPageInnerProps<E extends Entity> {
    item: E
    onUpdate: <K extends keyof E, V extends E[K]>(key: K, value: V) => void
}