import { StatProps } from "@/types";
import { NumberTicker } from "../magicui/number-ticker";

const Stat: React.FC<StatProps> = (stat) => {
  return (
    <div className="shrink-0 text-center">
      <div className="text-dynamic-7.5xl text-secondary leading-1.15 font-[Unna]">
        <NumberTicker value={stat.value} className="text-secondary" />
        <span>{stat.suffix}</span>
      </div>
      <p>{stat.content}</p>
    </div>
  );
};

export default Stat;
