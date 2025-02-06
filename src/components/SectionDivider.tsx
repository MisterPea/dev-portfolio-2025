export default function SectionDivider({ label }: { label: string; }) {
  return (
    <div className="section_divider">
      <h2>{label}</h2>
    </div>
  );
}