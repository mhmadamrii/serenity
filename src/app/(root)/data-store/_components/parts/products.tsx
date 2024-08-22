import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const products = [
  {
    id: 1,
    title: "Leather Jacket",
    description: "Classic black leather jacket with a modern twist.",
    price: 199.99,
    image: "https://placehold.co/300x200",
    badge: "New",
  },
  {
    id: 2,
    title: "Denim Jeans",
    description: "Comfortable and stylish denim jeans for everyday wear.",
    price: 59.99,
    image: "https://placehold.co/400x250",
  },
  {
    id: 3,
    title: "Sneakers",
    description: "Lightweight and durable sneakers for all your adventures.",
    price: 89.99,
    image: "https://placehold.co/100x50",
    badge: "Sale",
  },
  {
    id: 4,
    title: "Summer Dress",
    description: "Flowy and elegant summer dress perfect for any occasion.",
    price: 79.99,
    image: "https://placehold.co/140x150",
  },
  {
    id: 5,
    title: "Sunglasses",
    description: "Stylish sunglasses with UV protection for sunny days.",
    price: 29.99,
    image: "https://placehold.co/300x250",
  },
  {
    id: 6,
    title: "Watch",
    description:
      "Elegant timepiece with a leather strap and minimalist design.",
    price: 149.99,
    image: "https://placehold.co/300x250",
    badge: "Limited",
  },
];

export function Products() {
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Product's Data</CardTitle>
        <CardDescription>
          Manage your customer and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveMasonry>
          <Masonry columnsCount={2} gutter="10px">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex h-fit flex-col rounded-lg border p-4 dark:border-gray-700"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-auto w-full rounded-md object-cover"
                />
                <div className="mb-2 flex items-start justify-between">
                  <h2 className="text-xl font-semibold">{product.title}</h2>
                  {product.badge && (
                    <Badge variant="secondary" className="ml-2">
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <p className="mb-2 text-sm text-muted-foreground">
                  {product.description}
                </p>
                <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                <Button className="w-full">Add to Cart</Button>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>{[1, 2].length}</strong>{" "}
          products
        </div>
      </CardFooter>
    </Card>
  );
}
