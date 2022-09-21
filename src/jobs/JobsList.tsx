import * as React from "react";

import {
  CreateButton,
  ExportButton,
  FilterButton,
  List,
  NumberInput,
  TextField,
  TopToolbar,
} from "react-admin";

import { TriaTableComponent } from "../tria-table-component/TriaTableComponent";

interface JobsListProps {}

const TableTopBar = () => (
  <TopToolbar>
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const JobsList = ({}: JobsListProps) => {
  return (
    <TriaTableComponent
      renderMobile={{
        primaryText: (record) => record.id,
        secondaryText: (record) => record.job_title,
        tertiaryText: (record) => `${record.min_salary} - ${record.max_salary}`,
      }}
      tableTop={<TableTopBar />}
    >
      <TextField source="id" />
      <TextField source="max_salary" />
      <TextField source="min_salary" />
      <TextField source="job_title" />
    </TriaTableComponent>
  );
};
