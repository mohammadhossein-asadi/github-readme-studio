import { AppShell } from "@/components/app-shell/app-shell";
import { WorkspaceProvider } from "@/components/app-shell/workspace-provider";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <WorkspaceProvider>
      <AppShell>{children}</AppShell>
    </WorkspaceProvider>
  );
}
