import KVForm from "@components/Form/KVForm";
import { ItemsSchema, MetaSchema, MetaType } from "@madaskig/cms-db/types";
import { useActionState, useEffect } from "react";
import { addMetaAction } from "~/actions/formActions/addMeta";
import { extractMetaFormData } from "~/helpers/utils/extractMetaFormData";

export default function NewKVForm({
  onValidate,
  onSuccess,
  onCancel,
  item,
}: {
  onValidate?: (o: MetaSchema) => void;
  onSuccess?: (o: MetaSchema) => void;
  onCancel?: () => void;
  item: ItemsSchema;
}) {
  const [state, formAction, pending] = useActionState(addMetaAction, {});

  useEffect(() => {
    if (!pending && state.meta && !state.error && onSuccess) {
      onSuccess(state.meta);
    }
  }, [pending, state, onSuccess]);

  const action = async (formData: FormData) => {
    try {
      const metaToInsert = extractMetaFormData(formData);

      onValidate?.(metaToInsert);

      return formAction(formData);
    } catch (err) {}
  };

  return (
    <KVForm
      title="Add new property"
      onCancel={onCancel}
      action={action}
      hiddenInputs={[
        {
          name: "item",
          value: item.id,
        },
        {
          name: "collection",
          value: item.collectionId,
        },
        {
          name: "type",
          value: MetaType.text,
        },
      ]}
      inputProps={{
        kProps: {
          name: "key",
        },
        vProps: {
          name: "value",
        },
      }}
    />
  );
}
