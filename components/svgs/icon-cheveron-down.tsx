interface IconCheveronDownProps {
    className?: string;
    isOpen?: boolean;
}

export default function IconCheveronDown({ className = "", isOpen }: IconCheveronDownProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${className}`.trim()}
        >
            <path d="M15.3 10.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z" />
        </svg>
    );
}