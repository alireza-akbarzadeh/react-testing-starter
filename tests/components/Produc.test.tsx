import { render, screen } from "@testing-library/react";
import ProductList from "../../src/components/ProductList";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
import { db } from "../mocks/db";

describe("Product", () => {
  const productIds: number[] = [];
  beforeAll(() => {
    [1, 2, 3].forEach(() => {
      const products = db.product.create();
      productIds.push(products.id);
    });
  });

  afterAll(() => {
    db.product.deleteMany({ where: { id: { in: productIds } } });
  });

  it("should render the list of products  ", async () => {
    render(<ProductList />);
    const list = await screen.findAllByRole("listitem");
    expect(list.length).toBeGreaterThan(0);
  });

  it("should render No products available if not products is found ", async () => {
    server.use(http.get("/products", () => HttpResponse.json([])));
    render(<ProductList />);
    const loading = await screen.findByText(/available/i);
    expect(loading).toBeInTheDocument();
  });
});
