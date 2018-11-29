
import type { Asset } from '../asset/asset.types';
import type { Mapping } from '../mapping/mapping.types';
import type { Tag } from '../tag/tag.types';

import { ASSET, MAPPING, TAG } from '../../constants/types';

export type ActiveDetailState = {
    data: Asset | Mapping | Tag,
    type: ASSET | MAPPING | TAG,
}