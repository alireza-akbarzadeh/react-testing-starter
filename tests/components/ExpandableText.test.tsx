import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ExpandableText from "../../src/components/ExpandableText";

describe("ExpandableText", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncateText = longText.substring(0, limit) + "...";

  it("should render the text if the given text 255 characters", () => {
    const text = "short text";
    render(<ExpandableText text={text} />);

    const article = screen.getByText(text);
    expect(article).toBeInTheDocument();
  });
  it("should truncate the if the given text is more than 255 characters", async () => {
    render(<ExpandableText text={longText} />);
    expect(screen.getByText(truncateText)).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
  it("should  expand the text if the show more button clicked", async () => {
    render(<ExpandableText text={longText} />);
    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();

    expect(button).toHaveTextContent(/less/i);
  });

  it("should  collaps the text if the show more button clicked", async () => {
    render(<ExpandableText text={longText} />);
    const showMoreBtn = screen.getByRole("button");

    const user = userEvent.setup();

    await user.click(showMoreBtn);

    await user.click(showMoreBtn);

    expect(screen.getByText(truncateText)).toBeInTheDocument();

    expect(showMoreBtn).toHaveTextContent(/more/i);
  });
});
