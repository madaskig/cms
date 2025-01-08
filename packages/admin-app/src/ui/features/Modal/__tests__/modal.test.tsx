import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { ReactNode } from "react";
import {
  type Modal as ModalType,
  ModalProvider,
} from "../../../../contexts/modal";
import Modal from "..";

function renderModalProvider(children: ReactNode, initState: ModalType) {
  return render(
    <ModalProvider initState={initState}>{children}</ModalProvider>,
  );
}

describe("Modal", () => {
  it("should render the correct Modal component", () => {
    vi.mock("react", async () => {
      const actual = await vi.importActual("react");
      return {
        ...actual,
        useActionState: vi.fn(() => [{}, "form-action-mock", false]),
      };
    });

    vi.mock("~/actions/formActions/createCollectionAction", async () => {
      return {
        createCollectionAction: vi.fn(async () => ({
          slug: "test-slug",
        })),
      };
    });

    const { getByTestId } = renderModalProvider(<Modal />, {
      type: "new-collection",
    });

    expect(getByTestId("modal-new-collection")).toBeInTheDocument();
  });
});
