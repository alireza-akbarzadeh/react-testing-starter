import { render, screen } from "@testing-library/react";
import ProductList from "../../src/components/ProductList";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("Product", () => {
  it("should render No products available if not products is found ", async () => {
    server.use(http.get("/products", () => HttpResponse.json([])));
    render(<ProductList />);
    const loading = await screen.findByText(/available/i);
    expect(loading).toBeInTheDocument();
  });
  it("should render the list of  products  ", async () => {
    render(<ProductList />);
    const list = await screen.findAllByRole("listitem");
    expect(list.length).toBeGreaterThan(0);
  });
});
