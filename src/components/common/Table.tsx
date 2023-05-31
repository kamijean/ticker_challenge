import React from "react";
import styled from "styled-components";

const TableWrapper = styled.table`
  border-collapse: collapse;
  border: 1px solid gray;
`;

const TableHeaderHead = styled.thead`
  border-bottom: 1px solid gray;
`;

const TableHeader = styled.th`
  font-weight: bold;
  padding-bottom: 20px;
  padding-top: 20px;
  padding-right: 30px;
  text-align: left;
  &:first-child {
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 20px;
    padding-top: 20px;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1pt solid gray;
`;

const TableCell = styled.td`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 30px;
  &:first-child {
    padding-left: 30px;
    padding-right: 0;
  }
`;

export type TableDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number;
};

type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<TableDefinitionType<T, K>>;
};

const Table = <T, K extends keyof T>({ columns, data }: TableProps<T, K>) => {
  return (
    <TableWrapper>
      <TableHeaderHead>
        {columns.map((column) => (
          <TableHeader key={`headCell-${column.header}`}>
            {column.header}
          </TableHeader>
        ))}
      </TableHeaderHead>
      <tbody>
        {data.map((row, index) => (
          <TableRow key={`row-${index}`}>
            {columns.map((column) => (
              <TableCell key={column.header}>{`${row[column.key]}`}</TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </TableWrapper>
  );
};

export default Table;
