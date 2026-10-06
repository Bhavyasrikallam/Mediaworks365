/**
 * Liveness endpoint for uptime monitoring. Reports whether lead delivery is
 * configured (without exposing any values) so a misconfigured production
 * deploy is caught before leads are lost.
 */
export const dynamic = "force-dynamic";

export function GET() {
  const leadDelivery = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
  return Response.json(
    { status: "ok", leadDelivery: leadDelivery ? "configured" : "not_configured", time: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
