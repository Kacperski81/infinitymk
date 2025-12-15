import StarIconSVG from "@/components/svgs/starSVG";
import type { Testimonial } from "@/types/index";

export default function Testimonial({ id, reviewer, content, backgroundImage, rating }: Testimonial) {
    return (
        <div
            className="
                relative
                isolate
                bg-cover bg-no-repeat 
                flex
                p-2
                justify-center
                items-start
                rounded-2xl
                "
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundPosition: `${id === 1 || 4 ? 'top' : 'bottom'}`
            }}
        >
            <div
                className="
                rounded-md
                px-4
                py-2
                relative
                isolate
                z-1
                text-(--main-50)               
                "
            >
                {/* Rating Stars */}    
                <div className="flex gap-1 mb-2 justify-center">
                    {Array.from({ length: rating }).map((_, index) => (
                        <div key={index} className="w-8 h-8 aspect-square">
                            <StarIconSVG  />
                        </div>
                    ))}
                </div>

                {/* Comment */}
                <blockquote className="mb-4">
                    <p className="text-(--main-50) text-sm lg:text-base leading-relaxed font-light">&ldquo;{content}&rdquo;</p>
                </blockquote>

                {/* Reviewer Name with Accent Line */}
                <div className="flex items-center gap-3 justify-end">
                    <div className="h-px w-8 bg-(--yellow-300)" />
                    <cite className="not-italic text-(--main-50) font-medium text-sm lg:text-base">{reviewer}</cite>
                </div>
            </div>
            <div className="rounded-xl absolute inset-0 z-0 bg-gradient-to-b from-(--main-800)/80 to-transparent"></div>

        </div>
    )
}