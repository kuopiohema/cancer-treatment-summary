import { detach, rootRef } from "mobx-keystone"
import { Entity } from "./entity"

export const entityRef = rootRef<Entity>("catrest/EntityRef", {
    onResolvedValueChange(ref, newEntity, oldEntity) {
        if (oldEntity && !newEntity) {
            detach(ref)
        }
    }
})