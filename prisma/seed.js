// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Optional: Clear out existing jobs before seeding
  await prisma.job.deleteMany();

  await prisma.job.createMany({
    data: [
      {
        title: "Senior Rust Engineer",
        company: "Acme Inc",
        location: "Remote",
        description: "Work on high-performance Rust microservices powering Acme's global platform.",
        applyLink: "https://example.com/jobs/senior-rust-engineer",
        jobType: "Full-time",
        experienceLevel: "Senior",
        salaryRange: "$120k-$150k",
        workArrangement: "Remote",
      },
      {
        title: "Blockchain Rust Developer",
        company: "Blocky Labs",
        location: "San Francisco, CA",
        description: "Develop smart contracts and layer-2 solutions in Rust for our growing blockchain ecosystem.",
        applyLink: "https://example.com/jobs/blockchain-rust",
        jobType: "Contract",
        experienceLevel: "Mid-level",
        salaryRange: "$90k-$110k",
        workArrangement: "Hybrid",
      },
      {
        title: "Systems Programmer",
        company: "OptiCore",
        location: "Chicago, IL",
        description: "Design low-level Rust software components for next-gen embedded devices and IoT solutions.",
        applyLink: "https://example.com/jobs/systems-rust",
        jobType: "Full-time",
        experienceLevel: "Senior",
        salaryRange: "$110k-$140k",
        workArrangement: "In-person",
      },
      {
        title: "Rust Networking Engineer",
        company: "NetTech",
        location: "Remote",
        description: "Contribute to an advanced networking stack using Rust, focusing on scalability and security.",
        applyLink: "https://example.com/jobs/rust-networking",
        jobType: "Full-time",
        experienceLevel: "Junior",
        salaryRange: "$80k-$100k",
        workArrangement: "Remote",
      },
      {
        title: "Rust DevOps Specialist",
        company: "CloudMatrix",
        location: "New York, NY",
        description: "Build CI/CD pipelines and deployment tools for Rust-based microservices in our cloud environment.",
        applyLink: "https://example.com/jobs/rust-devops",
        jobType: "Full-time",
        experienceLevel: "Mid-level",
        salaryRange: "$100k-$120k",
        workArrangement: "Hybrid",
      },
      {
        title: "Gaming/Graphics Rust Developer",
        company: "ArcadeForge",
        location: "Remote",
        description: "Implement high-performance rendering engines and game logic in Rust for AAA-level games.",
        applyLink: "https://example.com/jobs/rust-gaming-graphics",
        jobType: "Contract",
        experienceLevel: "Senior",
        salaryRange: "$130k-$160k",
        workArrangement: "Remote",
      },
    ],
  });

  console.log("Seeded database with dummy Rust jobs!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });