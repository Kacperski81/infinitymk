export default function PageHeading({ title, mT, }: { title: string, mT?:string }) {
    return (
        <h2 className={`
            ${mT ? mT : 'mt-10'}
            xl:mt-14 
            font-(family-name:--font-aboreto) 
            self-center 
            pt-4 
            pb-2 
            px-10 
            text-2xl 
            text-(--main-50)
            text-center
            uppercase
            tracking-widest`}>
                {title}
        </h2>
    )
}