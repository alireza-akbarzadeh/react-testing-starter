import { render, screen } from "@testing-library/react";
import SearchBox from "../../src/components/SearchBox";
import userEvent from "@testing-library/user-event";

describe("SearchBox", () => {
  const renderSearchBox = () => {
    const onChange = vi.fn();
    render(<SearchBox onChange={onChange} />);
    return {
      input: screen.getByPlaceholderText(/search/i),
      user: userEvent.setup(),
      onChange,
    };
  };

  it("should render an input filed for searching", () => {
    const { input } = renderSearchBox();
    expect(input).toBeInTheDocument();
  });

  it("should call onChange when Enter is Pressed  ", async () => {
    const { input, onChange, user } = renderSearchBox();
    const value = "SearchTerm";
    await user.type(input, `${value}{enter}`);
    expect(onChange).toHaveBeenCalledWith(value);
  });

  it("should not call onChange if input filed is empty  ", async () => {
    const { input, onChange, user } = renderSearchBox();

    await user.type(input, "{enter}");

    expect(onChange).not.toHaveBeenCalled();
  });
});
