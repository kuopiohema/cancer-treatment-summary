import { randomId } from '@mantine/hooks'
import { Model, model, modelAction, prop } from 'mobx-keystone'

@model('catrest/Entity')
export class Entity extends Model({
    id: prop(() => randomId(''))
}) {
    @modelAction
    set<K extends keyof this, V extends this[K]>(key: K, value: V) {
        this[key] = value
    }
}