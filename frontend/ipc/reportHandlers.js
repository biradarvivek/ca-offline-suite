const { ipcMain } = require("electron");
const log = require("electron-log");
const db = require("../db/db");
const { cases } = require("../db/schema/Cases");
const { statements } = require("../db/schema/Statement");
const { eq, and } = require("drizzle-orm");

function registerReportHandlers() {
    ipcMain.handle("get-recent-reports", async (event) => {
        try {

            const result = await db
                .select()
                .from(cases)
                .orderBy(cases.createdAt, "DESC")
                .leftJoin(statements, eq(cases.id, statements.caseId))
                .limit(10);

            const groupedResults = result.reduce((acc, row) => {
                const caseId = row.cases.id; // Use 'cases.id' to group by case

                if (!acc[caseId]) {
                    acc[caseId] = { ...row.cases, statements: [] };
                }

                if (row.statements) {
                    acc[caseId].statements.push({ ...row.statements }); // Make sure you're adding the full statement object
                }

                return acc;
            }, {});

            const finalResults = Object.values(groupedResults);
            return finalResults;
        } catch (error) {
            log.error("Error fetching reports:", error);
            throw error;
        }
    });
}

module.exports = { registerReportHandlers };