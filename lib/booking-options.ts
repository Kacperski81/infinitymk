import bookingOptions from "@/data/booking-options.json";
import type { BookingOption } from "@/types";

export function getBookingOptions(): BookingOption[] {
    return bookingOptions;
}