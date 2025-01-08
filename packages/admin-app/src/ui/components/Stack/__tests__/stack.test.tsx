import Stack from "..";
import { render } from "@testing-library/react";
import { expect, describe, it } from "vitest";

describe("Stack", () => {
  it.each([
    {
      direction: undefined,
      isReversed: undefined,
      expectedFlexClass: "flex-col",
    },
    { direction: undefined, isReversed: false, expectedFlexClass: "flex-col" },
    {
      direction: undefined,
      isReversed: true,
      expectedFlexClass: "flex-col-reverse",
    },
    {
      direction: "vertical",
      isReversed: undefined,
      expectedFlexClass: "flex-col",
    },
    { direction: "vertical", isReversed: false, expectedFlexClass: "flex-col" },
    {
      direction: "vertical",
      isReversed: true,
      expectedFlexClass: "flex-col-reverse",
    },
    {
      direction: "horizontal",
      isReversed: undefined,
      expectedFlexClass: "flex-row",
    },
    {
      direction: "horizontal",
      isReversed: false,
      expectedFlexClass: "flex-row",
    },
    {
      direction: "horizontal",
      isReversed: true,
      expectedFlexClass: "flex-row-reverse",
    },
  ] as {
    direction?: "vertical" | "horizontal";
    isReversed?: boolean;
    expectedFlexClass: string;
  }[])(
    "renders a Stack component with a child in $expectedFlexClass when props direction=$direction and isReversed=$isRevered",
    ({ direction, isReversed, expectedFlexClass }) => {
      const { container } = render(
        <Stack direction={direction} isReversed={isReversed}>
          <></>
        </Stack>,
      );

      expect(container.firstChild).toHaveClass(expectedFlexClass);
    },
  );

  it("renders a Stack component with a single child component", () => {
    const child = (
      <div data-test-id="child-component">
        <span>Child</span>
      </div>
    );

    let r = render(<Stack>{child}</Stack>);

    expect(r.container.childElementCount).toBe(1);
    expect(r.container.firstChild?.firstChild).toHaveAttribute(
      "data-test-id",
      "child-component",
    );
  });
  it("renders a Stack component with an array of child components", () => {
    const children = new Array(4).fill(null).map((_, i) => (
      <div data-test-id={`child-component-${i}`}>
        <span>Child</span>
      </div>
    ));

    let r = render(<Stack>{children}</Stack>);

    expect(r.container.firstChild).toBeDefined();
    expect(r.container.firstChild?.childNodes).toBeDefined();
    expect(r.container.firstChild?.childNodes.length).toBe(children.length);

    r.container.firstChild?.childNodes.forEach((child, i) => {
      expect(child).toHaveAttribute("data-test-id", `child-component-${i}`);
    });
  });
});
