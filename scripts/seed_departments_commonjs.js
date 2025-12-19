const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

// Import the database connection function
const dbConnect = require("./mongodb_commonjs");

// Department schema (inline for seeding)
const DepartmentSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      default: "🏷️",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Department =
  mongoose.models.Department || mongoose.model("Department", DepartmentSchema);

// Policy schema (inline for querying)
const PolicySchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    category: {
      type: String,
      enum: ["general", "employee"],
      default: "general",
    },
    subCategory: String,
    pdfUrl: String,
    excelUrl: String,
    policyType: {
      type: String,
      enum: ["text", "pdf"],
      default: "text",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Policy = mongoose.models.Policy || mongoose.model("Policy", PolicySchema);

// Department mappings for common departments
const departmentMappings = {
  hr: {
    name: "Human Resources",
    icon: "👨‍💼",
    description: "Human Resources policies and procedures",
  },
  it: {
    name: "Information Technology",
    icon: "💻",
    description: "IT policies, security, and technology guidelines",
  },
  admin: {
    name: "Administration",
    icon: "🏢",
    description: "Administrative policies and procedures",
  },
  "vertical collectives": {
    name: "Vertical Collectives",
    icon: "🤝",
    description: "Vertical collectives policies and guidelines",
  },
  finance: {
    name: "Finance",
    icon: "💰",
    description: "Financial policies and procedures",
  },
  legal: {
    name: "Legal",
    icon: "⚖️",
    description: "Legal policies and compliance",
  },
  operations: {
    name: "Operations",
    icon: "⚙️",
    description: "Operational policies and procedures",
  },
  marketing: {
    name: "Marketing",
    icon: "📢",
    description: "Marketing and communications policies",
  },
  sales: {
    name: "Sales",
    icon: "📈",
    description: "Sales policies and procedures",
  },
  procurement: {
    name: "Procurement",
    icon: "🛒",
    description: "Procurement and purchasing policies",
  },
};

async function seedDepartments() {
  try {
    console.log("Connecting to database...");
    await dbConnect();
    console.log("Connected successfully");

    // Get all unique subCategory values from policies
    console.log("Finding unique subCategories from policies...");
    const policies = await Policy.find({
      subCategory: { $exists: true, $ne: null, $ne: "" },
    });
    const uniqueSubCategories = [
      ...new Set(policies.map((p) => p.subCategory).filter(Boolean)),
    ];

    console.log(
      `Found ${uniqueSubCategories.length} unique subCategories:`,
      uniqueSubCategories
    );

    // Check existing departments
    const existingDepartments = await Department.find({});
    const existingSlugs = existingDepartments.map((d) => d.slug);

    console.log(
      `Found ${existingDepartments.length} existing departments:`,
      existingSlugs
    );

    // Create departments for subCategories that don't exist
    const departmentsToCreate = [];

    for (const subCategory of uniqueSubCategories) {
      const slug = subCategory.toLowerCase().trim();

      if (!existingSlugs.includes(slug)) {
        // Check if we have a mapping for this department
        const mapping =
          departmentMappings[slug] ||
          departmentMappings[subCategory.toLowerCase()];

        if (mapping) {
          departmentsToCreate.push({
            slug,
            name: mapping.name,
            description: mapping.description,
            icon: mapping.icon,
            order: existingDepartments.length + departmentsToCreate.length,
          });
        } else {
          // Create a generic department
          const name =
            subCategory.charAt(0).toUpperCase() +
            subCategory.slice(1).toLowerCase();
          departmentsToCreate.push({
            slug,
            name,
            description: `${name} policies and procedures`,
            icon: "🏷️",
            order: existingDepartments.length + departmentsToCreate.length,
          });
        }
      }
    }

    if (departmentsToCreate.length === 0) {
      console.log("No new departments to create");
      return;
    }

    console.log(
      `Creating ${departmentsToCreate.length} new departments:`,
      departmentsToCreate.map((d) => d.name)
    );

    // Insert new departments
    const createdDepartments = await Department.insertMany(departmentsToCreate);

    console.log(
      `Successfully created ${createdDepartments.length} departments:`
    );
    createdDepartments.forEach((dept) => {
      console.log(`- ${dept.name} (${dept.slug})`);
    });

    // Show final department count
    const finalCount = await Department.countDocuments();
    console.log(`\nTotal departments in database: ${finalCount}`);
  } catch (error) {
    console.error("Error seeding departments:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

// Run the seeding function
seedDepartments();
