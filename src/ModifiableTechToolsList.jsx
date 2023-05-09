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
}) {
  return (
    <>
      <h1>Essential technology tools and concepts for entry-level developer</h1>
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
                  />
                  <button type="submit" disabled={selectedItemValue.length < 3}>
                    Save
                  </button>
                  <button onClick={onCancelItemEditClick}>Cancel</button>
                </form>
              ) : (
                <>
                  <span>
                    {techTool.name} {" - "} {techTool.keywordAppearances}{" "}
                  </span>
                  <button onClick={() => onEditItemClick(index)}>Edit</button>
                </>
              )}
              <button onClick={() => onDeleteItemClick(index)}>Delete</button>
              <button onClick={() => onIncrementItemClick(index)}>+1</button>
              <button onClick={() => onDecrementItemClick(index)}>-1</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
