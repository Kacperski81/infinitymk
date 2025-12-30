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

export type CarouselItem = {
    id: string;
    imageUrl: string;
    alt: string;
}

export type LightBoxCarouselProps = {
    items: CarouselItem[];
    item: CarouselItem;
}


export type HairPartnersItem = {
    name: string;
    altText: string;
    imagePath: string;
}

export type HairOffer = {
    id: number;
    title: string;
    description: string;
    icon: string;
}

export type DavinesProduct = {
    id: string;
    internal_name: string;
    display_name: string;
    description: string;
    category: string;
    price: number;
    price_display: string;
    vendor: string;
    image_url: string;
    product_page_url: string;
    rating: number;
    rating_count: number;
    position: number;
    set_or_single: string;
}

export type DavinesProductsData = {
    products: DavinesProduct[];
}

export type EssentialHairCareInfo = {
  active: string;
  props: string;
  prod: string;
  story: string;
}

export type EssentialHairCareProduct = {
  name: string;
  type: string;
  short_description: string;
  full_description: string;
  usage: string;
  price: string;
  image: string;
}

export type EssentialHairCareFamily = {
  family: string;
  id: string;
  image: string;
  info: EssentialHairCareInfo;
  products: EssentialHairCareProduct[];
}

export type EssentialHairCareData = EssentialHairCareFamily[];