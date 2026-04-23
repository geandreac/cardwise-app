"use client";

import { InvoiceCard } from "./InvoiceCard";
import type { Invoice } from "../page";

interface Props {
  invoices: Invoice[];
  onUpload: (invoice: Invoice) => void;
}

export function InvoiceList({ invoices, onUpload }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {invoices.map((invoice, i) => (
        <InvoiceCard
          key={invoice.id}
          invoice={invoice}
          index={i}
          onUpload={onUpload}
        />
      ))}
    </div>
  );
}