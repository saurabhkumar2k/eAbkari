import { User,Milestone, Trash2 } from "lucide-react";

export default function TrainRouteDetailsRow({
  TrainRouteDetail,
  index,
  onChange,
  onDelete,
  disableDelete,
  errors,
  count,
}) {
  return (
    <div className="train-route-input-row">
      {/* Sl No Indicator */}
      <div className="route-sl-no">
        {count}
      </div>

      {/* Input Field Area */}
      <div className="restaurant-field-inline">
        <div className="input-wrapper">
          <Milestone size={18}  />
          <input
            type="text"
            placeholder="Enter Route of the Train"
            value={TrainRouteDetail.RouteDescription || ""}
            onChange={(e) => onChange(index, "RouteDescription", e.target.value)}
          />
        </div>
        {errors?.RouteDescriptionErr && (
          <span className="error-text">{errors.RouteDescriptionErr}</span>
        )}
      </div>

      {/* Inline Delete Button */}
      <button
        type="button"
        className="bt-dir-del"
        onClick={() => onDelete(index)}
        disabled={disableDelete}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
