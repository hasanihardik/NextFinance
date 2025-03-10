"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetSettings } from "../api/use-get-settings";
import { useUpdateSettings, settingsSchema, type SettingsFormData } from "../api/use-update-settings";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const currencies = [
  { label: "US Dollar", value: "USD" },
  { label: "Euro", value: "EUR" },
  { label: "British Pound", value: "GBP" },
  { label: "Japanese Yen", value: "JPY" },
  { label: "Indian Rupee", value: "INR" },
];

const languages = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Japanese", value: "ja" },
];

const dashboardViews = [
  { label: "Default", value: "default" },
  { label: "Compact", value: "compact" },
  { label: "Detailed", value: "detailed" },
];

export function SettingsForm() {
  const { data: settings } = useGetSettings();
  const { mutate: updateSettings } = useUpdateSettings();

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: "",
      email: "",
      theme: "system",
      currency: "USD",
      language: "en",
      notificationsEnabled: true,
      emailNotifications: true,
      weeklyReport: true,
      dashboardView: "default",
    },
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        name: settings.name ?? "",
        email: settings.email ?? "",
        theme: (settings.theme ?? "system") as "light" | "dark" | "system",
        currency: settings.currency ?? "USD",
        language: settings.language ?? "en",
        notificationsEnabled: settings.notificationsEnabled ?? true,
        emailNotifications: settings.emailNotifications ?? true,
        weeklyReport: settings.weeklyReport ?? true,
        dashboardView: settings.dashboardView ?? "default",
      });
    }
  }, [settings, form]);

  function onSubmit(values: SettingsFormData) {
    updateSettings(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center mb-2">NextFinance Settings</h1>
          <p className="text-muted-foreground text-center">Manage your NextFinance account preferences</p>
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dashboardView"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dashboard Layout</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select layout" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dashboardViews.map((view) => (
                        <SelectItem key={view.value} value={view.value}>
                          {view.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Preferences</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="notificationsEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Enable Notifications</FormLabel>
                    <FormDescription>
                      Receive notifications about your account activity
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Email Notifications</FormLabel>
                    <FormDescription>
                      Receive notifications via email
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weeklyReport"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Weekly Report</FormLabel>
                    <FormDescription>
                      Receive weekly summary of your finances
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Button type="submit" className="w-full">Save Settings</Button>
      </form>
    </Form>
  );
}
