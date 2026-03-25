import { NextResponse } from "next/server";

import { generateInsight, InsightGenerationError, MissingApiKeyError } from "@/lib/openai";
import { parseInsightGenerationRequest } from "@/lib/insight-validation";
import type { InsightGenerationErrorResponse, InsightGenerationResponse } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const selection = parseInsightGenerationRequest(body);
    const insight = await generateInsight(selection);

    return NextResponse.json<InsightGenerationResponse>({
      insight,
      selection
    });
  } catch (error) {
    if (error instanceof MissingApiKeyError) {
      return NextResponse.json<InsightGenerationErrorResponse>(
        {
          error: {
            code: "MISSING_API_KEY",
            message: error.message
          }
        },
        { status: 500 }
      );
    }

    if (error instanceof InsightGenerationError) {
      return NextResponse.json<InsightGenerationErrorResponse>(
        {
          error: {
            code: "GENERATION_FAILED",
            message: error.message
          }
        },
        { status: 502 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json<InsightGenerationErrorResponse>(
        {
          error: {
            code: "INVALID_REQUEST",
            message: error.message
          }
        },
        { status: 400 }
      );
    }

    return NextResponse.json<InsightGenerationErrorResponse>(
      {
        error: {
          code: "GENERATION_FAILED",
          message: "Unable to generate insights right now. Please try again."
        }
      },
      { status: 502 }
    );
  }
}
