import { use, useState } from "react";
import { Entity } from "../types/form/entity";
import { NavContext, Path } from "../context/navContext";

export type AddCallback = () => void
export type UpdateCallback<E extends Entity> = (item: E) => void
export type SwapCallback = (firstIndex: number, secondIndex: number) => void
export type RemoveCallback = (id: string) => void
export type SetCallback<E extends Entity> = (list: E[]) => void

export interface EntityList<E extends Entity> {
    entities: E[]
    actions: {
        add: AddCallback
        update: UpdateCallback<E>
        swap: SwapCallback
        remove: RemoveCallback
        set: SetCallback<E>
    }
}

export const useEntityList = <E extends Entity>(entityFactory: () => E, page?: Path): EntityList<E> => {
    const [entities, setEntities] = useState<E[]>([])

    const nav = use(NavContext)

    const add = () => {
        const newEntity = entityFactory()
        setEntities([...entities, newEntity])
        if (page)
            nav?.setCurrentPath(page, newEntity.id)
    }

    const update = (entity: E) => {
        const index = entities.findIndex(element => element.id === entity.id)
        if (index === -1)
            return
        const newEntities = [...entities]
        newEntities[index] = entity
        setEntities(newEntities)
    }

    const swap = (firstIndex: number, secondIndex: number) => {
        const newEntities = [...entities]
        if (firstIndex < 0 || firstIndex > newEntities.length - 1 || secondIndex < 0 || secondIndex > newEntities.length - 1)
            return
        [newEntities[firstIndex], newEntities[secondIndex]] = [newEntities[secondIndex], newEntities[firstIndex]]
        setEntities(newEntities)
    }

    const remove = (id: string) => {
        const index = entities.findIndex(element => element.id === id)
        if (index === -1)
            return

        const newEntities = entities.filter(element => element.id !== id)
        setEntities(newEntities)

        if (page && nav?.currentPath.path === page && nav?.currentPath.entityId === id) {
            if (newEntities.length > 0) {
                const prevIndex = Math.min(index, newEntities.length - 1)
                nav?.setCurrentPath(page, newEntities[prevIndex].id)
            } else {
                nav?.setCurrentPath('start', '')
            }
        }
    }

    const set = (entityList: E[]) => {
        setEntities(entityList)
        if (page && nav?.currentPath.path === page) {
            if (entityList.length > 0)
                nav?.setCurrentPath(page, entityList[0].id)
            else
                nav?.setCurrentPath('start', '')
        }
    }

    return {
        entities,
        actions: {
            add, update, swap, remove, set
        }
    }
}