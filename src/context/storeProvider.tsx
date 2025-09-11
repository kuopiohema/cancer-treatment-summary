import { PropsWithChildren, useMemo, useState } from "react";
import { Entity } from "../types/form/entity";
import { Store, StoreActions, StoreContext, StoreActionsContext } from "./storeContext";

const StoreProvider = ({children}: PropsWithChildren) => {
    const storeDefault: Store = {
        diagnoses: [],
        treatments: [],
        chemotherapies: [],
        radiotherapies: [],
        procedures: [],
        stemCellTransplants: []
    }

    const [store, setStore] = useState<Store>({...storeDefault})

    const actions: StoreActions = useMemo(() => {
        const add = <T extends Entity>(path: keyof Store, itemFactory: () => T) => {
            const list = [...store[path], itemFactory()]
            setStore({ ...store, [path]: list })
        }

        const update = <T extends Entity>(path: keyof Store, item: T) => {
            const index = store[path].findIndex((searchItem) => searchItem.id === item.id)
            if (index === -1)
                return
            const oldList = [...store[path]]
            const newList = [...oldList.slice(0, index), item, ...oldList.slice(index + 1, oldList.length - 1)]
            setStore({ ...store, [path]: newList })
        }

        const swap = (path: keyof Store, firstIndex: number, secondIndex: number) => {
            const list = [...store[path]]
            if (firstIndex < 0 || firstIndex > list.length - 1 || secondIndex < 0 || secondIndex > list.length - 1)
                return
            [list[firstIndex], list[secondIndex]] = [list[secondIndex], list[firstIndex]]
            setStore({ ...store, [path]: list })
        }

        const remove = (path: keyof Store, id: string) => {
            const index = store[path].findIndex((searchItem) => searchItem.id === id)
            if (index === -1)
                return
            const list = [...store[path]].splice(index, 1)
            setStore({ ...store, [path]: list })
        }
        return {add, update, swap, remove}
    }, [store])

    return (
        <StoreContext value={store}>
            <StoreActionsContext value={actions}>
                {children}
            </StoreActionsContext>
        </StoreContext>
    )
}

export default StoreProvider