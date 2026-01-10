export default function Frame() {
  return (
    <div className="z-1 hidden lg:block fixed inset-0 pointer-events-none max-w-[2000px] mx-auto">

      <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">

        <path xmlns="http://www.w3.org/2000/svg" d="M5 5V795H1195V5H5Z" stroke="var(--main-100)" strokeWidth="var(--top-frame-width)" fill="none" opacity="1" />

        <path d="M15,455 L15,785 L1185,785 L1185,15 L710,15 M490,15 L15,15 L15,350" stroke="var(--main-200)" strokeWidth="var(--bottom-frame-width)" fill="none" opacity="1" />
        
      </svg>
    </div>
  );
}