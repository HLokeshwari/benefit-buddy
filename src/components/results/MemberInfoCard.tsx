import { User, FileText, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MemberInfo {
  memberId: string;
  name: string;
  planName: string;
  planType: string;
}

interface MemberInfoCardProps {
  member: MemberInfo;
  onChangeMember?: () => void;
}

export function MemberInfoCard({ member, onChangeMember }: MemberInfoCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-medium text-foreground">{member.name}</p>
          <p className="text-xs text-muted-foreground">ID: {member.memberId}</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span>{member.planName}</span>
        </div>
        <div className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
          {member.planType}
        </div>
      </div>
      {onChangeMember && (
        <Button
          variant="outline"
          size="sm"
          onClick={onChangeMember}
          className="mt-4 w-full gap-2"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Change Member
        </Button>
      )}
    </div>
  );
}
