import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = 'center',
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-4', align === 'center' ? 'items-center text-center' : 'items-start text-left', className)}>
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {desc && <p className="max-w-2xl text-balance text-base leading-relaxed text-white/55 sm:text-lg">{desc}</p>}
    </div>
  );
}
