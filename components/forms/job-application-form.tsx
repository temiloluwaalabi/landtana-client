/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { format } from "date-fns";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Separator } from "../ui/separator";

// import { FileUploader } from "./FileUploader";

interface JobApplicationFormProps {
  formFields: {
    id: string;
    type: string;
    label: string;
    placeholder: string;
    required: boolean;
    accept?: string;
  }[];
  onSubmit: (formData: {
    [key: string]: string | number | boolean | Date | File;
  }) => Promise<void>;
  jobId: string;
}

export const JobApplicationForm = ({
  formFields,
  onSubmit,
  jobId,
}: JobApplicationFormProps) => {
  const [formData, setFormData] = useState<{
    [key: string]: string | number | boolean | Date | File;
  }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreesToTerms, setAgreesToTerms] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  //   const handleFileUpload = (fieldId: string, file: File) => {
  //     setFormData({ ...formData, [fieldId]: file });

  //     // Clear error when field is edited
  //     if (errors[fieldId]) {
  //       setErrors({ ...errors, [fieldId]: null });
  //     }
  //   };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    formFields.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
        isValid = false;
      }

      // Validate email format
      if (
        field.type === "email" &&
        formData[field.id] &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
          String(formData[field.id])
        )
      ) {
        newErrors[field.id] = "Please enter a valid email address";
        isValid = false;
      }

      // Validate phone format (basic validation)
      if (
        field.type === "phone" &&
        formData[field.id] &&
        !/^[0-9+\-() ]{7,}$/.test(String(formData[field.id]))
      ) {
        newErrors[field.id] = "Please enter a valid phone number";
        isValid = false;
      }
    });

    if (!agreesToTerms) {
      newErrors.terms = "You must agree to the terms to submit";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Add jobId and submission date to the form data
      const completeFormData = {
        ...formData,
        jobId,
        submissionDate: new Date().toISOString(),
      };

      // In a real app, you might want to upload files separately and send URLs
      await onSubmit(completeFormData);

      // Form submission successful - this would be handled by the parent component
    } catch {
      setErrors({
        form: "There was an error submitting your application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: {
    id: string;
    type: string;
    label: string;
    placeholder: string;
    required: boolean;
    accept?: string;
  }) => {
    switch (field.type) {
      case "text":
      case "email":
      case "phone":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              name={field.id}
              type={field.type === "phone" ? "tel" : field.type}
              placeholder={field.placeholder}
              value={String(formData[field.id] || "")}
              onChange={handleInputChange}
              className={errors[field.id] ? "border-red-500" : ""}
            />
            {errors[field.id] && (
              <p className="text-sm text-red-500">{errors[field.id]}</p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={field.id}
              name={field.id}
              placeholder={field.placeholder}
              //   value={typeof formData[field.id] === 'boolean' ? '' : formData[field.id] || ""}
              //   onChange={handleInputChange}
              className={`min-h-32 ${errors[field.id] ? "border-red-500" : ""}`}
            />
            {errors[field.id] && (
              <p className="text-sm text-red-500">{errors[field.id]}</p>
            )}
          </div>
        );

      //   case "file":
      //     return (
      //       <div key={field.id} className="space-y-2">
      //         <Label htmlFor={field.id}>
      //           {field.label}{" "}
      //           {field.required && <span className="text-red-500">*</span>}
      //         </Label>
      //         <FileUploader
      //           id={field.id}
      //           accept={field.accept}
      //           onFileUploaded={(file) => handleFileUpload(field.id, file)}
      //           error={errors[field.id]}
      //         />
      //         {errors[field.id] && (
      //           <p className="text-sm text-red-500">{errors[field.id]}</p>
      //         )}
      //         {field.helpText && (
      //           <p className="text-xs text-slate-500">{field.helpText}</p>
      //         )}
      //       </div>
      //     );

      case "date":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              name={field.id}
              type="date"
              min={format(new Date(), "yyyy-MM-dd")}
              //   value={formData[field.id] || ""}
              onChange={handleInputChange}
              className={errors[field.id] ? "border-red-500" : ""}
            />
            {errors[field.id] && (
              <p className="text-sm text-red-500">{errors[field.id]}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.form && <div>{errors.form}</div>}

      {formFields.map((field) => renderField(field))}

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={agreesToTerms}
            // onCheckedChange={(value) => setAgreesToTerms(value)}
            // onCheckedChange={setAgreesToTerms}
          />
          <Label
            htmlFor="terms"
            className={`text-sm ${errors.terms ? "text-red-500" : ""}`}
          >
            I agree to the terms and conditions and confirm that all information
            provided is accurate
          </Label>
        </div>
        {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting Application..." : "Submit Application"}
        </Button>

        <p className="text-center text-xs text-slate-500">
          By submitting this application, you consent to Elegance Hair Salon
          storing and processing your information for recruitment purposes.
        </p>
      </div>
    </form>
  );
};
