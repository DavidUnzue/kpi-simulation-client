import React from "react";

export const Bins = ({ bins }: { bins: any }) =>
  Object.keys(bins).length > 0 ? (
    <div className="Bins">
      <details>
        <summary>Booking distance bins</summary>
        <p>
          How many bookings happened for every "kilometer bin". E.g. how many
          bookings had a distance between 0 and 1km, 1 and 2kms, etc.
        </p>
        <div className="BinsList">
          {Object.keys(bins).map((key, index) => (
            <div key={index} className="BinItem">
              {key}: {bins[key]}
            </div>
          ))}
        </div>
      </details>
    </div>
  ) : null;
