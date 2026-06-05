import React, { useState, useEffect } from "react";

export default function LiquorDetailsPage({ formData, onChange, errors = {}, showToast, onNextStep }) {
  // Initialize from formData.liquorItems if available, else start with a default row
  const [liquorItems, setLiquorItems] = useState(() => {
    if (formData.liquorItems && formData.liquorItems.length > 0) {
      return formData.liquorItems;
    }
    // Fallback default rows based on matching the previous text quantities
    return [
      {
        id: 1,
        liquorType: "WHISKY - SINGLE MALT",
        liquorCategory: "IMFL (Indian Manufactured Foreign Liquor)",
        bottleSize: 750,
        quantity: 30,
      }
    ];
  });

  // Keep parent state updated
  useEffect(() => {
    onChange("liquorItems", liquorItems);
    
    // Also synchronize legacy single-field totals for receipt and summary compatibility
    const totalQtyImfl = liquorItems
      .filter(item => {
        const cat = (item.liquorCategory || "").toLowerCase();
        return cat.includes("imfl") || cat.includes("indian");
      })
      .reduce((sum, item) => sum + Number(item.quantity || 0), 0);

    const totalQtyImported = liquorItems
      .filter(item => {
        const cat = (item.liquorCategory || "").toLowerCase();
        return cat.includes("imported") || cat.includes("foreign") || cat.includes("ifl") || cat.includes("passport");
      })
      .reduce((sum, item) => sum + Number(item.quantity || 0), 0);

    const totalQtyBeerWine = liquorItems
      .filter(item => {
        const cat = (item.liquorCategory || "").toLowerCase();
        return cat.includes("beer") || cat.includes("wine") || cat.includes("champagne");
      })
      .reduce((sum, item) => sum + Number(item.quantity || 0), 0);

    const totalEstimatedCost = liquorItems.reduce((sum, item) => sum + (Number(item.quantity || 0) * 1500), 0);

    onChange("qtyImfl", totalQtyImfl || "0");
    onChange("qtyImported", totalQtyImported || "0");
    onChange("qtyBeerWine", totalQtyBeerWine || "0");
    onChange("estimatedCost", totalEstimatedCost || "0");

    // Brands list join
    const brandsString = liquorItems
      .map(item => `${item.liquorType} (${item.bottleSize}ml)`)
      .filter(Boolean)
      .join(", ");
    onChange("brandsToServe", brandsString || "None specified");
  }, [liquorItems]);

  const handleRowChange = (index, field, value) => {
    const updated = [...liquorItems];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setLiquorItems(updated);
  };

  const handleAddRow = () => {
    const nextId = liquorItems.length > 0 ? Math.max(...liquorItems.map(i => i.id)) + 1 : 1;
    const newRow = {
      id: nextId,
      liquorType: "",
      liquorCategory: "",
      bottleSize: 0,
      quantity: 0
    };
    setLiquorItems([...liquorItems, newRow]);
    if (showToast) showToast("New liquor detail row added", "success");
  };

  const handleDeleteRow = () => {
    if (liquorItems.length > 1) {
      setLiquorItems(liquorItems.slice(0, -1));
      if (showToast) showToast("Last liquor detail row removed", "success");
    } else {
      if (showToast) {
        showToast("At least one row of liquor inventory is mandatory", "error");
      } else {
        alert("At least one row required");
      }
    }
  };

  const [rowErrors, setRowErrors] = useState({});

  const handleSaveAndNext = () => {
    // Validate rows
    const errorsMap = {};
    let hasError = false;

    liquorItems.forEach((item, index) => {
      const rowErrs = {};
      if (!item.liquorType || !item.liquorType.trim()) {
        rowErrs.liquorType = "Liquor type is required";
        hasError = true;
      }
      if (!item.liquorCategory || !item.liquorCategory.trim()) {
        rowErrs.liquorCategory = "Liquor category is required";
        hasError = true;
      }
      if (Number(item.bottleSize) <= 0) {
        rowErrs.bottleSize = "Size > 0 required";
        hasError = true;
      }
      if (Number(item.quantity) <= 0) {
        rowErrs.quantity = "Qty > 0 required";
        hasError = true;
      }
      if (Object.keys(rowErrs).length > 0) {
        errorsMap[index] = rowErrs;
      }
    });

    if (hasError) {
      setRowErrors(errorsMap);
      if (showToast) showToast("Please check & complete all liquor detail fields before moving forward.", "error");
      return;
    }

    setRowErrors({});
    if (showToast) showToast("Liquor inventory verified & saved successfully", "success");
    if (onNextStep) {
      onNextStep();
    }
  };

  return (
    <div className="space-y-6 animate-fade select-none">
      {/* Centered blue heading banner perfectly matching the requested layout */}
      <div className="w-full bg-[#0a3861] text-white py-2.5 px-4 text-center text-sm font-black rounded-lg uppercase tracking-wider mb-2">
        Liquor Details
      </div>

      <div className="space-y-6 text-left">
        
        {/* Table Structure matching the screenshot exactly */}
        <div className="border border-slate-300 rounded-xl overflow-hidden shadow-xs bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#133c5c] text-white font-sans text-xs">
                <th className="py-2.5 px-3 font-bold uppercase text-center w-[70px] border-r border-[#0d2a41]">
                  Sl No
                </th>
                <th className="py-2.5 px-4 font-bold uppercase border-r border-[#0d2a41]">
                  Liquor Type
                </th>
                <th className="py-2.5 px-4 font-bold uppercase border-r border-[#0d2a41]">
                  Liquor Category
                </th>
                <th className="py-2.5 px-4 font-bold uppercase text-center w-[160px] border-r border-[#0d2a41]">
                  Bottle Size(in ml)
                </th>
                <th className="py-2.5 px-4 font-bold uppercase text-center w-[160px]">
                  Quantity (in Bottle)
                </th>
              </tr>
            </thead>
            <tbody>
              {liquorItems.map((item, idx) => {
                const errs = rowErrors[idx] || {};
                return (
                  <tr key={item.id} className="border-t border-slate-300 text-slate-700 text-xs font-bold bg-white hover:bg-slate-50/50 transition">
                    {/* Sl No */}
                    <td className="py-3 px-3 text-center border-r border-slate-300 bg-slate-50/30 text-slate-800 text-sm font-black font-mono w-[70px]">
                      {idx + 1}
                    </td>

                    {/* Liquor Type Input or Dropdown Options */}
                    <td className="py-2.5 px-3 border-r border-slate-300">
                      <div className="space-y-0.5">
                        <input
                          type="text"
                          className={`w-full bg-slate-50/50 border rounded-lg px-3 py-2 text-xs font-bold text-slate-800 transition ${
                            errs.liquorType ? "border-red-500 bg-red-50/10" : "border-slate-250 focus:border-blue-500 focus:bg-white"
                          }`}
                          placeholder="e.g. WHISKY / BEER / VODKA / WINE"
                          value={item.liquorType}
                          onChange={(e) => handleRowChange(idx, "liquorType", e.target.value.toUpperCase())}
                          list={`liquor-type-suggestions-${idx}`}
                        />
                        <datalist id={`liquor-type-suggestions-${idx}`}>
                          <option value="WHISKY - SINGLE MALT" />
                          <option value="WHISKY - PREMIUM BLENDED" />
                          <option value="CHAMPAGNE" />
                          <option value="WINE - RED" />
                          <option value="WINE - WHITE" />
                          <option value="BEER - PREMIUM LAGER" />
                          <option value="BEER - STRONG" />
                          <option value="VODKA - IMPORTED" />
                          <option value="GIN - LONDON DRY" />
                          <option value="RUM - DARK" />
                        </datalist>
                      </div>
                    </td>

                    {/* Liquor Category Input */}
                    <td className="py-2.5 px-3 border-r border-slate-300">
                      <div className="space-y-0.5">
                        <select
                          className={`w-full bg-slate-50/50 border rounded-lg px-3 py-2 text-xs font-bold text-slate-800 transition ${
                            errs.liquorCategory ? "border-red-500 bg-red-50/10" : "border-slate-250 focus:border-blue-500 focus:bg-white"
                          }`}
                          value={item.liquorCategory}
                          onChange={(e) => handleRowChange(idx, "liquorCategory", e.target.value)}
                        >
                          <option value="">--Select Category--</option>
                          <option value="IMFL (Indian Manufactured Foreign Liquor)">IMFL (Indian Manufactured Foreign Liquor)</option>
                          <option value="Imported Liquor (Foreign Sourced / BIO)">Imported Foreign Liquor (BIO)</option>
                          <option value="Beer / Wine spirits">Beer / Wine spirits</option>
                        </select>
                      </div>
                    </td>

                    {/* Bottle Size (in ml) */}
                    <td className="py-2.5 px-3 text-center border-r border-slate-300 w-[160px]">
                      <div className="space-y-0.5 max-w-[120px] mx-auto">
                        <input
                          type="number"
                          className={`w-full bg-slate-50/50 border rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-800 transition text-center ${
                            errs.bottleSize ? "border-red-500 bg-red-50/10" : "border-slate-250 focus:border-blue-500 focus:bg-white"
                          }`}
                          value={item.bottleSize}
                          onChange={(e) => handleRowChange(idx, "bottleSize", Number(e.target.value))}
                          placeholder="750"
                        />
                      </div>
                    </td>

                    {/* Quantity (in Bottle) */}
                    <td className="py-2.5 px-3 text-center w-[160px]">
                      <div className="space-y-0.5 max-w-[120px] mx-auto">
                        <input
                          type="number"
                          className={`w-full bg-slate-50/50 border rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-800 transition text-center ${
                            errs.quantity ? "border-red-500 bg-red-50/10" : "border-slate-250 focus:border-blue-500 focus:bg-white"
                          }`}
                          value={item.quantity}
                          onChange={(e) => handleRowChange(idx, "quantity", Number(e.target.value))}
                          placeholder="12"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* Extra Padding Empty Bar */}
              <tr className="border-t border-slate-300 bg-white">
                <td colSpan="5" className="py-4 px-4"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action Button Segment floating to the right exactly as in the layout block */}
        <div className="flex items-center justify-end gap-0 w-full pt-1">
          <div className="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
            {/* Add button */}
            <button
              type="button"
              onClick={handleAddRow}
              className="px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white font-extrabold text-xs transition uppercase flex items-center gap-1 cursor-pointer"
            >
              Add
            </button>
            
            {/* Divider */}
            <div className="h-8 w-[1px] bg-white border-l border-r border-slate-200 select-none"></div>

            {/* Delete button */}
            <button
              type="button"
              onClick={handleDeleteRow}
              className="px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white font-extrabold text-xs transition uppercase flex items-center gap-1 cursor-pointer"
            >
              Delete
            </button>
            
            {/* Divider */}
            <div className="h-8 w-[1px] bg-white border-l border-r border-slate-200 select-none"></div>

            {/* Save & Next button */}
            <button
              type="button"
              onClick={handleSaveAndNext}
              className="px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white font-extrabold text-xs transition uppercase flex items-center gap-1 cursor-pointer"
            >
              Save & Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
