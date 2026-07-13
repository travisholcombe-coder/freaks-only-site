// Cloudflare Pages Function -> serves POST /subscribe
// Receives { email } from the site and creates the subscriber in MailerLite via
// the official API. The API token lives in the Pages env var MAILERLITE_TOKEN
// (a secret) and is never exposed to the browser or committed to the repo.

export async function onRequestPost(context) {
  const { request, env } = context;

  let email = "";
  try {
    const data = await request.json();
    email = (data && data.email ? String(data.email) : "").trim();
  } catch (e) {
    return json({ error: "Bad request." }, 400);
  }

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: "Please enter a valid email." }, 400);
  }

  if (!env.MAILERLITE_TOKEN) {
    return json({ error: "Signup is temporarily unavailable." }, 500);
  }

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + env.MAILERLITE_TOKEN,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    // 200/201 = created/updated. MailerLite upserts, so re-subscribing is fine.
    if (res.ok) {
      return json({ ok: true }, 200);
    }

    return json({ error: "Could not subscribe right now. Please try again." }, 502);
  } catch (e) {
    return json({ error: "Network error. Please try again." }, 502);
  }
}

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status,
    headers: { "Content-Type": "application/json" },
  });
}
