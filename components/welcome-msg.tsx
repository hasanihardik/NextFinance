"use client";

import { useUser } from "@clerk/nextjs";
import { useGetSettings } from "@/features/settings/api/use-get-settings";

const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();
  const { data: settings } = useGetSettings();
  
  const displayName = settings?.name || user?.firstName || "";
  
  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium ">
        Welcome Back{isLoaded && displayName ? ", " : " "}
        {displayName} {displayName ? "✌️" : ""}
      </h2>
      <p className="text-sm lg:text-base text-[#89b6fd]">
        NextFinance - Your Personal Finance Dashboard
      </p>
    </div>
  );
};

export default WelcomeMsg;
