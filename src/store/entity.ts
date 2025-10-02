import { randomId } from "@mantine/hooks";
import { Model, model, tProp, types } from "mobx-keystone";

@model('catrest/entity')
export class Entity extends Model({
    id: tProp(types.string, () => randomId(''))
}) {}