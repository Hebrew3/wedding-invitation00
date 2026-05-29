import { useState, useEffect, useRef, useCallback } from "react";
import EnvelopeIntro from "./EnvelopeIntro";
import MusicToggle from "./MusicToggle";
import { useWeddingMusic } from "./useWeddingMusic";
import Countdown from "./Countdown";
import FloatingHearts from "./FloatingHearts";
import WeddingTimeline from "./WeddingTimeline";
import {
  formatProgramName,
  partitionPrincipalSponsors,
  splitIntoColumns,
} from "./formatProgramName";
import "./App.css";

// Import gallery images
import img1 from "./assets/wedding/IRN06176.jpg";
import img2 from "./assets/wedding/IRN06180.jpg";
import img3 from "./assets/wedding/IRN06184.jpg";
import img4 from "./assets/wedding/IRN06190.jpg";
import img5 from "./assets/wedding/IRN06194.jpg";
import img6 from "./assets/wedding/IRN06207.jpg";
import img7 from "./assets/wedding/IRN06216.jpg";
import img8 from "./assets/wedding/IRN06247.jpg";
import img9 from "./assets/wedding/IRN06262.jpg";
import img10 from "./assets/wedding/IRN06276.jpg";
import img11 from "./assets/wedding/IRN06280.jpg";
import img12 from "./assets/wedding/IRN06310.jpg";

// Import home background and location images
import homeHero from "./assets/asset/RED04586.jpg";
import churchLocation from "./assets/asset/Church.png";
import receptionLocation from "./assets/asset/Reception.png";

export default function App() {

  const [isOpened, setIsOpened] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { play, toggleMute, mute, isPlaying, isMuted } = useWeddingMusic();
  const filmSectionRef = useRef(null);

  // Gallery images array using imports
  const galleryImages = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => {
      clearInterval(slideTimer);
    };
  }, [galleryImages.length]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", isMenuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [isMenuOpen]);

  useEffect(() => {
    const section = filmSectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isPlaying && !isMuted) {
          mute();
        }
      },
      { threshold: 0.55 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isPlaying, isMuted, mute]);

  // Gallery slide functions
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleVideoNavClick = useCallback(() => {
    if (isPlaying && !isMuted) {
      mute();
    }
    setIsMenuOpen(false);
  }, [isMuted, isPlaying, mute]);

  const palette = ["#7b001c", "#a94a5a", "#c9818b", "#e5b8c3", "#ffffff"];

  const entourage = {
    groomsMen: [
      "Mr. Jaybee De Guzman",
      "Mr. Clarenz Soriano",
      "Mr. Aldrin Dimaisip",
      "Mr. Jairo Alindugan",
      "Mr. Justine De Sagun",
      "Mr. Justine Paolo Diaz",
      "Mr. Ian Carl Cabungcal",
      "Mr. Johnloyd De Sagun",
      "Mr. Edcel Dacillo",
      "Mr. Jake Ivan Pujante",
      "Mr. Jose Olayres",
      "Mr. Jhun-Jhun Dimaisip",
    ],
    bridesMaids: [
      "Ms. Shervil De Ocampo",
      "Ms. Yana Laurice Valencia",
      "Ms. Cristine De Ocampo",
      "Ms. Nikylla Banaguas",
      "Ms. Aliyah Dimaisip",
      "Ms. Bernalyn Manalo",
      "Ms. Rayzelle Dimaisip",
      "Ms. Sandy Ruby Legaspi",
      "Ms. May Manalo",
      "Ms. Jessica Paquibot",
      "Ms. Rizza Joie Cantalejo",
      "Ms. Mary Gelli Panes",
    ],
  };

  const ceremonial = {
    bestMan: "Mr. AJ Dimaisip",
    maidOfHonor: "Ms. Mary Glenne Gabia",
    toLightOurPath: [
      { name: "Mr. Paolo Javier", spouse: "Mrs. Rica Joy Javier" },
      { name: "Mr. Alden Kobe Maranan", spouse: "Mrs. Miriam Maranan" },
    ],
    toClotheAsOne: [
      { name: "Mr. Ar-Jay Cabungcal" },
      { name: "Mr. Regie Dimaisip" },
      { name: "Ms. Ma. Jialen Clavillas" },
      { name: "Ms. Alleen Dimaisip" },
      { name: "Mrs. Aileen Dimaisip" },
    ],
    toBindUsTogether: [
      { name: "Mr. Paul Niño Manalese" },
      { name: "Mr. Louie Cabungcal" },
      { name: "Ms. Jubi De Los Reyes" },
      { name: "Ms. Michelle Botial" },
    ],
  };

  const sponsors = {
    groomParents: ["Mr. Ogie Dimaisip", "Mrs. Aileen Dimaisip"],
    brideParents: ["Mr. Meljon Apas", "Mrs. Anna Marie Garcia"],
    principalSponsors: [
      "Mr. Jayar Basco",
      "Mr. Randy Manalo",
      "Mr. Romel Escueta",
      "Mr. Marsel Cue",
      "Mr. Ryan Mendoza",
      "Mr. Melencio Hernandez",
      "Mr. Rolando Cabral",
      "Mr. Ranny Caringal",
      "Mr. Cesar Bascuguin",
      "Mr. Rolando Rivera",
      "Mr. Estelito Lopez",
      "Mr. Florentino Dela Cuesta",
      "Mr. Jayson Dinamarca",
      "Mrs. Michelle Bascuguin",
      "Mrs. Melissa Manalo",
      "Mrs. Janice Escueta",
      "Mrs. Mary Ann Zarra",
      "Mrs. Roselyn Hermosa",
      "Mrs. Herminia Hernandez",
      "Mrs. Melanie Cabral",
      "Mrs. Noime Caringal",
      "Mrs. Michelle Basquiquin",
      "Mrs. Richelle Cabungcal",
      "Mrs. Regina Lopez",
      "Mrs. Marita Dela Cuesta",
      "Mrs. Lovely Ann Dinamarca",
      "Mrs. Marissa Granada",
      "Mrs. Marlineth Cabungcal",
      "Ms. Jennifer Pernia",
    ],
  };

  const bearers = {
    loveBearers: ["Mr. Raven Kyle Garcia", "Ms. Yassy Dimaisip"],
    ringBearer: "Mr. Lanz Matthew Cabungcal",
    coinBearers: ["Mr. John Michael Lubiano"],
    bibleBearers: ["Mr. Jeiden Maranan"],
    flowerGirls: [
      "Ms. Althea Iroy",
      "Ms. Viberry Basco",
      "Ms. Faith Soguilon",
      "Ms. Jaycee Labrador",
      "Ms. Phia Paula Manalo",
    ],
  };

  const { men: principalMen, women: principalWomen } = partitionPrincipalSponsors(
    sponsors.principalSponsors,
  );
  const clotheColumns = splitIntoColumns(ceremonial.toClotheAsOne);
  const bindColumns = splitIntoColumns(ceremonial.toBindUsTogether);

  if (!isOpened) {
    return (
      <EnvelopeIntro
        onOpenStart={play}
        onOpen={() => setIsOpened(true)}
      />
    );
  }

  return (
    <div className="site bg-[#f7f3f3] text-[#7b001c] main-enter">
      <FloatingHearts variant="default" />
      <MusicToggle
        isPlaying={isPlaying}
        isMuted={isMuted}
        onToggle={toggleMute}
      />

        <nav className="site-nav fixed top-0 left-0 right-0 bg-[#7b001c] text-white shadow-lg z-40">
          <div className="nav-inner">
            <a href="#home" className="nav-logo text-white no-underline">
              J &amp; C
            </a>

            <div className="nav-links">
              <a href="#home" className="nav-link text-white">Home</a>
              <a href="#hero" className="nav-link nav-link-feature text-white">
                <span className="nav-label-long">The wedding feature</span>
                <span className="nav-label-short">Wedding</span>
              </a>
              <a href="#timeline" className="nav-link text-white">Timeline</a>
              <a href="#gallery" className="nav-link text-white">Gallery</a>
              <a href="#details" className="nav-link text-white">Details</a>
              <a href="#film" className="nav-link nav-link-video text-white" onClick={handleVideoNavClick}>VIDEO</a>
            </div>

            <button
              type="button"
              className="nav-toggle md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>

          {isMenuOpen && (
            <div className="nav-drawer md:hidden">
              <a href="#home" className="nav-drawer-link text-white" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="#hero" className="nav-drawer-link text-white" onClick={() => setIsMenuOpen(false)}>The wedding feature</a>
              <a href="#timeline" className="nav-drawer-link text-white" onClick={() => setIsMenuOpen(false)}>Timeline</a>
              <a href="#gallery" className="nav-drawer-link text-white" onClick={() => setIsMenuOpen(false)}>Gallery</a>
              <a href="#details" className="nav-drawer-link text-white" onClick={() => setIsMenuOpen(false)}>Details</a>
              <a href="#film" className="nav-drawer-link nav-drawer-video text-white" onClick={handleVideoNavClick}>VIDEO</a>
            </div>
          )}
        </nav>

        <section
          id="home"
          className="section-home section-block text-white text-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${homeHero})`,
          }}
        >
          <div className="z-10 w-full max-w-4xl mx-auto">
            <p className="home-eyebrow uppercase text-white mb-3 md:mb-4">
              Countdown to June 6, 2026
            </p>
            <h1 className="home-title text-white mb-3 md:mb-4">
              JUSTIN &amp; CRISTINE
            </h1>
            <p className="home-tagline text-white mb-6 md:mb-8">
              Are Getting Married
            </p>

            <Countdown />
          </div>
        </section>

        <section
          id="hero"
          className="section-invite section-block flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.88), rgba(255,255,255,0.88)), url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop')",
          }}
        >
          <div className="invite-card bg-white text-center">

            <img
              src="https://png.pngtree.com/png-clipart/20230817/original/pngtree-watercolor-burgundy-flowers-bouquet-picture-image_8008404.png"
              alt=""
              className="invite-flowers"
            />

            <p className="uppercase tracking-[0.2em] md:tracking-[0.35em] text-[#b75d73] text-xs md:text-sm mt-12 md:mt-16">
              Save The Date
            </p>

            <h2 className="font-vibes text-3xl md:text-5xl mt-3 md:mt-5 text-[#7b001c]">
              We
            </h2>

            <h1 className="invite-names text-[#7b001c] mt-2 md:mt-3">
              JUSTIN
              <span className="invite-and block my-1 md:my-2">&amp;</span>
              CRISTINE
            </h1>

            <p className="mt-4 md:mt-6 text-xs md:text-base text-[#7d5a63] px-2">
              Together with our families ask for your presence
              as we are united on
            </p>

            <h2
              className="text-2xl md:text-4xl lg:text-5xl font-bold mt-6 md:mt-10 leading-tight"
              style={{ fontFamily: "Playfair Display" }}
            >
              SATURDAY, 6TH OF
              <br />
              JUNE 2026
            </h2>

            <p className="mt-4 md:mt-6 leading-7 md:leading-8 text-xs md:text-base">
              AT EIGHT O'CLOCK IN THE MORNING
              <br />
              Please arrive thirty minutes before the start of the ceremony.
            </p>

            <div className="mt-6 md:mt-10">
              <h3
                className="text-xl md:text-2xl"
                style={{ fontFamily: "Playfair Display" }}
              >
                CEREMONY
              </h3>

              <p className="text-xs md:text-base">
                Parish of the Immaculate Conception,
                <br />
                Balayan, Batangas
              </p>
            </div>

            <div className="mt-6 md:mt-8">
              <h3
                className="text-xl md:text-2xl"
                style={{ fontFamily: "Playfair Display" }}
              >
                WEDDING RECEPTION
              </h3>

              <p className="text-xs md:text-base">
                AGAP Building, Balayan Government Center
              </p>
            </div>
          </div>
        </section>

        <WeddingTimeline />

        <section id="gallery" className="section-block bg-gradient-to-b from-[#f7f3f3] to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="section-title text-[#7b001c]">Our Happy Moments</h2>
              <div className="section-divider" />
              <p className="section-subtitle">Cherished memories leading up to our special day</p>
            </div>

            <div className="relative w-full mb-8 md:mb-14">
              <div className="gallery-stage group">
                {galleryImages.map((src, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      i === currentSlide 
                        ? "opacity-100 scale-100" 
                        : "opacity-0 scale-95"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`Gallery ${i + 1}`}
                      className="gallery-slide-img"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={prevSlide}
                  className="gallery-arrow gallery-arrow-prev"
                  aria-label="Previous slide"
                >
                  <span className="text-2xl md:text-3xl font-bold leading-none">‹</span>
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  className="gallery-arrow gallery-arrow-next"
                  aria-label="Next slide"
                >
                  <span className="text-2xl md:text-3xl font-bold leading-none">›</span>
                </button>

                <div className="gallery-meta gallery-meta-right">
                  {currentSlide + 1} / {galleryImages.length}
                </div>

                <div className="gallery-meta gallery-meta-left">
                  <p className="font-semibold uppercase tracking-widest text-[#f3c4c4] m-0">
                    Memory {currentSlide + 1}
                  </p>
                </div>
              </div>

              <div className="gallery-dots">
                {galleryImages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goToSlide(i)}
                    className={`gallery-dot ${i === currentSlide ? "gallery-dot-active" : "gallery-dot-inactive"}`}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === currentSlide ? "true" : undefined}
                  />
                ))}
              </div>
            </div>

            <div className="text-center mt-8 md:mt-10">
              <p className="text-[#b75d73] text-sm md:text-base">
                <span className="font-bold text-[#7b001c] text-lg md:text-xl">{galleryImages.length}</span> treasured moments captured
              </p>
            </div>
          </div>
        </section>

        <section id="film" ref={filmSectionRef} className="section-block bg-gradient-to-b from-[#f7f3f3] to-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-[#7b001c]">Save The Date Video</h2>
            <div className="video-wrap">
              <iframe
                src="https://drive.google.com/file/d/1AcPcQB_gL4TTbYIw2UMzn1XgNNoQGn8J/preview"
                title="Wedding Film - Justin & Cristine"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section id="details" className="section-block details-section bg-white">
          <div className="max-w-4xl mx-auto">

            <h2 className="section-title text-[#7b001c]">The Finer Details</h2>
            <p className="text-center text-[#7d5a63] mb-6 md:mb-8 text-sm md:text-base px-2">
              Dress code, colors, and wedding program details.
            </p>

            <div className="detail-card detail-program-card mb-8 md:mb-10">
              <p className="detail-program-script">Dress Code</p>
              <div className="detail-dress-block">
                <h5 className="detail-dress-heading">PRINCIPAL SPONSORS</h5>
                <p className="detail-program-name m-0">Gentlemen: American Suit and Slacks</p>
                <p className="detail-program-name m-0">Ladies: Long Gown</p>
              </div>
              <div className="detail-dress-block mt-6">
                <h5 className="detail-dress-heading">GUESTS</h5>
                <p className="detail-program-name m-0">
                  We encourage you to dress in casual attire according to our wedding colors
                </p>
              </div>
              <div className="palette-row mt-8">
                {palette.map((c) => (
                  <div key={c} className="flex flex-col items-center">
                    <div className="palette-swatch" style={{ background: c }} aria-hidden />
                  </div>
                ))}
              </div>
            </div>

            {/* THE BEARERS SECTION */}
            <div className="mb-8 md:mb-10 text-[#7d5a63] text-sm md:text-base">
              <h3 className="text-2xl md:text-3xl text-center mb-4 md:mb-6 font-semibold" style={{ fontFamily: "Playfair Display" }}>
                The Bearers
              </h3>
              
              <div className="detail-card detail-program-card">
                <p className="detail-program-script">To Honor</p>
                <div className="mb-6 md:mb-8">
                  <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">LOVE BEARERS</h4>
                  <div className="detail-pair-row text-sm md:text-base">
                    {bearers.loveBearers.map((name) => (
                      <p key={name} className="detail-program-name m-0">{formatProgramName(name)}</p>
                    ))}
                  </div>
                </div>

                <div className="mb-6 md:mb-8">
                  <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">RING BEARER</h4>
                  <p className="detail-program-name text-sm md:text-base m-0">{formatProgramName(bearers.ringBearer)}</p>
                </div>

                <div className="mb-6 md:mb-8">
                  <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">COIN BEARER</h4>
                  <p className="detail-program-name text-sm md:text-base m-0">{formatProgramName(bearers.coinBearers[0])}</p>
                </div>

                <div className="mb-6 md:mb-8">
                  <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">BIBLE BEARER</h4>
                  <p className="detail-program-name text-sm md:text-base m-0">{formatProgramName(bearers.bibleBearers[0])}</p>
                </div>

                <div>
                  <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">FLOWER GIRLS</h4>
                  <div className="detail-name-list text-sm md:text-base">
                    {bearers.flowerGirls.map((f) => (
                      <p key={f} className="detail-program-name m-0">{formatProgramName(f)}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* THE SPONSORS SECTION */}
            <div className="mb-8 md:mb-10 text-[#7d5a63] text-sm md:text-base">
              <h3 className="text-2xl md:text-3xl text-center mb-4 md:mb-6 font-semibold" style={{ fontFamily: "Playfair Display" }}>
                The Sponsors
              </h3>

              <div className="detail-card detail-program-card">
                <p className="detail-program-script">Grace and Blessing</p>
                <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 font-playfair">
                  DIMAISIP - APAS
                </h4>
                <p className="text-sm md:text-base mb-6 md:mb-8 italic">NUPTIAL</p>

                <div className="sponsor-grid mb-6 md:mb-8">
                  <div>
                    <h5 className="text-base md:text-lg font-semibold mb-2 md:mb-3" style={{ fontFamily: "Great Vibes", fontSize: "20px" }}>
                      Groom&apos;s Parents
                    </h5>
                    <div className="detail-name-list text-xs md:text-sm">
                      {sponsors.groomParents.map((name) => (
                        <p key={name} className="detail-program-name m-0">{formatProgramName(name)}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-base md:text-lg font-semibold mb-2 md:mb-3" style={{ fontFamily: "Great Vibes", fontSize: "20px" }}>
                      Bride&apos;s Parents
                    </h5>
                    <div className="detail-name-list text-xs md:text-sm">
                      {sponsors.brideParents.map((name) => (
                        <p key={name} className="detail-program-name m-0">{formatProgramName(name)}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Principal Sponsors</h5>
                  <p className="text-xs md:text-sm mb-3 md:mb-4 italic">To stand as witness to our vows</p>
                  <div className="principal-split text-xs md:text-sm">
                    <div className="principal-col principal-col-men">
                      {principalMen.map((name) => (
                        <p key={name} className="detail-program-name m-0">{formatProgramName(name)}</p>
                      ))}
                    </div>
                    <div className="principal-col principal-col-women">
                      {principalWomen.map((name) => (
                        <p key={name} className="detail-program-name m-0">{formatProgramName(name)}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* THE CEREMONIAL ROLES SECTION */}
            <div className="mb-8 md:mb-10 text-[#7d5a63] text-sm md:text-base">
              <h3 className="text-2xl md:text-3xl text-center mb-4 md:mb-6 font-semibold" style={{ fontFamily: "Playfair Display" }}>
                The Ceremonial Roles
              </h3>

              <div className="detail-card detail-program-card">
                <p className="detail-program-script">Ceremonial Roles</p>
                <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-6" style={{ fontFamily: "Playfair Display" }}>
                  DIMAISIP - APAS
                </h4>
                <p className="text-sm md:text-base mb-6 md:mb-8 italic">NUPTIAL</p>

                <h5 className="text-base md:text-lg font-semibold mb-4 md:mb-6" style={{ fontFamily: "Great Vibes", fontSize: "22px" }}>
                  Ceremonial Roles
                </h5>

                <div className="space-y-4 md:space-y-6">
                  <div className="detail-pair-row detail-role-grid text-xs md:text-sm">
                    <div>
                      <h6 className="text-base md:text-lg font-semibold mb-1 md:mb-2">BEST MAN</h6>
                      <p className="detail-program-name m-0">{formatProgramName(ceremonial.bestMan)}</p>
                    </div>

                    <div>
                      <h6 className="text-base md:text-lg font-semibold mb-1 md:mb-2">MAID OF HONOR</h6>
                      <p className="detail-program-name m-0">{formatProgramName(ceremonial.maidOfHonor)}</p>
                    </div>
                  </div>

                  <div>
                    <h6 className="text-base md:text-lg font-semibold mb-2 md:mb-3">TO LIGHT OUR PATH</h6>
                    {ceremonial.toLightOurPath.map((p) => (
                      <div key={p.name} className="detail-pair-row text-xs md:text-sm">
                        <p className="detail-program-name m-0">{formatProgramName(p.name)}</p>
                        <p className="detail-program-name m-0">{formatProgramName(p.spouse)}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h6 className="text-base md:text-lg font-semibold mb-2 md:mb-3">TO CLOTHE AS ONE</h6>
                    <div className="detail-pair-row text-xs md:text-sm">
                      <div className="detail-name-list">
                        {clotheColumns[0].map((p) => (
                          <p key={p.name} className="detail-program-name m-0">{formatProgramName(p.name)}</p>
                        ))}
                      </div>
                      <div className="detail-name-list">
                        {clotheColumns[1].map((p) => (
                          <p key={p.name} className="detail-program-name m-0">{formatProgramName(p.name)}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h6 className="text-base md:text-lg font-semibold mb-2 md:mb-3">TO BIND US TOGETHER</h6>
                    <div className="detail-pair-row text-xs md:text-sm">
                      <div className="detail-name-list">
                        {bindColumns[0].map((p) => (
                          <p key={p.name} className="detail-program-name m-0">{formatProgramName(p.name)}</p>
                        ))}
                      </div>
                      <div className="detail-name-list">
                        {bindColumns[1].map((p) => (
                          <p key={p.name} className="detail-program-name m-0">{formatProgramName(p.name)}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* THE ENTOURAGE SECTION */}
            <div className="text-[#7d5a63] text-sm md:text-base">
              <h3 className="text-2xl md:text-3xl text-center mb-4 md:mb-6 font-semibold" style={{ fontFamily: "Playfair Display" }}>
                The Entourage
              </h3>

              <div className="detail-card detail-program-card">
                <p className="detail-program-script">Entourage</p>
                <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-6" style={{ fontFamily: "Playfair Display" }}>
                  DIMAISIP - APAS
                </h4>
                <p className="text-sm md:text-base mb-6 md:mb-8 italic">NUPTIAL</p>

                <h5 className="text-base md:text-lg font-semibold mb-6 md:mb-8" style={{ fontFamily: "Great Vibes", fontSize: "22px" }}>
                  The Entourage
                </h5>

                <div className="entourage-grid">
                  <div>
                    <h6 className="text-base md:text-lg font-semibold mb-3 md:mb-4">GROOM&apos;S MEN</h6>
                    <div className="detail-name-list text-xs md:text-sm">
                      {entourage.groomsMen.map((n) => (
                        <p key={n} className="detail-program-name m-0">{formatProgramName(n)}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h6 className="text-base md:text-lg font-semibold mb-3 md:mb-4">BRIDE&apos;S MAIDS</h6>
                    <div className="detail-name-list text-xs md:text-sm">
                      {entourage.bridesMaids.map((n) => (
                        <p key={n} className="detail-program-name m-0">{formatProgramName(n)}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 md:mt-8 text-center text-xs text-[#7d5a63]">
              If any names need correction, update the arrays at the top of this file.
            </p>
          </div>
        </section>

        <footer className="site-footer floral-footer text-white">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-8 md:mb-10 px-2">
              <p className="text-xs md:text-sm mb-2 md:mb-3">Please share your photos using our official hashtag</p>
              <div className="hashtag-box floral-hashtag-box text-[#7b001c] rounded-lg">
                <p className="hashtag-text m-0">
                  #CREATINEWCHAPTERWITHTATIN
                </p>
              </div>
            </div>

            {/* Location Guide */}
            <div className="mb-8 md:mb-10">
              <h3 className="text-xl md:text-2xl text-center mb-6 md:mb-8" style={{ fontFamily: "Great Vibes" }}>
                Location Guide
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Church QR */}
                <div className="text-center">
                  <div className="bg-white p-3 md:p-4 rounded-lg inline-block mb-3 md:mb-4">
                    <img
                      src={churchLocation}
                      alt="Church location"
                      className="location-img"
                    />
                  </div>
                  <h4 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">CHURCH</h4>
                  <p className="text-xs md:text-sm">
                    Parish of the Immaculate<br />
                    Conception, Balayan, Batangas
                  </p>
                </div>

                {/* Reception QR */}
                <div className="text-center">
                  <div className="bg-white p-3 md:p-4 rounded-lg inline-block mb-3 md:mb-4">
                    <img
                      src={receptionLocation}
                      alt="Reception location"
                      className="location-img"
                    />
                  </div>
                  <h4 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">RECEPTION</h4>
                  <p className="text-xs md:text-sm">
                    AGAP Building, Balayan<br />
                    Government Center
                  </p>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center border-t border-[#f3c4c4] pt-4 md:pt-6">
              <p className="text-xs md:text-sm">Justin & Cristine Wedding 2026</p>
            </div>

          </div>
        </footer>

      </div>
  );
}