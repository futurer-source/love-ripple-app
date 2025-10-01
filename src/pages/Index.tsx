import { Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#00D9DD] via-[#4DD9DB] via-40% to-[#FFD0E0] to-70% flex flex-col items-center justify-between">
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
        <div className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-full border-[3px] border-white/20 animate-ripple" 
             style={{ filter: 'blur(1px)' }} />
        
        {/* Middle ripple circle */}
        <div className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] rounded-full border-[3px] border-cyan-300/30 animate-ripple-delayed" 
             style={{ filter: 'blur(0.5px)' }} />
        
        {/* Inner ripple circle */}
        <div className="absolute w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full border-[3px] border-cyan-400/40 animate-ripple-delayed-2" />

        {/* Center heart */}
        <div className="relative z-10 flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#FF6B9D] to-[#FF8FB3] shadow-lg shadow-pink-300/40 animate-pulse-soft">
          <Heart 
            className="w-14 h-14 sm:w-16 sm:h-16 fill-white text-white drop-shadow-md" 
            strokeWidth={0}
          />
        </div>
      </div>

      {/* Bottom number */}
      <div className="pb-24 sm:pb-32">
        <p className="text-[140px] sm:text-[160px] font-thin text-white/90 leading-none tracking-tight">
          1
        </p>
      </div>
    </div>
  );
};

export default Index;
