// npx ts-node lesson-2/query-metadata.ts

import Query from "@irys/query";

(async () => {
  const myQuery = new Query({ network: "arweave" });
  const results = await myQuery
    .search("arweave:transactions")
    .tags([
      { name: "Content-Type", values: ["application/json"] },
      {
        name: "App-Name",
        values: ["ArweavePH-Cohort-0"],
      },
    ])
    .first();

  console.log("results ==>", results);
})();
