type Props = {
  id: string | number;
  label: string;
  className?: string;
};

export default function LabelPill({ id, label, className }: Props) {
  return (
    <div
      key={id}
      className={`w-full rounded-md text-center p-1 text-xs font-semibold ${className || ""}`}
    >
      {label}
    </div>
  );
}
