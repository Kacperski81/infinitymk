import testimonials from "@/data/testimonials-data.json";

export function getTestimonialsData() {
    return testimonials;
}

export function getTestimonialsDataCarousel() {
    // For carousel, we need to add first and last item to the start and end respectively for infinite loop effect
    const firstItem = testimonials[0];
    const lastItem = testimonials[testimonials.length - 1];
    return [lastItem, ...testimonials, firstItem];
}