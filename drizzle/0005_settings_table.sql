CREATE TABLE IF NOT EXISTS "user_settings" (
  "id" text PRIMARY KEY,
  "user_id" text NOT NULL,
  "name" text,
  "email" text,
  "theme" text DEFAULT 'system',
  "currency" text DEFAULT 'USD',
  "language" text DEFAULT 'en',
  "notifications_enabled" boolean DEFAULT true,
  "email_notifications" boolean DEFAULT true,
  "weekly_report" boolean DEFAULT true,
  "dashboard_view" text DEFAULT 'default',
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "user_settings_user_id_idx" ON "user_settings" ("user_id");
