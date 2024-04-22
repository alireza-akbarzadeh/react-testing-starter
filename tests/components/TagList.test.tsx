import { render, screen } from "@testing-library/react";
import TagList from "../../src/components/TagList";

describe("TagList", () => {
  it("should render tags", async () => {
    // Render
    render(<TagList />);

    // find Item
    const lisItem = await screen.findAllByRole("listitem");

    // Assert
    expect(lisItem.length).toBeGreaterThan(0);
  });
});
