/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { FormFieldTypes } from "@/config/enums";

import { CustomFormField } from "../shared/custom-form-field";
// import { RadioGroupItem } from "../ui/radio-group";
// import { SelectItem } from "../ui/select";

interface JobApplicationFormProps {
  formFields: {
    id: string;
    type: string;
    label: string;
    placeholder: string;
    required: boolean;
    accept?: string;
    options?: { label: string; value: string }[];
    validations?: {
      min?: number;
      max?: number;
      pattern?: string;
      message?: string;
    };
  }[];
  onSubmit: (formData: {
    [key: string]: string | number | boolean | File | undefined;
  }) => Promise<void>;
  jobId: string;
}

// Map backend field types to FormFieldTypes enum
const mapFieldType = (type: string): FormFieldTypes => {
  const typeMap: Record<string, FormFieldTypes> = {
    text: FormFieldTypes.INPUT,
    email: FormFieldTypes.INPUT,
    phone: FormFieldTypes.PHONE_INPUT,
    textarea: FormFieldTypes.TEXTAREA,
    file: FormFieldTypes.FILE_INPUT,
    date: FormFieldTypes.DATE_PICKER,
    select: FormFieldTypes.SELECT,
    checkbox: FormFieldTypes.CHECKBOX,
    switch: FormFieldTypes.SWITCH,
    radio: FormFieldTypes.RADIO_GROUP,
    multiselect: FormFieldTypes.MULTI_SELECT,
    // rating: FormFieldTypes.RATING,
    toggleGroup: FormFieldTypes.TOGGLE_GROUP,
    combobox: FormFieldTypes.COMBOBOX,
    command: FormFieldTypes.COMMAND,
    priceInput: FormFieldTypes.PRICE_INPUT,
    quill: FormFieldTypes.QUILL,
    skeleton: FormFieldTypes.SKELETON,
  };

  return typeMap[type] || FormFieldTypes.INPUT;
};

// Helper function to create Zod schema based on field type and validations
const createFieldSchema = (field: JobApplicationFormProps["formFields"][0]) => {
  const { type, required, validations } = field;
  let schema;
  switch (type) {
    case "email":
      schema = z.string().email("Please enter a valid email address");
      break;
    case "phone":
      schema = z
        .string()
        .regex(/^[0-9+\-() ]{7,}$/, "Please enter a valid phone number");
      break;
    case "date":
      schema = z.date();
      break;
    case "checkbox":
      schema = z.boolean();
      break;
    case "file":
      schema = z.instanceof(File).optional();
      break;
    case "number":
      schema = z.number();
      break;
    default:
      schema = z.string();
  }

  // Apply additional validations
  if (validations) {
    if (type === "text" || type === "textarea" || type === "email") {
      if (validations.min) {
        schema = (schema as z.ZodString).min(
          validations.min,
          validations.message ||
            `Must be at least ${validations.min} characters`
        );
      }
      if (validations.max) {
        schema = (schema as z.ZodString).max(
          validations.max,
          validations.message || `Must be at most ${validations.max} characters`
        );
      }
      if (validations.pattern) {
        schema = (schema as z.ZodString).regex(
          new RegExp(validations.pattern),
          validations.message || "Invalid format"
        );
      }
    } else if (type === "number") {
      if (validations.min) {
        schema = (schema as z.ZodNumber).min(
          validations.min,
          validations.message || `Must be at least ${validations.min}`
        );
      }
      if (validations.max) {
        schema = (schema as z.ZodNumber).max(
          validations.max,
          validations.message || `Must be at most ${validations.max}`
        );
      }
    }
  }

  // Make field optional if not required
  return required ? schema : schema.optional();
};

export const JobApplicationForm2 = ({
  formFields,
  onSubmit,
  jobId,
}: JobApplicationFormProps) => {
  // Dynamically create Zod schema based on form fields
  const formSchema = useMemo(() => {
    const schemaObj: Record<string, any> = {};

    formFields.forEach((field) => {
      schemaObj[field.id] = createFieldSchema(field);
    });

    // Add terms agreement field
    schemaObj.termsAgreed = z.literal(true, {
      errorMap: () => ({ message: "You must agree to the terms to submit" }),
    });

    return z.object(schemaObj);
  }, [formFields]);

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formFields.reduce(
      (acc, field) => {
        if (field.type === "checkbox") {
          acc[field.id] = false;
        } else if (field.type === "date") {
          acc[field.id] = undefined;
        } else {
          acc[field.id] = "";
        }
        return acc;
      },
      { termsAgreed: false } as Record<string, any>
    ),
  });

  const [submissionError, setSubmissionError] = React.useState<string | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      // Add jobId and submission date to the form data
      const completeFormData = {
        ...data,
        jobId,
        submissionDate: new Date().toISOString(),
      };

      await onSubmit(completeFormData);
      // Form submission successful - reset form or show success state
      // form.reset(); // Uncomment if you want to reset the form after submission
    } catch {
      setSubmissionError(
        "There was an error submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {submissionError && <div>{submissionError}</div>}

        <div className="space-y-6">
          {formFields.map((field) => {
            const fieldType = mapFieldType(field.type);

            // Handle special cases for different field types
            switch (fieldType) {
              // case FormFieldTypes.SELECT:
              //   return (
              //     <CustomFormField
              //       key={field.id}
              //       control={form.control}
              //       name={field.id}
              //       fieldType={fieldType}
              //       label={field.label}
              //       placeholder={field.placeholder}
              //       required={field.required}
              //     >
              //       {field.options?.map((option) => (
              //         <SelectItem key={option.value} value={option.value}>
              //           {option.label}
              //         </SelectItem>
              //       ))}
              //     </CustomFormField>
              //   );

              // case FormFieldTypes.RADIO_GROUP:
              //   return (
              //     <CustomFormField
              //       key={field.id}
              //       control={form.control}
              //       name={field.id}
              //       fieldType={fieldType}
              //       label={field.label}
              //       required={field.required}
              //     >
              //       {field.options?.map((option) => (
              //         <div
              //           key={option.value}
              //           className="flex items-center space-x-2"
              //         >
              //           <RadioGroupItem
              //             id={option.value}
              //             value={option.value}
              //           />
              //           <label htmlFor={option.value}>{option.label}</label>
              //         </div>
              //       ))}
              //     </CustomFormField>
              //   );

              // case FormFieldTypes.MULTI_SELECT:
              //   return (
              //     <CustomFormField
              //       key={field.id}
              //       control={form.control}
              //       name={field.id}
              //       fieldType={fieldType}
              //       label={field.label}
              //       placeholder={field.placeholder}
              //       required={field.required}
              //       searchable={true}
              //     >
              //       {field.options?.map((option) => (
              //         <div
              //           key={option.value}
              //           className="px-2 py-1 hover:bg-gray-100"
              //         >
              //           {option.label}
              //         </div>
              //       ))}
              //     </CustomFormField>
              //   );

              // case FormFieldTypes.PHONE_INPUT:
              //   return (
              //     <CustomFormField
              //       key={field.id}
              //       control={form.control}
              //       name={field.id}
              //       fieldType={fieldType}
              //       label={field.label}
              //       placeholder={field.placeholder}
              //       required={field.required}
              //       // international={true}
              //       // defaultCountry="US"
              //     />
              //   );

              // case FormFieldTypes.FILE_INPUT:
              //   return (
              //     <CustomFormField
              //       key={field.id}
              //       control={form.control}
              //       name={field.id}
              //       fieldType={fieldType}
              //       label={field.label}
              //       required={field.required}
              //       accept={field.accept}
              //     />
              //   );

              // case FormFieldTypes.DATE_PICKER:
              //   return (
              //     <CustomFormField
              //       key={field.id}
              //       control={form.control}
              //       name={field.id}
              //       fieldType={fieldType}
              //       label={field.label}
              //       required={field.required}
              //       dateFormat="PPP"
              //       calendarProps={{
              //         disabled: (date) => date < new Date(),
              //       }}
              //     />
              //   );

              case FormFieldTypes.CHECKBOX:
                return (
                  <CustomFormField
                    key={field.id}
                    control={form.control}
                    name={field.id}
                    fieldType={fieldType}
                    label={field.label}
                    required={field.required}
                    checkboxLabel={field.label}
                  />
                );

              case FormFieldTypes.INPUT:
                return (
                  <CustomFormField
                    key={field.id}
                    control={form.control}
                    name={field.id}
                    fieldType={fieldType}
                    label={field.label}
                    placeholder={field.placeholder}
                    required={field.required}
                    inputType={field.type === "email" ? "email" : "text"}
                  />
                );

              default:
                return null;
            }
          })}
        </div>

        <Separator />

        <div className="space-y-4">
          <CustomFormField
            control={form.control}
            name="termsAgreed"
            fieldType={FormFieldTypes.CHECKBOX}
            checkboxLabel="I agree to the terms and conditions and confirm that all information provided is accurate"
            required={true}
          />

          <Button
            asChild
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting Application..." : "Submit Application"}
          </Button>

          <p className="text-center text-xs text-slate-500">
            By submitting this application, you consent to Elegance Hair Salon
            storing and processing your information for recruitment purposes.
          </p>
        </div>
      </form>
    </Form>
  );
};
