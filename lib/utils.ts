import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const exportToCSV = (data: any[], filename = 'data.csv') => {
  if (!data || data.length === 0) return;

  const formatDate = (val: any) => {
    if (val?.seconds) {
      const date = new Date(val.seconds * 1000);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
    return val;
  };

  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','), // header row
    ...data.map(row =>
      headers
        .map(key => {
          const val = row[key];
          const formatted = formatDate(val);
          return `"${(formatted ?? '').toString().replace(/"/g, '""')}"`;
        })
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
