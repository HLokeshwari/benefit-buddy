import { FileDown, Mail, Printer } from "lucide-react";

interface ActionButtonsProps {
  onExport?: () => void;
  onEmail?: () => void;
  onPrint?: () => void;
}

export function ActionButtons({ onExport, onEmail, onPrint }: ActionButtonsProps) {
  const actions = [
    { label: "Export Summary", icon: FileDown, onClick: onExport },
    { label: "Email to Patient", icon: Mail, onClick: onEmail },
    { label: "Print", icon: Printer, onClick: onPrint },
  ];

  return (
    <div className="space-y-2">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={action.onClick}
          className="action-btn"
        >
          <action.icon className="h-4 w-4 text-primary" />
          {action.label}
        </button>
      ))}
    </div>
  );
}
