type MessageCardTone = "default" | "warning" | "soft";

type MessageCardProps = {
  title: string;
  message: string;
  tone?: MessageCardTone;
};

const toneClasses: Record<MessageCardTone, string> = {
  default:
    "border-white/70 bg-white/84 text-[#4b2436] shadow-[0_20px_50px_rgba(115,75,95,0.1)]",
  warning:
    "border-[#f4c2a8] bg-[#fff3ea] text-[#6c3524] shadow-[0_20px_50px_rgba(182,102,65,0.1)]",
  soft: "border-[#f1c5d3] bg-[#fff2f6] text-[#7a2949] shadow-[0_20px_50px_rgba(172,73,115,0.1)]",
};

export function MessageCard({
  title,
  message,
  tone = "default",
}: MessageCardProps) {
  return (
    <section className={`grid gap-2 rounded-[24px] border p-5 ${toneClasses[tone]}`}>
      <h2 className="m-0 text-lg">{title}</h2>
      <p className="m-0 text-sm leading-6">{message}</p>
    </section>
  );
}
