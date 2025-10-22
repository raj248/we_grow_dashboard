import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { DataTablePagination } from "../pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableType: string;
  onRowClick?: (row: TData) => void;
  inputLabel?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  tableType,
  onRowClick,
  inputLabel,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState<ColumnFiltersState>([]);

  const [pagination, setPagination] = useState(() => {
    const saved = localStorage.getItem(`${tableType}s-pagination`);
    return saved ? JSON.parse(saved) : { pageIndex: 0, pageSize: 10 };
  });

  useEffect(() => {
    localStorage.setItem(
      `${tableType}s-pagination`,
      JSON.stringify(pagination)
    );
  }, [pagination]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      pagination,
    },
    onPaginationChange: setPagination, // update pagination state
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    autoResetPageIndex: false,
  });

  return (
    <div className="rounded-md border mt-2">
      <div className="flex items-center py-4">
        <Input
          placeholder={inputLabel ?? "Filter By User ID or Balance..."}
          onChange={(event) => {
            table.setGlobalFilter(event.target.value);
            setPagination((page: any) => {
              return { ...page, pageIndex: 0 };
            });
          }}
          className="w-[60%]"
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={onRowClick ? "cursor-pointer" : ""}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DataTablePagination table={table} />
    </div>
  );
}
