import type { Product } from "./types";
import { strings } from "./strings";

export type ProductSpecEntry = {
  label: string;
  value: string;
};

export function getProductSpecs(product: Product): ProductSpecEntry[] {
  const { specLabels } = strings.productDetail;
  const entries: ProductSpecEntry[] = [
    { label: specLabels.capacity, value: product.capacity },
    { label: specLabels.material, value: product.material },
    { label: specLabels.color, value: product.color },
    { label: specLabels.structure, value: product.structure },
    { label: specLabels.usage, value: product.usage },
    { label: specLabels.size, value: product.size },
  ];

  if (product.grade) {
    entries.push({ label: specLabels.grade, value: product.grade });
  }
  if (product.finish) {
    entries.push({ label: specLabels.finish, value: product.finish });
  }
  if (product.minimumOrder) {
    entries.push({
      label: specLabels.minOrder,
      value: `${product.minimumOrder} ${strings.productDetail.minOrderUnit}`,
    });
  }

  return entries.filter((entry) => entry.value.trim().length > 0);
}
