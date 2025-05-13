"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { FormFieldTypes, GenderOptions } from "@/config/enums";
import useSession from "@/hooks/use-session";
import { useOnboard } from "@/lib/query/auth-service";
import { OnboardingSchema } from "@/lib/validations/user/user.schema";

import { CustomFormField } from "../shared/custom-form-field";
import { Button } from "../ui/button";
import { Form, FormControl, FormItem, FormLabel } from "../ui/form";
import { RadioGroupItem } from "../ui/radio-group";

export default function OnboardingForm() {
  const { session } = useSession();
  const { mutate, isPending } = useOnboard();
  const loginForm = useForm<z.infer<typeof OnboardingSchema>>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });

  useEffect(() => {
    loginForm.setValue("is_onboarded", true);
  }, [loginForm, session.id]);

  const LoginSubmit = async (values: z.infer<typeof OnboardingSchema>) => {
    mutate(values);
  };

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(LoginSubmit)}
        className="space-y-4"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <CustomFormField
              control={loginForm.control}
              name="first_name"
              label="First Name"
              fieldType={FormFieldTypes.INPUT}
              inputType="text"
              disabled={isPending}
              placeholder="Please enter your first name"
            />
            <CustomFormField
              control={loginForm.control}
              name="last_name"
              label="Last Name"
              fieldType={FormFieldTypes.INPUT}
              inputType="text"
              disabled={isPending}
              placeholder="Please enter your last name"
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <CustomFormField
              control={loginForm.control}
              name="phone_no"
              label="Phone Number"
              fieldType={FormFieldTypes.PHONE_INPUT}
              disabled={isPending}
              placeholder="(555) 123 4567"
            />
            <CustomFormField
              control={loginForm.control}
              name="gender"
              label="Gender"
              fieldType={FormFieldTypes.RADIO_GROUP}
              disabled={isPending}
            >
              <div className="flex items-center gap-2">
                {GenderOptions.map((gender) => (
                  <div key={gender} className="radio-group text-light-400">
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <RadioGroupItem
                          value={gender.toLowerCase()}
                          id={gender}
                          className="dark:light-border-2 !size-5 border-2 border-[#7A7A7A]"
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor={gender}
                        className="!m-0 text-sm font-normal text-[#252525] dark:text-light-200"
                      >
                        {gender}
                      </FormLabel>
                    </FormItem>
                  </div>
                ))}
              </div>
            </CustomFormField>
          </div>
          {/* <CustomFormField
            control={loginForm.control}
            fieldType={FormFieldTypes.SKELETON}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  {GenderOptions.map((gender) => (
                    <div key={gender} className="radio-group text-light-400">
                      <RadioGroupItem value={gender} id={gender} />
                      <Label
                        htmlFor={gender}
                        className="cursor-pointer text-dark-300"
                      >
                        {gender}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          /> */}
          <div className="grid grid-cols-2 gap-2">
            <CustomFormField
              control={loginForm.control}
              name="city"
              label="City"
              fieldType={FormFieldTypes.INPUT}
              inputType="text"
              disabled={isPending}
              placeholder="Please enter your city"
            />
            <CustomFormField
              control={loginForm.control}
              name="country"
              label="Country"
              fieldType={FormFieldTypes.INPUT}
              inputType="text"
              disabled={isPending}
              placeholder="Please enter your country"
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="flex h-[42px] w-full items-center bg-primary hover:bg-red-900"
        >
          {isPending && <Loader2 className="me-2 size-4 animate-spin" />}
          Onboard
        </Button>
      </form>
    </Form>
  );
}
