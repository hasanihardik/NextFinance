import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { sql } from "@/db/drizzle";

const MOCK_USER_ID = "user123";

const initTable = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS user_settings (
      id text PRIMARY KEY,
      user_id text NOT NULL,
      name text,
      email text,
      theme text DEFAULT 'system',
      currency text DEFAULT 'USD',
      language text DEFAULT 'en',
      notifications_enabled boolean DEFAULT true,
      email_notifications boolean DEFAULT true,
      weekly_report boolean DEFAULT true,
      dashboard_view text DEFAULT 'default',
      created_at timestamp DEFAULT now(),
      updated_at timestamp DEFAULT now()
    );
  `;
};

export async function GET() {
  try {
    await initTable();
    
    const result = await sql`
      SELECT * FROM user_settings WHERE user_id = ${MOCK_USER_ID} LIMIT 1
    `;

    if (!result || result.length === 0) {
      const defaultSettings = {
        id: crypto.randomUUID(),
        user_id: MOCK_USER_ID,
        name: "",
        email: "",
        theme: "system",
        currency: "USD",
        language: "en",
        notifications_enabled: true,
        email_notifications: true,
        weekly_report: true,
        dashboard_view: "default",
      };

      await sql`
        INSERT INTO user_settings (
          id, user_id, name, email, theme, currency, language, 
          notifications_enabled, email_notifications, weekly_report, dashboard_view
        ) VALUES (
          ${defaultSettings.id}, 
          ${defaultSettings.user_id}, 
          ${defaultSettings.name}, 
          ${defaultSettings.email},
          ${defaultSettings.theme}, 
          ${defaultSettings.currency}, 
          ${defaultSettings.language},
          ${defaultSettings.notifications_enabled},
          ${defaultSettings.email_notifications},
          ${defaultSettings.weekly_report},
          ${defaultSettings.dashboard_view}
        )
      `;

      return NextResponse.json(defaultSettings);
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await initTable();
    const settings = await request.json();
    const settingsData = {
      name: settings.name,
      email: settings.email,
      theme: settings.theme,
      currency: settings.currency,
      language: settings.language,
      notifications_enabled: settings.notificationsEnabled,
      email_notifications: settings.emailNotifications,
      weekly_report: settings.weeklyReport,
      dashboard_view: settings.dashboardView,
      updated_at: new Date()
    };

    await sql`
      UPDATE user_settings
      SET
        name = ${settings.name},
        email = ${settings.email},
        theme = ${settings.theme},
        currency = ${settings.currency},
        language = ${settings.language},
        notifications_enabled = ${settings.notificationsEnabled},
        email_notifications = ${settings.emailNotifications},
        weekly_report = ${settings.weeklyReport},
        dashboard_view = ${settings.dashboardView},
        updated_at = ${new Date()}
      WHERE user_id = ${MOCK_USER_ID}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
