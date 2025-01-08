// import { uploadImage } from "~/actions/client/uploadImage";
import ImageUploader from "@features/ImageUploader";
import { ModalProps } from "~/types";

type Props = ModalProps;

export function ModalImageSelector({ closeModal }: Props) {
  return (
    <div className="relative h-[100vh]" data-testid="modal-image-selector">
      <ImageUploader
        onCancel={closeModal}
        onSuccess={closeModal}
        onSubmit={async (args: { file: File; filename?: string }) => {
          // await uploadImage(args);
        }}
      />
    </div>
  );
}
