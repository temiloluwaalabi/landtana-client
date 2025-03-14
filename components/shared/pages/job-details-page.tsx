"use client";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  MapPin,
  BriefcaseBusiness,
  CalendarDays,
  ArrowLeft,
  Share2,
  CheckCircle2,
  FileText,
  Briefcase,
  Users,
  Building,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

// import { JobApplicationForm } from "@/components/forms/job-application-form";
import { JobApplicationForm } from "@/components/forms/job-application-form";
// import { JobApplicationForm2 } from "@/components/forms/job-application-form-two";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientOnly from "@/providers/client-only";

import MaxWidthContainer from "../max-width-container";

export interface Job {
  id: string;
  title: string;
  location: string;
  address: string;
  type: string;
  salary: string;
  postedDate: string;
  description: string;
  companyInfo: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  applicationForm: {
    fields: {
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
  };
}

export const JobDetailsPage = () => {
  const { jobId } = useParams();
  const navigate = useRouter();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");

  // In a real application, you would fetch the job data from an API
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      // Sample job data
      const jobData = {
        id: "1",
        title: "Senior Hair Stylist",
        location: "Downtown Branch",
        address: "123 Main Street, Downtown",
        type: "Full-time",
        salary: "$50,000 - $65,000",
        postedDate: "2025-03-01T10:00:00Z",
        description:
          "We are looking for an experienced hair stylist to join our downtown location. As a Senior Hair Stylist, you will provide exceptional hair services to our clients, mentor junior stylists, and contribute to the creative direction of our salon.",
        companyInfo:
          "Elegance Hair Salon is a premium salon with over 10 years of experience providing top-tier hair services to our clients. We pride ourselves on our welcoming atmosphere, commitment to continuous education, and dedication to helping our stylists grow their careers.",
        responsibilities: [
          "Consult with clients to determine their styling needs and preferences",
          "Perform various hair services including cutting, coloring, and styling",
          "Recommend appropriate hair products and treatments",
          "Maintain a clean and organized work area",
          "Stay updated on current hair trends and techniques",
          "Mentor junior stylists and provide guidance",
          "Build and maintain a loyal client base",
        ],
        requirements: [
          "At least 3 years of professional experience in a salon environment",
          "Proficiency in advanced color techniques and precision cutting",
          "Strong customer service skills and ability to build client relationships",
          "Valid cosmetology license",
          "Portfolio of previous work",
          "Availability for weekend shifts",
          "Excellent communication and interpersonal skills",
        ],
        benefits: [
          "Competitive salary plus commission structure",
          "Health insurance for full-time employees",
          "Paid vacation and personal days",
          "Ongoing education and training opportunities",
          "Employee discount on products and services",
          "Flexible scheduling options",
          "Career advancement opportunities",
        ],
        applicationForm: {
          fields: [
            {
              id: "name",
              type: "text",
              label: "Full Name",
              placeholder: "Enter your full name",
              required: true,
            },
            {
              id: "email",
              type: "email",
              label: "Email Address",
              placeholder: "Enter your email address",
              required: true,
            },
            {
              id: "phone",
              type: "phone",
              label: "Phone Number",
              placeholder: "Enter your phone number",
              required: true,
            },
            {
              id: "experience",
              type: "textarea",
              label: "Work Experience",
              placeholder:
                "Describe your relevant work experience, including years, salon names, and specialties",
              required: true,
            },
            {
              id: "portfolio",
              type: "file",
              label: "Portfolio/Resume",
              placeholder: "Upload your portfolio or resume",
              required: true,
              accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png",
            },
            {
              id: "availability",
              type: "date",
              label: "Availability Start Date",
              placeholder: "When can you start?",
              required: true,
            },
          ],
        },
      };

      setJob(jobData);
      setLoading(false);
    }, 800);
  }, [jobId]);

  // Format posted date
  const formatPostedDate = (dateString: string) => {
    try {
      const postedDate = new Date(dateString);
      const now = new Date();
      const diffDays = Math.floor(
        (now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 0) {
        return "Today";
      } else if (diffDays === 1) {
        return "Yesterday";
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else {
        return format(postedDate, "MMM d, yyyy");
      }
    } catch {
      return dateString;
    }
  };

  // Handle application submission
  const handleApplicationSubmit = async (formData: {
    [key: string]: string | number | boolean | Date | File | undefined;
  }): Promise<void> => {
    // In a real application, this would send the data to your backend
    console.log("Application submitted:", formData);

    // For demo purposes, show success and redirect
    alert("Application submitted successfully!");
    navigate.push("/careers/application-success");
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-8 w-48 animate-pulse rounded-md bg-slate-200"></div>
            <div className="h-4 w-32 animate-pulse rounded-md bg-slate-200"></div>
          </div>
        </div>
      </div>
    );
  }

  // If job not found
  if (!job) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold">Job Not Found</h1>
          <p className="mb-6">
            The position you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link href="/job-board">
            <Button>Back to All Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <MaxWidthContainer className="">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <Link href="/job-board">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 size-4" />
              Back to All Jobs
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Job Details Column */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold">
                      {job.title}
                    </CardTitle>
                    <CardDescription className="mt-1 flex items-center">
                      <MapPin className="mr-1 size-4 text-slate-400" />
                      {job.location}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-slate-50">
                    {job.type}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
                  <div className="flex items-center">
                    <BriefcaseBusiness className="mr-1.5 size-4 text-slate-400" />
                    {job.salary}
                  </div>

                  <div className="flex items-center">
                    <CalendarDays className="mr-1.5 size-4 text-slate-400" />
                    Posted {formatPostedDate(job.postedDate)}
                  </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full">
                    <TabsTrigger value="details" className="flex-1">
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="company" className="flex-1">
                      Company
                    </TabsTrigger>
                    <TabsTrigger value="apply" className="flex-1">
                      Apply
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-6 pt-4">
                    <div>
                      <h3 className="mb-2 text-lg font-medium">
                        About This Position
                      </h3>
                      <p className="text-slate-600">{job.description}</p>
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-medium">
                        Responsibilities
                      </h3>
                      <ul className="ml-5 list-disc space-y-1 text-slate-600">
                        {job.responsibilities.map((item, index) => (
                          <li key={`resp-${index}`}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-medium">Requirements</h3>
                      <ul className="ml-5 list-disc space-y-1 text-slate-600">
                        {job.requirements.map((item, index) => (
                          <li key={`req-${index}`}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-medium">Benefits</h3>
                      <ul className="ml-5 list-disc space-y-1 text-slate-600">
                        {job.benefits.map((item, index) => (
                          <li key={`ben-${index}`}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      size="lg"
                      className="w-full"
                      onClick={() => setActiveTab("apply")}
                    >
                      Apply Now
                    </Button>
                  </TabsContent>

                  <TabsContent value="company" className="space-y-4 pt-4">
                    <div>
                      <h3 className="mb-2 text-lg font-medium">
                        About Elegance Hair Salon
                      </h3>
                      <p className="text-slate-600">{job.companyInfo}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-start">
                            <Building className="mr-3 size-5 text-slate-500" />
                            <div>
                              <h4 className="mb-1 font-medium">Company Type</h4>
                              <p className="text-sm text-slate-600">
                                Independent Salon
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-start">
                            <Users className="mr-3 size-5 text-slate-500" />
                            <div>
                              <h4 className="mb-1 font-medium">Company Size</h4>
                              <p className="text-sm text-slate-600">
                                10-20 employees
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-start">
                            <Calendar className="mr-3 size-5 text-slate-500" />
                            <div>
                              <h4 className="mb-1 font-medium">Founded</h4>
                              <p className="text-sm text-slate-600">2015</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-start">
                            <MapPin className="mr-3 size-5 text-slate-500" />
                            <div>
                              <h4 className="mb-1 font-medium">Location</h4>
                              <p className="text-sm text-slate-600">
                                {job.address}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6 text-center">
                      <Button size="lg" onClick={() => setActiveTab("apply")}>
                        Apply to This Position
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="apply" className="space-y-6 pt-4">
                    <div className="rounded-lg bg-slate-50 p-4">
                      <h3 className="mb-2 text-lg font-medium">
                        Application for {job.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        Please fill out the form below to apply for this
                        position. Fields marked with an asterisk (*) are
                        required.
                      </p>
                    </div>

                    <ClientOnly>
                      <JobApplicationForm
                        formFields={job.applicationForm.fields}
                        onSubmit={handleApplicationSubmit}
                        jobId={job.id}
                      />
                    </ClientOnly>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Briefcase className="mr-3 size-5 text-slate-500" />
                  <div>
                    <h4 className="text-sm font-medium text-slate-500">
                      Job Type
                    </h4>
                    <p>{job.type}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <BriefcaseBusiness className="mr-3 size-5 text-slate-500" />
                  <div>
                    <h4 className="text-sm font-medium text-slate-500">
                      Salary Range
                    </h4>
                    <p>{job.salary}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="mr-3 size-5 text-slate-500" />
                  <div>
                    <h4 className="text-sm font-medium text-slate-500">
                      Location
                    </h4>
                    <p>{job.location}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CalendarDays className="mr-3 size-5 text-slate-500" />
                  <div>
                    <h4 className="text-sm font-medium text-slate-500">
                      Posted
                    </h4>
                    <p>{formatPostedDate(job.postedDate)}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-stretch space-y-2">
                <Button
                  className="w-full"
                  onClick={() => setActiveTab("apply")}
                >
                  Apply Now
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 size-4" />
                  Share Job
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="group rounded-md border p-3 transition-colors hover:bg-slate-50">
                  <h4 className="font-medium group-hover:text-blue-600">
                    Junior Hair Stylist
                  </h4>
                  <div className="mt-1 flex items-center justify-between text-sm">
                    <span className="text-slate-600">West Side Location</span>
                    <Badge variant="outline" className="text-xs">
                      Part-time
                    </Badge>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    Posted 3 days ago
                  </div>
                </div>

                <div className="group rounded-md border p-3 transition-colors hover:bg-slate-50">
                  <h4 className="font-medium group-hover:text-blue-600">
                    Colorist Specialist
                  </h4>
                  <div className="mt-1 flex items-center justify-between text-sm">
                    <span className="text-slate-600">Downtown Branch</span>
                    <Badge variant="outline" className="text-xs">
                      Full-time
                    </Badge>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    Posted 5 days ago
                  </div>
                </div>

                <div className="group rounded-md border p-3 transition-colors hover:bg-slate-50">
                  <h4 className="font-medium group-hover:text-blue-600">
                    Salon Manager
                  </h4>
                  <div className="mt-1 flex items-center justify-between text-sm">
                    <span className="text-slate-600">East Side Location</span>
                    <Badge variant="outline" className="text-xs">
                      Full-time
                    </Badge>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    Posted 1 week ago
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-sm" asChild>
                  <Link href="/careers">View All Openings</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="size-5 text-green-500" />
                    <span className="text-sm">Updated resume/portfolio</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="size-5 text-green-500" />
                    <span className="text-sm">Professional references</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="size-5 text-green-500" />
                    <span className="text-sm">Valid cosmetology license</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="size-5 text-green-500" />
                    <span className="text-sm">Examples of your work</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full rounded-md bg-slate-50 p-3 text-sm">
                  <div className="flex items-center">
                    <FileText className="mr-2 size-4 text-slate-500" />
                    <span className="font-medium">Application tips</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    Highlight your specialized skills, relevant certifications,
                    and examples of client transformations to stand out.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </motion.div>
    </MaxWidthContainer>
  );
};

export default JobDetailsPage;
