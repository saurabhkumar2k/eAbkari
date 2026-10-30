import React, { useEffect, useMemo, useState } from "react";

const API_URL = "/api/Dashboard/BrandList";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f5f8",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: "#1f2937",
  },
  container: { maxWidth: 1500, margin: "0 auto", padding: "24px 22px 48px" },
  card: {
    background: "#fff",
    border: "1px solid #e7e9ee",
    borderRadius: 10,
    padding: 16,
  },
  field: { display: "flex", flexDirection: "column", gap: 5, flex: "1 1 190px", minWidth: 170 },
  label: { fontSize: 11, color: "#6b7280", fontWeight: 600 },
  control: {
    width: "100%",
    height: 38,
    padding: "0 10px",
    background: "#fff",
    border: "1px solid #d9dce3",
    borderRadius: 6,
    fontSize: 13,
    color: "#1f2430",
    boxSizing: "border-box",
  },
  button: {
    height: 38,
    padding: "0 15px",
    border: "1px solid #d9dce3",
    background: "#fff",
    borderRadius: 6,
    fontSize: 13,
    cursor: "pointer",
    color: "#1f2430",
  },
  th: {
    padding: "12px 14px",
    textAlign: "left",
    fontSize: 12,
    fontWeight: 700,
    whiteSpace: "nowrap",
    userSelect: "none",
  },
  td: { padding: "11px 14px", fontSize: 13, color: "#1f2937", verticalAlign: "middle" },
};

function clean(value) {
  if (value === null || value === undefined) return "";
  return String(value).replace(/\s+/g, " ").trim();
}

function toNumber(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const parsed = Number(String(value ?? "").replace(/,/g, "").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function extractRows(raw) {
  // Supports a direct JSON array and common ASP.NET response wrappers.
  let data = raw;

  if (data?.d !== undefined) {
    data = typeof data.d === "string" ? JSON.parse(data.d) : data.d;
  }

  if (typeof data === "string") {
    data = JSON.parse(data);
  }

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.Data)) return data.Data;
  if (Array.isArray(data?.details)) return data.details;
  if (Array.isArray(data?.Details)) return data.Details;
  if (Array.isArray(data?.result)) return data.result;
  if (Array.isArray(data?.Result)) return data.Result;

  throw new Error("The BrandList API response did not contain a data array.");
}

function normalizeRecord(record, index) {
  return {
    id: `${clean(record.brand_Name ?? record.Brand_Name)}-${clean(record.measure ?? record.Measure)}-${index}`,
    Brand_Name: clean(record.brand_Name ?? record.Brand_Name),
    Liquor_Type_Desc: clean(record.liquor_Type_Desc ?? record.Liquor_Type_Desc),
    Measure: clean(record.measure ?? record.Measure),
    Excise_Duty: toNumber(record.excisE_DUTY_PER_UNIT ?? record.Excise_Duty ?? record.excise_Duty_Per_Unit),
    Retail_Margin: toNumber(record.retaiL_MARGIN_PER_UNIT ?? record.Retail_Margin ?? record.retail_Margin_Per_Unit),
  };
}

function formatCurrency(value) {
  return `₹${toNumber(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function uniqueSorted(rows, field) {
  return [...new Set(rows.map((row) => row[field]).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );
}

function StatCard({ icon, label, value, subtitle }) {
  return (
    <div style={{ ...styles.card, flex: "1 1 190px", minWidth: 165 }}>
      <div style={{ fontSize: 21, marginBottom: 8 }}>{icon}</div>
      <div style={{ color: "#0d1b3e", fontSize: 25, fontWeight: 750, lineHeight: 1.2 }}>
        {value}
      </div>
      <div style={{ fontSize: 12, fontWeight: 650, marginTop: 6 }}>{label}</div>
      {subtitle && <div style={{ color: "#9aa0ab", fontSize: 11, marginTop: 3 }}>{subtitle}</div>}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: "#eeedfe",
        color: "#3c3489",
        fontSize: 11.5,
        padding: "4px 9px",
        borderRadius: 12,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {children || "—"}
    </span>
  );
}

function LoadingState() {
  return (
    <div style={{ ...styles.page, display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 42,
            height: 42,
            border: "4px solid #e7e9ee",
            borderTopColor: "#3c3489",
            borderRadius: "50%",
            animation: "liquor-price-spin .8s linear infinite",
            margin: "0 auto 14px",
          }}
        />
        <div style={{ fontWeight: 700, color: "#0d1b3e" }}>Loading brand list...</div>
        <div style={{ fontSize: 12, color: "#9aa0ab", marginTop: 5 }}>Please wait while records are fetched.</div>
      </div>
      <style>{`@keyframes liquor-price-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div style={{ ...styles.page, display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ ...styles.card, maxWidth: 520, textAlign: "center", borderColor: "#fecaca" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>⚠️</div>
        <h3 style={{ margin: "0 0 8px", color: "#0d1b3e" }}>Unable to load brand list</h3>
        <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.5 }}>{message}</p>
        <button onClick={onRetry} style={{ ...styles.button, background: "#0d1b3e", color: "#fff", borderColor: "#0d1b3e" }}>
          Retry
        </button>
      </div>
    </div>
  );
}

function SortHeader({ label, column, sortColumn, sortDirection, onSort, align = "left" }) {
  const active = sortColumn === column;
  return (
    <th
      onClick={() => onSort(column)}
      aria-sort={active ? (sortDirection === "asc" ? "ascending" : "descending") : "none"}
      style={{ ...styles.th, textAlign: align, cursor: "pointer" }}
      title={`Sort by ${label}`}
    >
      {label} {active ? (sortDirection === "asc" ? "▲" : "▼") : "↕"}
    </th>
  );
}

export default function LiquorPriceList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [brand, setBrand] = useState("ALL");
  const [liquorType, setLiquorType] = useState("ALL");
  const [measure, setMeasure] = useState("ALL");
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState("Brand_Name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      const contentType = response.headers.get("content-type") || "";
      const responseText = await response.text();

      console.log("BrandList API URL:", response.url);
      console.log("BrandList HTTP status:", response.status);
      console.log("BrandList content type:", contentType);
      console.log("BrandList response preview:", responseText.slice(0, 300));

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${responseText.slice(0, 250) || response.statusText}`);
      }

      if (!contentType.toLowerCase().includes("json")) {
        throw new Error(
          `Expected a JSON response but received ${contentType || "an unknown content type"}. Check the API proxy and endpoint.`
        );
      }

      const raw = JSON.parse(responseText);
      const rows = extractRows(raw).map(normalizeRecord);
      setRecords(rows);
      setPage(1);
    } catch (err) {
      console.error("BrandList fetch error:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const brandOptions = useMemo(() => uniqueSorted(records, "Brand_Name"), [records]);
  const typeOptions = useMemo(() => uniqueSorted(records, "Liquor_Type_Desc"), [records]);
  const measureOptions = useMemo(() => uniqueSorted(records, "Measure"), [records]);

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return records.filter((row) => {
      if (brand !== "ALL" && row.Brand_Name !== brand) return false;
      if (liquorType !== "ALL" && row.Liquor_Type_Desc !== liquorType) return false;
      if (measure !== "ALL" && row.Measure !== measure) return false;

      if (query) {
        const searchable = [
          row.Brand_Name,
          row.Liquor_Type_Desc,
          row.Measure,
          row.Excise_Duty,
          row.Retail_Margin,
        ].join(" ").toLocaleLowerCase();
        if (!searchable.includes(query)) return false;
      }
      return true;
    });
  }, [records, brand, liquorType, measure, search]);

  const sorted = useMemo(() => {
    const result = [...filtered];
    result.sort((a, b) => {
      const left = a[sortColumn];
      const right = b[sortColumn];
      const comparison =
        typeof left === "number" && typeof right === "number"
          ? left - right
          : String(left ?? "").localeCompare(String(right ?? ""), undefined, { sensitivity: "base" });
      return sortDirection === "asc" ? comparison : -comparison;
    });
    return result;
  }, [filtered, sortColumn, sortDirection]);

  const stats = useMemo(() => {
    const count = filtered.length;
    const avgExcise = count ? filtered.reduce((sum, row) => sum + row.Excise_Duty, 0) / count : 0;
    const avgMargin = count ? filtered.reduce((sum, row) => sum + row.Retail_Margin, 0) / count : 0;

    return {
      records: count,
      brands: new Set(filtered.map((row) => row.Brand_Name)).size,
      types: new Set(filtered.map((row) => row.Liquor_Type_Desc)).size,
      avgExcise,
      avgMargin,
    };
  }, [filtered]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / rowsPerPage));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * rowsPerPage;
  const pageRows = sorted.slice(start, start + rowsPerPage);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const resetFilters = () => {
    setBrand("ALL");
    setLiquorType("ALL");
    setMeasure("ALL");
    setSearch("");
    setPage(1);
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={fetchData} />;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ margin: 0, color: "#0d1b3e", fontSize: 23, fontWeight: 750 }}>
            Liquor Brand List
          </h2>
          <p style={{ margin: "5px 0 0", color: "#6b7280", fontSize: 12.5 }}>
            Brand details, pack sizes, excise duty and retail margin
          </p>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 18 }}>
          <StatCard icon="📋" label="Total Records" value={stats.records.toLocaleString("en-IN")} />
          <StatCard icon="🏷️" label="Unique Brands" value={stats.brands.toLocaleString("en-IN")} />
          <StatCard icon="🍾" label="Liquor Types" value={stats.types.toLocaleString("en-IN")} />
          <StatCard icon="₹" label="Average Excise Duty" value={formatCurrency(stats.avgExcise)} subtitle="Per unit, filtered records" />
          <StatCard icon="₹" label="Average Retail Margin" value={formatCurrency(stats.avgMargin)} subtitle="Per unit, filtered records" />
        </div>

        <div
          style={{
            ...styles.card,
            display: "flex",
            gap: 12,
            alignItems: "flex-end",
            flexWrap: "wrap",
            marginBottom: 18,
          }}
        >
          <div style={styles.field}>
            <label style={styles.label} htmlFor="brand-filter">Brand Name</label>
            <select id="brand-filter" style={styles.control} value={brand} onChange={(e) => { setBrand(e.target.value); setPage(1); }}>
              <option value="ALL">All Brands</option>
              {brandOptions.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="type-filter">Liquor Type</label>
            <select id="type-filter" style={styles.control} value={liquorType} onChange={(e) => { setLiquorType(e.target.value); setPage(1); }}>
              <option value="ALL">All Types</option>
              {typeOptions.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="measure-filter">Measure</label>
            <select id="measure-filter" style={styles.control} value={measure} onChange={(e) => { setMeasure(e.target.value); setPage(1); }}>
              <option value="ALL">All Measures</option>
              {measureOptions.map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="brand-search">Search</label>
            <input
              id="brand-search"
              style={styles.control}
              type="search"
              placeholder="Search brand, type or measure..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>

          <button type="button" style={styles.button} onClick={resetFilters}>↻ Reset</button>
          <button
            type="button"
            style={{ ...styles.button, background: "#0d1b3e", color: "#fff", borderColor: "#0d1b3e" }}
            onClick={fetchData}
          >
            Refresh
          </button>
        </div>

        <div style={{ ...styles.card, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "15px 16px", borderBottom: "1px solid #e7e9ee", display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <div>
              <div style={{ color: "#0d1b3e", fontSize: 14, fontWeight: 750 }}>Brand Price Details</div>
              <div style={{ color: "#9aa0ab", fontSize: 11.5, marginTop: 3 }}>
                {filtered.length.toLocaleString("en-IN")} matching records
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6b7280" }}>
              <label htmlFor="rows-per-page">Rows per page</label>
              <select
                id="rows-per-page"
                value={rowsPerPage}
                onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
                style={{ height: 32, border: "1px solid #d9dce3", borderRadius: 5, padding: "0 7px", background: "#fff" }}
              >
                {[10, 25, 50, 100, 200].map((number) => <option key={number} value={number}>{number}</option>)}
              </select>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", minWidth: 850, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#0d1b3e", color: "#fff" }}>
                  <th style={{ ...styles.th, width: 65 }}>S.No.</th>
                  <SortHeader label="Brand Name" column="Brand_Name" sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
                  <SortHeader label="Liquor Type" column="Liquor_Type_Desc" sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
                  <SortHeader label="Measure" column="Measure" sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
                  <SortHeader label="Excise Duty / Unit" column="Excise_Duty" sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} align="right" />
                  <SortHeader label="Retail Margin / Unit" column="Retail_Margin" sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} align="right" />
                </tr>
              </thead>
              <tbody>
                {pageRows.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ ...styles.td, textAlign: "center", padding: 42, color: "#9aa0ab" }}>
                      No records match the selected filters.
                    </td>
                  </tr>
                ) : (
                  pageRows.map((row, index) => (
                    <tr key={row.id} style={{ background: index % 2 === 0 ? "#fff" : "#f8f9fb", borderBottom: "1px solid #eef0f3" }}>
                      <td style={{ ...styles.td, color: "#9aa0ab", width: 65 }}>{start + index + 1}</td>
                      <td style={{ ...styles.td, maxWidth: 380, whiteSpace: "normal", fontWeight: 600 }}>{row.Brand_Name || "—"}</td>
                      <td style={styles.td}><Pill>{row.Liquor_Type_Desc}</Pill></td>
                      <td style={{ ...styles.td, whiteSpace: "nowrap" }}>{row.Measure || "—"}</td>
                      <td style={{ ...styles.td, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{formatCurrency(row.Excise_Duty)}</td>
                      <td style={{ ...styles.td, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{formatCurrency(row.Retail_Margin)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", fontSize: 12.5, color: "#6b7280", flexWrap: "wrap", gap: 10, borderTop: "1px solid #e7e9ee" }}>
            <div>
              Showing {sorted.length === 0 ? 0 : start + 1}–{Math.min(start + rowsPerPage, sorted.length)} of {sorted.length.toLocaleString("en-IN")}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <button type="button" style={styles.button} disabled={safePage === 1} onClick={() => setPage(1)}>«</button>
              <button type="button" style={styles.button} disabled={safePage === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>‹ Prev</button>
              <span style={{ padding: "0 9px", color: "#0d1b3e", fontWeight: 700 }}>{safePage} / {totalPages}</span>
              <button type="button" style={styles.button} disabled={safePage === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>Next ›</button>
              <button type="button" style={styles.button} disabled={safePage === totalPages} onClick={() => setPage(totalPages)}>»</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
