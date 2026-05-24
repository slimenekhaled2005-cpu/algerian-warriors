import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Star,
  Sword,
  Users,
  ArrowRight,
  Mail,
  Crown,
  Flame,
  CheckCircle2,
} from "lucide-react";

const navItems = ["Identity", "Code", "Drops", "Join"];

const values = [
  {
    icon: Shield,
    title: "Discipline",
    text: "Built for people who move with purpose, control, and self-respect.",
  },
  {
    icon: Star,
    title: "Algerian Pride",
    text: "A modern symbol of ambition, heritage, science, and national spirit.",
  },
  {
    icon: Users,
    title: "Brotherhood",
    text: "Not for everyone. For those who deserve to carry the mark.",
  },
];

const products = [
  {
    name: "Warrior Leather Jacket",
    tag: "Signature Piece",
    price: "Coming Soon",
  },
  {
    name: "AW Minimal Tee",
    tag: "Daily Uniform",
    price: "Coming Soon",
  },
  {
    name: "Ceremonial Hoodie",
    tag: "Limited Drop",
    price: "Coming Soon",
  },
];

const rules = [
  "Ambition before attention",
  "Discipline before image",
  "Respect before ego",
  "Heritage before trends",
];

export default function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#060606] text-zinc-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10rem] top-[-10rem] h-96 w-96 rounded-full bg-red-900/20 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-[-8rem] h-96 w-96 rounded-full bg-zinc-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
      </div>

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-950 shadow-2xl">
            <Shield className="h-6 w-6 text-zinc-100" />
          </div>
          <div>
            <p className="text-lg font-black uppercase tracking-[0.18em]">AW</p>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Algerian Warriors</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-zinc-400 transition hover:text-white">
              {item}
            </a>
          ))}
        </nav>

        <a href="#join" className="rounded-full border border-red-700/70 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700/20">
          Apply
        </a>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/70 px-4 py-2 text-xs uppercase tracking-[0.25em] text-zinc-400">
              <Flame className="h-4 w-4 text-red-500" />
              Not a brand. A lifestyle.
            </div>

            <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
              Algerian <span className="bg-gradient-to-r from-zinc-100 via-zinc-500 to-zinc-100 bg-clip-text text-transparent">Warriors</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
              A selective clothing identity for disciplined people who represent ambition, science, heritage, and strength. Built in Algeria. Made for those who earn the symbol.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#join" className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-zinc-200">
                Join the circle
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a href="#drops" className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-zinc-200 transition hover:border-red-700 hover:text-white">
                View drops
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }} className="relative">
            <div className="relative mx-auto aspect-square max-w-[520px] rounded-[2.5rem] border border-zinc-800 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 p-8 shadow-2xl">
              <div className="absolute inset-4 rounded-[2rem] border border-zinc-800/70" />
              <div className="absolute left-8 right-8 top-10 h-px bg-gradient-to-r from-transparent via-red-700/70 to-transparent" />
              <div className="absolute bottom-10 left-8 right-8 h-px bg-gradient-to-r from-transparent via-zinc-500/40 to-transparent" />

              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="relative mb-8 flex h-44 w-44 items-center justify-center rounded-[2rem] border border-zinc-700 bg-black shadow-2xl">
                  <Crown className="absolute -top-5 h-10 w-10 text-red-700" />
                  <div className="text-6xl font-black tracking-[-0.16em] text-white">AW</div>
                  <Sword className="absolute bottom-7 h-20 w-20 rotate-45 text-zinc-700/60" />
                </div>
                <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">The Mark Must Be Earned</p>
                <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-400">
                  Luxury minimalism with hidden warrior symbolism, created for official identity and future apparel drops.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="identity" className="border-y border-zinc-900 bg-zinc-950/40 py-14">
          <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-zinc-800 bg-black/50 p-7 shadow-xl">
                <Icon className="mb-6 h-8 w-8 text-red-600" />
                <h3 className="text-xl font-black uppercase tracking-wide text-white">{title}</h3>
                <p className="mt-3 leading-7 text-zinc-400">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="code" className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-600">The Code</p>
              <h2 className="mt-4 text-4xl font-black uppercase text-white md:text-5xl">Who deserves the mark?</h2>
            </div>
            <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950/70 p-8 md:p-10">
              <p className="text-xl leading-9 text-zinc-300">
                Algerian Warriors is for builders, students, athletes, creators, and disciplined minds. People who respect science, carry ambition, and represent Algeria with class — not noise.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {rules.map((rule) => (
                  <div key={rule} className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-black px-5 py-4 text-zinc-300">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-red-600" />
                    {rule}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="drops" className="mx-auto max-w-7xl px-6 pb-24">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-600">First Drops</p>
              <h2 className="mt-4 text-4xl font-black uppercase text-white md:text-5xl">Coming soon</h2>
            </div>
            <p className="max-w-lg leading-7 text-zinc-400">
              Start with limited pieces. Make scarcity real. Let the website collect applications before the first official drop.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {products.map((product) => (
              <div key={product.name} className="group rounded-[2rem] border border-zinc-800 bg-zinc-950 p-5 transition hover:border-red-800/80">
                <div className="mb-6 flex aspect-[4/5] items-center justify-center rounded-[1.5rem] border border-zinc-800 bg-black">
                  <Shield className="h-20 w-20 text-zinc-700 transition group-hover:text-zinc-500" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">{product.tag}</p>
                <h3 className="mt-3 text-2xl font-black text-white">{product.name}</h3>
                <p className="mt-3 text-zinc-500">{product.price}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="join" className="mx-auto max-w-7xl px-6 pb-28">
          <div className="rounded-[2.5rem] border border-red-900/50 bg-gradient-to-br from-red-950/30 via-black to-zinc-950 p-8 text-center shadow-2xl md:p-14">
            <Mail className="mx-auto mb-6 h-10 w-10 text-red-600" />
            <h2 className="text-4xl font-black uppercase text-white md:text-6xl">Apply to join</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
              Before selling to everyone, build a waiting list. Ask people why they deserve to wear Algerian Warriors.
            </p>

            <form className="mx-auto mt-9 grid max-w-3xl gap-4 md:grid-cols-[1fr_auto]">
              <input className="rounded-full border border-zinc-800 bg-black px-6 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-700" placeholder="Enter your email" type="email" />
              <button className="rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-zinc-200" type="button">
                Request access
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
