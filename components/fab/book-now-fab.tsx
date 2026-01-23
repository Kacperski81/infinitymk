"use client";

import { useState, useEffect, useRef } from "react";
import IconCalendar from "../svgs/icon-calendar";
import IconPhone from "../svgs/icon-phone";
import IconCloseCircle from "../svgs/close-circle";
import styles from "./book-now-fab.module.css";

export type BookingOption = {
    id: string;
    serviceName: string;
    providerName: string;
    phoneNumber: string;
}

const bookingOptions: BookingOption[] = [
    {
        id: "hair",
        serviceName: "Hair Services",
        providerName: "Magda",
        phoneNumber: "+44 20 1234 5678",
    },
    {
        id: "nails",
        serviceName: "Nail Services",
        providerName: "Ela",
        phoneNumber: "+44 20 1234 5679",
    },
    {
        id: "beauty",
        serviceName: "Beauty Treatments",
        providerName: "Anna",
        phoneNumber: "+44 20 1234 5680",
    },
];

export default function BookNowFab() {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Close modal when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                modalRef.current &&
                buttonRef.current &&
                !modalRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    return (
        <>
            {/* Backdrop overlay */}
            <div
                className={`fixed inset-0 bg-[var(--main-900)]/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                aria-hidden="true"
            />

            {/* Modal with Glassmorphism */}
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="booking-modal-title"
                className={`fixed z-50 rounded-2xl shadow-2xl transition-all duration-300 ease-out
          bottom-24 right-4 sm:right-6 
          w-[calc(100vw-2rem)] max-w-sm
          bg-[var(--main-50)]/70 backdrop-blur-[12px] border border-[var(--main-100)]/60
          ${isOpen
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                    }`}
            >
                <div className={styles.glassModalInner}>
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 border-b border-[var(--main-200)]/50">
                        <h2
                            id="booking-modal-title"
                            className="text-lg font-semibold text-[var(--main-800)] tracking-wide"
                        >
                            Book an Appointment
                        </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 rounded-full hover:bg-[var(--main-200)]/60 transition-colors text-[var(--main-700)]"
                            aria-label="Close booking menu"
                        >
                            <IconCloseCircle />
                        </button>
                    </div>

                    {/* Booking Options */}
                    <ul className="p-3 space-y-2">
                        {bookingOptions.map((option) => (
                            <li key={option.id}>
                                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-[var(--main-100)]/30 transition-colors group">
                                    {/* Avatar placeholder with enhanced border for glass clarity */}
                                    <div className={`${styles.glassAvatar} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                                        <span className="text-[var(--main-700)] text-sm font-semibold">
                                            {option.providerName
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </span>
                                    </div>

                                    {/* Service info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-[var(--main-800)] text-sm sm:text-base">
                                            {option.serviceName}
                                        </p>
                                        <p className="text-xs sm:text-sm text-[var(--main-600)] truncate">
                                            with {option.providerName}
                                        </p>
                                    </div>

                                    {/* Call to Book link */}
                                    <a
                                        href={`tel:${option.phoneNumber.replace(/\s/g, "")}`}
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[var(--main-800)] text-[var(--main-50)] text-xs sm:text-sm font-medium hover:bg-[var(--main-700)] transition-colors whitespace-nowrap shadow-md"
                                        aria-label={`Call to book ${option.serviceName}`}
                                    >
                                        <IconPhone />
                                        <span className="hidden sm:inline">Call to Book</span>
                                        <span className="sm:hidden">Call</span>
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Footer note */}
                    <div className="px-4 pb-4 pt-1">
                        <p className="text-xs text-[var(--main-600)] text-center">
                            Tap to call and schedule your appointment
                        </p>
                    </div>
                </div>
            </div>

            {/* FAB Button with Glassmorphism */}
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-4 sm:right-6 lg:right-8 lg:bottom-8 z-50 flex items-center gap-2 px-5 py-3.5 rounded-full shadow-lg transition-all duration-300 ease-out
          backdrop-blur-[14px] border
          ${isOpen
                        ? styles.glassFabDark
                        : styles.glassFab
                    }
          hover:scale-105 active:scale-95`}
                aria-expanded={isOpen}
                aria-haspopup="dialog"
                aria-label={isOpen ? "Close booking menu" : "Open booking menu"}
            >
                <IconCalendar />
                <span className="font-medium text-sm tracking-wide whitespace-nowrap">Book Now</span>
            </button>
        </>
    );
}
