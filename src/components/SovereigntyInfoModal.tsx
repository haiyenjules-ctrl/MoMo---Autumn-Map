import React from 'react';
import { ShieldCheck, X, CheckCircle, Globe, ExternalLink } from 'lucide-react';

interface SovereigntyInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SovereigntyInfoModal: React.FC<SovereigntyInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-linear-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-emerald-100">
                <ShieldCheck className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Cam Kết Bản Đồ Chuẩn Quốc Tế</h3>
                <p className="text-emerald-100 text-xs mt-0.5">Tuân thủ nghiêm ngặt chủ quyền và quy định pháp luật Việt Nam</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body content */}
        <div className="p-5 space-y-4 text-stone-700 text-sm max-h-[70vh] overflow-y-auto">
          {/* Key Bullet 1 */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-100">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-emerald-950 text-sm">Loại bỏ 100% đường lưỡi bò phi pháp</h4>
              <p className="text-emerald-800 text-xs mt-1 leading-relaxed">
                Ứng dụng sử dụng nguồn dữ liệu bản đồ quốc tế <strong>Esri Geographic &amp; OpenStreetMap (OSM)</strong> tuân theo Công ước Quốc tế UNCLOS 1982. Tuyệt đối <strong>không vẽ, không hỗ trợ và không hiển thị</strong> bất kỳ đường 9 đoạn / đường lưỡi bò phi pháp nào trên Biển Đông.
              </p>
            </div>
          </div>

          {/* Key Bullet 2: No API Needed */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-blue-50/80 border border-blue-100">
            <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-950 text-sm">100% Không Cần API / API Key</h4>
              <p className="text-blue-800 text-xs mt-1 leading-relaxed">
                Bản đồ hoạt động hoàn toàn bằng thư viện bản đồ nguồn mở độc lập (Leaflet &amp; OpenStreetMap tiles). <strong>Không cần API Key</strong>, không phụ thuộc tài khoản Google Maps hay Mapbox, không lo hết hạn mức (quota) hay phát sinh chi phí ẩn.
              </p>
            </div>
          </div>

          {/* Key Bullet 3 */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-100">
            <Globe className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-950 text-sm">Phạm vi địa lý giới hạn chuyên biệt</h4>
              <p className="text-amber-800 text-xs mt-1 leading-relaxed">
                Khung nhìn bản đồ được giới hạn tự động (Map Boundaries) tập trung chuyên biệt vào các địa danh du lịch mùa thu Đông Bắc Á (Nhật Bản, Hàn Quốc và các vùng mùa thu nổi tiếng Trung Quốc như Cửu Trại Câu, Hương Sơn, Bắc Kinh).
              </p>
            </div>
          </div>

          {/* Key Bullet 3 */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
            <CheckCircle className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-stone-900 text-sm">An toàn cho người dùng &amp; Đối tác</h4>
              <p className="text-stone-600 text-xs mt-1 leading-relaxed">
                Mọi người dùng trẻ Việt Nam và MoMo có thể hoàn toàn an tâm trải nghiệm, chụp màn hình, chia sẻ hành trình du lịch lên mạng xã hội mà không lo ngại các rủi ro pháp lý hay tranh chấp bản đồ.
              </p>
            </div>
          </div>

          <div className="p-3 bg-stone-100/80 rounded-xl text-[11px] text-stone-500 leading-relaxed">
            Dữ liệu địa lý được cập nhật tự động từ các dịch vụ bản đồ nguồn mở toàn cầu không qua bất kỳ cổng kiểm duyệt nội địa nào của Trung Quốc (như Baidu Maps hay Amap).
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 font-medium"
          >
            Nguồn OpenStreetMap Quốc Tế <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
          >
            Đã Hiểu &amp; An Tâm Khám Phá
          </button>
        </div>
      </div>
    </div>
  );
};
