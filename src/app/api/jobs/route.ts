// app/api/jobs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust import path as needed

// GET: return all jobs
export async function GET() {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(jobs);
  }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate body.workArrangement if desired (optional)
    // e.g., if (!["Remote", "Hybrid", "In-person"].includes(body.workArrangement)) { ... }

    const newJob = await prisma.job.create({
      data: {
        title: body.title,
        company: body.company,
        location: body.location,
        description: body.description,
        applyLink: body.applyLink,
        jobType: body.jobType,
        experienceLevel: body.experienceLevel,
        salaryRange: body.salaryRange,

        // Save the new field
        workArrangement: body.workArrangement,
      },
    });

    return NextResponse.json({ message: "Job added successfully", job: newJob }, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Unable to create job" }, { status: 400 });
  }
}