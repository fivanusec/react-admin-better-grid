import * as React from "react";

import {
  Datagrid,
  DatagridProps,
  FunctionToElement,
  List,
  ListProps,
  RaRecord,
  SimpleList,
  SimpleListProps,
} from "react-admin";
import { Theme, useMediaQuery } from "@mui/material";

export interface TriaTableComponentProps<T extends RaRecord>
  extends React.HtmlHTMLAttributes<HTMLElement> {
  /**
   * @type renderMobile
   * @description Pass definition how is data going to be rendered while on mobile screen
   * @example {primaryText: (record) => record.id}
   */

  renderMobile?: {
    [key: "primaryText" | "secondaryText" | "tertiaryText" | string]:
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | FunctionToElement<RaRecord>
      | undefined;
  };

  /**
   * @type desktopProps
   * @description Pass definition how is data going to be render on desktop
   * @example
   */

  desktopProps?: DatagridProps<T>;

  /**
   * @type desktopProps
   * @description Pass definition how is data going to be render on desktop
   * @example {sx: {backgroundColor: "green"}}
   */

  mobileProps?: SimpleListProps<T>;

  /**
   * @type actions
   * @description Pass definition on how is top going to be setup
   * @example {<Element />}
   */

  tableTop?:
    | false // false is type(?!?!)
    | React.ReactElement<T, string | React.JSXElementConstructor<T>>
    | undefined;

  /**
   * @type filters
   * @description Specify filters for given table
   * @example [<FilterField />]
   */

  filters?:
    | Array<React.ReactElement<T, string | React.JSXElementConstructor<T>>>
    | undefined;

  /**
   * @type pagecount
   * @description Specifies how much data is renderd per page
   */
  pageCount?: number;

  paginationSettings?:
    | false
    | React.ReactElement<T, string | React.JSXElementConstructor<T>>
    | undefined;

  gridProps?: ListProps<T>;
}

export const TriaTableComponent = <T extends RaRecord>({
  children,
  renderMobile,
  desktopProps,
  mobileProps,
  tableTop,
  filters,
  pageCount,
  paginationSettings,
  gridProps,
}: TriaTableComponentProps<T>) => {
  const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  if (isSm || isXs) {
    return (
      <List
        actions={tableTop}
        filters={filters}
        perPage={pageCount}
        pagination={paginationSettings}
        {...gridProps}
      >
        <SimpleList {...mobileProps} {...renderMobile}>
          {children}
        </SimpleList>
      </List>
    );
  }

  return (
    <List
      actions={tableTop}
      filters={filters}
      perPage={pageCount}
      pagination={paginationSettings}
      {...gridProps}
    >
      <Datagrid {...desktopProps}>{children}</Datagrid>
    </List>
  );
};
