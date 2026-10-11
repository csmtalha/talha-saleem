/** Fixed page background: soft colour fields plus a film-grain texture. */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute -top-[30%] left-1/2 h-[80vh] w-[120vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.16),transparent)] dark:bg-[radial-gradient(closest-side,hsl(var(--primary)/0.14),transparent)]" />
      <div className="absolute -right-[20%] top-[40%] h-[70vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,hsl(var(--signal)/0.07),transparent)]" />
      <div className="absolute -left-[25%] bottom-[-20%] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.08),transparent)]" />
      <div className="noise absolute inset-0" />
    </div>
  );
}
