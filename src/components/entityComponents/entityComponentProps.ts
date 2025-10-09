import { Entity } from "../../store/entity"

export interface EntityComponentProps<E extends Entity> {
    data: E
}