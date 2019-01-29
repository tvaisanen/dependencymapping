

import { Mapping } from './mapping/mapping.types';
import {Asset} from './asset/asset.types';
import {Connection} from './connection/connection.types';
import {Tag} from './tag/tag.types';

export type FormAndOptionalCallback = {
    form: Asset | Connection | Mapping | Tag,
    callback: ?(any) => void
};