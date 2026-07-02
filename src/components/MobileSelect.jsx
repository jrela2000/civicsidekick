import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Check, ChevronDown } from "lucide-react";

/**
 * MobileSelect — renders as a native-feeling bottom sheet on mobile,
 * replacing <select> / popover-based dropdowns for better Android UX.
 *
 * Props:
 *   value        — current selected value
 *   onChange     — (value) => void
 *   options      — [{ value, label }]
 *   placeholder  — string shown when nothing selected
 *   label        — optional string for the drawer title
 */
export default function MobileSelect({ value, onChange, options = [], placeholder = "Select…", label }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-between w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <span className={selected ? "text-foreground" : "text-muted-foreground"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
      </button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          {label && (
            <DrawerHeader>
              <DrawerTitle>{label}</DrawerTitle>
            </DrawerHeader>
          )}
          <div className="px-4 pb-6 space-y-1" style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}>
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
                  opt.value === value
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {opt.label}
                {opt.value === value && <Check className="w-4 h-4 shrink-0" />}
              </button>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}