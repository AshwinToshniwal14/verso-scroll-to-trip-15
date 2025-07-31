import { Progress } from "@/components/ui/progress";

export const ThailandCluster = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 max-w-md mx-auto md:max-w-lg">
      {/* Flag and Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl">🇹🇭</div>
        <div>
          <h3 className="text-xl font-bold text-[#2D3439]">Thailand</h3>
          <p className="text-sm text-[#2D3439]/60">17 saved items</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#2D3439]">Itinerary ready</span>
          <span className="text-sm font-bold text-[#FF7A64]">72%</span>
        </div>
        <Progress value={72} className="h-2" />
      </div>

      {/* Source Breakdown */}
      <div className="mb-6">
        <p className="text-xs text-[#2D3439]/60 mb-3">Pulled from your tagged reels and forwards</p>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <span className="text-[#2D3439]/70">8 from Instagram</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-[#2D3439]/70">6 from WhatsApp</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <span className="text-[#2D3439]/70">3 from TikTok</span>
          </div>
        </div>
      </div>

      {/* Content Categories */}
      <div className="grid grid-cols-3 gap-3 text-xs mb-6">
        <div className="text-center">
          <div className="text-lg mb-1">🍜</div>
          <div className="font-medium text-[#2D3439]">8 cafes</div>
        </div>
        <div className="text-center">
          <div className="text-lg mb-1">🛏️</div>
          <div className="font-medium text-[#2D3439]">3 stays</div>
        </div>
        <div className="text-center">
          <div className="text-lg mb-1">🗺️</div>
          <div className="font-medium text-[#2D3439]">auto-clustered</div>
        </div>
      </div>

      {/* Quick Preview Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-gray-100 text-[#2D3439] text-xs px-2 py-1 rounded-full">Phuket</span>
        <span className="bg-gray-100 text-[#2D3439] text-xs px-2 py-1 rounded-full">Bangkok</span>
        <span className="bg-gray-100 text-[#2D3439] text-xs px-2 py-1 rounded-full">Koh Phi Phi</span>
        <span className="bg-gray-100 text-[#2D3439] text-xs px-2 py-1 rounded-full">+4 more</span>
      </div>
    </div>
  );
};