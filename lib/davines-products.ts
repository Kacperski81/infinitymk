import dedeProductsData from '@/data/dede.json';
import type { DavinesProductsData } from '@/types';

export function getDavinesProducts(name: string): DavinesProductsData[] {
    switch (name) {
        case 'dede':
            return dedeProductsData;
        default:
            return [];
    }
}