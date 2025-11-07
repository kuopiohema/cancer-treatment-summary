import { randomId } from '@mantine/hooks'
import { computed } from 'mobx'
import { detach, Model, model, modelAction, prop, rootRef } from 'mobx-keystone'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { navCtx } from '../store'

@model('catrest/entity')
export class Entity extends Model({
    id: prop(() => randomId(''))
}) {
    itemName = 'kohde'

    getRefId() {
        return this.id
    }

    @modelAction
    set<K extends keyof this, V extends this[K]>(key: K, value: V) {
        this[key] = value
    }

    @computed
    get heading(): string {
        return this.id
    }

    @computed
    get content(): TextListItem[] {
        return [this.id]
    }

    @modelAction
    select() {
        navCtx.get(this)?.selectEntity(this)
    }

    @computed
    get isSelected() {
        return navCtx.get(this)?.selectedEntity?.current?.id === this.id
    }
}

export const entityRef = rootRef<Entity>('catrest/EntityRef', {
    onResolvedValueChange(ref, newEntity, oldEntity) {
        if (oldEntity && !newEntity) {
            detach(ref)
        }
    }
})