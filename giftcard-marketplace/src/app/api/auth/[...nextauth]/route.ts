import { NextRequest } from "next/server";
import { handlers } from "@/lib/auth";

const { GET: authGET, POST: authPOST } = handlers;

export function GET(request: NextRequest) {
  return authGET(request);
}

export function POST(request: NextRequest) {
  return authPOST(request);
}
