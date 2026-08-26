"use client";

import { ProductGrid } from "./product-grid";
import { Category, ProductListProduct } from "@/types";
import {
  ArrowUpDown,
  Filter,
  Search,
  Tag,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useState, useCallback, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductSearch } from "./product-search";

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export default function ProductListClient({
  initialProducts,
  categories,
  pagination: initialPagination,
}: {
  initialProducts: ProductListProduct[];
  categories: Category[];
  pagination: Pagination;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") ?? "all";
  const initialSortByParam = searchParams.get("sortBy");
  const initialSortOrderParam = searchParams.get("sortOrder");
  const initialSortBy =
    initialSortByParam && initialSortOrderParam
      ? `${initialSortByParam}-${initialSortOrderParam}`
      : "default";
  const initialMinPrice = parseFloat(searchParams.get("minPrice") ?? "1");
  const initialMaxPrice = parseFloat(searchParams.get("maxPrice") ?? "1000");

  const [products, setProducts] =
    useState<ProductListProduct[]>(initialProducts);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [priceRange, setPriceRange] = useState([
    initialMinPrice,
    initialMaxPrice,
  ]);
  const [committedPriceRange, setCommittedPriceRange] = useState([
    initialMinPrice,
    initialMaxPrice,
  ]);

  const [min, max] = committedPriceRange;
  const hasMore = pagination.page < pagination.totalPages;

  const [prevInitialProducts, setPrevInitialProducts] =
    useState(initialProducts);
  const [isAppending, setIsAppending] = useState(false);

  if (prevInitialProducts !== initialProducts && !isAppending) {
    setPrevInitialProducts(initialProducts);
    if (initialPagination.page === 1) {
      setProducts(initialProducts);
      setPagination(initialPagination);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("category");
    params.delete("sortBy");
    params.delete("sortOrder");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("page");

    if (selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }

    if (sortBy !== "default") {
      const [field, order] = sortBy.split("-");
      params.set("sortBy", field);
      params.set("sortOrder", order);
    }

    if (min !== 1) {
      params.set("minPrice", String(min));
    }

    if (max !== 1000) {
      params.set("maxPrice", String(max));
    }

    const newUrl = params.toString();
    const currentUrl = searchParams
      .toString()
      .replace(/[&?]?page=\d+/, "")
      .replace(/^&/, "");

    if (newUrl !== currentUrl) {
      router.replace(`?${newUrl}`, { scroll: false });
    }
  }, [selectedCategory, sortBy, min, max, router, searchParams]);
  const handleClearFilters = () => {
    setPriceRange([1, 1000]);
    setCommittedPriceRange([1, 1000]);
    setSelectedCategory("all");
    setSortBy("default");
    setProducts(initialProducts);
    setPagination(initialPagination);

    router.replace("?", { scroll: false });
  };

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore) return;

    setIsAppending(true);
    setIsLoadingMore(true);

    try {
      const params = new URLSearchParams();
      const nextPage = pagination.page + 1;
      params.set("page", String(nextPage));

      // build from state, not searchParams
      if (selectedCategory !== "all") params.set("category", selectedCategory);
      if (sortBy !== "default") {
        const [field, order] = sortBy.split("-");
        params.set("sortBy", field);
        params.set("sortOrder", order);
      }
      if (min !== 1) params.set("minPrice", String(min));
      if (max !== 1000) params.set("maxPrice", String(max));

      const response = await fetch(`/web-api/products?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();

      if (data.products && data.products.length > 0) {
        setProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newProducts = data.products.filter(
            (p: ProductListProduct) => !existingIds.has(p.id),
          );
          return [...prev, ...newProducts];
        });
        setPagination(data.pagination);

        // update URL with page number — Effect won't interfere
        // because it ignores page in its comparison
        router.replace(`?${params.toString()}`, { scroll: false });
        setIsAppending(false);
      } else {
        setIsAppending(false);
      }
    } catch (error) {
      console.error("Error loading more products:", error);
      setIsAppending(false);
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    pagination.page,
    isLoadingMore,
    selectedCategory,
    sortBy,
    min,
    max,
    router,
  ]);

  const memoizedProducts = useMemo(() => products, [products]);

  return (
    <div className="min-h-screen bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-neutral-500 mb-4 uppercase tracking-wider flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  className={cn(
                    "rounded-lg px-4 h-9 transition-all",
                    selectedCategory !== "all" &&
                      "bg-neutral-100 text-neutral-800 hover:bg-neutral-100",
                  )}
                  onClick={() => setSelectedCategory("all")}
                >
                  All Products
                </Button>

                {categories.map((category) => (
                  <Button
                    key={category.slug}
                    className={cn(
                      "rounded-lg px-4 h-9 transition-all",
                      selectedCategory !== category.slug &&
                        "bg-neutral-100 text-neutral-800 hover:bg-neutral-100",
                    )}
                    onClick={() => setSelectedCategory(category.slug)}
                  >
                    <ShoppingBag className="w-3.5 h-3.5 mr-2 opacity-70" />
                    {category.name}
                    <Badge
                      variant="secondary"
                      className="ml-2 bg-white/20 text-current hover:bg-white/30 h-5 px-1.5 min-w-5"
                    >
                      {category._count?.products}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              <div className="w-full flex-1">
                <ProductSearch />
              </div>

              <div className="w-full lg:w-72 space-y-4">
                <div className="flex items-center justify-between w-full">
                  <label className="text-sm font-medium text-neutral-600 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Price Range
                  </label>
                  <span className="text-sm font-semibold text-neutral-600">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <Slider
                  value={priceRange}
                  min={1}
                  max={1000}
                  step={1}
                  onValueChange={(value) => setPriceRange(value)}
                  onValueCommit={(value) => setCommittedPriceRange(value)}
                  className="w-full"
                />
              </div>

              <div className="flex items-center w-full lg:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full lg:w-48 rounded-lg bg-white border-neutral-200">
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="w-4 h-4 text-neutral-500" />
                      <SelectValue placeholder="Sort by" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Featured</SelectItem>
                    <SelectItem value="price-asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating-asc">
                      Rating: Low to High
                    </SelectItem>
                    <SelectItem value="rating-desc">
                      Rating: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-neutral-600">
            Showing{" "}
            <span className="font-bold text-neutral-600">
              {products.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-neutral-600">
              {pagination.total}
            </span>{" "}
            product{pagination.total !== 1 ? "s" : ""}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-neutral-300">
            <div className="w-16 h-16 bg-neutral-50 rounded-lg flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-600 mb-2">
              No products found
            </h3>
            <p className="text-neutral-500 mb-6 text-center max-w-sm">
              We couldn&apos;t find any products matching your current filters.
              Try adjusting your search or category.
            </p>
            <Button
              onClick={handleClearFilters}
              className="bg-neutral-500 hover:bg-neutral-600 rounded-lg px-8"
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            <ProductGrid products={memoizedProducts} />

            {hasMore && (
              <div className="flex justify-center">
                <Button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="bg-neutral-500 hover:bg-neutral-600 rounded-lg px-8 h-12 text-base font-medium shadow-sm transition-all hover:shadow-md disabled:opacity-50"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading more...
                    </>
                  ) : (
                    <>
                      Load More Products
                      <span className="ml-2 text-xs opacity-75">
                        ({pagination.total - products.length} remaining)
                      </span>
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
