'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

interface DualRangeSliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  labelPosition?: 'top' | 'bottom';
  label?: (value: number | undefined) => React.ReactNode;
}

const DualRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DualRangeSliderProps
>(({ className, label, labelPosition = 'top', ...props }, ref) => {
  const currentValue = Array.isArray(props.value) ? props.value : (props.defaultValue || [props.min || 0, props.max || 100]);

  return (
    <div 
      className="relative w-full"
      style={{ 
        zIndex: 50,
        isolation: 'isolate'
      }}
    >
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          'relative flex w-full items-center',
          'cursor-pointer touch-auto select-none',
          '[&>span[data-orientation=horizontal]]:h-2',
          '[&>span[data-orientation=horizontal]]:w-full',
          '[&>span[data-orientation=horizontal]]:bg-secondary',
          '[&>span[data-orientation=horizontal]]:rounded-full',
          '[&_[data-radix-slider-range]]:absolute',
          '[&_[data-radix-slider-range]]:h-full',
          '[&_[data-radix-slider-range]]:bg-primary',
          '[&_[data-radix-slider-range]]:rounded-full',
          '[&_[data-radix-slider-thumb]]:block',
          '[&_[data-radix-slider-thumb]]:h-4',
          '[&_[data-radix-slider-thumb]]:w-4',
          '[&_[data-radix-slider-thumb]]:rounded-full',
          '[&_[data-radix-slider-thumb]]:border-2',
          '[&_[data-radix-slider-thumb]]:border-primary',
          '[&_[data-radix-slider-thumb]]:bg-background',
          '[&_[data-radix-slider-thumb]]:ring-offset-background',
          '[&_[data-radix-slider-thumb]]:transition-colors',
          '[&_[data-radix-slider-thumb]]:focus-visible:outline-none',
          '[&_[data-radix-slider-thumb]]:focus-visible:ring-2',
          '[&_[data-radix-slider-thumb]]:focus-visible:ring-ring',
          '[&_[data-radix-slider-thumb]]:focus-visible:ring-offset-2',
          '[&_[data-radix-slider-thumb]]:disabled:pointer-events-none',
          '[&_[data-radix-slider-thumb]]:disabled:opacity-50',
          '[&_[data-radix-slider-thumb]]:cursor-grab',
          '[&_[data-radix-slider-thumb]:active]:cursor-grabbing',
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="cursor-grab active:cursor-grabbing relative block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          {label && (
            <span
              className={cn(
                'absolute flex w-full justify-center text-xs font-medium',
                labelPosition === 'top' && '-top-7',
                labelPosition === 'bottom' && 'top-4',
              )}
            >
              {label(currentValue[0])}
            </span>
          )}
        </SliderPrimitive.Thumb>
        <SliderPrimitive.Thumb className="cursor-grab active:cursor-grabbing relative block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          {label && (
            <span
              className={cn(
                'absolute flex w-full justify-center text-xs font-medium',
                labelPosition === 'top' && '-top-7',
                labelPosition === 'bottom' && 'top-4',
              )}
            >
              {label(currentValue[1])}
            </span>
          )}
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
    </div>
  );
});
DualRangeSlider.displayName = 'DualRangeSlider';

export { DualRangeSlider };