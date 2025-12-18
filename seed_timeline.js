const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
  process.exit(1);
}

const AboutTimelineSchema = new mongoose.Schema(
  {
    year: { type: String, required: true },
    heading: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const AboutTimeline =
  mongoose.models.AboutTimeline ||
  mongoose.model("AboutTimeline", AboutTimelineSchema);

const timelineData = [
  {
    year: "1986 – Establishment of the Firm",
    heading: "Foundation by CA Uttam Chand Asija",
    description:
      "The firm was founded on 01 April 1986 by CA Uttam Chand Asija. During the initial years, the practice focused on building a strong foundation rooted in accuracy, responsibility, and adherence to professional standards. These formative experiences shaped the work culture that continues to guide the firm.",
    images: [
      "https://images.unsplash.com/photo-1624357676666-4cca3b657627?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1680261019762-59d8fa84e0a3?q=80&w=1077&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    order: 1,
  },
  {
    year: "2004 – Organizational Restructuring into a Partnership",
    heading: "Expanding Leadership",
    description:
      "In 2004, the practice evolved into a partnership. This transition allowed the inclusion of more professionals in leadership roles, encouraging collaborative working, shared responsibilities, and diversified expertise across various service areas.",
    images: [
      "https://plus.unsplash.com/premium_photo-1664392124762-db2317f99f84?q=80&w=748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop",
    ],
    order: 2,
  },
  {
    year: "2010 – Introduction of the Vertical-Based Operating Model",
    heading: "Specialization & Quality",
    description:
      "In 2010, the firm introduced a Vertical System to enhance specialization and service quality. Under this model, each vertical is led by a specialized Chartered Accountant, responsible for domain expertise, execution oversight, and quality control. This structure improved efficiency, accountability, and depth of professional delivery across all assignments.",
    images: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553877615-30c730db910a?w=600&h=600&fit=crop",
    ],
    order: 3,
  },
  {
    year: "2016 – Evolution into a Limited Liability Partnership (LLP)",
    heading: "Modern Governance",
    description:
      "In 2016, the firm adopted the Limited Liability Partnership structure. This provided a more organized governance model, strengthened internal processes, and supported systematic handling of assignments as the scale of operations gradually increased.",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=600&fit=crop",
    ],
    order: 4,
  },
  {
    year: "2017 – Expansion into Southern India",
    heading: "Bengaluru Branch",
    description:
      "In 2017, the firm opened a branch in Bengaluru. This step allowed the firm to extend its presence to southern India and to cater to professional requirements arising in that region in a more accessible and coordinated manner.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=600&fit=crop",
    ],
    order: 5,
  },
  {
    year: "2018 – Presence in the National Capital Region",
    heading: "New Delhi Branch",
    description:
      "In 2018, a branch was established in New Delhi. Operating from the capital region enabled the firm to work more closely with organizations situated in an important administrative and business Centre.",
    images: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=600&fit=crop",
    ],
    order: 6,
  },
  {
    year: "2021 – Expansion into Western and North-Eastern India",
    heading: "Mumbai & Guwahati",
    description:
      "In 2021, the firm expanded its footprint further by establishing branches in:\n• Mumbai – strengthening its presence in Western India\n• Guwahati – enhancing operational reach in the North-Eastern region\nThese expansions supported multi-regional operations and improved coordination across assignments.",
    images: [
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=600&fit=crop",
    ],
    order: 7,
  },
  {
    year: "2022 – A Stronger Leadership: 10 Partners",
    heading: "Leadership Growth",
    description:
      "In 2022, the number of partners increased to ten. With a larger leadership group, the firm strengthened its ability to coordinate responsibilities, supervise diverse engagements, and maintain structured oversight across its branches.",
    images: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=600&fit=crop",
    ],
    order: 8,
  },
  {
    year: "2024 – Strengthening Presence in the North-East",
    heading: "Mizoram Branch",
    description:
      "In 2024, the firm expanded further within the North-East region by establishing an additional branch in Mizoram. This step helped improve accessibility and operational convenience for assignments in that area.",
    images: [
      "https://images.unsplash.com/photo-1589216532372-1c2a367900d9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=600&fit=crop",
    ],
    order: 9,
  },
  {
    year: "Our People – The Heart of Our Firm",
    heading: "Diversity & Expertise",
    description:
      "Today, the firm comprises a team of more than 100 professionals, including Qualified Chartered Accountants, Cost and Management Accountants, Company Secretaries, semi-qualified staff, trainees, and executives. The team brings together a well-balanced combination of experience, technical knowledge, and professional competence across different service areas.\n\nAs an organisation, the firm follows an equal-opportunity approach and encourages diversity and inclusivity within its workforce. The collective efforts of the team support the firm’s ability to handle assignments in a structured and coordinated manner.",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=600&fit=crop",
    ],
    order: 10,
  },
  {
    year: "Looking Ahead – Our Vision for the Future",
    heading: "Future Vision",
    description:
      "As Asija & Associates LLP continues to develop, the firm remains focused on strengthening its internal processes, adopting relevant technological tools, and maintaining consistency in professional execution. The guiding principles continue to be integrity, diligence, and adherence to applicable standards while handling all professional engagements.",
    images: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=600&fit=crop",
    ],
    order: 11,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    await AboutTimeline.deleteMany({});
    console.log("Cleared existing timeline data");

    await AboutTimeline.insertMany(timelineData);
    console.log("Seeded timeline data successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seed();
