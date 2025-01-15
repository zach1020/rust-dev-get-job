import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15",
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session.metadata) {
      return NextResponse.json({ error: "No metadata found" }, { status: 404 });
    }

    // Extract the job data from metadata
    const jobMetadata = {
      title: session.metadata.title,
      company: session.metadata.company,
      location: session.metadata.location,
      description: session.metadata.description,
      applyLink: session.metadata.applyLink,
      jobType: session.metadata.jobType,
      experienceLevel: session.metadata.experienceLevel,
      salaryRange: session.metadata.salaryRange,
      workArrangement: session.metadata.workArrangement,
    };

    return NextResponse.json({ jobMetadata });
  } catch (error) {
    console.error("Error retrieving session:", error);
    return NextResponse.json({ error: "Error retrieving session" }, { status: 500 });
  }
}