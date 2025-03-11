// @flow

import * as React from "react";

import { Category } from "@/types";

import ExpertiseSection from "./_components/home-expertise-section";

type Props = {
  categories: Category[];
};
export const ServicesArchiveClient = (props: Props) => {
  const filteredCategories = props.categories.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  return <ExpertiseSection filteredCategories={filteredCategories} />;
};
