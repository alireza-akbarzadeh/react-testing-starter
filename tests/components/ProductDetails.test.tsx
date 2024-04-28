import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";

import { delay, http, HttpResponse } from "msw";
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

  it("should render  product details", async () => {
    const product = db.product.findFirst({
      where: { id: { equals: productId } },
    });

    render(<ProductDetail productId={productId} />);

    expect(
      await screen.findByText(new RegExp(product!.name))
    ).toBeInTheDocument();
    expect(
      await screen.findByText(new RegExp(product!.price.toString()))
    ).toBeInTheDocument();
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
  it("should render and error if data fetching fails", async () => {
    server.use(http.get("/products/:id", () => HttpResponse.error()));
    render(<ProductDetail productId={productId} />);
    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
  it("should render loading when the data is being fetched", async () => {
    server.use(
      http.get("/products/:id", async () => {
        await delay();
        return HttpResponse.json([]);
      })
    );

    render(<ProductDetail productId={productId} />);

    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  });

  it("should render loading indicator after the data is being fetched", async () => {
    render(<ProductDetail productId={productId} />);
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });

  it("should remove render loading when the data is being fails", async () => {
    server.use(http.get("/products/:id", () => HttpResponse.error()));

    render(<ProductDetail productId={productId} />);
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });
});
