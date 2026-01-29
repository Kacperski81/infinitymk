import tags from '@/data/browse-tags.json';
import type { Tag } from '@/types/index';

export function getBrowseTags(): Tag[] {
    return tags.tags;
}