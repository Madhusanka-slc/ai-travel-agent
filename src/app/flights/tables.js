export default function PredictionResultTable({ results }) {
  if (!results) return <div></div>;
  if (results.length === 0) return <div></div>;

  const firstResult = results[0];
  const colNames = Object.keys(firstResult);
  const priceColIdx = colNames.map(x => x.toLowerCase()).indexOf("price");
  const dateColIdx = colNames.map(x => x.toLowerCase()).indexOf("date");

  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
          <tr>
            {colNames.map((col, idx) => (
              <th key={idx} scope="col" className="px-6 py-3">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {results.map((pred, trIdx) => {
            const trValues = Object.values(pred);
            return (
              <tr key={trIdx} className="bg-neutral-primary border-b border-default">
                {trValues.map((trCol, tcolIdx) => {
                  const isDateCol = dateColIdx === tcolIdx;
                  const isPriceCol = priceColIdx === tcolIdx;

                  const renderedDate = isDateCol
                    ? new Date(Date.parse(trCol)).toLocaleDateString()
                    : null;

                  const renderedPrice = isPriceCol
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(trCol)
                    : null;

                  const isOne = trCol === 1;
                  const yesVal = isOne ? "Yes" : null;

                  const isZero = trCol === 0;
                  const noVal = isZero ? "No" : null;

                  const renderedCol =
                    renderedDate || renderedPrice || yesVal || noVal || trCol;

                  return (
                    <td key={`${trIdx}-${tcolIdx}`} className="px-6 py-4">
                      {renderedCol}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
