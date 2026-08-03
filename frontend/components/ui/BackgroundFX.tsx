export function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void-950">
      <div className="absolute inset-0 bg-nebula-1" />
      <div className="grid-bg absolute inset-0 opacity-60 mask-fade-b" />
      <div className="absolute -left-32 top-[-10%] h-[32rem] w-[32rem] animate-float-slow rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="absolute right-[-8%] top-[18%] h-[28rem] w-[28rem] animate-float rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-[-15%] left-[30%] h-[30rem] w-[30rem] animate-float-slow rounded-full bg-magenta-500/15 blur-[130px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void-950" />
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')]" />
    </div>
  );
}
