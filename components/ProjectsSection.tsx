export default function ProjectsSection() {
  return (
    <section className="w-full">
      {/* Full Width Stripe */}
      <div 
        className="w-full py-6 md:py-8"
        style={{ backgroundColor: "#869e9e" }}
      >
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-40">
            {/* Projelerimizi Keşfedin - 2 Satır */}
            <div className="font-gotham-bold uppercase text-white text-xl md:text-2xl text-center md:text-left">
              projelerimizi
              <br />
              keşfedin
            </div>

            {/* Evart Oran ve Evart Yalıkavak - Yan Yana */}
            <div className="flex items-center gap-10 md:gap-40">
              <div className="font-gotham-book uppercase text-white text-lg md:text-xl">
                evart oran
              </div>
              <div className="font-gotham-book uppercase text-white text-lg md:text-xl">
                evart yalıkavak
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

