/**
 * First-visit splash. Pure CSS (see .splash in globals.css): it animates out
 * on its own, needs no JavaScript, and never blocks clicks. The inline script
 * marks the session so the splash shows only once per visit.
 */
export const SPLASH_SCRIPT = `try{if(sessionStorage.getItem("ts-splash")){document.documentElement.classList.add("splash-seen")}else{sessionStorage.setItem("ts-splash","1")}}catch(e){document.documentElement.classList.add("splash-seen")}`;

export function Splash() {
  return (
    <div className="splash" aria-hidden>
      <div className="flex flex-col items-center gap-5">
        <svg viewBox="0 0 64 64" className="splash__mark h-14 w-14" fill="none">
          <defs>
            <linearGradient id="splash-g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="hsl(var(--primary))" />
              <stop offset="1" stopColor="hsl(var(--signal))" />
            </linearGradient>
          </defs>
          <path
            d="M8 4h48a4 4 0 0 1 4 4v48a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z"
            stroke="url(#splash-g)"
            strokeWidth="2"
          />
          <path d="M16 22h20M26 22v22M50 22h-6a5 5 0 0 0 0 10h0a5 5 0 0 1 0 10h-6" stroke="url(#splash-g)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="splash__name text-center">
          <p className="text-lg font-semibold tracking-tight text-foreground">Talha Saleem</p>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Lead Full-Stack Engineer</p>
        </div>
        <div className="h-px w-40 overflow-hidden rounded-full bg-border">
          <div className="splash__bar h-full w-full bg-gradient-to-r from-primary to-signal" />
        </div>
      </div>
    </div>
  );
}
