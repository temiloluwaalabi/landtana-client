/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import MaxWidthContainer from "../max-width-container";

export const JobListingsPage = () => {
  // Sample job data - in a real app, this would come from an API
  const [jobs, setJobs] = useState([
    {
      id: "1",
      title: "Senior Hair Stylist",
      location: "Downtown Branch",
      type: "Full-time",
      salary: "$50,000 - $65,000",
      postedDate: "2025-03-01T10:00:00Z",
      description:
        "We are looking for an experienced hair stylist to join our downtown location...",
      requirements: [
        "At least 3 years of professional experience",
        "Proficiency in color techniques",
        "Strong customer service skills",
        "Availability for weekend shifts",
      ],
    },
    {
      id: "2",
      title: "Receptionist",
      location: "Westside Location",
      type: "Part-time",
      salary: "$18 - $22/hour",
      postedDate: "2025-03-05T14:00:00Z",
      description:
        "Our growing salon is seeking a friendly receptionist to manage appointments and greet clients...",
      requirements: [
        "Previous customer service experience",
        "Excellent communication skills",
        "Basic computer proficiency",
        "Ability to multitask in a fast-paced environment",
      ],
    },
    {
      id: "3",
      title: "Junior Stylist",
      location: "Eastside Branch",
      type: "Full-time",
      salary: "$40,000 - $45,000",
      postedDate: "2025-03-07T09:30:00Z",
      description:
        "Great opportunity for recent cosmetology graduates looking to build their career...",
      requirements: [
        "Cosmetology license",
        "Passion for hair styling",
        "Willingness to learn and grow",
        "Team player mentality",
      ],
    },
    {
      id: "4",
      title: "Nail Technician",
      location: "Downtown Branch",
      type: "Full-time",
      salary: "$45,000 - $55,000 plus tips",
      postedDate: "2025-03-08T11:15:00Z",
      description:
        "Experienced nail technician needed for our busy downtown location...",
      requirements: [
        "At least 2 years of professional experience",
        "Proficiency in manicures and pedicures",
        "Knowledge of nail art techniques",
        "Available for weekend shifts",
      ],
    },
    {
      id: "5",
      title: "Salon Manager",
      location: "Northside Branch",
      type: "Full-time",
      salary: "$60,000 - $75,000",
      postedDate: "2025-03-10T08:45:00Z",
      description:
        "We are seeking an experienced salon manager to oversee our new northside location...",
      requirements: [
        "Minimum 5 years in the beauty industry",
        "Previous management experience",
        "Strong leadership skills",
        "Business acumen and financial awareness",
      ],
    },
  ]);

  // Filter and search states
  const [filters, setFilters] = useState({
    location: "all",
    type: "all",
    search: "",
  });

  const [showFilters, setShowFilters] = useState(false);
  const locations = [...new Set(jobs.map((job) => job.location))];
  const jobTypes = [...new Set(jobs.map((job) => job.type))];

  // Filter jobs based on current filters
  const filteredJobs = jobs.filter((job) => {
    // Filter by location
    if (filters.location !== "all" && job.location !== filters.location) {
      return false;
    }

    // Filter by job type
    if (filters.type !== "all" && job.type !== filters.type) {
      return false;
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      return (
        job.title.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm)
      );
    }

    return true;
  });

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

  // Reset filters
  const resetFilters = () => {
    setFilters({
      location: "all",
      type: "all",
      search: "",
    });
  };

  return (
    <MaxWidthContainer className="">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-slate-900">
            Career Opportunities
          </h1>
          <p className="mx-auto max-w-2xl text-slate-600">
            Join our team of talented professionals and grow your career in a
            supportive, creative environment. We offer competitive pay, flexible
            schedules, and opportunities for advancement.
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 size-4 text-slate-400" />
            <Input
              placeholder="Search job positions..."
              className="pl-9"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
            {filters.search && (
              <button
                onClick={() => setFilters({ ...filters, search: "" })}
                className="absolute right-3 top-3"
              >
                <X className="size-4 text-slate-400" />
              </button>
            )}
          </div>

          <Button
            variant="outline"
            className="flex gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="size-4" />
            Filters
            {(filters.location !== "all" || filters.type !== "all") && (
              <Badge variant="secondary" className="ml-1">
                {(filters.location !== "all" ? 1 : 0) +
                  (filters.type !== "all" ? 1 : 0)}
              </Badge>
            )}
          </Button>
        </div>

        {/* Filter options */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 rounded-lg border p-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Location</Label>
                <Select
                  value={filters.location}
                  onValueChange={(value) =>
                    setFilters({ ...filters, location: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Job Type</Label>
                <Select
                  value={filters.type}
                  onValueChange={(value) =>
                    setFilters({ ...filters, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          </motion.div>
        )}

        {/* Results count */}
        <div className="mb-4 text-sm text-slate-500">
          {filteredJobs.length}{" "}
          {filteredJobs.length === 1 ? "position" : "positions"} found
        </div>

        {/* Job listings */}
        {filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
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

                  <CardContent className="pb-2">
                    <p className="line-clamp-2 text-sm text-slate-600">
                      {job.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
                      <div className="flex items-center">
                        <BriefcaseBusiness className="mr-1.5 size-4 text-slate-400" />
                        {job.salary}
                      </div>

                      <div className="flex items-center">
                        <CalendarDays className="mr-1.5 size-4 text-slate-400" />
                        Posted {formatPostedDate(job.postedDate)}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2">
                    <Link href={`/job-board/${job.id}`}>
                      <Button className="gap-1">
                        View Job
                        <ChevronRight className="size-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <p className="mb-1 font-medium">No positions found</p>
              <p className="text-sm text-slate-500">
                Try adjusting your search criteria
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </MaxWidthContainer>
  );
};
