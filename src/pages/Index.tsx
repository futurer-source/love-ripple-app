import { Heart } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Index = () => {
  const [nearbyCount, setNearbyCount] = useState(0);
  const alarmSoundRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedAlarmRef = useRef(false);

  useEffect(() => {
    // Simulate detection for demo - replace with actual detection logic
    const timer = setTimeout(() => {
      setNearbyCount(1);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (nearbyCount > 0 && !hasPlayedAlarmRef.current) {
      alarmSoundRef.current?.play();
      hasPlayedAlarmRef.current = true;
    } else if (nearbyCount === 0) {
      hasPlayedAlarmRef.current = false;
    }
  }, [nearbyCount]);

  const getStatusText = () => {
    if (nearbyCount === 0) return "no person nearby";
    if (nearbyCount === 1) return "person nearby";
    return "nearby people";
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#00D9DD] via-[#4DD9DB] via-40% to-[#FFD0E0] to-70% flex flex-col items-center justify-between">
      <audio ref={alarmSoundRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSyAzvLZiDcIGWi68ee2cSYIJH3N8t2NQAwSXrTp7KlUFAxJouD1xHQoCD6T2fPJdSkGLYLO89iHNQgZaLvt559NEAtMqOH2tnMhBi+J0/TSgTIICll/w+m6hD0JIGzB6t2XSQ0UXrTp66hVFApGn+DyvmwhBSyAzvLZiDcIGWi78ee2cSYGJH3O8t2NQAwSXbTp7KlUFAxJouD1xHQoCD6R2fTKdCkGLYHO89mINQgZaLvt559NEAtMqOH2tnMhBi+J0/TSgTIICll/w+m6hD0JIGzB6t2XSQwUXrTp66hVFApGn+DyvmshBSx/zvLZhzcHGGi78ue2cSYGJH3O8t2NQAwSXbTp7KlUFAxJouD1xHQoCD6R2fTKdCkGLYHO89mINQgZaLvt559NEAtMqOH2tnMhBi+J0/TSgTIICll/w+m6hD0JIGzB6t2XSQwUXrTp66hVFApGn+DyvmshBSx/zvLZhzcHGGi78ue2cSYGJH3O8t2NQAwSXbTp7KlUFAxJouD1xHQoCD6R2fTKdCkGLYHO89mINQgZaLvt559NEAtMqOH2tnMhBi+J0/TSgTIICll/w+m6hD0JIGzB6t2XSQwUXrTp66hVFApGn+DyvmshBSx/zvLZhzcHGGi78ue2cSYGJH3O8t2NQAwSXbTp7KlUFAxJouD1xHQoCD6R2fTKdCkGLYHO89mINQgZaLvt559NEAtMqOH2tnMhBi+J0/TSgTIICll/w+m6hD0JIGzB6t2XSQwUXrTp66hVFApGn+DyvmshBSx/zvLZhzcHGGi78ue2cSYGJH3O8t2NQAwSXbTp7KlUFAxJouD1xHQoCD6R2fTKdCkGLYHO89mINQgZaLvt559NEAtMqOH2tnMhBi+J0/TSgTIICll/w+m6hD0JIGzB6t2XSQwUXrTp66hVFApGn+DyvmshBSx/zvLZhzcHGGi78ue2cSYGJH3O8t2NQAwSXbTp7KlUFAxJouD1xHQoCD6R2fTKdCkGLYHO89mINQgZaLvt559NEAtMqOH2tnMhBi+J0/TSgTIICll/w+m6hD0JIGzB6t2XSQwUXrTp66hVFApGn+DyvmshBSx/zvLZhzcHGGi78ue2cSYGJH3O8t2NQAwSXbTp7KlUFAxJouD1xHQoCD6R2fTKdCkGLYHO89mINQgZaLvt559NEAtMqOH2tnMhBi+J0/TSgTIICll/w+m6hD0JIGzB6t2XSQwUXrTp66hVFApGn+DyvmshBSx/zvLZhzcHGGi78ue2cSYGJH3O8t2NQAwSXbTp7KlUFAxJouD1xHQoCD6R2fTKdCkGLYHO89mINQgZaLvt559NEAtMqOH2tnMhBi+J0/TSgTIICll/w+m6hD0JIGzB6t2XSQwUXrTp66hVFApGn+DyvmshBSx/zvLZhzcHGGi78ue2cSYGJH3O8t2NQAwSXbTp7KlUFAxJouD1xHQoCD6R2fTKdCkGLYHO89mINQgZaLvt55" preload="auto" />
      {/* Header */}
      <header className="pt-12 sm:pt-16">
        <h1 className="text-[32px] sm:text-[36px] font-thin text-white/85 tracking-wide">
          사랑 알람
        </h1>
      </header>

      {/* Central Ripple Effect with Heart */}
      <div className="relative flex items-center justify-center">
        {/* Floating particles */}
        <div className="absolute w-2 h-2 bg-white/60 rounded-full -top-20 -left-16 animate-float" />
        <div className="absolute w-1.5 h-1.5 bg-white/40 rounded-full -top-12 left-24 animate-float-delayed" />
        <div className="absolute w-2.5 h-2.5 bg-white/50 rounded-full top-8 -right-20 animate-float-delayed-2" />
        <div className="absolute w-1 h-1 bg-white/70 rounded-full -bottom-16 -left-12 animate-float" />
        <div className="absolute w-2 h-2 bg-white/45 rounded-full -bottom-8 right-16 animate-float-delayed" />
        <div className="absolute w-1.5 h-1.5 bg-white/55 rounded-full bottom-20 -right-16 animate-float-delayed-2" />

        {/* Outermost ripple circle */}
        <div className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-full border-[5px] border-white/30 animate-ripple" 
             style={{ filter: 'blur(1px)' }} />
        
        {/* Middle ripple circle */}
        <div className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] rounded-full border-[5px] border-cyan-300/40 animate-ripple-delayed" 
             style={{ filter: 'blur(0.5px)' }} />
        
        {/* Inner ripple circle */}
        <div className="absolute w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full border-[5px] border-cyan-400/50 animate-ripple-delayed-2" />

        {/* Radar detection dot - shows when users detected */}
        {nearbyCount > 0 && (
          <div className="absolute top-8 right-8 w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50 animate-blink-radar" />
        )}

        {/* Center heart */}
        <div className="relative z-10 flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#FF6B9D] to-[#FF8FB3] shadow-lg shadow-pink-300/40 animate-pulse-soft">
          <Heart 
            className="w-14 h-14 sm:w-16 sm:h-16 fill-white text-white drop-shadow-md" 
            strokeWidth={0}
          />
        </div>
      </div>

      {/* Bottom section with number and status */}
      <div className="pb-24 sm:pb-32 flex flex-col items-center gap-4">
        <p className="text-[80px] sm:text-[96px] font-bold text-white/90 leading-none tracking-tight">
          {nearbyCount}
        </p>
        
        {/* Status pill */}
        <div className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
          <p className="text-sm sm:text-base font-medium text-white/90">
            {getStatusText()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
