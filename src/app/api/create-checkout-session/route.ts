// app/api/create-checkout-session/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15",
});

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      company,
      location,
      description,
      applyLink,
      jobType,
      experienceLevel,
      salaryRange,
      workArrangement,
    } = await request.json();

    // Hard-code a price for the job post, e.g., $10
    // For production, you can use a Price ID from your Stripe dashboard
    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Rust Dev Job Post",
            description: "Post a single Rust job listing",
          },
          unit_amount: 5900, // 1000 cents = $10; 5,900 cents = $59
        },
        quantity: 1,
      },
    ];

    // If you don't want to store the job in "metadata",
    // you could create a record in your DB with "pending" status here.
    // For brevity, let's store everything in metadata.
    const metadata = {
      title,
      company,
      location,
      description,
      applyLink,
      jobType,
      experienceLevel,
      salaryRange,
      workArrangement,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      metadata, // store job data to reference post-payment
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/hire-now/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/hire-now?canceled=1`,
    });

    if (!session.url) {
      return NextResponse.json({ error: "No session URL." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    return NextResponse.json({ error: "Error creating checkout session" }, { status: 500 });
  }
}