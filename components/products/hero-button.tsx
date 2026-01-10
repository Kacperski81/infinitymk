export default function HeroButton({ label, handleBrowseModeChange } : { label: string, handleBrowseModeChange: () => void }) {
    return (
        // <button className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-(--main-50) text-sm font-bold leading-normal tracking-[0.015em] sm:text-base sm:font-bold sm:leading-normal sm:tracking-[0.015em] text-(--main-800)">
        <button 
            className="font-(family-name:--font-lato) group flex items-center justify-center gap-3 px-8 py-4 bg-(--main-150) text-(--main-800) rounded-sm text-sm lg:text-lg font-bold tracking-wide shadow-lg hover:shadow-2xl hover:bg-(--main-150)/90  transition-all duration-300"
            onClick={handleBrowseModeChange}
            >
            {label}
        </button>
    )
}