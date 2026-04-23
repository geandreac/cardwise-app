import { Topbar } from "./_components/Topbar";
import { KpiCards } from "./_components/Kpicards";
import { LimitProgress } from "./_components/LimitProgress";
import { CardsList } from "./_components/CardsList";
import { CategoryList } from "./_components/CategoryList";
import { TransactionList } from "./_components/TransactionList";
import { AlertsList } from "./_components/AlertsList";

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
      <Topbar title="Visão geral" />
      <div className="flex flex-col gap-2.5 p-5">
        <KpiCards />
        <LimitProgress />
        <div className="grid grid-cols-2 gap-2.5">
          <CardsList />
          <CategoryList />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <TransactionList />
          <AlertsList />
        </div>
      </div>
    </div>
  );
}