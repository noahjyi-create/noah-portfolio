"use client";

import { useState } from "react";
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
} from "lucide-react";

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

/** Black/white button like the Datemate screenshot */
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
    "transition active:translate-y-[1px]";

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
        "text-white border border-white/35 hover:border-white/60 bg-transparent"
      )}
    >
      <span>{children}</span>
      <ArrowUpRight className="h-4 w-4 opacity-70" />
    </a>
  );
}

/** Black/white action button as <button> */
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
        "text-white border border-white/35 hover:border-white/60 bg-transparent",
        disabled && "opacity-40 cursor-not-allowed hover:border-white/35 active:translate-y-0"
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 opacity-70" />
    </button>
  );
}

/** Dark background vignette + subtle texture */
function NoirBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0)_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_35%,rgba(0,0,0,0.75)_78%,rgba(0,0,0,0.95)_100%)]" />
      <div className="absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,1)_0px,rgba(255,255,255,1)_1px,transparent_1px,transparent_14px)]" />
    </div>
  );
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
    <div className="border border-white/10 bg-white/[0.02] p-6 md:p-7">
      <div className="flex items-center justify-between">
        <div className="text-[#E9E6DF] font-semibold tracking-tight text-[18px]">
          {title}
        </div>
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

/** Timeline entries (this is what "Load more" reveals) */
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
    title: "founderMatch",
    desc: "Cross-university matching platform for student entrepreneurs and complementary co-founders.",
    tags: ["Marketplace", "Product"],
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

export default function Page() {
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleTimeline = TIMELINE.slice(0, visibleCount);
  const canLoadMore = visibleCount < TIMELINE.length;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO — full screen */}
      <section className="relative min-h-screen overflow-hidden">
        <NoirBackdrop />

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
            <div className="text-white/60 font-mono text-[11px] tracking-[0.24em] uppercase">
              Interested in Learning
            </div>

            <h1 className="mt-6 text-[#E9E6DF] font-semibold tracking-tight leading-[0.9] text-[64px] sm:text-[84px] md:text-[102px]">
              Noah Yi
            </h1>

            <div className="mt-6 text-white/70 font-semibold max-w-xl leading-relaxed">
              Econ + CS @ Vanderbilt. 
            </div>
            <div className="text-white/70 font-semibold max-w-xl leading-relaxed">
              Passionate about creating, investing, and collaborating
            </div>
            <div className="mt-10 flex items-center gap-5">
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
      <section id="about" className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <SectionKicker>ABOUT</SectionKicker>
              <div className="mt-5 text-[#E9E6DF] font-semibold tracking-tight leading-[0.92] text-[44px] sm:text-[56px] md:text-[68px]">
                Beep Boop
              </div>
              <MonoBody className="mt-20 max-w-3xl">
                I’m an economics, cs, and finance student interested in investing and AI.
                <br />
                I like building cool products and investing in market inaccuracies.
              </MonoBody>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <IconPanel
                icon={<GraduationCap className="h-5 w-5" />}
                title="Background"
                body="Economics + Finance. Builder mindset, market-first thinking."
              />
              <IconPanel
                icon={<Workflow className="h-5 w-5" />}
                title="Working style"
                body="Define the point of view → constrain scope → ship iterations with clean hierarchy."
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="py-10 md:py-16">
        <Container>
          <SectionKicker>ACHIEVEMENTS</SectionKicker>
          <div className="mt-5 text-[#E9E6DF] font-semibold tracking-tight text-[44px] sm:text-[56px] md:text-[68px] leading-[0.92]">
            Engineered for
            <br /> efficient solutions
          </div>

          <div className="mt-10 md:mt-12">
            <div className="grid grid-cols-3 text-white/65 font-mono text-sm tracking-wider">
              <div>01</div>
              <div className="text-center">02</div>
              <div className="text-right">03</div>
            </div>
            <Hairline className="mt-6" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <FeatureRow
                col="01"
                icon={<Sparkles className="h-5 w-5" />}
                title="Speech + Presentation"
                body="Presentation and layout that make the story legible, fast, and real."
              />
              <FeatureRow
                col="02"
                icon={<LineChart className="h-5 w-5" />}
                title="Analytical rigor"
                body="I like incentives, markets, and decision frameworks, especially in finance."
              />
              <FeatureRow
                col="03"
                icon={<Code2 className="h-5 w-5" />}
                title="Execution that's real"
                body="Tight scope, iterative builds, and real deliverables"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-16 md:py-24">
        <Container>
          <SectionKicker>SKILLS</SectionKicker>
          <div className="mt-5 text-[#E9E6DF] font-semibold tracking-tight leading-[0.92] text-[44px] sm:text-[56px] md:text-[68px]">
            A compact set
            <br /> that compounds
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <IconPanel
              icon={<BriefcaseBusiness className="h-5 w-5" />}
              title="Product"
              body="Strategy, wireframes, positioning, writing, iteration loops."
            />
            <IconPanel
              icon={<LineChart className="h-5 w-5" />}
              title="Finance"
              body="Valuation, market mapping, modeling, investment theses."
            />
            <IconPanel
              icon={<Code2 className="h-5 w-5" />}
              title="Engineering"
              body="Next.js, React, Node.js, APIs, Tailwind CSS, Python, JS."
            />
            <IconPanel
              icon={<Cpu className="h-5 w-5" />}
              title="AI"
              body="RAG concepts, workflow automation, tooling, data sourcing."
            />
          </div>
        </Container>
      </section>

      {/* PORTFOLIO TIMELINE (single section with Load More) */}
      <section id="portfolio" className="pt-10 md:pt-16 pb-16 md:pb-20">
        <Container>
          <SectionKicker>PORTFOLIO</SectionKicker>
          <div className="mt-5 text-[#E9E6DF] font-semibold tracking-tight text-[44px] sm:text-[56px] md:text-[68px] leading-[0.92]">
            Timeline
          </div>

          <div className="mt-10">
            <Hairline />

            {visibleTimeline.map((it, idx) => (
              <div key={`${it.date}-${it.title}`}>
                <OpenTimelineItem
                  date={it.date}
                  icon={it.icon}
                  title={it.title}
                  desc={it.desc}
                  tags={it.tags}
                />
                {idx !== visibleTimeline.length - 1 && <Hairline />}
              </div>
            ))}

            <Hairline />
          </div>

          <div className="mt-8 flex justify-center">
            {canLoadMore ? (
              <BWActionButton onClick={() => setVisibleCount((c) => Math.min(c + 2, TIMELINE.length))}>
                LOAD MORE
              </BWActionButton>
            ) : (
              <div className="text-white/40 font-mono text-[11px] tracking-[0.22em] uppercase">
                End of timeline
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* CONTACT */}
<section id="contact" className="border-t border-white/10">
  <Container className="py-16 md:py-20">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
      <div className="md:col-span-8">
        <div className="text-[#E9E6DF] font-semibold tracking-tight text-[40px] sm:text-[52px] md:text-[64px] leading-[0.92]">
          Reach out.
        </div>

        <MonoBody className="mt-6 max-w-2xl">
          Email is best. Links below for background and repos.
        </MonoBody>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <BWButton href="mailto:yinoah29@gmail.com">EMAIL</BWButton>

          <a
            href="https://www.linkedin.com/feed/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 font-mono px-7 py-3 md:px-8 md:py-3.5
                       text-[12px] tracking-[0.24em] uppercase transition active:translate-y-[1px]
                       text-white border border-white/35 hover:border-white/60 bg-transparent"
          >
            LINKEDIN <ArrowUpRight className="h-4 w-4 opacity-70" />
          </a>

          <a
            href="https://github.com/noahjyi-create"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 font-mono px-7 py-3 md:px-8 md:py-3.5
                       text-[12px] tracking-[0.24em] uppercase transition active:translate-y-[1px]
                       text-white border border-white/35 hover:border-white/60 bg-transparent"
          >
            GITHUB <ArrowUpRight className="h-4 w-4 opacity-70" />
          </a>
        </div>
      </div>
    </div>

    <div className="mt-16 text-center text-white/40 font-mono text-[11px] tracking-[0.22em] uppercase">
      © {new Date().getFullYear()} Noah Yi
    </div>
  </Container>
</section>

    </main>
  );
}
