import React, { useState, useEffect, useRef } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { getLiquorCategories, getLiquorTypes } from "../../../../api/permitApi";

// ---- Same shape/case-agnostic helpers ----
const pickByPattern = (item, patterns) => {
  const keys = Object.keys(item || {});
  for (const pattern of patterns) {
    const found = keys.find((k) => pattern.test(k));
    if (found && item[found] !== null && item[found] !== undefined) {
      return item[found];
    }
  }
  return undefined;
};

const normalizeOption = (item) => {
  if (item === null || typeof item !== "object") {
    return { code: String(item ?? "").trim(), name: String(item ?? "").trim() };
  }
  const codeKey = (() => {
    const keys = Object.keys(item);
    const codeLike = keys.filter((k) => /code/i.test(k));
    if (codeLike.length > 0) return codeLike[0];

    const patterns = [/^id$/i, /^value$/i, /id$/i];
    for (const p of patterns) {
      const found = keys.find((k) => p.test(k));
      if (found) return found;
    }
    return undefined;
  })();
  const code = codeKey ? item[codeKey] : undefined;

  let name = pickByPattern(item, [
    /^name$/i, /^label$/i, /name$/i, /label$/i,
    /^desc/i, /desc$/i, /^title$/i, /title$/i, /^text$/i
  ]);

  if (!name) {
    const fallbackKey = Object.keys(item).find(
      (k) => k !== codeKey && typeof item[k] === "string" && item[k].trim() !== ""
    );
    if (fallbackKey) name = item[fallbackKey];
  }

  let codeStr = String(code ?? "").trim();
  if (/^\d$/.test(codeStr)) {
    codeStr = codeStr.padStart(2, "0");
  }

  return { code: codeStr, name: String(name ?? "").trim(), raw: item };
};

const extractList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    for (const key of ["data", "Data", "result", "Result", "items", "Items", "list", "List"]) {
      if (Array.isArray(payload[key])) return payload[key];
    }
    const firstArray = Object.values(payload).find((v) => Array.isArray(v));
    if (firstArray) return firstArray;
  }
  return [];
};

export default function LiquorDetailsPage({ formData, onChange, errors = {}, showToast, onNextStep }) {
  const nextIdRef = useRef(1);
  const isInitialMount = useRef(true);

  const [liquorItems, setLiquorItems] = useState(() => {
    if (formData.liquorItems && formData.liquorItems.length > 0) {
      const maxId = Math.max(...formData.liquorItems.map((i) => i.id || 0), 0);
      nextIdRef.current = maxId + 1;
      return formData.liquorItems;
    }
    return [
      {
        id: nextIdRef.current++,
        liquorType: "",
        liquorCategory: "",
        bottleSize: "",
        quantity: "",
      },
    ];
  });

  const [liquorCategories, setLiquorCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [typesByKind, setTypesByKind] = useState({});
  const [loadingKindCodes, setLoadingKindCodes] = useState(() => new Set());
  const [rowErrors, setRowErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch liquor categories
  useEffect(() => {
    let isCancelled = false;

    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await getLiquorCategories();
        if (isCancelled) return;
        const list = extractList(response.data);
        if (list.length === 0) {
          console.warn("getLiquorCategories() returned no array — raw response:", response.data);
        }
        const normalized = list.map(normalizeOption);

        const filtered = normalized.filter(
          (x) =>
            x.name &&
            (
              x.name.toLowerCase() === "indian liquor" ||
              x.name.toLowerCase() === "foreign liquor"
            )
        );

        if (list.length > 0 && filtered.length === 0) {
          console.log("Available Categories:", normalized);
        }

        setLiquorCategories(filtered);
      } catch (error) {
        console.error("Failed to fetch liquor categories:", error);
        if (showToast) showToast("Failed to load liquor category list", "error");
      } finally {
        if (!isCancelled) setLoadingCategories(false);
      }
    };

    fetchCategories();
    return () => {
      isCancelled = true;
    };
  }, [showToast]);

  // Fetch liquor types for a specific category
  const ensureTypesLoaded = async (kindCode) => {
    if (!kindCode || typesByKind[kindCode]) return;

    setLoadingKindCodes((prev) => new Set(prev).add(kindCode));
    try {
      const response = await getLiquorTypes(kindCode);
      const list = extractList(response.data);
      if (list.length === 0) {
        console.warn(
          `getLiquorTypes("${kindCode}") returned no array — raw response:`,
          response.data
        );
      }
      const normalized = list.map(normalizeOption);

      if (list.length > 0 && normalized.every((t) => !t.name)) {
        console.warn("Liquor types loaded but every name came back blank — raw sample:", list[0]);
      }
      setTypesByKind((prev) => ({ ...prev, [kindCode]: normalized }));
    } catch (error) {
      console.error(`Failed to fetch liquor types for kindCode "${kindCode}":`, error);
      if (showToast) showToast("Failed to load liquor type list", "error");
    } finally {
      setLoadingKindCodes((prev) => {
        const next = new Set(prev);
        next.delete(kindCode);
        return next;
      });
    }
  };

  const getTypesForCategory = (categoryCode) => {
    if (!categoryCode) return [];
    return typesByKind[categoryCode] || [];
  };

  const isTypeLoadingForCategory = (categoryCode) => {
    if (!categoryCode) return false;
    return loadingKindCodes.has(categoryCode);
  };

  // Keep parent state updated
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      updateParentState();
      return;
    }
    if (!isUpdating) {
      updateParentState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liquorItems]);

  const updateParentState = () => {
    setIsUpdating(true);

    onChange("liquorItems", liquorItems);

    const totalQtyImfl = liquorItems
      .filter((item) => {
        const cat = (item.liquorCategory || "").toLowerCase();
        return cat.includes("imfl") || cat.includes("indian");
      })
      .reduce((sum, item) => sum + Number(item.quantity || 0), 0);

    const totalQtyImported = liquorItems
      .filter((item) => {
        const cat = (item.liquorCategory || "").toLowerCase();
        return (
          cat.includes("imported") ||
          cat.includes("foreign") ||
          cat.includes("ifl") ||
          cat.includes("passport")
        );
      })
      .reduce((sum, item) => sum + Number(item.quantity || 0), 0);

    const totalQtyBeerWine = liquorItems
      .filter((item) => {
        const cat = (item.liquorCategory || "").toLowerCase();
        return cat.includes("beer") || cat.includes("wine") || cat.includes("champagne");
      })
      .reduce((sum, item) => sum + Number(item.quantity || 0), 0);

    const totalEstimatedCost = liquorItems.reduce(
      (sum, item) => sum + Number(item.quantity || 0) * 1500,
      0
    );

    onChange("qtyImfl", totalQtyImfl || "0");
    onChange("qtyImported", totalQtyImported || "0");
    onChange("qtyBeerWine", totalQtyBeerWine || "0");
    onChange("estimatedCost", totalEstimatedCost || "0");

    const brandsString = liquorItems
      .map((item) => (item.liquorType ? `${item.liquorType} (${item.bottleSize}ml)` : ""))
      .filter(Boolean)
      .join(", ");
    onChange("brandsToServe", brandsString || "None specified");

    setTimeout(() => setIsUpdating(false), 0);
  };

  const handleRowChange = (id, field, value) => {
    setLiquorItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === "liquorCategory") {
          updated.liquorType = "";
          if (value) ensureTypesLoaded(value);
        }
        return updated;
      })
    );

    setRowErrors((prev) => {
      if (!prev[id] || !prev[id][field]) return prev;
      const updated = { ...prev };
      const rowErrs = { ...updated[id] };
      delete rowErrs[field];
      if (Object.keys(rowErrs).length === 0) {
        delete updated[id];
      } else {
        updated[id] = rowErrs;
      }
      return updated;
    });
  };

  const handleAddRow = () => {
    const newRow = {
      id: nextIdRef.current++,
      liquorType: "",
      liquorCategory: "",
      bottleSize: "",
      quantity: "",
    };
    setLiquorItems((prev) => [...prev, newRow]);
    if (showToast) showToast(`Row ${liquorItems.length + 1} added successfully`, "success");
  };

  const handleDeleteRow = (id) => {
    if (liquorItems.length <= 1) {
      if (showToast) showToast("At least one row of liquor inventory is mandatory", "error");
      return;
    }

    const deletedItem = liquorItems.find((item) => item.id === id);
    setLiquorItems((prev) => prev.filter((item) => item.id !== id));
    setRowErrors((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });

    if (showToast) {
      const itemName = deletedItem?.liquorType || "Row";
      showToast(`Removed "${itemName}" from inventory`, "success");
    }
  };

  // Validate and Save - FIX: Ensure numbers are properly converted
  const handleSaveAndNext = () => {
    const errorsMap = {};
    let hasError = false;

    liquorItems.forEach((item) => {
      const rowErrs = {};
      if (!item.liquorType || !String(item.liquorType).trim()) {
        rowErrs.liquorType = "Required";
        hasError = true;
      }
      if (!item.liquorCategory || !String(item.liquorCategory).trim()) {
        rowErrs.liquorCategory = "Required";
        hasError = true;
      }
      // FIX: Convert to number properly
      const bottleSize = Number(item.bottleSize);
      if (isNaN(bottleSize) || bottleSize <= 0) {
        rowErrs.bottleSize = "Size > 0 required";
        hasError = true;
      }
      const quantity = Number(item.quantity);
      if (isNaN(quantity) || quantity <= 0) {
        rowErrs.quantity = "Qty > 0 required";
        hasError = true;
      }
      if (Object.keys(rowErrs).length > 0) {
        errorsMap[item.id] = rowErrs;
      }
    });

    if (hasError) {
      setRowErrors(errorsMap);
      if (showToast) showToast("Please check & complete all liquor detail fields before moving forward.", "error");
      return;
    }

    // FIX: Ensure all numeric values are properly converted before sending
    const cleanedItems = liquorItems.map(item => ({
      ...item,
      bottleSize: Number(item.bottleSize) || 0,
      quantity: Number(item.quantity) || 0
    }));

    // Update with cleaned data
    onChange("liquorItems", cleanedItems);
    setRowErrors({});
    
    if (showToast) showToast("Liquor inventory verified & saved successfully", "success");
    if (onNextStep) onNextStep();
  };

  return (
    <div className="space-y-6 animate-fade select-none">
      <div className="w-full bg-[#0a3861] text-white py-2.5 px-4 text-center text-sm font-black rounded-lg uppercase tracking-wider mb-2">
        Liquor Details
      </div>

      <div className="space-y-4 text-left">
        <div className="hidden md:flex items-center gap-3 px-1">
          <div className="flex-1 min-w-[160px] text-xs font-bold text-slate-700 uppercase tracking-wide">
            Liquor Category {loadingCategories && <Loader2 className="inline w-3 h-3 animate-spin ml-1" />}
          </div>
          <div className="flex-1 min-w-[160px] text-xs font-bold text-slate-700 uppercase tracking-wide">
            Liquor Type
          </div>
          <div className="w-[130px] text-xs font-bold text-slate-700 uppercase tracking-wide">
            Bottle Size (ml)
          </div>
          <div className="w-[130px] text-xs font-bold text-slate-700 uppercase tracking-wide">
            Quantity (Bottles)
          </div>
          <div className="w-[44px]" />
        </div>

        <div className="space-y-3">
          {liquorItems.map((item, index) => {
            const currentErrors = rowErrors[item.id] || {};
            const typeOptions = getTypesForCategory(item.liquorCategory);
            const typesLoading = isTypeLoadingForCategory(item.liquorCategory);

            return (
              <div
                key={item.id}
                className="border border-slate-300 rounded-xl overflow-hidden shadow-xs bg-white"
              >
                <div className="bg-[#133c5c] text-white text-xs font-bold uppercase py-2 px-4 flex justify-between items-center md:hidden">
                  <span>Liquor Item #{index + 1}</span>
                </div>

                <div className="p-3 md:p-4 flex flex-wrap md:flex-nowrap items-start gap-3">
                  {/* Liquor Category */}
                  <div className="flex-1 min-w-[160px] space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide md:hidden">
                      Category
                    </label>
                    <select
                      className={`w-full bg-slate-50/50 border rounded-lg px-3 py-2.5 text-xs font-bold text-slate-800 transition ${
                        currentErrors.liquorCategory
                          ? "border-red-500 bg-red-50/10"
                          : "border-slate-250 focus:border-blue-500 focus:bg-white"
                      }`}
                      value={item.liquorCategory || ""}
                      onChange={(e) => handleRowChange(item.id, "liquorCategory", e.target.value)}
                    >
                      <option value="">--Select Category--</option>
                      {/* FIX: Unique keys with prefix and index */}
                      {liquorCategories.map((c, i) => (
                        <option 
                          key={`category-${c.code || 'no-code'}-${i}`} 
                          value={c.code}
                        >
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {currentErrors.liquorCategory && (
                      <p className="text-[11px] text-red-600 font-bold">{currentErrors.liquorCategory}</p>
                    )}
                  </div>

                  {/* Liquor Type */}
                  <div className="flex-1 min-w-[160px] space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide md:hidden">
                      Type {typesLoading && <Loader2 className="inline w-3 h-3 animate-spin ml-1" />}
                    </label>
                    <select
                      className={`w-full bg-slate-50/50 border rounded-lg px-3 py-2.5 text-xs font-bold text-slate-800 transition ${
                        currentErrors.liquorType
                          ? "border-red-500 bg-red-50/10"
                          : "border-slate-250 focus:border-blue-500 focus:bg-white"
                      }`}
                      value={item.liquorType || ""}
                      onChange={(e) => handleRowChange(item.id, "liquorType", e.target.value)}
                      disabled={!item.liquorCategory}
                    >
                      <option value="">--Select Type--</option>
                      {/* FIX: Unique keys with prefix and index */}
                      {typeOptions.map((t, i) => (
                        <option 
                          key={`type-${t.code || 'no-code'}-${i}`} 
                          value={t.name}
                        >
                          {t.name}
                        </option>
                      ))}
                    </select>
                    {currentErrors.liquorType && (
                      <p className="text-[11px] text-red-600 font-bold">{currentErrors.liquorType}</p>
                    )}
                  </div>

                  {/* Bottle Size */}
                  <div className="w-full md:w-[130px] space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide md:hidden">
                      Bottle Size (ml)
                    </label>
                    <input
                      type="number"
                      className={`w-full bg-slate-50/50 border rounded-lg px-3 py-2.5 text-xs font-mono font-bold text-slate-800 text-center transition ${
                        currentErrors.bottleSize
                          ? "border-red-500 bg-red-50/10"
                          : "border-slate-250 focus:border-blue-500 focus:bg-white"
                      }`}
                      value={item.bottleSize === "" || item.bottleSize === 0 ? "" : item.bottleSize}
                      onChange={(e) =>
                        handleRowChange(
                          item.id,
                          "bottleSize",
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                      placeholder=""
                      min="0"
                    />
                    {currentErrors.bottleSize && (
                      <p className="text-[11px] text-red-600 font-bold">{currentErrors.bottleSize}</p>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="w-full md:w-[130px] space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide md:hidden">
                      Quantity (Bottles)
                    </label>
                    <input
                      type="number"
                      className={`w-full bg-slate-50/50 border rounded-lg px-3 py-2.5 text-xs font-mono font-bold text-slate-800 text-center transition ${
                        currentErrors.quantity
                          ? "border-red-500 bg-red-50/10"
                          : "border-slate-250 focus:border-blue-500 focus:bg-white"
                      }`}
                      value={item.quantity === "" || item.quantity === 0 ? "" : item.quantity}
                      onChange={(e) =>
                        handleRowChange(
                          item.id,
                          "quantity",
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                      placeholder=""
                      min="0"
                    />
                    {currentErrors.quantity && (
                      <p className="text-[11px] text-red-600 font-bold">{currentErrors.quantity}</p>
                    )}
                  </div>

                  {/* Delete button */}
                  <div className="w-full md:w-[44px] flex md:justify-center pt-1 md:pt-0">
                    <button
                      type="button"
                      onClick={() => handleDeleteRow(item.id)}
                      disabled={liquorItems.length <= 1}
                      title={liquorItems.length <= 1 ? "At least one row is required" : "Delete this row"}
                      className={`p-2.5 rounded-lg border text-white transition cursor-pointer ${
                        liquorItems.length <= 1
                          ? "bg-gray-300 border-gray-300 cursor-not-allowed"
                          : "bg-[#dc3545] border-[#dc3545] hover:bg-red-600"
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleAddRow}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed border-slate-300 rounded-lg text-xs font-extrabold uppercase text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/40 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Liquor Item
        </button>

        <div className="flex items-center justify-end w-full pt-1">
          <button
            type="button"
            onClick={handleSaveAndNext}
            className="px-5 py-2.5 rounded-lg bg-[#28a745] hover:bg-green-600 text-white font-extrabold text-xs transition uppercase cursor-pointer"
          >
            Save & Next
          </button>
        </div>

        {liquorItems.length > 0 && (
          <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs font-bold text-slate-600">
              Total Items: {liquorItems.length} | Filled:{" "}
              {liquorItems.filter((i) => i.liquorType && i.liquorCategory).length} complete
              {liquorItems.some((item) => item.liquorType) && (
                <span className="ml-2 text-slate-500 font-normal">
                  | Brands: {liquorItems.filter((i) => i.liquorType).map((i) => i.liquorType).join(", ")}
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}