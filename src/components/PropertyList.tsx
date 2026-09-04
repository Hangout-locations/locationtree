import { Pencil, Trash2 } from "lucide-react";
import type { IProperty } from "../types/listing";
import { formatDate } from "../../lib/utils";

interface IPropertyListing {
  data: IProperty[];
}

const PropertyListing: React.FC<IPropertyListing> = ({ data }) => {
  const onDelete = () => {};
  if (data?.length < 1) return;
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold text-foreground capitalize tracking-wider">
        Your properties ({data?.length})
      </h2>
      {data.map((l, i: number) => (
        <ListingRow onDelete={onDelete} key={i} property={l} />
      ))}
    </section>
  );
};

const ListingRow: React.FC<{
  property: IProperty;
  onDelete: () => void;
}> = ({ property, onDelete }) => {
  const onEdit = () => {};
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-4">
      <img
        src={property.images[0]}
        alt={property.title}
        className="h-16 w-16 rounded-2xl object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">
          {property.title}
        </p>
        <p className="text-[11px] text-muted-foreground">
          {property.location} · {property.guest_capacity} guests · $
          {property.price}/{property.price}
          {property.start_date && property.end_date
            ? ` · ${formatDate(property.start_date as any)} → ${formatDate(property.end_date as any)}`
            : ""}
        </p>
      </div>
      <button
        onClick={onEdit}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-muted transition-colors cursor-pointer"
        aria-label="Edit listing"
      >
        <Pencil className="h-4 w-4 text-foreground" />
      </button>
      <button
        onClick={onDelete}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
        aria-label="Delete listing"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PropertyListing;
