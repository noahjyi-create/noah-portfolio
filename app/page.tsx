"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Code2,
  Cpu,
  GraduationCap,
  LineChart,
  Sparkles,
  Workflow,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";

/* ----------------------------- tiny utils ----------------------------- */

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cx("max-w-[1240px] mx-auto px-6", className)}>{children}</div>;
}

function Hairline({ className }: { className?: string }) {
  return <div className={cx("h-px w-full bg-white/10", className)} />;
}

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-white/60 font-mono text-[11px] tracking-[0.24em] uppercase">
      {children}
    </div>
  );
}

function MonoBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("text-white/60 font-mono text-[14px] leading-relaxed", className)}>
      {children}
    </div>
  );
}

/* ----------------------------- animations ----------------------------- */
/** Subtle reveal-on-scroll: opacity + slight translate + slight blur */
function Reveal({
  children,
  className,
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cx(
        "transition-all duration-700 ease-out will-change-transform",
        inView ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-[2px]",
        className
      )}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

/** Hero boot sequence (runs on load only) */
function useBootSequence() {
  const [boot, setBoot] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBoot(true), 40);
    return () => clearTimeout(t);
  }, []);

  return boot;
}

/** Ultra-subtle parallax offset for the hero backdrop */
function useParallax(mult = 0.06) {
  const [y, setY] = useState(0);

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const s = window.scrollY || 0;
        const clamped = Math.max(-40, Math.min(40, s * mult));
        setY(clamped);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mult]);

  return y;
}

/* ------------------------------ buttons ------------------------------ */

function BWButton({
  children,
  href,
  variant = "outline",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "outline" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-mono " +
    "px-7 py-3 md:px-8 md:py-3.5 " +
    "text-[12px] tracking-[0.24em] uppercase " +
    "transition active:translate-y-[1px] " +
    "hover:-translate-y-[1px]";

  if (variant === "ghost") {
    return (
      <a
        href={href}
        className={cx(base, "text-white/70 hover:text-white border border-transparent")}
      >
        <span>{children}</span>
        <ArrowUpRight className="h-4 w-4 opacity-60" />
      </a>
    );
  }

  return (
    <a
      href={href}
      className={cx(
        base,
        "text-white border border-white/35 hover:border-white/60 bg-transparent hover:bg-white/[0.03]"
      )}
    >
      <span>{children}</span>
      <ArrowUpRight className="h-4 w-4 opacity-70" />
    </a>
  );
}

function BWActionButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cx(
        "inline-flex items-center justify-center gap-2 font-mono px-7 py-3 md:px-8 md:py-3.5",
        "text-[12px] tracking-[0.24em] uppercase transition active:translate-y-[1px]",
        "text-white border border-white/35 hover:border-white/60 bg-transparent hover:bg-white/[0.03]",
        "hover:-translate-y-[1px]",
        disabled && "opacity-40 cursor-not-allowed hover:border-white/35 hover:bg-transparent active:translate-y-0"
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 opacity-70" />
    </button>
  );
}

/* ------------------------------ backdrop ----------------------------- */

function NoirBackdrop({ offsetY = 0 }: { offsetY?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ transform: `translate3d(0, ${offsetY}px, 0)` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0)_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_35%,rgba(0,0,0,0.75)_78%,rgba(0,0,0,0.95)_100%)]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,1)_0px,rgba(255,255,255,1)_1px,transparent_1px,transparent_14px)]" />
      </div>
    </div>
  );
}

/* ------------------------------- cards -------------------------------- */

function IconPanel({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="border border-white/10 bg-white/[0.02] p-6 md:p-7 transition hover:bg-white/[0.04] hover:-translate-y-[1px]">
      <div className="flex items-center justify-between">
        <div className="text-[#E9E6DF] font-semibold tracking-tight text-[18px]">{title}</div>
        <div className="text-white/70">{icon}</div>
      </div>
      <Hairline className="my-4" />
      <MonoBody>{body}</MonoBody>
    </div>
  );
}

function FeatureRow({
  col,
  title,
  body,
  icon,
}: {
  col: "01" | "02" | "03" | "01/" | "02/" | "03/";
  title: string;
  body: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="pt-12">
      <div className="flex items-center justify-between">
        <div className="text-white/65 font-mono text-sm tracking-wider">{col}</div>
        <div className="text-white/55">{icon}</div>
      </div>
      <div className="mt-6 text-[#E9E6DF] font-semibold tracking-tight text-[20px] md:text-[22px]">
        {title}
      </div>
      <MonoBody className="mt-3">{body}</MonoBody>
    </div>
  );
}

function OpenTimelineItem({
  date,
  title,
  desc,
  tags,
  icon,
}: {
  date: string;
  title: string;
  desc: string;
  tags?: string[];
  icon: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10">
      <div className="md:col-span-2">
        <div className="text-white/55 font-mono text-xs tracking-wider">{date}</div>
      </div>

      <div className="md:col-span-10">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="mt-1 text-white/70">{icon}</div>
            <div>
              <div className="text-[#E9E6DF] font-semibold tracking-tight text-[22px] md:text-[24px]">
                {title}
              </div>
              <MonoBody className="mt-3 max-w-3xl">{desc}</MonoBody>
            </div>
          </div>
          <div className="hidden md:block text-white/40 font-mono text-xs tracking-wider">
            Noah Yi
          </div>
        </div>

        {tags?.length ? (
          <div className="mt-5 flex flex-wrap gap-2 md:pl-[44px]">
            {tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[11px] tracking-[0.20em] uppercase text-white/55 border border-white/10 bg-white/[0.02] px-3 py-2"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ----------------------------- timeline data ----------------------------- */

type TimelineEntry = {
  date: string;
  title: string;
  desc: string;
  tags: string[];
  icon: React.ReactNode;
};

const TIMELINE: TimelineEntry[] = [
  {
    date: "2026-01",
    title: "Personal Portfolio",
    desc: "Supercomputer-inspired typography and spacing with a clean editorial structure.",
    tags: ["Next.js", "Tailwind"],
    icon: <Code2 className="h-5 w-5" />,
  },
  {
    date: "2025-07",
    title: "AI Fundraising Agent",
    desc: "Concept: match founders to investors, personalize outreach, and orchestrate follow-ups.",
    tags: ["Research", "Automation"],
    icon: <Award className="h-5 w-5" />,
  },
  {
    date: "2025-06",
    title: "Correlation Matrix",
    desc: "Assessing correlations of stocks in investment portfolios",
    tags: ["Marketplace", "Invseting"],
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },

  // Load more below
  {
    date: "2025-10",
    title: "Monte Carlo Simulation",
    desc: "Simulation-based risk modeling with percentiles and tail-risk intuition.",
    tags: ["Python", "Probability", "Finance"],
    icon: <LineChart className="h-5 w-5" />,
  },
  {
    date: "2025-11",
    title: "Valuation Notes Library",
    desc: "High-signal writeups and reusable frameworks for modeling and decision-making.",
    tags: ["Finance", "Writing"],
    icon: <Award className="h-5 w-5" />,
  },
];

/* ---------------------------------- page ---------------------------------- */

export default function Page() {
  const boot = useBootSequence();
  const heroParallax = useParallax(0.06);

  const [visibleCount, setVisibleCount] = useState(3);
  const visibleTimeline = TIMELINE.slice(0, visibleCount);
  const canLoadMore = visibleCount < TIMELINE.length;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO — full screen */}
      <section className="relative min-h-screen overflow-hidden">
        <NoirBackdrop offsetY={heroParallax} />

        {/* Top-right title */}
        <div className="absolute top-10 right-6 sm:right-10 z-10 text-right">
          <div className="text-white/70 font-mono text-[11px] tracking-[0.24em] uppercase">
            Noah Yi
          </div>
          <div className="text-[#E9E6DF] font-semibold tracking-tight text-[20px] sm:text-[22px]">
            Portfolio
          </div>
        </div>

        <Container className="relative min-h-screen flex items-center">
          <div className="w-full max-w-[860px]">
            {/* Boot-sequenced hero blocks */}
            <div
              className={cx(
                "text-white/60 font-mono text-[11px] tracking-[0.24em] uppercase transition-all duration-700",
                boot ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-2 blur-[2px]"
              )}
              style={{ transitionDelay: "80ms" }}
            >
              Interested in Learning
            </div>

            <h1
              className={cx(
                "mt-6 text-[#E9E6DF] font-semibold tracking-tight leading-[0.9] text-[64px] sm:text-[84px] md:text-[102px]",
                "transition-all duration-900",
                boot ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-3 blur-[2px]"
              )}
              style={{ transitionDelay: "160ms" }}
            >
              Noah Yi
            </h1>

            <div
              className={cx(
                "mt-6 text-white/70 font-semibold max-w-xl leading-relaxed transition-all duration-700",
                boot ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-3 blur-[2px]"
              )}
              style={{ transitionDelay: "240ms" }}
            >
              Econ + CS @ Vanderbilt.
            </div>

            <div
              className={cx(
                "text-white/70 font-semibold max-w-xl leading-relaxed transition-all duration-700",
                boot ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-3 blur-[2px]"
              )}
              style={{ transitionDelay: "300ms" }}
            >
              Passionate about creating, investing, and collaborating
            </div>

            <div
              className={cx(
                "mt-10 flex items-center gap-5 transition-all duration-700",
                boot ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              )}
              style={{ transitionDelay: "380ms" }}
            >
              <BWButton href="#portfolio">VIEW TIMELINE</BWButton>
              <div className="text-white/55 font-mono text-[12px] tracking-[0.22em] uppercase">
                v0.1
              </div>
            </div>
          </div>
        </Container>

        <div className="pointer-events-none absolute bottom-8 inset-x-0 flex justify-between px-6 sm:px-10">
          <div className="text-white/25 font-mono text-[11px] tracking-[0.22em] uppercase">
            scroll
          </div>
          <div className="text-white/25 font-mono text-[11px] tracking-[0.22em] uppercase">
            profile
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionKicker>ABOUT</SectionKicker>
              </Reveal>

              <Reveal delayMs={80}>
                <div className="mt-6 text-[#E9E6DF] font-semibold tracking-tight leading-[0.92] text-[44px] sm:text-[56px] md:text-[68px]">
                  你好！
                </div>
              </Reveal>

              <Reveal delayMs={160}>
                <MonoBody className="mt-16 max-w-3xl">
                  I’m an economics, cs, and finance student interested in investing and AI.
                  <br />
                  I like building cool products and investing in market inaccuracies.
                </MonoBody>
              </Reveal>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <Reveal delayMs={120}>
                <IconPanel
                  icon={<GraduationCap className="h-5 w-5" />}
                  title="Background"
                  body="Economics + Finance. Builder mindset, market-first thinking."
                />
              </Reveal>
              <Reveal delayMs={200}>
                <IconPanel
                  icon={<Workflow className="h-5 w-5" />}
                  title="Working style"
                  body="Define the point of view → constrain scope → ship iterations with clean hierarchy."
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ACHIEVEMENTS — centered */}
      <section id="achievements" className="py-20 md:py-28">
        <Container>
          <div className="text-center">
            <div className="mx-auto max-w-[980px]">
              <Reveal>
                <SectionKicker>ACHIEVEMENTS</SectionKicker>
              </Reveal>

              <Reveal delayMs={80}>
                <div className="mt-6 text-[#E9E6DF] font-semibold tracking-tight text-[44px] sm:text-[56px] md:text-[68px] leading-[0.92]">
                  Engineered for
                  <br /> efficient solutions
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mt-12 md:mt-14">
            <div className="mx-auto max-w-[980px]">
              <Reveal delayMs={140}>
                <div className="grid grid-cols-3 text-white/65 font-mono text-sm tracking-wider">
                  <div>01</div>
                  <div className="text-center">02</div>
                  <div className="text-right">03</div>
                </div>
              </Reveal>

              <Hairline className="mt-6" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <Reveal delayMs={0}>
                  <FeatureRow
                    col="01"
                    icon={<Sparkles className="h-5 w-5" />}
                    title="Speech + Presentation"
                    body="Presentation and layout that make the story legible, fast, and real."
                  />
                </Reveal>
                <Reveal delayMs={120}>
                  <FeatureRow
                    col="02"
                    icon={<LineChart className="h-5 w-5" />}
                    title="Analytical rigor"
                    body="I like incentives, markets, and decision frameworks, especially in finance."
                  />
                </Reveal>
                <Reveal delayMs={240}>
                  <FeatureRow
                    col="03"
                    icon={<Code2 className="h-5 w-5" />}
                    title="Execution that's real"
                    body="Tight scope, iterative builds, and real deliverables"
                  />
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionKicker>SKILLS</SectionKicker>
          </Reveal>

          <Reveal delayMs={80}>
            <div className="mt-6 text-[#E9E6DF] font-semibold tracking-tight leading-[0.92] text-[44px] sm:text-[56px] md:text-[68px]">
              A compact set
              <br /> that compounds
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Reveal delayMs={0}>
              <IconPanel
                icon={<BriefcaseBusiness className="h-5 w-5" />}
                title="Product"
                body="Strategy, wireframes, positioning, writing, iteration loops."
              />
            </Reveal>
            <Reveal delayMs={100}>
              <IconPanel
                icon={<LineChart className="h-5 w-5" />}
                title="Finance"
                body="Valuation, market mapping, modeling, investment theses."
              />
            </Reveal>
            <Reveal delayMs={200}>
              <IconPanel
                icon={<Code2 className="h-5 w-5" />}
                title="Engineering"
                body="Next.js, React, Node.js, APIs, Tailwind CSS, Python, JS."
              />
            </Reveal>
            <Reveal delayMs={300}>
              <IconPanel
                icon={<Cpu className="h-5 w-5" />}
                title="AI"
                body="RAG concepts, workflow automation, tooling, data sourcing."
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PORTFOLIO TIMELINE */}
      <section id="portfolio" className="py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionKicker>PORTFOLIO</SectionKicker>
          </Reveal>

          <Reveal delayMs={80}>
            <div className="mt-6 text-[#E9E6DF] font-semibold tracking-tight text-[44px] sm:text-[56px] md:text-[68px] leading-[0.92]">
              Timeline
            </div>
          </Reveal>

          <div className="mt-12">
            <Hairline />

            {visibleTimeline.map((it, idx) => (
              <Reveal key={`${it.date}-${it.title}`} delayMs={idx * 90}>
                <div>
                  <OpenTimelineItem
                    date={it.date}
                    icon={it.icon}
                    title={it.title}
                    desc={it.desc}
                    tags={it.tags}
                  />
                  {idx !== visibleTimeline.length - 1 && <Hairline />}
                </div>
              </Reveal>
            ))}

            <Hairline />
          </div>

          <Reveal delayMs={120}>
            <div className="mt-10 flex justify-center">
              {canLoadMore ? (
                <BWActionButton
                  onClick={() => setVisibleCount((c) => Math.min(c + 2, TIMELINE.length))}
                >
                  LOAD MORE
                </BWActionButton>
              ) : (
                <div className="text-white/40 font-mono text-[11px] tracking-[0.22em] uppercase">
                  End of timeline
                </div>
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-white/10">
        <Container className="py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-8">
              <Reveal>
                <div className="text-[#E9E6DF] font-semibold tracking-tight text-[40px] sm:text-[52px] md:text-[64px] leading-[0.92]">
                  Reach out.
                </div>
              </Reveal>

              <Reveal delayMs={80}>
                <MonoBody className="mt-6 max-w-2xl">
                  Email is best. Links below for background and repos.
                </MonoBody>
              </Reveal>

              <Reveal delayMs={160}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="mailto:yi.noah.j@gmail.com"
                    className="inline-flex items-center justify-center gap-2 font-mono px-7 py-3 md:px-8 md:py-3.5
                               text-[12px] tracking-[0.24em] uppercase transition active:translate-y-[1px]
                               text-white border border-white/35 hover:border-white/60 bg-transparent hover:bg-white/[0.03]
                               hover:-translate-y-[1px]"
                  >
                    EMAIL <Mail className="h-4 w-4 opacity-70" />
                  </a>

                  <a
                    href="https://www.linkedin.com/feed/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 font-mono px-7 py-3 md:px-8 md:py-3.5
                               text-[12px] tracking-[0.24em] uppercase transition active:translate-y-[1px]
                               text-white border border-white/35 hover:border-white/60 bg-transparent hover:bg-white/[0.03]
                               hover:-translate-y-[1px]"
                  >
                    LINKEDIN <Linkedin className="h-4 w-4 opacity-70" />
                  </a>

                  <a
                    href="https://github.com/noahjyi-create"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 font-mono px-7 py-3 md:px-8 md:py-3.5
                               text-[12px] tracking-[0.24em] uppercase transition active:translate-y-[1px]
                               text-white border border-white/35 hover:border-white/60 bg-transparent hover:bg-white/[0.03]
                               hover:-translate-y-[1px]"
                  >
                    GITHUB <Github className="h-4 w-4 opacity-70" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delayMs={200}>
            <div className="mt-16 text-center text-white/40 font-mono text-[11px] tracking-[0.22em] uppercase">
              © {new Date().getFullYear()} Noah Yi
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
