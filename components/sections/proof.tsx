import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { PROOF, SHIPPED_FOR } from "@/lib/site";

/** Social proof band: hard numbers, then the teams and clients I've shipped for. */
export default function Proof() {
  const names = [...SHIPPED_FOR, ...SHIPPED_FOR];

  return (
    <section id="proof" aria-label="Track record" className="relative py-10 md:py-14">
      <div className="container-x">
        <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 lg:grid-cols-4">
          {PROOF.map((s) => (
            <StaggerItem key={s.label} className="group relative bg-background/85 p-6 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(400px_circle_at_50%_0%,hsl(var(--primary)/0.10),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="relative text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                <span className="text-gradient">
                  <CountUp value={s.value} suffix={s.suffix} />
                </span>
              </p>
              <p className="relative mt-2 text-sm leading-snug text-muted-foreground">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12" delay={0.1}>
          <p className="eyebrow w-full justify-center">Teams and clients I&apos;ve shipped for</p>
          <div className="mask-fade-x group mt-6 overflow-hidden">
            <ul className="flex w-max animate-marquee items-center [animation-duration:55s] group-hover:[animation-play-state:paused]">
              {names.map((n, i) => (
                <li
                  key={`${n}-${i}`}
                  aria-hidden={i >= SHIPPED_FOR.length}
                  className="mr-12 whitespace-nowrap text-xl font-semibold tracking-tight text-foreground/35 transition-colors duration-300 hover:text-foreground sm:text-2xl"
                >
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
