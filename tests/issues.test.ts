import { logger, TIMEOUTS } from "../src/config";
import { getAllIssues } from "../src/utils";

/**
 * Test suite validating Issues retrieval with pagination.
 */
describe("Issues API Tests", () => {
  test(
    "Get all Issues with Pagination",
    async () => {
      try {
        const issues = await getAllIssues();
        expect(Array.isArray(issues)).toBeTruthy();
        logger.info(`✅ Total Issues retrieved: ${issues.length}`);
      } catch (error: any) {
        logger.error(`❌ Failed to retrieve issues: ${error.message}`);
        throw error;
      }
    },
    TIMEOUTS.TEST
  );
});
