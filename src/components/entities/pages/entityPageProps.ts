import { IViewModel } from "mobx-utils";

export interface EntityPageProps<E> {
    entity: E & IViewModel<E>
}