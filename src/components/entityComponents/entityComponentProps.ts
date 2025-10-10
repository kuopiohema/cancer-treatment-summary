import { Entity } from "../../store/entity/entity"

export interface EntityComponentProps<E extends Entity> {
    data: E
}