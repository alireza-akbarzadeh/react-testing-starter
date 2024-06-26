import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import TermsAndConditions from "../../src/components/TermsAndConditions";

describe("TermsAndConditions", () => {
  const renderComponents = () => {
    render(<TermsAndConditions />);
    return {
      heading: screen.getByRole("heading"),
      checkbox: screen.getByRole("checkbox"),
      button: screen.getByRole("button"),
    };
  };

  it("should render with correct text and initial state", () => {
    const { button, checkbox, heading } = renderComponents();

    expect(heading).toHaveTextContent("Terms & Conditions");

    expect(checkbox).not.toBeChecked();

    expect(button).toBeDisabled();
  });
  it("should enable the button when checkbox is checked", async () => {
    const { button, checkbox } = renderComponents();

    const user = userEvent.setup();
    await user.click(checkbox);

    expect(button).toBeEnabled();
  });
});
