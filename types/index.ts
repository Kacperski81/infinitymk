export type ServiceData = {
    id: string
    name: string
    image: string;
    services: Array<{
        name: string
        description: string
        icon: string
    }>
}

export type Testimonial = {
    id: number;
    reviewer: string;
    content: string;
    backgroundImage: string;
    rating: number;
}

// Hair services types

export type HairServiceItem = {
    service: string;
    price?: string;
    short_hair_price?: string;
    medium_hair_price?: string;
    long_hair_price?: string | null;
};

export type HairServiceCategory = {
    id: string;
    name: string;
    items: HairServiceItem[];
};

export type HairServicesData = HairServiceCategory[];

export type TreatmentsData = {
    name: string;
    description: string;
    price: string;
}