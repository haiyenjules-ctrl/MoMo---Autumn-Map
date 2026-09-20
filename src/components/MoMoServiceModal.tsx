import { useState } from 'react';
import { Plane, Building2, Smartphone, QrCode, X, ExternalLink, Check, Copy, Sparkles, ShieldCheck, Train, Compass, CreditCard } from 'lucide-react';
import { Destination } from '../types';

export type ServiceType = 'combo' | 'flight' | 'hotel' | 'esim' | 'qr' | 'transit';

interface MoMoServiceModalProps {
  serviceType: ServiceType;
  destination: Destination;
  onClose: () => void;
  onTrackClick?: (service: string) => void;
}

export function MoMoServiceModal({
  serviceType,
  destination,
  onClose,
  onTrackClick,
}: MoMoServiceModalProps) {
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const getServiceData = () => {
    switch (serviceType) {
      case 'combo':
        return {
          title: 'Combo Vé bay, Khách sạn & eSIM đi ' + destination.city,
          icon: <Plane className="w-5 h-5 text-rose-500" />,
          color: 'from-rose-500 via-[#D82D8B] to-amber-500',
          badge: 'MoMo All-In-One Travel',
          deepLink: `momo://travel/combo?dest=${encodeURIComponent(destination.city)}&country=${destination.countryCode}`,
          highlights: [
            'Đặt trọn gói Vé máy bay, Khách sạn gần điểm ngắm lá và eSIM 5G chỉ trong 1 lần thanh toán',
            'Giá công khai minh bạch, không phí ẩn, hỗ trợ hủy đổi linh hoạt',
            'Thanh toán trả sau 0% lãi suất với Ví Trả Sau MoMo',
          ],
          offer: 'Ưu đãi trọn gói mùa thu: Giảm đến 500.000đ khi đặt combo du lịch',
        };
      case 'transit':
        return {
          title: 'Di chuyển thông minh tại ' + destination.country,
          icon: <Train className="w-5 h-5 text-blue-500" />,
          color: 'from-blue-600 via-indigo-600 to-violet-600',
          badge: 'MoMo Transit & Mobility',
          deepLink: `momo://travel/transit?dest=${destination.countryCode}&city=${encodeURIComponent(destination.city)}`,
          highlights: [
            'Đặt vé tàu Metro, Shinkansen, KTX hoặc tàu cao tốc trực tiếp trên MoMo',
            'Gọi taxi quốc tế và quét mã gọi món tại các nhà hàng địa phương thuận tiện',
            'Xem hướng dẫn lộ trình di chuyển chi tiết đến điểm ngắm lá không lo lạc đường',
          ],
          offer: 'Tặng coupon giảm 10% vé tàu & trải nghiệm phương tiện công cộng',
        };
      case 'flight':
        return {
          title: 'Vé máy bay',
          icon: <Plane className="w-5 h-5 text-rose-500" />,
          color: 'from-rose-500 to-red-600',
          badge: 'MoMo Flights',
          deepLink: `momo://travel/flights?to=${encodeURIComponent(destination.city)}&country=${destination.countryCode}`,
          highlights: [
            'So sánh giá vé hơn 50 hãng hàng không hàng đầu: Vietjet, Vietnam Airlines, EVA Air, Scoot...',
            'Giữ chỗ miễn phí, thanh toán trả sau qua Ví Trả Sau MoMo 0% lãi suất',
            'Nhận vé điện tử tức thì và hỗ trợ 24/7 trực tiếp trên ứng dụng',
          ],
          offer: 'Giảm đến 300.000đ cho vé máy bay mùa thu',
        };
      case 'hotel':
        return {
          title: 'Khách sạn',
          icon: <Building2 className="w-5 h-5 text-amber-500" />,
          color: 'from-amber-500 to-orange-600',
          badge: 'MoMo Hotels',
          deepLink: `momo://travel/hotels?query=${encodeURIComponent(destination.name)}&city=${encodeURIComponent(destination.city)}`,
          highlights: [
            'Hàng ngàn lựa chọn khách sạn, resort, ryokan và homestay chất lượng',
            'Xem đánh giá thực tế từ cộng đồng du lịch Việt Nam',
            'Hoàn tiền đến 12% vào heo đất MoMo sau khi hoàn tất kỳ nghỉ',
          ],
          offer: 'Nhập mã THU2026 giảm thêm 15% phòng khách sạn',
        };
      case 'esim':
        return {
          title: 'eSIM du lịch',
          icon: <Smartphone className="w-5 h-5 text-blue-500" />,
          color: 'from-blue-500 to-indigo-600',
          badge: 'MoMo eSIM Quốc Tế',
          deepLink: `momo://travel/esim?country=${destination.countryCode}`,
          highlights: [
            'Nhận mã QR kích hoạt tức thì sau 30 giây thanh toán',
            'Data 4G/5G tốc độ cao không giới hạn dung lượng hàng ngày',
            'Không cần tháo lắp thẻ SIM, giữ nguyên số liên lạc liên kết ví MoMo',
          ],
          offer: 'Gói data thoải mái chỉ từ 120.000đ',
        };
      case 'qr': {
        const qrPartnerText =
          destination.countryCode === 'china'
            ? 'Dùng MoMo quét QR thanh toán hoặc đưa mã thanh toán tại các điểm chấp nhận của Alipay, Wechat'
            : destination.countryCode === 'japan'
            ? 'Dùng MoMo quét QR thanh toán hoặc đưa mã thanh toán tại các điểm chấp nhận của Alipay, Paypay'
            : destination.countryCode === 'korea'
            ? 'Dùng MoMo quét QR thanh toán hoặc đưa mã thanh toán tại các điểm chấp nhận của Alipay, ZeroPay'
            : 'Dùng MoMo quét QR thanh toán hoặc đưa mã thanh toán tại các điểm chấp nhận của Alipay, Paypay, ZeroPay';

        return {
          title: 'Thanh toán nước ngoài bằng MoMo',
          icon: <QrCode className="w-5 h-5 text-emerald-500" />,
          color: 'from-emerald-500 to-teal-600',
          badge: 'MoMo Global Pay',
          deepLink: `momo://payment/global_qr?dest=${destination.countryCode}`,
          highlights: [
            qrPartnerText,
            'Tỷ giá rẻ sát thị trường ngân hàng, tuyệt đối KHÔNG phí ẩn, không phụ phí',
            'Áp dụng tại hàng triệu nhà hàng, cửa hàng tiện lợi và điểm mua sắm',
          ],
          offer: 'Tỷ giá ưu đãi 0 đồng phụ phí - Hoàn tiền 5% cho các giao dịch đầu',
        };
      }
    }
  };

  const service = getServiceData();

  const handleAction = () => {
    setIsProcessing(true);
    if (onTrackClick) {
      onTrackClick(`momo_service_${serviceType}_${destination.id}`);
    }
    setTimeout(() => {
      setIsProcessing(false);
      setCompleted(true);
    }, 600);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(service.deepLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div
        id="momo-service-modal"
        className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200"
      >
        {/* Header with MoMo signature banner */}
        <div className={`bg-linear-to-r ${service.color} text-white p-4 relative`}>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase backdrop-blur-xs">
              {service.badge}
            </span>
          </div>

          <h3 className="font-bold text-base text-white leading-tight mt-1 flex items-center gap-2">
            <span>{service.icon}</span>
            <span>{service.title}</span>
          </h3>

          <p className="text-white/80 text-xs mt-1">
            Cho chuyến ngắm mùa thu tại {destination.name}, {destination.city}
          </p>
        </div>

        {/* Body Content */}
        <div className="p-4 space-y-3.5">
          {/* Special Offer Card */}
          <div className="p-3 bg-rose-50/80 rounded-2xl border border-rose-200/80 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-rose-900 block">Ưu đãi mùa thu MoMo</span>
              <span className="text-rose-700">{service.offer}</span>
            </div>
          </div>

          {/* Value props */}
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              Lợi ích khi dùng MoMo
            </p>
            {service.highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Deep link preview box */}
          <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/80 flex items-center justify-between text-[11px] text-stone-600">
            <div className="truncate pr-2 font-mono text-[10px] text-stone-500">
              {service.deepLink}
            </div>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 text-stone-700 hover:text-stone-900 font-medium shrink-0 bg-white border border-stone-200 px-2 py-1 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700 text-[10px]">Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span className="text-[10px]">Sao chép</span>
                </>
              )}
            </button>
          </div>

          {/* Primary CTA */}
          <div className="pt-1">
            {completed ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-bold text-xs">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Đã kết nối thành công dịch vụ MoMo!</span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  (Mô phỏng mở Mini-app trên điện thoại)
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 text-xs font-semibold text-stone-600 underline hover:text-stone-900"
                >
                  Đóng cửa sổ
                </button>
              </div>
            ) : (
              <button
                id="momo-service-open-btn"
                onClick={handleAction}
                disabled={isProcessing}
                className="w-full py-3 rounded-2xl bg-linear-to-r from-[#A50064] to-[#D82D8B] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-105 active:scale-98 transition-all"
              >
                {isProcessing ? (
                  <span>Đang mở dịch vụ trên MoMo...</span>
                ) : (
                  <>
                    <span>Mở dịch vụ trên ứng dụng MoMo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
