import { useState } from "react";

export default function ModifiableTechToolsList({
  techTools,
  selectedIndex,
  onSaveItemEditClick,
  onEditItemClick,
  selectedItemValue,
  onSelectedItemValueChange,
  onCancelItemEditClick,
  onDeleteItemClick,
  onIncrementItemClick,
  onDecrementItemClick,
  onNewItemValueChange,
  newItemValue,
  onAddItemClick,
  keywordsCount,
  onClearListClick,
}) {
  const [visitedJobAdsCount, setVisitedJobAdsCount] = useState(0);

  function handleVisitedJobAdsCount(increment) {
    if (increment) {
      setVisitedJobAdsCount(
        (prevVisitedJobAdsCount) => prevVisitedJobAdsCount + 1
      );
    } else {
      setVisitedJobAdsCount(
        (prevVisitedJobAdsCount) => prevVisitedJobAdsCount - 1
      );
    }
  }

  return (
    <>
      <h1>Essential junior-level developer tools</h1>
      <ul>
        {techTools.map((techTool, index) => {
          return (
            <li key={index}>
              {selectedIndex === index ? (
                <form
                  onSubmit={(e) =>
                    onSaveItemEditClick(e, selectedItemValue, index)
                  }
                >
                  <input
                    aria-label="Enter technology tool's name"
                    type="text"
                    minLength="2"
                    value={selectedItemValue}
                    onChange={(e) => onSelectedItemValueChange(e)}
                  />{" "}
                  <button type="submit" disabled={selectedItemValue.length < 3}>
                    Save
                  </button>{" "}
                  <button onClick={onCancelItemEditClick}>Cancel</button>{" "}
                </form>
              ) : (
                <>
                  <span>
                    {techTool.name} {" - "} {techTool.keywordAppearances}{" "}
                  </span>
                  <button onClick={() => onEditItemClick(index)}>Edit</button>{" "}
                </>
              )}
              <button onClick={() => onDeleteItemClick(index)}>Delete</button>{" "}
              <button onClick={() => onIncrementItemClick(index)}>+1</button>{" "}
              <button onClick={() => onDecrementItemClick(index)}>-1</button>{" "}
            </li>
          );
        })}
      </ul>
      {techTools.length >= 1 && (
        <button onClick={onClearListClick}>Clear list</button>
      )}
      <form onSubmit={onAddItemClick}>
        <label htmlFor="newItemInput">
          <input
            type="text"
            id="newItemInput"
            minLength="2"
            onChange={onNewItemValueChange}
            value={newItemValue}
          />
        </label>{" "}
        <button type="submit" disabled={newItemValue.length < 3}>
          Add
        </button>
      </form>
      <p>keywords count: {keywordsCount}</p>
      <p>
        <span>visited job ads: {visitedJobAdsCount} </span>{" "}
        <button onClick={() => handleVisitedJobAdsCount(true)}>+1</button>{" "}
        <button
          disabled={visitedJobAdsCount < 1}
          onClick={() => handleVisitedJobAdsCount(false)}
        >
          -1
        </button>
      </p>
    </>
  );
}
