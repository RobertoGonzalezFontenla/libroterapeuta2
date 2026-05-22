---
// src/lib/contentParser.ts
import { getCollection, type CollectionKey, type CollectionEntry } from "astro:content";

// Define una interfaz mínima para lo que esperas en 'data'
interface PageData {
  draft?: boolean;
}

export const getSinglePage = async <C extends CollectionKey>(
  collectionName: C
): Promise<CollectionEntry<C>[]> => {
  const allPages = await getCollection(collectionName);
  const removeIndex = allPages.filter((data) => data.id.match(/^(?!-)/));

  return removeIndex.filter((data) => {
    const pageData = data.data as PageData;
    return pageData.draft !== true;
  });
};
---
