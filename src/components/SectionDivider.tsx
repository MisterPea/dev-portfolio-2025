interface SectionDividerProps {
  label: string;
  className?: string;
}
export default function SectionDivider({ label, className }: SectionDividerProps) {
  return (
    <div className={`section_divider${className ? " " + className : ""}`}>
      <h2>{label}</h2>
    </div>
  );
}