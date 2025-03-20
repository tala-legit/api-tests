import { AxiosResponse } from "axios";
import { configManager } from "../config";
import { apiClient } from "../client/api-client";

interface Issue {
  [key: string]: any;
}

interface ProductUnit {
  [key: string]: any;
}

/**
 * Retrieve ALL issues from the API, handling cursor-based pagination.
 */
export const getAllIssues = async (): Promise<Issue[]> => {
  let allIssues: Issue[] = [];
  let cursor: string | undefined;

  do {
    const response: AxiosResponse<Issue[]> = await apiClient.get("/issues", {
      params: { pageSize: configManager.pageSize, cursor },
    });

    if (response.status !== 200) {
      throw new Error(`Issues API call failed with status: ${response.status}`);
    }

    allIssues = allIssues.concat(response.data);

    // Cursor-based pagination from Link header
    const linkHeader: string | undefined = response.headers["link"];
    const matchNextCursor = linkHeader?.match(/cursor=([^&>]+)/) ?? null;
    cursor = matchNextCursor
      ? decodeURIComponent(matchNextCursor[1])
      : undefined;
  } while (cursor);

  return allIssues;
};

/**
 * Retrieve ALL product units from the API, handling numeric pagination.
 */
export const getAllProductUnits = async (
  isDetailed = true
): Promise<ProductUnit[]> => {
  let allProducts: ProductUnit[] = [];
  let pageNumber = 1;
  let fetchedAll = false;

  while (!fetchedAll) {
    const response: AxiosResponse<ProductUnit[]> = await apiClient.get(
      "/products",
      {
        params: {
          pageSize: configManager.pageSize,
          pageNumber,
          isDetailed,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(
        `Products API call failed with status: ${response.status}. ${response.data}`
      );
    }

    allProducts = allProducts.concat(response.data);

    // If the API returns fewer items than pageSize, we've reached the last page
    fetchedAll = response.data.length < Number(configManager.pageSize);
    pageNumber += 1;
  }

  return allProducts;
};
