import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const bookingData = await request.json();

    // Here you would:
    // 1. Validate the data
    // 2. Store in database (Supabase, Firebase, etc.)
    // 3. Send email notifications

    // For now, we'll just send a simple email
    // Log removed for production

    // Example: Send email using a service like Resend, SendGrid, etc.
    // await sendEmail({
    //   to: 'jose@tattocaro.com',
    //   subject: `New Booking Request - ${bookingData.projectType}`,
    //   html: generateBookingEmail(bookingData)
    // });

    return new Response(JSON.stringify({ success: true, bookingId: Date.now() }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Booking API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process booking' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
