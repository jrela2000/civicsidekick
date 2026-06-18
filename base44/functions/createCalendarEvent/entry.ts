import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { title, date, description } = await req.json();
    if (!title || !date) {
      return Response.json({ error: 'Title and date are required' }, { status: 400 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getCurrentAppUserConnection('6a340c59db0940a00e581362');
    if (!accessToken) {
      return Response.json({ error: 'Google Calendar not connected' }, { status: 401 });
    }

    // Create an all-day event at the given date
    const event = {
      summary: title,
      description: description || '',
      start: { date },
      end: { date },
    };

    const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (!res.ok) {
      const err = await res.text();
      return Response.json({ error: `Google Calendar API error: ${err}` }, { status: res.status });
    }

    const created = await res.json();
    return Response.json({ success: true, event: created });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});