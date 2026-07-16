import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { serializeJob, toPrismaJobData, validateJobInput } from "@/lib/jobs";
import { prisma } from "@/lib/prisma";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  try {
    const { id } = await params;
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });
    return NextResponse.json({ data: serializeJob(job) });
  } catch (error) {
    console.error("Failed to load job", error);
    return NextResponse.json({ error: "Unable to load the job." }, { status: 500 });
  }
}

async function updateJob(request: Request, { params }: Context) {
  try {
    const { id } = await params;
    const validation = validateJobInput(await request.json());
    if (!validation.success) {
      return NextResponse.json({ error: "Validation failed.", errors: validation.errors }, { status: 400 });
    }

    const job = await prisma.job.update({ where: { id }, data: toPrismaJobData(validation.data) });
    return NextResponse.json({ data: serializeJob(job) });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }
    console.error("Failed to update job", error);
    return NextResponse.json({ error: "Unable to update the job." }, { status: 500 });
  }
}

export const PATCH = updateJob;
export const PUT = updateJob;

export async function DELETE(_request: Request, { params }: Context) {
  try {
    const { id } = await params;
    await prisma.job.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }
    console.error("Failed to delete job", error);
    return NextResponse.json({ error: "Unable to delete the job." }, { status: 500 });
  }
}
