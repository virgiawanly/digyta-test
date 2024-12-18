import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table as TableUI } from '@/components/ui/table';
import { flexRender, Table } from '@tanstack/react-table';

interface DataTableProps<TData> {
  table: Table<TData>;
  isLoading?: boolean;
}

export function DataTable<TData>(props: DataTableProps<TData>) {
  const { table, isLoading } = props;

  return (
    <div className="border rounded-md">
      <TableUI>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className={`${isLoading ? 'animate-pulse' : ''}`}>
          {table.getRowCount() > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} width={cell.column.columnDef.size} className="py-0 h-14 min-h-fit">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableUI>
    </div>
  );
}
