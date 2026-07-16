import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { JOB_STATUSES, serializeJob, toPrismaJobData, validateJobInput } from "@/lib/jobs";
import type { JobStatus } from "@/types/job";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.trim() ?? "";
    const requestedStatus = searchParams.get("status") ?? "";
    if (requestedStatus && !JOB_STATUSES.includes(requestedStatus as JobStatus)) {
      return NextResponse.json({ error: "Invalid status filter." }, { status: 400 });
    }
    const status = JOB_STATUSES.includes(requestedStatus as JobStatus) ? requestedStatus as JobStatus : undefined;

    const jobs = await prisma.job.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(query ? { OR: [{ company: { contains: query } }, { role: { contains: query } }] } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: jobs.map(serializeJob) });
  } catch (error) {
    console.error("Failed to list jobs", error);
    return NextResponse.json({ error: "Unable to load jobs." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const validation = validateJobInput(await request.json());
    if (!validation.success) {
      return NextResponse.json({ error: "Validation failed.", errors: validation.errors }, { status: 400 });
    }

    const job = await prisma.job.create({ data: toPrismaJobData(validation.data) });
    return NextResponse.json({ data: serializeJob(job) }, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma failed to create job", error.code);
    } else {
      console.error("Failed to create job", error);
    }
    return NextResponse.json({ error: "Unable to create the job." }, { status: 500 });
  }
}
