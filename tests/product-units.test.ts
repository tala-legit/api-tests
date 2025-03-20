import { logger, TIMEOUTS } from "../src/config";
import { getAllProductUnits } from "../src/utils";

/**
 * Test suite validating Product Units retrieval with pagination.
 */
describe("Product Units API Tests", () => {
  test(
    "Get all Product Units with Pagination",
    async () => {
      try {
        const products = await getAllProductUnits();
        expect(Array.isArray(products)).toBeTruthy();
        logger.info(`✅ Total Product Units retrieved: ${products.length}`);
      } catch (error: any) {
        logger.error(`❌ Failed to retrieve product units: ${error.message}`);
        throw error;
      }
    },
    TIMEOUTS.TEST
  );
});
