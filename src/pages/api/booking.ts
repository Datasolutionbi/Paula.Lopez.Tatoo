import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    try {
        const bookingData = await request.json();

        // Here you would:
        // 1. Validate the data
        // 2. Store in database (Supabase, Firebase, etc.)
        // 3. Send email notifications

        // For now, we'll just log and send a simple email
        console.log('New booking request:', bookingData);

        // Example: Send email using a service like Resend, SendGrid, etc.
        // await sendEmail({
        //   to: 'jose@tattocaro.com',
        //   subject: `New Booking Request - ${bookingData.projectType}`,
        //   html: generateBookingEmail(bookingData)
        // });

        return new Response(JSON.stringify({ success: true, bookingId: Date.now() }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Booking API error:', error);
        return new Response(JSON.stringify({ error: 'Failed to process booking' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

// Helper function to generate email HTML
function generateBookingEmail(data: any): string {
    return `
    <h1>New Booking Request</h1>
    <h2>Project Details</h2>
    <ul>
      <li><strong>Type:</strong> ${data.projectType}</li>
      <li><strong>Body Part:</strong> ${data.bodyPart}</li>
      <li><strong>Size:</strong> ${data.size}</li>
      <li><strong>Estimated Price:</strong> $${data.estimatedPrice}</li>
      <li><strong>Budget:</strong> $${data.budget}</li>
    </ul>
    
    <h2>Client Information</h2>
    <ul>
      <li><strong>Name:</strong> ${data.name}</li>
      <li><strong>Email:</strong> ${data.email}</li>
      <li><strong>Phone:</strong> ${data.phone || 'N/A'}</li>
      <li><strong>Instagram:</strong> ${data.instagram || 'N/A'}</li>
    </ul>
    
    <h2>Availability</h2>
    <ul>
      <li><strong>Preferred Dates:</strong> ${data.date1}, ${data.date2}, ${data.date3}</li>
      <li><strong>Time Slot:</strong> ${data.timeSlot}</li>
    </ul>
    
    <h2>Description</h2>
    <p>${data.description}</p>
    
    <p><em>Submitted at: ${new Date(data.timestamp).toLocaleString()}</em></p>
  `;
}
