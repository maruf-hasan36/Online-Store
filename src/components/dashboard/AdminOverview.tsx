"use client";

import { useEffect, useState } from "react";
import { getAdminStats } from "@/lib/api/product";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import {
  Package,
  Users,
  ShieldCheck,
  UserX,
  TrendingUp,
  DollarSign,
  Loader2,
  ArrowUpRight,
  Circle,
} from "lucide-react";

// ── Design tokens ─────────────────────────────────────────────────────────────
// Warm graphite ink on a cool paper background, with the brand orange kept as
// the single hot accent so every other colour reads as quietly supportive.
const INK = "#14151A";
const PAPER = "#FAFAFA";
const PIE_COLORS = [
  "#F26E21",
  "#2D2E35",
  "#5B5FEF",
  "#0EA872",
  "#F5A623",
  "#5B8DEF",
  "#E5484D",
  "#B565D8",
];

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent = "orange",
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  accent?: "orange" | "indigo" | "green" | "red";
}) {
  const accentMap = {
    orange: { bar: "#F26E21", bg: "#FFF1E8", fg: "#C7530F" },
    indigo: { bar: "#5B5FEF", bg: "#EEEEFE", fg: "#4142C4" },
    green: { bar: "#0EA872", bg: "#E8F8F1", fg: "#0A7C55" },
    red: { bar: "#E5484D", bg: "#FDEBEC", fg: "#C33338" },
  }[accent];

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_2px_rgba(20,21,26,0.04),0_10px_28px_-14px_rgba(20,21,26,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(20,21,26,0.05),0_18px_36px_-16px_rgba(20,21,26,0.22)]">
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: accentMap.bar }}
      />
      <div className="p-6 pt-7 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/40">
            {label}
          </p>
          <p
            className="mt-2 text-[28px] font-semibold leading-none tracking-tight"
            style={{ color: INK, fontVariantNumeric: "tabular-nums" }}
          >
            {value}
          </p>
          {sub && <p className="mt-2 text-[13px] text-black/45">{sub}</p>}
        </div>
        <div
          className="shrink-0 grid place-items-center h-11 w-11 rounded-xl"
          style={{ background: accentMap.bg, color: accentMap.fg }}
        >
          <Icon size={20} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

// ── Section shell ─────────────────────────────────────────────────────────────
function Panel({
  eyebrow,
  title,
  icon: Icon,
  accentColor,
  children,
  empty,
}: {
  eyebrow: string;
  title: string;
  icon: React.ElementType;
  accentColor: string;
  children: React.ReactNode;
  empty?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_2px_rgba(20,21,26,0.04),0_10px_28px_-14px_rgba(20,21,26,0.12)] p-6">
      <div className="flex items-center gap-2.5 mb-0.5">
        <div
          className="grid place-items-center h-7 w-7 rounded-lg"
          style={{ background: `${accentColor}14`, color: accentColor }}
        >
          <Icon size={14} strokeWidth={2.5} />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/40">
          {eyebrow}
        </p>
      </div>
      <h3
        className="text-[15px] font-semibold mt-2 mb-5"
        style={{ color: INK }}
      >
        {title}
      </h3>
      {empty ? (
        <div className="flex h-48 items-center justify-center text-sm text-black/30">
          Nothing to show yet
        </div>
      ) : (
        children
      )}
    </div>
  );
}

// ── Custom Tooltip ────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#14151A] rounded-xl shadow-xl px-4 py-3 text-sm">
      <p className="font-semibold text-white/50 text-[11px] uppercase tracking-wide mb-1.5">
        {label}
      </p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="font-medium text-white flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: p.color }}
          />
          {p.name}: <span className="font-semibold">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function AdminOverview() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAdminStats()
      .then((res) => {
        if (res?.success) setStats(res.data);
        else setError("Failed to load dashboard stats.");
      })
      .catch(() => setError("Could not connect to the server."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center gap-3 text-black/40">
        <Loader2
          className="h-5 w-5 animate-spin"
          style={{ color: "#F26E21" }}
        />
        <span className="text-sm font-medium">Loading dashboard…</span>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-1">
        <p className="text-red-500 font-semibold text-sm">
          {error || "No data available."}
        </p>
        <p className="text-black/35 text-xs">Try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" style={{ background: PAPER, color: INK }}>
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ background: "#0EA872" }}
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ background: "#0EA872" }}
              />
            </span>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/40">
              Live overview
            </p>
          </div>
          <h1
            className="text-[26px] font-semibold tracking-tight mt-1.5"
            style={{ color: INK }}
          >
            Admin Overview
          </h1>
          <p className="text-sm text-black/45 mt-1">
            Platform-wide analytics and insights, updated in real time.
          </p>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Products"
          value={stats.totalProducts.toLocaleString()}
          sub="All listings on the platform"
          icon={Package}
          accent="orange"
        />
        <StatCard
          label="Total Users"
          value={stats.totalUsers.toLocaleString()}
          sub={`${stats.activeUsers} active users`}
          icon={Users}
          accent="indigo"
        />
        <StatCard
          label="Admin Users"
          value={stats.adminUsers.toLocaleString()}
          sub="With admin privileges"
          icon={ShieldCheck}
          accent="green"
        />
        <StatCard
          label="Blocked Users"
          value={stats.blockedUsers.toLocaleString()}
          sub="Suspended accounts"
          icon={UserX}
          accent="red"
        />
      </div>

      {/* ── Charts row 1 ── */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Monthly products added */}
        <Panel
          eyebrow="Growth"
          title="Products added — last 6 months"
          icon={TrendingUp}
          accentColor="#F26E21"
          empty={stats.monthlyProducts.length === 0}
        >
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart
              data={stats.monthlyProducts}
              margin={{ top: 5, right: 12, left: -12, bottom: 0 }}
            >
              <defs>
                <linearGradient id="productsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F26E21" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="#F26E21" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#F0F0F1"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#9A9DA6" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9A9DA6" }}
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="products"
                name="Products"
                stroke="#F26E21"
                strokeWidth={2.5}
                fill="url(#productsFill)"
                dot={{ fill: "#F26E21", r: 3.5, strokeWidth: 0 }}
                activeDot={{ r: 5.5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        {/* Category breakdown pie */}
        <Panel
          eyebrow="Composition"
          title="Products by category"
          icon={Package}
          accentColor="#5B5FEF"
          empty={stats.categoryBreakdown.length === 0}
        >
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={stats.categoryBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={90}
                dataKey="value"
                nameKey="name"
                paddingAngle={3}
                stroke="none"
              >
                {stats.categoryBreakdown.map((_: any, index: number) => (
                  <Cell
                    key={index}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any, name: any) => [
                  `${value} products`,
                  name,
                ]}
                content={<CustomTooltip />}
              />
              <Legend
                iconType="circle"
                iconSize={7}
                wrapperStyle={{ fontSize: "12px", color: "#5B5E68" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      {/* ── Charts row 2 ── */}
      <Panel
        eyebrow="Pricing"
        title="Average price by category"
        icon={DollarSign}
        accentColor="#0EA872"
        empty={stats.avgPriceByCategory.length === 0}
      >
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={stats.avgPriceByCategory}
            margin={{ top: 5, right: 12, left: -12, bottom: 0 }}
            barCategoryGap="32%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#F0F0F1"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#9A9DA6" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#9A9DA6" }}
              tickFormatter={(v) => `$${v}`}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip
              content={<CustomTooltip />}
              formatter={(v: any) => [
                `$${Number(v).toLocaleString()}`,
                "Avg Price",
              ]}
            />
            <Bar
              dataKey="avgPrice"
              name="Avg Price"
              fill="#0EA872"
              radius={[8, 8, 0, 0]}
              maxBarSize={44}
            />
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      {/* ── User status breakdown ── */}
      <div className="rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_2px_rgba(20,21,26,0.04),0_10px_28px_-14px_rgba(20,21,26,0.12)] p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div
            className="grid place-items-center h-7 w-7 rounded-lg"
            style={{ background: "#F26E2114", color: "#F26E21" }}
          >
            <Users size={14} strokeWidth={2.5} />
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/40">
            Distribution
          </p>
        </div>
        <h3
          className="text-[15px] font-semibold -mt-4 mb-5"
          style={{ color: INK }}
        >
          User status breakdown
        </h3>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              label: "Active Users",
              count: stats.activeUsers,
              color: "#0EA872",
            },
            {
              label: "Blocked Users",
              count: stats.blockedUsers,
              color: "#E5484D",
            },
            { label: "Admin Users", count: stats.adminUsers, color: "#5B5FEF" },
          ].map((item) => {
            const pct = stats.totalUsers
              ? Math.round((item.count / stats.totalUsers) * 100)
              : 0;
            return (
              <div key={item.label}>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[13px] font-medium text-black/60">
                    {item.label}
                  </span>
                  <span
                    className="text-[15px] font-semibold"
                    style={{ color: INK, fontVariantNumeric: "tabular-nums" }}
                  >
                    {pct}%
                  </span>
                </div>
                <div className="h-[6px] bg-black/[0.05] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: item.color,
                      transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                </div>
                <p className="text-xs text-black/40 mt-1.5">
                  {item.count.toLocaleString()} users
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
