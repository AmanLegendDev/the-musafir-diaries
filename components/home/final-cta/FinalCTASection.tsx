import FinalCTAContent from "./FinalCTAContent";
import FinalCTAVisual from "./FinalCTAVisual";

export default function FinalCTASection() {
  return (
    <section className="relative overflow-hidden bg-[#071A33]">
      <div className="relative mx-auto grid min-h-[620px] max-w-[1600px] lg:grid-cols-2">
        <FinalCTAContent />
        <FinalCTAVisual />
      </div>
    </section>
  );
}