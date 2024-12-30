import KVForm from "@components/Form/KVForm";

export default function NewKVForm({
  onValidate,
  onCancel,
}: {
  onValidate?: (o: { key: string; value: string }) => void;
  onCancel?: () => void;
}) {
  return <KVForm title="Add new property" onCancel={onCancel} />;
}
