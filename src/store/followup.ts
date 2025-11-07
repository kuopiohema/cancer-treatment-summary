import { computed } from "mobx";
import { Model, model, modelAction, prop } from "mobx-keystone";
import { buildTextList } from "../utils/buildTextList";

@model('catrest/followup')
export class Followup extends Model({
    general: prop('').withSetter(),
    vaccination: prop('').withSetter()
}) {
    @modelAction
    clear() {
        this.general = ''
        this.vaccination = ''
    }

    @computed
    get sublabel() {
        return buildTextList([
            { label: 'Yleisohjeet', content: this.general ? 'Syötetty' : 'Ei syötetty' },
            { label: 'Rokotusohjeet', content: this.vaccination ? 'Syötetty' : 'Ei syötetty' }
        ])
    }
}