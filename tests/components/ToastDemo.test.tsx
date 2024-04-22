import { render, screen } from "@testing-library/react";
import ToastDemo from "../../src/components/ToastDemo";
import userEvent from "@testing-library/user-event";
import { Toaster } from "react-hot-toast";

describe("ToastDemo", () => {
  it("should pop up toast when wne click on button", async () => {
    // Render
    render(
      <>
        <ToastDemo />
        <Toaster />
      </>
    );

    // Find Element
    const button = screen.getByRole("button");

    // act part
    const user = userEvent.setup();
    await user.click(button);

    const toast = await screen.findByText(/success/i);
    // Assert
    expect(toast).toBeInTheDocument();
  });
});
