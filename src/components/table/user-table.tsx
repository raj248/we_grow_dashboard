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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { DataTablePagination } from "../pagination";
import { useBoostPlans } from "@/hooks/useBoostPlan";

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
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data: boostPlans, isLoading: isBoostPlansLoading } = useBoostPlans();

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
      columnFilters,
    },
    onPaginationChange: setPagination, // update pagination state
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: "includesString",
    autoResetPageIndex: false,
  });

  return (
    <div className="rounded-md border mt-2">
      <div className="flex items-center py-4 gap-4">
        {/* Global search */}
        <Input
          placeholder={inputLabel ?? "Filter By User ID or Balance..."}
          onChange={(event) => {
            table.setGlobalFilter(event.target.value);
            setPagination((page: any) => ({ ...page, pageIndex: 0 }));
          }}
          className="w-[60%]"
        />

        {/* Plan filter */}
        {tableType === "order" && !isBoostPlansLoading && boostPlans?.data && (
          <Select
            onValueChange={(value) => {
              // If "all" is selected, clear the filter
              table.setColumnFilters([
                { id: "planId", value: value === "all" ? undefined : value },
              ]);
              setPagination((page: any) => ({ ...page, pageIndex: 0 }));
            }}
            value={
              (table.getColumn("planId")?.getFilterValue() as
                | string
                | undefined)
                ? (table.getColumn("planId")?.getFilterValue() as string)
                : "all"
            }
          >
            <SelectTrigger className="w-[40%]">
              <SelectValue placeholder="Filter By Plan..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={"all"} value="all">
                All Plans
              </SelectItem>
              {boostPlans.data.map((plan) => (
                <SelectItem key={plan.id} value={plan.title}>
                  {plan.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Plan filter */}
        {tableType === "order" && (
          <Select
            onValueChange={(value) => {
              // If "all" is selected, clear the filter
              table.setColumnFilters([
                { id: "status", value: value === "all" ? undefined : value },
              ]);
              setPagination((page: any) => ({ ...page, pageIndex: 0 }));
            }}
            value={
              (table.getColumn("status")?.getFilterValue() as
                | string
                | undefined)
                ? (table.getColumn("status")?.getFilterValue() as string)
                : "all"
            }
          >
            <SelectTrigger className="w-[40%]">
              <SelectValue placeholder="Filter By Status..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={"all"} value="all">
                All Status
              </SelectItem>
              {["Active", "Completed", "Cancelled", "Expired"].map((plan) => (
                <SelectItem key={plan} value={plan}>
                  {plan}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
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
