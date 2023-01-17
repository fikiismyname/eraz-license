const mongoose = require("mongoose");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Connect to MongoDB database
mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const licenseSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  expiration_date: {
    type: Date,
    required: true,
  },
});

const License = mongoose.model("License", licenseSchema);

const addLicense = async (url, expirationDate) => {
  // Check if license already exists
  const existingLicense = await License.findOne({ url: url });
  if (existingLicense) {
    return { message: "License already exists!" };
  } else {
    if (!expirationDate) {
      return { message: "Expiration date is required" };
    }
    // Create new document
    const newLicense = new License({
      url: url,
      expiration_date: expirationDate,
    });
    await newLicense.save();
    return { message: "License generated successfully!" };
  }
};

const updateLicense = async (url, expirationDate) => {
  // Find the license and update the expiration date
  const updatedLicense = await License.findOneAndUpdate(
    { url: url },
    { expiration_date: expirationDate },
    { new: true }
  );
  if (!updatedLicense) {
    return { message: "Invalid license URL!" };
  } else {
    return { message: "License expiration date updated successfully!" };
  }
};

const deleteLicense = async (url) => {
  // Delete license that matches the root domain URL
  const deletedLicense = await License.findOneAndDelete({ url: url });
  if (!deletedLicense) {
    return { message: "Invalid license URL!" };
  } else {
    return { message: "License deleted successfully!" };
  }
};

const displayLicenses = async () => {
  try {
    // Get all license documents
    const licenses = await License.find();
    if (licenses.length === 0) {
      console.log("No licenses found!");
    } else {
      console.log("Licenses:");
      licenses.forEach((license) => {
        console.log(
          `- ${license.url} (Expires: ${new Date(
            license.expiration_date
          ).toLocaleString()})`
        );
      });
    }
  } catch (error) {
    console.log("Error displaying licenses!");
  }
};

const displayMenu = () => {
  console.log("\nMenu:");
  console.log(
    "1. Generate a new license by providing a URL and expiration date"
  );
  console.log(
    "2. Update the expiration date of an existing license by providing its URL and new expiration date"
  );
  console.log("3. Delete an existing license by providing its URL");
  console.log(
    "4. Display all existing licenses along with their URLs and expiration dates"
  );
  console.log("5. Exit the application");

  rl.question("Enter your choice: ", async (choice) => {
    switch (choice) {
      case "1":
        rl.question("Enter the license URL: ", async (url) => {
          rl.question(
            "Enter the license expiration date (YYYY-MM-DD): ",
            async (expirationDate) => {
              const response = await addLicense(url, new Date(expirationDate));
              console.log(response.message);
              displayMenu();
            }
          );
        });
        break;
      case "2":
        rl.question("Enter the license URL: ", async (url) => {
          rl.question(
            "Enter the new expiration date (YYYY-MM-DD): ",
            async (expirationDate) => {
              const response = await updateLicense(
                url,
                new Date(expirationDate)
              );
              console.log(response.message);
              displayMenu();
            }
          );
        });
        break;
      case "3":
        rl.question("Enter the license URL: ", async (url) => {
          const response = await deleteLicense(url);
          console.log(response.message);
          displayMenu();
        });
        break;
      case "4":
        await displayLicenses();
        displayMenu();
        break;
      case "5":
        console.log("Exiting the application...");
        rl.close();
        process.exit();
        break;
      default:
        console.log("Invalid choice. Please enter a valid option.");
        displayMenu();
        break;
    }
  });
};

displayMenu();
