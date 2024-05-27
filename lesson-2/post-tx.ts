// npx ts-node lesson-2/post-tx.ts

// Import the dotenv package to load environment variables from a .env file
import "dotenv/config";

// Import the TurboFactory from the @ardrive/turbo-sdk package
import { ArweaveSigner, TurboFactory } from "@ardrive/turbo-sdk";

// Import the  createData functions from the arbundles package
import { createData } from "arbundles";

// Import the fs module to work with the file system
import fs from "fs";

(async () => {
  // Check if the PATH_TO_WALLET environment variable is set
  if (!process.env.PATH_TO_WALLET) {
    // If not, log an error message and exit the process
    console.error("Please set PATH_TO_WALLET in your env.");
    process.exit();
  }

  // Read the wallet file specified by the PATH_TO_WALLET environment variable and parse it as JSON
  const JWK = JSON.parse(
    fs.readFileSync(process.env.PATH_TO_WALLET).toString()
  );

  // Create an authenticated Turbo instance using the private key from the wallet
  const turbo = TurboFactory.authenticated({ privateKey: JWK });

  // Create a new ArweaveSigner instance using the wallet
  const signer = new ArweaveSigner(JWK);

  // Create a new data item to be signed
  const signedDataItem = createData(
    // The data to be signed is a JSON string
    JSON.stringify({
      title: "Angat Dam water level increases by almost 1 meter",
      content: `<figure class="image"><img src="https://images.mb.com.ph/production/IMG_3832_7dac3ad310.jpeg" alt="IMG_3832.jpeg"><figcaption>PAGASA</figcaption></figure><p style="margin-left:0px;"><span style="font-family:UICTFontTextStyleBody;">Angat Dam in Bulacan saw an increase in its water level by almost 1 meter on Monday, May 27, following heavy rainfall from Typhoon “Aghon” (international name: Ewiniar) over the weekend.</span></p><p style="margin-left:0px;"><span style="font-family:UICTFontTextStyleBody;">Based on the 24-hour rainfall monitoring of the Philippine Atmospheric, Geophysical and Astronomical Services Administration (PAGASA) as of 8 a.m., Angat Dam’s water level increased to 179.79 meters, which was 93 centimeters higher than the 178.86 meters recorded the previous day.</span></p><p style="margin-left:0px;"><span style="font-family:UICTFontTextStyleBody;">However, the dam is&nbsp;still&nbsp;30.21 meters below its&nbsp;normal&nbsp;high water level of 212 meters and about 21 centimeters short of its minimum operating level of 180 meters.</span></p><p style="margin-left:0px;"><span style="font-family:UICTFontTextStyleBody;">PAGASA said that Angat Dam historically gradually recovers by mid-July, during the peak of the southwest monsoon and tropical cyclones, until the last quarter of the year, during the northeast monsoon or “amihan” season.</span></p><p style="margin-left:0px;"><span style="font-family:UICTFontTextStyleBody;">Other dams being monitored by PAGASA also experienced slight increases in their water levels: Ipo Dam rose to 99.96 meters from 99.86 meters; La Mesa Dam to 75.31 meters from 75.12 meters; Binga Dam to 568.06 meters from 566.94 meters; Pantabangan Dam to 174.63 meters from 174.5 meters; and Caliraya Dam to 287.84 meters from 286.4 meters.</span></p><p style="margin-left:0px;"><span style="font-family:UICTFontTextStyleBody;">Meanwhile, slight decreases in the water levels of Ambuklao Dam 742.86 meters from 743.28 meters), San Roque Dam (225.78 meters from 225.8 meters), and Magat Dam (176.57 meters from 174.5 meters) were observed.</span></p>`,
      author: "Ellalyn De Vera-Ruiz",
      slug: "angat-dam-water-level-increases-by-almost-1-meter",
      category: "National",
    }),
    // The signer to be used to sign the data
    signer,
    {
      tags: [
        { name: "Content-Type", value: "application/json" },
        { name: "App-Name", value: "XendevPH-Cohort-0" },
        { name: "App-Version", value: "0.1.0" },
        {
          name: "Title",
          value: "Angat Dam water level increases by almost 1 meter",
        },
        {
          name: "Author",
          value: "Ellalyn De Vera-Ruiz",
        },
        {
          name: "Slug",
          value: "angat-dam-water-level-increases-by-almost-1-meter",
        },
        {
          name: "Category",
          value: "National",
        },
      ],
    }
  );

  // Sign the data item
  await signedDataItem.sign(signer);

  // Upload the signed data item using the Turbo instance
  const uploadResult = await turbo.uploadSignedDataItem({
    // Provide a factory function to get the raw data item stream
    dataItemStreamFactory: () => signedDataItem.getRaw(),
    // Provide a factory function to get the size of the raw data item
    dataItemSizeFactory: () => signedDataItem.getRaw().length,
    // Optional: set a timeout to cancel the upload after 10 seconds
    signal: AbortSignal.timeout(10_000),
  });

  // Log the result of the upload
  console.log(JSON.stringify(uploadResult, null, 2));
})();
