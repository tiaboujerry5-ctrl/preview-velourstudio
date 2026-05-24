import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion"
import { cn } from "./lib/utils"
import { ArrowRight, Phone, Mail, MapPin, ChevronDown, Menu, X, Star, Check } from "lucide-react"

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

const BOOKING_URL = "https://app.acuityscheduling.com/schedule.php?owner=18078174"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
]

const services = [
  { title: "Microblading", icon: "✦", desc: "Hair-stroke brow technique delivering natural, defined arches that move with your expressions.", duration: "2.5 hrs" },
  { title: "Microshading / Powder Brows", icon: "◈", desc: "Soft, filled-in brow look using a dotting method — perfect for all skin types including oily.", duration: "2.5 hrs" },
  { title: "Lip Blush Tattoo", icon: "◉", desc: "Restore lip colour, define the border and add subtle fullness — no filler required.", duration: "3 hrs" },
  { title: "Permanent Eyeliner", icon: "◑", desc: "Wake up with perfectly defined eyes. Choose from lash-line enhancement to a bold wing.", duration: "2 hrs" },
  { title: "Scalp Micropigmentation", icon: "◎", desc: "Create the illusion of hair density or a razor-sharp shaved look using precise pigment dots.", duration: "3–5 hrs" },
  { title: "Areola & Nipple Reconstruction", icon: "✿", desc: "Compassionate restorative tattooing for post-mastectomy clients. Realistic, dignified results.", duration: "2 hrs" },
  { title: "Collagen Induction / Microneedling", icon: "⬡", desc: "Stimulate your skin's natural renewal process to reduce fine lines, scars and uneven texture.", duration: "1.5 hrs" },
  { title: "Saline Removal & Lightening", icon: "◇", desc: "Safe, effective lightening and removal of unwanted cosmetic tattoos using saline solution.", duration: "1–2 hrs" },
  { title: "Scar Camouflage Tattooing", icon: "✶", desc: "Blend scars and stretch marks back into the surrounding skin tone with paramedical pigmentation.", duration: "2 hrs" },
]

const galleryImages = [
  "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?ixlib=rb-4.1.0&w=800&q=85&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1633681926035-ec1ac984418a?ixlib=rb-4.1.0&w=800&q=85&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1706629503650-cade709d15e3?ixlib=rb-4.1.0&w=800&q=85&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1633681926019-03bd9325ec20?ixlib=rb-4.1.0&w=800&q=85&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1706629506571-a6d86798916b?ixlib=rb-4.1.0&w=800&q=85&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?ixlib=rb-4.1.0&w=800&q=85&fit=crop&auto=format",
]

const testimonials = [
  { name: "Cassandra M.", quote: "I walked out with the most beautiful brows I have ever had. The attention to detail and the care throughout the process was unlike anything I expected. Absolutely life-changing.", stars: 5 },
  { name: "Renata L.", quote: "My lip blush turned out even better than the inspiration photos I brought in. The colour is so natural and my lips finally look defined again. I am obsessed.", stars: 5 },
  { name: "Jordan T.", quote: "As someone with hair loss, the scalp micropigmentation gave me my confidence back. The results are incredibly realistic and the studio felt completely safe and professional.", stars: 5 },
  { name: "Michelle B.", quote: "The permanent eyeliner is the best decision I ever made. Getting ready in the morning takes half the time and I always look polished. Worth every penny.", stars: 5 },
]

const faqs = [
  {
    q: "Is every client a suitable candidate for cosmetic tattooing?",
    a: "Not every skin type or health condition is compatible with cosmetic tattooing. Your safety is our first priority. Please reach out before booking if you have any of the following: active eczema, psoriasis or dermatitis in the treatment area; a personal history of keloid scarring or pigmentation irregularities; blood disorders or conditions that affect healing such as diabetes; current use of blood thinners or aspirin; autoimmune conditions; pregnancy or breastfeeding; current or recent Accutane, retin-A or retinol use; severely sun-damaged or very thin skin; known allergies to hair dyes, metals, food colouring or lidocaine; or chemotherapy/radiation within the past 12 months. We are always happy to discuss your individual situation.",
  },
  {
    q: "How is your studio kept safe and hygienic?",
    a: "Velour Studio operates under strict Alberta Health Services guidelines and is subject to regular health inspector assessments. We go well beyond the minimum requirements. Every procedure uses single-use, individually packaged disposable needles and blades. All pigments used are composed solely of FDA-approved tattooing ingredients. Our studio surfaces and equipment are sanitised and disinfected between every client.",
  },
  {
    q: "What should I expect during healing?",
    a: "After your procedure you will receive a full written aftercare guide along with a complimentary healing ointment. Following these instructions closely is essential to a beautiful result. In most cases you will wash the treated area on day one and then keep it dry while the surface heals. Pigment will appear darker for the first several days before softening into the final colour. Touch-up appointments are included or available to perfect your result.",
  },
  {
    q: "How do I prepare for my appointment?",
    a: "Avoid alcohol, aspirin, fish oil and vitamin E supplements for 48 hours before your visit as these thin the blood. Come with a clean face and, for brow services, do not tint, wax or thread brows within one week prior. Arrive with your natural brows intact so your artist can map the most flattering shape for your face. Eat a light meal beforehand to maintain stable blood sugar.",
  },
]

const stats = [
  { value: "500+", label: "Clients Served" },
  { value: "200+", label: "5-Star Reviews" },
  { value: "30+", label: "Certifications" },
  { value: "7+", label: "Years of Mastery" },
]

function ButtonPrimary({ children, href, onClick, className }) {
  return (
    <motion.a
      href={href || BOOKING_URL}
      target={href && !href.startsWith("#") ? "_blank" : undefined}
      rel="noopener noreferrer"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#b07d6e] text-[#fdf8f5] font-semibold text-sm tracking-wide hover:bg-[#8f5f52] transition-colors duration-200 cursor-pointer",
        className
      )}
    >
      {children}
    </motion.a>
  )
}

function ButtonGhost({ children, href, onClick, className }) {
  return (
    <motion.a
      href={href || BOOKING_URL}
      target={href && !href.startsWith("#") ? "_blank" : undefined}
      rel="noopener noreferrer"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#b07d6e] text-[#b07d6e] font-semibold text-sm tracking-wide hover:bg-[#b07d6e] hover:text-[#fdf8f5] transition-colors duration-200 cursor-pointer",
        className
      )}
    >
      {children}
    </motion.a>
  )
}

function ServiceCard({ service, index }) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative bg-[#f5ede8] text-[#3b2a2a] rounded-2xl p-6 flex flex-col gap-3 overflow-hidden group cursor-default"
    >
      <div className="w-12 h-12 rounded-xl bg-[#b07d6e]/10 flex items-center justify-center text-[#b07d6e] text-2xl font-serif mb-1">
        {service.icon}
      </div>
      <h3 className="font-serif text-lg font-bold text-[#2c1f1f] leading-snug">{service.title}</h3>
      <p className="text-sm text-[#6b5249] leading-relaxed flex-1">{service.desc}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs font-semibold bg-[#b07d6e]/10 text-[#b07d6e] px-3 py-1 rounded-full">{service.duration}</span>
        <motion.a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-xs font-semibold text-[#b07d6e] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          Book <ArrowRight size={12} />
        </motion.a>
      </div>
    </motion.div>
  )
}

function GalleryItem({ src, index }) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer"
    >
      <img src={src} alt="Velour Studio work" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2c1f1f]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
        <span className="text-[#fdf8f5] text-sm font-semibold tracking-widest uppercase flex items-center gap-2">
          View Work <ArrowRight size={14} />
        </span>
      </div>
    </motion.div>
  )
}

function TestimonialCard({ t, index }) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-[#f5ede8] rounded-2xl p-7 flex flex-col gap-4"
    >
      <div className="flex gap-1">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} size={16} fill="#b07d6e" className="text-[#b07d6e]" />
        ))}
      </div>
      <p className="text-[#3b2a2a] text-sm leading-relaxed italic font-serif">"{t.quote}"</p>
      <p className="text-[#b07d6e] text-sm font-semibold">— {t.name}</p>
    </motion.div>
  )
}

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#e8d9d2]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-serif font-semibold text-[#2c1f1f] text-base leading-snug">{faq.q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={20} className="text-[#b07d6e] flex-shrink-0" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[#6b5249] text-sm leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -120])

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40))
    return unsub
  }, [scrollY])

  return (
    <div className="bg-[#fdf8f5] font-sans text-[#3b2a2a] overflow-x-hidden">
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled ? "backdrop-blur-xl bg-[#fdf8f5]/90 border-b border-[#e8d9d2] shadow-sm" : "bg-[#2c1f1f]"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <a href="#home" className={cn("font-serif font-bold text-xl tracking-tight transition-colors", scrolled ? "text-[#2c1f1f]" : "text-[#fdf8f5]")}>
            Velour Studio
          </a>
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#b07d6e]",
                  scrolled ? "text-[#3b2a2a]" : "text-[#fdf8f5]/80"
                )}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <ButtonPrimary href={BOOKING_URL}>Book Online</ButtonPrimary>
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn("lg:hidden p-2 rounded-lg", scrolled ? "text-[#2c1f1f]" : "text-[#fdf8f5]")}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-[#2c1f1f] border-t border-[#3d2b2b] px-6 pb-6 pt-2"
            >
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block py-3 text-[#fdf8f5]/80 hover:text-[#b07d6e] text-sm font-medium border-b border-[#3d2b2b] last:border-0"
                >
                  {l.label}
                </motion.a>
              ))}
              <div className="mt-4">
                <ButtonPrimary href={BOOKING_URL} className="w-full justify-center">Book Online</ButtonPrimary>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO */}
      <section id="home" className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?ixlib=rb-4.1.0&w=1600&q=85&fit=crop&auto=format"
            alt="Velour Studio interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#2c1f1f]/55" />
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-block mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-[#b07d6e] bg-[#b07d6e]/10 px-4 py-1.5 rounded-full"
            >
              Fort McMurray, Alberta
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-[#fdf8f5] leading-[1.05] mb-5"
            >
              Wake Up<br />Effortlessly You.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-[#f5ede8]/80 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Fort McMurray's premier permanent makeup studio. From microblading and lip blush to scalp micropigmentation and paramedical tattooing — confidence that never washes off.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="flex flex-wrap gap-3 items-center"
            >
              <ButtonPrimary href={BOOKING_URL}>
                Book Your Appointment <ArrowRight size={16} />
              </ButtonPrimary>
              <ButtonGhost href="#services" className="border-[#fdf8f5]/40 text-[#fdf8f5] hover:bg-[#fdf8f5]/10 hover:text-[#fdf8f5]">
                Explore Services
              </ButtonGhost>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-5 text-[#b07d6e] text-xs font-semibold tracking-wide flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#b07d6e] animate-pulse inline-block" />
              Limited slots this week — secure yours today
            </motion.p>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#2c1f1f] py-10">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={item}>
                <p className="font-serif text-4xl font-bold text-[#b07d6e]">{s.value}</p>
                <p className="text-[#f5ede8]/60 text-sm mt-1 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-[#fdf8f5]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#b07d6e]">What We Offer</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2c1f1f] mt-2">Our Services</h2>
              <p className="text-[#6b5249] mt-4 max-w-xl mx-auto text-base leading-relaxed">
                Every procedure is performed with precision tools, medical-grade pigments and a personalised approach tailored to your unique features.
              </p>
            </div>
          </FadeUp>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-[#f5ede8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <FadeUp>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1633681926035-ec1ac984418a?ixlib=rb-4.1.0&w=800&q=85&fit=crop&auto=format"
                  alt="Artist at Velour Studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2c1f1f]/70 to-transparent p-6">
                  <p className="text-[#fdf8f5] font-serif text-lg font-semibold">Sophia Vale</p>
                  <p className="text-[#b07d6e] text-sm">Founder & Lead Artist</p>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#b07d6e]">The Artist Behind the Studio</span>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2c1f1f] mt-3 mb-6 leading-tight">
                  Meet Sophia
                </h2>
                <div className="space-y-4 text-[#6b5249] leading-relaxed text-base">
                  <p>
                    Beauty has always been more than aesthetics for Sophia — it has been a way of restoring confidence, framing identity and giving people something they carry with them every single day. That philosophy is the foundation Velour Studio was built on.
                  </p>
                  <p>
                    Since certifying in 2017, Sophia has dedicated herself to mastering every facet of permanent makeup and paramedical tattooing. With 30+ certifications and counting, she travels nationally and internationally for advanced training — studying under the world's leading instructors in brows, lips, scalp and reconstructive work.
                  </p>
                  <p>
                    A proud Fort McMurray resident since 2001, Sophia is deeply invested in the community she serves. Her studio is a safe, inclusive and beautifully curated space where every client is treated with care, expertise and genuine warmth.
                  </p>
                </div>
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["30+ Certifications", "Multi-Discipline Trained", "Alberta Health Services Compliant", "FDA-Approved Pigments Only", "Inclusive & Welcoming Studio", "Post-Mastectomy Specialist"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#3b2a2a] font-medium">
                      <Check size={15} className="text-[#b07d6e] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ButtonGhost href={BOOKING_URL}>Book Your Appointment <ArrowRight size={15} /></ButtonGhost>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-[#fdf8f5]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#b07d6e]">Real Results</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2c1f1f] mt-2">Our Work</h2>
              <p className="text-[#6b5249] mt-4 max-w-lg mx-auto text-base">
                A curated look at transformations from the Velour Studio chair. Every result is as unique as the client in it.
              </p>
            </div>
          </FadeUp>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {galleryImages.map((src, i) => (
              <GalleryItem key={i} src={src} index={i} />
            ))}
          </motion.div>
          <FadeUp delay={0.2}>
            <div className="text-center mt-10">
              <ButtonGhost href="https://www.instagram.com/lynngossebrowspmu" className="mx-auto">
                Follow Us on Instagram <ArrowRight size={15} />
              </ButtonGhost>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-[#2c1f1f]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#b07d6e]">Client Love</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#fdf8f5] mt-2">What Our Clients Say</h2>
            </div>
          </FadeUp>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} t={t} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-[#fdf8f5]">
        <div className="max-w-3xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#b07d6e]">Know Before You Go</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2c1f1f] mt-2">Frequently Asked Questions</h2>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="bg-[#f5ede8] rounded-2xl px-6 md:px-8 py-2">
              {faqs.map((f, i) => (
                <FAQItem key={i} faq={f} />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* BOOKING CTA BAND */}
      <section className="py-20 bg-[#b07d6e] relative overflow-hidden">
        <motion.div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#2c1f1f]/10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <span className="text-[#fdf8f5]/70 text-xs font-semibold tracking-[0.2em] uppercase">Ready to Begin?</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#fdf8f5] mt-3 mb-4 leading-tight">
              Your most effortless morning<br />starts with one appointment.
            </h2>
            <p className="text-[#fdf8f5]/80 text-base mb-8 max-w-lg mx-auto">
              Slots fill quickly — especially Thursdays and Fridays. Reserve your consultation today and let us design something beautiful that is entirely yours.
            </p>
            <div className="flex flex-wrap gap-3 justify-center items-center">
              <motion.a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2c1f1f] text-[#fdf8f5] font-semibold text-sm tracking-wide hover:bg-[#3d2b1f] transition-colors"
              >
                Book Your Appointment <ArrowRight size={16} />
              </motion.a>
            </div>
            <p className="mt-5 text-[#fdf8f5]/60 text-xs font-medium flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fdf8f5] animate-pulse inline-block" />
              Limited slots this week
            </p>
          </FadeUp>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-[#f5ede8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <FadeUp>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#b07d6e]">Find Us</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2c1f1f] mt-2 mb-8">Get In Touch</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#b07d6e]/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-[#b07d6e]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#a8a29e] uppercase tracking-wider font-medium mb-0.5">Phone</p>
                    <a href="tel:7804123896" className="text-[#2c1f1f] font-semibold hover:text-[#b07d6e] transition-colors">780-412-3896</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#b07d6e]/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-[#b07d6e]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#a8a29e] uppercase tracking-wider font-medium mb-0.5">Email</p>
                    <a href="mailto:hello@velourstudio.ca" className="text-[#2c1f1f] font-semibold hover:text-[#b07d6e] transition-colors">hello@velourstudio.ca</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#b07d6e]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#b07d6e]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#a8a29e] uppercase tracking-wider font-medium mb-0.5">Location</p>
                    <p className="text-[#2c1f1f] font-semibold">Fort McMurray, Alberta, Canada</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 bg-[#fdf8f5] rounded-2xl p-6">
                <p className="font-serif font-bold text-[#2c1f1f] mb-3">Studio Hours</p>
                <div className="space-y-1.5 text-sm">
                  {["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d) => (
                    <div key={d} className="flex justify-between">
                      <span className="text-[#6b5249]">{d}</span>
                      <span className="font-semibold text-[#2c1f1f]">By Appointment</span>
                    </div>
                  ))}
                  {["Sunday", "Monday"].map((d) => (
                    <div key={d} className="flex justify-between">
                      <span className="text-[#6b5249]">{d}</span>
                      <span className="text-[#a8a29e] font-medium">Closed</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex gap-3 flex-wrap">
                <ButtonPrimary href="https://maps.google.com/?q=Fort+McMurray+Alberta">
                  Get Directions <ArrowRight size={15} />
                </ButtonPrimary>
                <ButtonGhost href={BOOKING_URL}>Book Now</ButtonGhost>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1706629503650-cade709d15e3?ixlib=rb-4.1.0&w=800&q=85&fit=crop&auto=format"
                  alt="Velour Studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-5 bg-[#2c1f1f] rounded-2xl p-5 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#b07d6e] flex-shrink-0" />
                <p className="text-[#f5ede8]/80 text-sm">
                  <span className="text-[#b07d6e] font-semibold">Cancellation Policy:</span> A minimum of 48 hours notice is required for all cancellations or rescheduling requests. Late cancellations may forfeit the deposit.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2c1f1f] text-[#f5ede8]/70 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <p className="font-serif text-xl font-bold text-[#fdf8f5] mb-3">Velour Studio</p>
              <p className="text-sm leading-relaxed max-w-xs">
                Fort McMurray's trusted permanent makeup and paramedical tattoo studio. Precision. Safety. Artistry.
              </p>
              <a
                href="https://www.instagram.com/lynngossebrowspmu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-[#b07d6e] hover:text-[#fdf8f5] text-sm font-semibold transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                @velourstudio
              </a>
            </div>
            <div>
              <p className="text-[#fdf8f5] font-semibold text-sm uppercase tracking-wider mb-4">Services</p>
              <ul className="space-y-2 text-sm">
                {["Microblading", "Microshading / Powder Brows", "Lip Blush Tattoo", "Permanent Eyeliner", "Scalp Micropigmentation", "Areola Reconstruction", "Collagen Induction", "Saline Removal", "Scar Camouflage"].map((s) => (
                  <li key={s}>
                    <a href="#services" className="hover:text-[#b07d6e] transition-colors">{s}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[#fdf8f5] font-semibold text-sm uppercase tracking-wider mb-4">Contact</p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><Phone size={14} className="text-[#b07d6e]" /> 780-412-3896</li>
                <li className="flex items-center gap-2"><Mail size={14} className="text-[#b07d6e]" /> hello@velourstudio.ca</li>
                <li className="flex items-start gap-2"><MapPin size={14} className="text-[#b07d6e] mt-0.5" /> Fort McMurray, Alberta, Canada</li>
              </ul>
              <div className="mt-5">
                <ButtonPrimary href={BOOKING_URL} className="text-xs px-5 py-2.5">Book Online</ButtonPrimary>
              </div>
            </div>
          </div>
          <div className="border-t border-[#3d2b2b] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#f5ede8]/40">
            <p>© 2025 Velour Studio — Fort McMurray, Alberta. All rights reserved.</p>
            <p className="text-[#f5ede8]/30">48-hour cancellation policy applies to all bookings.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
