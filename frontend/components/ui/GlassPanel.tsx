import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export function GlassPanel({
  className,
  solid,
  ...props
}: HTMLAttributes<HTMLDivElement> & { solid?: boolean }) {
  return (
    <div
      className={cn(solid ? 'glass-panel-solid' : 'glass-panel', className)}
      {...props}
    />
  );
}
