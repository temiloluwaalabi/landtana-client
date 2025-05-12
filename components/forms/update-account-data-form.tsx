"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { FormFieldTypes } from "@/config/enums";
import { BiodataSchema } from "@/lib/validations/user/user.schema";

import { CustomFormField } from "../shared/custom-form-field";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { SelectItem } from "../ui/select";
import { Separator } from "../ui/separator";

export default function UpdateAccountDataForm() {
  const BiodataForm = useForm<z.infer<typeof BiodataSchema>>({
    resolver: zodResolver(BiodataSchema),
    defaultValues: {
      fullName: "",
      gender: "",
      address: "",
      dob: new Date(),
      phoneNumber: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof BiodataSchema>) => {
    console.log(values);
  };
  return (
    <Form {...BiodataForm}>
      <form
        className="space-y-6"
        onSubmit={BiodataForm.handleSubmit(handleSubmit)}
      >
        <div className="space-y-6">
          <h6 className="text-[20px] font-bold text-[#212121]">
            Personal Information
          </h6>
          <div className="grid grid-cols-2 gap-4">
            <CustomFormField
              control={BiodataForm.control}
              name="fullName"
              label="Full Name"
              fieldType={FormFieldTypes.INPUT}
              inputType="text"
              // disabled={isPending}
              placeholder="Fullname"
            />
            <CustomFormField
              control={BiodataForm.control}
              name="dob"
              label="Date of birth"
              fieldType={FormFieldTypes.DATE_PICKER}
            />
            <CustomFormField
              control={BiodataForm.control}
              name="address"
              label="Address"
              fieldType={FormFieldTypes.INPUT}
              inputType="text"
              // disabled={isPending}
              placeholder="Address"
            />
            <CustomFormField
              control={BiodataForm.control}
              name="gender"
              label="Gender"
              fieldType={FormFieldTypes.SELECT}
              placeholder="Select Gender"
            >
              {[
                {
                  id: "male",
                  label: "Male",
                },
                {
                  id: "female",
                  label: "Female",
                },
                {
                  id: "prefer-not-to-say",
                  label: "Prefer not to say",
                },
              ].map((gender) => (
                <SelectItem
                  key={gender.id}
                  value={gender.id}
                  className="cursor-pointer"
                >
                  {gender.label}
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              control={BiodataForm.control}
              name="phoneNumber"
              label="Phone Number"
              fieldType={FormFieldTypes.PHONE_INPUT}
              // disabled={isPending}
              placeholder="Please enter your number"
            />
            <CustomFormField
              control={BiodataForm.control}
              name="email"
              label="Email address"
              fieldType={FormFieldTypes.INPUT}
              inputType="email"
              // disabled={isPending}
              placeholder="deltapikin@aol.com"
            />
          </div>
        </div>{" "}
        <Separator className="bg-[#E8E8E8]" />
        <div className="space-y-6">
          <h6 className="text-[20px] font-bold text-[#212121]">
            Emergency Protocol
          </h6>
          <div className="grid grid-cols-2 gap-4">
            <CustomFormField
              control={BiodataForm.control}
              name="emergencyContact.name"
              label="Emergency Contact Name"
              fieldType={FormFieldTypes.INPUT}
              inputType="text"
              // disabled={isPending}
              placeholder="Fullname"
            />

            <CustomFormField
              control={BiodataForm.control}
              name="emergencyContact.relationship"
              label="Relationship to Emergency Contact"
              fieldType={FormFieldTypes.INPUT}
              inputType="text"
              // disabled={isPending}
              placeholder="Sister"
            />

            <CustomFormField
              control={BiodataForm.control}
              name="emergencyContact.phoneNumber"
              label="Emergency Contact Phone Number"
              fieldType={FormFieldTypes.PHONE_INPUT}
              // disabled={isPending}
              placeholder="Please enter your number"
            />
          </div>
        </div>
        <div className="space-y-4">
          <Button
            type="submit"
            //   disabled={isPending}
            className="flex w-full items-center"
          >
            {/* {isPending && <Loader2 className="me-2 size-4 animate-spin" />} */}
            Continue{" "}
          </Button>
        </div>
      </form>
    </Form>
  );
}
