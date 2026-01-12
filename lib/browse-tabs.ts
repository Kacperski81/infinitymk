import tags from '@/data/browse-tags.json';
import type { tag } from '@/types/index';

export function getBrowseTags(): tag[] {
    return tags.tags;
}