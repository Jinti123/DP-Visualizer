import React from "react";
import "./DpTable.css";

export default function DpTable({
  data,
  algorithm,
  rowLabels = [],
  colLabels = [],
  highlightedCells = [],
}) {
  if (!data || data.length === 0) {
    return <div className="styled-dp-table">No DP data available.</div>;
  }

  const is2D = Array.isArray(data[0]);

  const getDefaultLabels = () => {
    switch (algorithm) {
      case "fibonacci":
        return { row: ["fibonacci"], col: ["index"] };
      case "coinchange":
        return { row: ["Min Coins"], col: ["Amount"] };
      case "knapsack":
        return { row: ["Item"], col: ["Capacity"] };
      case "lcs":
        return { row: ["String2 index"], col: ["String1 index"] };
      case "lis":
        return { row: ["LIS Length"], col: ["Index"] };
      default:
        return { row: ["Row"], col: ["Col"] };
    }
  };

  const isHighlighted = (i, j = null) => {
    if (!highlightedCells || highlightedCells.length === 0) return false;
    if (is2D) return highlightedCells.some(([x, y]) => x === i && y === j);
    return highlightedCells.includes(i);
  };

  const defaultLabels = getDefaultLabels();

  const effectiveRowLabels =
    is2D && rowLabels.length > 0
      ? rowLabels
      : is2D
      ? data.map((_, i) =>
          algorithm === "knapsack"
            ? i === 0
              ? "0"
              : `Item ${i}`
            : `${defaultLabels.row[0]} ${i}`
        )
      : [];

  const effectiveColLabels =
    is2D && colLabels.length > 0
      ? colLabels
      : is2D && Array.isArray(data[0])
      ? data[0].map((_, i) =>
          algorithm === "knapsack"
            ? `${i}` // Just numbers for capacity
            : `${defaultLabels.col[0]} ${i}`
        )
      : [];

  return (
    <div className="dp-table-wrapper">
      <div className="dp-table-box">
        <table>
          <thead>
            <tr>
              <th className="label-cell">
                {algorithm === "knapsack" ? "Item / Capacity" : ""}
              </th>
              {is2D &&
                effectiveColLabels.map((label, j) => (
                  <th key={j} className="amount-header">
                    {label}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {is2D ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="label-cell">{effectiveRowLabels[rowIndex]}</td>
                  {row.map((val, colIndex) => (
                    <td
                      key={colIndex}
                      className={
                        isHighlighted(rowIndex, colIndex) ? "highlighted" : ""
                      }
                    >
                      {val === Infinity ? "∞" : val}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <>
                <tr>
                  <td className="label-cell">{defaultLabels.col[0]}</td>
                  {data.map((_, i) => (
                    <td key={i}>{i}</td>
                  ))}
                </tr>
                <tr>
                  <td className="label-cell">{defaultLabels.row[0]}</td>
                  {data.map((val, i) => (
                    <td
                      key={i}
                      className={isHighlighted(i) ? "highlighted" : ""}
                    >
                      {val === Infinity ? "∞" : val}
                    </td>
                  ))}
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
