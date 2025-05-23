"use client";
import {
  Bell,
  ForkKnife,
  Laptop,
  Lock,
  Paperclip,
  SquarePen,
  User,
} from "lucide-react";
import Image from "next/image";
import * as React from "react";

import UpdateAccountDataForm from "@/components/forms/update-account-data-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSession from "@/hooks/use-session";

import PageTitleHeader from "../page-title-header";
import PasswordResetConfirmation from "../password-reset-confirmation";

export interface NotificationCategory {
  id: string;
  title: string;
  description: string;
  smsEnabled: boolean;
  emailEnabled: boolean;
}
export interface ConnectedDevice {
  id: string;
  name: string;
  os: string;
  type: string;
  lastActivity: string;
  location: string;
}

export const SettingsClientPage = () => {
  const [categories, setCategories] = React.useState<NotificationCategory[]>([
    {
      id: "messages",
      title: "Messages",
      description:
        "Receive important messages from caregivers, doctors, or support regarding your care and appointments.",
      smsEnabled: false,
      emailEnabled: true,
    },
    {
      id: "reminders",
      title: "Reminders",
      description:
        "Stay on track with upcoming appointments, health check-ins, and medication reminders.",
      smsEnabled: false,
      emailEnabled: true,
    },
    {
      id: "activity",
      title: "Activity & updates",
      description:
        "Get notified about caregiver assignments, new health reports, and important account updates.",
      smsEnabled: false,
      emailEnabled: true,
    },
  ]);
  const [flowStep, setFlowStep] = React.useState<"form" | "confirmation">(
    "form",
  );

  const [email, setEmail] = React.useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(true);
  const [connectedDevices, setConnectedDevices] = React.useState<
    ConnectedDevice[]
  >([
    {
      id: "1",
      name: "Chrome 110.0.0.0",
      os: "Mac OS",
      type: "web browser",
      lastActivity: "1 minute ago",
      location: "LA, Nigeria",
    },
  ]);

  const { session } = useSession();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log("Password reset requested for:", email);
  };

  const handlePasswordResetRequest = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setFlowStep("confirmation");
  };

  const handleCheckEmail = () => {
    // In a real app, this might redirect to email provider or back to login
    console.log("Redirecting to email client...");
    // For demo purposes, we'll go back to the form
    setFlowStep("form");
  };
  const handleSignOut = (deviceId: string) => {
    // Handle device sign out logic
    setConnectedDevices(
      connectedDevices.filter((device) => device.id !== deviceId),
    );
  };
  const handleToggle = (
    categoryId: string,
    channel: "sms" | "email",
    value: boolean,
  ) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            [channel === "sms" ? "smsEnabled" : "emailEnabled"]: value,
          };
        }
        return category;
      }),
    );
  };
  return (
    <section className="">
      <PageTitleHeader
        page="Settings"
        className="border-b px-[15px] py-[14px] lg:px-[15px] 2xl:px-[20px]"
        pageDesc="Change your account settings"
      />
      <section className="2xl:px-[20px relative mt-4 flex w-full max-w-5xl flex-col justify-center gap-5 space-y-7 px-[15px] py-[14px] lg:space-y-12 lg:px-[15px]">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="custom-scrollbar mb-2 flex h-auto w-full items-start justify-start gap-3 overflow-hidden overflow-x-scroll rounded-none border-b border-[#F0F2F5] bg-transparent p-0 lg:mb-4">
            <TabsTrigger
              value="profile"
              className="!mb-0 cursor-pointer rounded-none !pb-0 text-sm font-normal text-[#b6b6b6] data-[state=active]:!border-b data-[state=active]:border-blue-600 data-[state=active]:font-medium data-[state=active]:text-blue-600  data-[state=active]:shadow-none md:text-base"
            >
              <User className="me-2 size-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer rounded-none text-sm font-normal text-[#b6b6b6] data-[state=active]:!border-b data-[state=active]:border-blue-600 data-[state=active]:font-medium data-[state=active]:text-blue-600  data-[state=active]:shadow-none md:text-base"
              value="notifications-settings"
            >
              <Bell className="me-2 size-4" />
              Notification Settings
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer rounded-none text-sm font-normal text-[#b6b6b6] data-[state=active]:!border-b data-[state=active]:border-blue-600 data-[state=active]:font-medium data-[state=active]:text-blue-600  data-[state=active]:shadow-none md:text-base"
              value="health-records"
            >
              <ForkKnife className="me-2 size-4" />
              Saloon Records
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer rounded-none text-sm font-normal text-[#b6b6b6] data-[state=active]:!border-b data-[state=active]:border-blue-600 data-[state=active]:font-medium data-[state=active]:text-blue-600  data-[state=active]:shadow-none md:text-base"
              value="security"
            >
              <Lock className="me-2 size-4" />
              Security & Privacy
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="profile"
            className="mt-2 w-full !max-w-full space-y-5 rounded-md bg-white p-4"
          >
            <div className="space-y-6">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://res.cloudinary.com/davidleo/image/upload/v1744896654/aa876a7a2f9aac97c39f34649357f02b_eqqhqh.jpg"
                    width={96}
                    height={96}
                    className="size-[70px] rounded-full object-cover md:size-[96px]"
                    alt="mainImage"
                  />
                  <div className="space-y-1">
                    <h4 className="text-base font-semibold text-[#303030]">
                      {session.email}
                    </h4>
                    <p className="text-sm font-normal text-[#66666B]">
                      {session.first_name}
                    </p>
                  </div>
                </div>
                <Button className="!h-[38px] text-sm font-normal">
                  Edit Profile
                </Button>
              </div>
              <Separator className="bg-[#E8E8E8]" />
              <UpdateAccountDataForm />
            </div>
          </TabsContent>
          <TabsContent
            value="notifications-settings"
            className="mt-2 w-full !max-w-full space-y-5 rounded-md bg-white p-4"
          >
            <div className="">
              <h1 className="mb-6 text-xl font-semibold">
                Notification settings
              </h1>

              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div key={category.id}>
                    <div className="py-4">
                      <div className="mb-2 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <h2 className="text-base font-medium">
                            {category.title}
                          </h2>
                          <p className="mt-1 pr-4 text-sm text-gray-500">
                            {category.description}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-col space-y-3 md:mt-0">
                          <div className="flex items-center justify-between space-x-8">
                            <Switch
                              checked={category.smsEnabled}
                              onCheckedChange={(checked) =>
                                handleToggle(category.id, "sms", checked)
                              }
                              className=" data-[state=checked]:bg-gray-200"
                            />
                            <span className="text-sm font-medium">SMS</span>
                          </div>

                          <div className="flex items-center justify-between space-x-6">
                            <Switch
                              checked={category.emailEnabled}
                              onCheckedChange={(checked) =>
                                handleToggle(category.id, "email", checked)
                              }
                              className="data-[state=checked]:bg-blue-600"
                            />
                            <span className="text-sm font-medium">Email</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < categories.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="health-records"
            className="mt-2 w-full !max-w-full space-y-5 rounded-md bg-white p-4"
          >
            <div className="flex w-fit flex-col items-start justify-between gap-3 rounded-[6px] border border-[#E8E8E8] bg-[#F9F9F9] p-[18px] md:flex-row md:items-center md:p-[24px]">
              <div className="flex items-center gap-4">
                <div className="flex size-[48px] items-center justify-center rounded-full bg-blue-100">
                  <Image
                    src={
                      "https://res.cloudinary.com/davidleo/image/upload/v1745320515/Vector_1_rio4vl.png"
                    }
                    alt="plan"
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#333] lg:text-lg">
                    The Gold Care Plan
                  </h3>
                  <p className="text-xs font-medium text-[#999] lg:text-sm">
                    Your subscription will renew on April 4
                  </p>
                </div>
              </div>

              <Button className="!h-[45px] rounded-[6px] border border-[#DCDCDC] bg-white p-3 text-base font-normal text-[#333] hover:bg-white">
                Change Plan
              </Button>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-[#333]">
                Saloon Records
              </h4>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-4 rounded-[6px] border border-[#E8E8E8] p-4">
                  <span className="flex size-[42px] items-center justify-center rounded-full bg-[#F5F5F5]">
                    <SquarePen className="size-5" />
                  </span>
                  <div>
                    <h6 className="text-sm font-medium text-[#333] md:text-base">
                      Saloon Appointment
                    </h6>
                    <p className="text-xs font-normal text-[#66666b] md:text-sm">
                      Completed on 10 Dec, 2024
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-[6px] border border-[#E8E8E8] p-4">
                  <span className="flex size-[42px] items-center justify-center rounded-full bg-[#F5F5F5]">
                    <SquarePen className="size-5" />
                  </span>
                  <div>
                    <h6 className="text-sm font-medium text-[#333] md:text-base">
                      Saloon Appointment
                    </h6>
                    <p className="text-xs font-normal text-[#66666b] md:text-sm">
                      Completed on 15 Dec, 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="bg-[#E8E8E8]" />

            <div>
              <h6 className="flex items-center text-base font-normal text-[#333]">
                Attachments <Paperclip className="ms-2 size-5 text-[#66666B]" />
              </h6>
              <div className="mt-4 flex flex-wrap items-center gap-[12px]">
                <Image
                  src="https://res.cloudinary.com/davidleo/image/upload/v1745305715/733bc4196e8369bfa4710a5113244c66_qb9svi.jpg"
                  width={145}
                  height={105}
                  className="h-[105px] w-[145px] rounded-[6px] object-cover"
                  alt="attachment"
                />
                <Image
                  src="https://res.cloudinary.com/davidleo/image/upload/v1745305715/733bc4196e8369bfa4710a5113244c66_qb9svi.jpg"
                  width={145}
                  height={105}
                  className="h-[105px] w-[145px] rounded-[6px] object-cover"
                  alt="attachment"
                />
                <div className="relative">
                  <Image
                    src="https://res.cloudinary.com/davidleo/image/upload/v1745305715/733bc4196e8369bfa4710a5113244c66_qb9svi.jpg"
                    width={145}
                    height={105}
                    className="relative h-[105px] w-[145px] rounded-[6px] object-cover"
                    alt="attachment"
                  />
                  <div className="absolute left-0 top-0 z-20 flex size-full items-center justify-center bg-[#CCCCCC33]">
                    <h2 className="text-2xl font-semibold text-white">+2</h2>
                  </div>
                </div>
              </div>
            </div>

            {/* <UpdateMedicalRecordSheet
              sheetTrigger={
                <Button className="tetx-sm flex !h-[45px] w-fit  items-center justify-center gap-2 border-black py-6 font-normal text-white">
                  <Plus className="size-5" />
                  <span className="text-sm">Update medical record</span>
                </Button>
              }
            /> */}
          </TabsContent>
          <TabsContent
            value="security"
            className="mt-2 w-full !max-w-full space-y-5 rounded-md bg-white p-4"
          >
            <div className="w-full">
              {flowStep === "form" ? (
                <div className="py-2">
                  <h1 className="mb-2 text-xl font-semibold">
                    Change password
                  </h1>
                  <p className="mb-6 text-gray-600">
                    A reset password link will be sent to you.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label
                        htmlFor="email"
                        className="mb-2 block text-sm text-gray-500"
                      >
                        Email address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-gray-300 p-3"
                        placeholder="Enter your email"
                        required
                      />
                      <Button
                        onClick={() => handlePasswordResetRequest(email)}
                        className="relative ml-auto mt-4 flex !h-[38px] text-sm font-normal"
                      >
                        Send Link
                      </Button>
                    </div>

                    <Separator className="bg-[#E8E8E8]" />

                    <div className="pt-2">
                      <div className="mb-2 flex items-center justify-between">
                        <div>
                          <h2 className="font-medium">
                            Two-factor authentication
                          </h2>
                          <p className="mt-1 text-sm text-gray-600">
                            To help keep your account secure, we&apos;ll ask you
                            to submit a code when using a new device to log in.
                          </p>
                        </div>
                        <Switch
                          checked={twoFactorEnabled}
                          onCheckedChange={setTwoFactorEnabled}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </div>
                    </div>
                    <Separator className="bg-[#E8E8E8]" />

                    <div className="pt-4">
                      <h2 className="mb-4 text-xl font-bold">
                        Connected Devices
                      </h2>

                      {connectedDevices.map((device) => (
                        <div
                          key={device.id}
                          className="mb-2 flex items-center justify-between rounded-[6px] border border-[#E8E8E8] px-4 py-2"
                        >
                          <div className="flex items-center gap-3">
                            <div className="rounded-md bg-gray-100 p-2">
                              <Laptop className="size-5 text-gray-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {device.name}, {device.os}
                              </p>
                              <p className="text-xs text-gray-500">
                                Last activity: {device.lastActivity} •{" "}
                                {device.location}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            type="button"
                            size="sm"
                            onClick={() => handleSignOut(device.id)}
                            className="text-sm font-medium text-gray-700 hover:text-gray-900"
                          >
                            Sign out
                          </Button>
                        </div>
                      ))}
                    </div>
                  </form>
                </div>
              ) : (
                <PasswordResetConfirmation
                  email={email}
                  onCheckEmail={handleCheckEmail}
                />
              )}
            </div>
          </TabsContent>
          <TabsContent
            value="dependent-management"
            className="w-full !max-w-full space-y-5 rounded-md bg-white p-4"
          >
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-[#212121]">
                Manage Profiles
              </h4>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col gap-4  rounded-[6px] border border-[#E8E8E8] p-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src="https://res.cloudinary.com/davidleo/image/upload/v1744896654/aa876a7a2f9aac97c39f34649357f02b_eqqhqh.jpg"
                      width={42}
                      height={42}
                      className="size-[42px] rounded-full object-cover"
                      alt="mainImage"
                    />
                    <div className="space-y-1">
                      <h4 className="text-bassme font-medium text-[#333]">
                        Temidayo Olanrewaju{" "}
                      </h4>
                      <p className="text-xs font-normal text-[#66666B]">
                        Relationship: Mother
                      </p>
                    </div>
                  </div>
                  <Button
                    className="!h-[34px] rounded-[6px]"
                    variant={"outline"}
                  >
                    View details
                  </Button>
                </div>
                <div className="flex flex-col gap-4  rounded-[6px] border border-[#E8E8E8] p-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src="https://res.cloudinary.com/davidleo/image/upload/v1744896654/aa876a7a2f9aac97c39f34649357f02b_eqqhqh.jpg"
                      width={42}
                      height={42}
                      className="size-[42px] rounded-full object-cover"
                      alt="mainImage"
                    />
                    <div className="space-y-1">
                      <h4 className="text-bassme font-medium text-[#333]">
                        Temidayo Olanrewaju{" "}
                      </h4>
                      <p className="text-xs font-normal text-[#66666B]">
                        Relationship: Mother
                      </p>
                    </div>
                  </div>
                  <Button
                    className="!h-[34px] rounded-[6px]"
                    variant={"outline"}
                  >
                    View details
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </section>
  );
};
