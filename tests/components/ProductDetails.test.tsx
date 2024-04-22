import { render, screen } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";

import { http, HttpResponse } from "msw";
import { db } from "../mocks/db";
import { server } from "../mocks/server";

describe("ProductDetails", () => {
  let productId: number;

  beforeAll(() => {
    const product = db.product.create();
    productId = product.id;
  });
  afterAll(() => {
    db.product.delete({ where: { id: { equals: productId } } });
  });

  it("should render the list of product details", async () => {
    const product = db.product.findFirst({
      where: { id: { equals: productId } },
    });
    render(<ProductDetail productId={productId} />);

    expect(await screen.findByText(product!.name)).toBeInTheDocument();
    expect(await screen.findByText(product!.price)).toBeInTheDocument();
  });

  it("should render if product not found", async () => {
    server.use(http.get("/products/:id", () => HttpResponse.json(null)));
    render(<ProductDetail productId={productId} />);
    const message = await screen.findByText(/not found/i);
    expect(message).toBeInTheDocument();
  });
  it("should render and error for invalid product id", async () => {
    render(<ProductDetail productId={0} />);
    const error = await screen.findByText(/invalid/i);
    expect(error).toBeInTheDocument();
  });
});
