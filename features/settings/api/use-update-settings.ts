import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";

// TODO: Replace with actual user ID from auth
const MOCK_USER_ID = "user123";

export const settingsSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email.").optional(),
  theme: z.enum(["light", "dark", "system"]),
  currency: z.string().min(1, "Currency is required."),
  language: z.string().min(1, "Language is required."),
  notificationsEnabled: z.boolean(),
  emailNotifications: z.boolean(),
  weeklyReport: z.boolean(),
  dashboardView: z.string()
});

export type SettingsFormData = z.infer<typeof settingsSchema>;

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: SettingsFormData) => {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error("Failed to update settings");
      }

      return settings;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Settings updated successfully", {
        description: "Your changes have been saved.",
      });
    },
  });
};
