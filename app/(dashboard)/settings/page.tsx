import { SettingsForm } from "@/features/settings/components/settings-form";

export default function SettingsPage() {
  return (
    <div className="container max-w-xl py-10">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <SettingsForm />
    </div>
  );
}
