// src/components/ui/loading.tsx
import React from 'react';
import { Loader2, Music, Heart } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'dots' | 'pulse' | 'dance' | 'minimal';
  color?: 'primary' | 'secondary' | 'accent' | 'muted';
  text?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6', 
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
};

const colorClasses = {
  primary: 'text-purple-600',
  secondary: 'text-blue-600',
  accent: 'text-green-600',
  muted: 'text-gray-400'
};

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg', 
  xl: 'text-xl'
};

// Default spinner with Loader2 icon
const DefaultSpinner: React.FC<{ size: string; color: string }> = ({ size, color }) => (
  <Loader2 className={cn('animate-spin', size, color)} />
);

// Dots spinner
const DotsSpinner: React.FC<{ size: string; color: string }> = ({ size, color }) => {
  const dotSize = size === sizeClasses.sm ? 'w-1 h-1' : 
                  size === sizeClasses.md ? 'w-1.5 h-1.5' :
                  size === sizeClasses.lg ? 'w-2 h-2' : 'w-3 h-3';
  
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full animate-pulse',
            dotSize,
            color === colorClasses.primary ? 'bg-purple-600' :
            color === colorClasses.secondary ? 'bg-blue-600' :
            color === colorClasses.accent ? 'bg-green-600' : 'bg-gray-400'
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );
};

// Pulse spinner
const PulseSpinner: React.FC<{ size: string; color: string }> = ({ size, color }) => {
  const baseColor = color === colorClasses.primary ? 'border-purple-600' :
                    color === colorClasses.secondary ? 'border-blue-600' :
                    color === colorClasses.accent ? 'border-green-600' : 'border-gray-400';
  
  return (
    <div className="relative">
      <div className={cn('rounded-full border-2 animate-ping', size, baseColor, 'opacity-25')} />
      <div className={cn('absolute inset-0 rounded-full border-2', baseColor)} />
    </div>
  );
};

// Dance-themed spinner with music note
const DanceSpinner: React.FC<{ size: string; color: string }> = ({ size, color }) => (
  <div className="relative">
    <div className={cn('animate-spin', size)}>
      <Music className={cn('w-full h-full', color)} />
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <Heart className={cn('w-1/2 h-1/2 animate-pulse', color)} />
    </div>
  </div>
);

// Minimal spinner - just a simple circle
const MinimalSpinner: React.FC<{ size: string; color: string }> = ({ size, color }) => {
  const borderColor = color === colorClasses.primary ? 'border-purple-600' :
                      color === colorClasses.secondary ? 'border-blue-600' :
                      color === colorClasses.accent ? 'border-green-600' : 'border-gray-400';
  
  return (
    <div
      className={cn(
        'rounded-full border-2 border-t-transparent animate-spin',
        size,
        borderColor
      )}
    />
  );
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  color = 'primary',
  text,
  className
}) => {
  const sizeClass = sizeClasses[size];
  const colorClass = colorClasses[color];
  const textSizeClass = textSizeClasses[size];

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return <DotsSpinner size={sizeClass} color={colorClass} />;
      case 'pulse':
        return <PulseSpinner size={sizeClass} color={colorClass} />;
      case 'dance':
        return <DanceSpinner size={sizeClass} color={colorClass} />;
      case 'minimal':
        return <MinimalSpinner size={sizeClass} color={colorClass} />;
      default:
        return <DefaultSpinner size={sizeClass} color={colorClass} />;
    }
  };

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-2', className)}>
      {renderSpinner()}
      {text && (
        <p className={cn('font-medium animate-pulse', colorClass, textSizeClass)}>
          {text}
        </p>
      )}
    </div>
  );
};

// Full page loading overlay
export const LoadingOverlay: React.FC<{
  isVisible: boolean;
  text?: string;
  variant?: LoadingSpinnerProps['variant'];
}> = ({ isVisible, text = 'Laster...', variant = 'dance' }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm mx-4">
        <LoadingSpinner 
          size="xl" 
          variant={variant} 
          text={text}
          className="mb-4" 
        />
      </div>
    </div>
  );
};

// Card loading state
export const LoadingCard: React.FC<{
  className?: string;
  lines?: number;
}> = ({ className, lines = 3 }) => (
  <div className={cn('bg-white rounded-lg border p-6 space-y-4', className)}>
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="h-3 bg-gray-200 rounded" />
      ))}
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

// Button loading state
export const ButtonSpinner: React.FC<{
  className?: string;
}> = ({ className }) => (
  <Loader2 className={cn('w-4 h-4 animate-spin', className)} />
);

// Page loading component
export const PageLoading: React.FC<{
  title?: string;
  subtitle?: string;
}> = ({ 
  title = 'Laster dansekurs...',
  subtitle = 'Henter de nyeste kursene for deg'
}) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center space-y-6 max-w-md px-4">
      <LoadingSpinner 
        size="xl" 
        variant="dance" 
        color="primary"
      />
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      <div className="flex justify-center space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);

// Export alle komponenter
export default LoadingSpinner;