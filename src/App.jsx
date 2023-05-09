import { useState } from "react";
import ModifiableTechToolsList from "./ModifiableTechToolsList";

const INITIAL_TECH_TOOLS = [
  { name: "html", keywordAppearances: 5 },
  { name: "css", keywordAppearances: 5 },
  { name: "javascript", keywordAppearances: 7 },
  { name: "react", keywordAppearances: 3 },
];

export default function App() {
  const [techTools, setTechTools] = useState(INITIAL_TECH_TOOLS);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedItemValue, setSelectedItemValue] = useState("");

  function handleSelectedItemValueChange(e, index) {
    const nextSelectedItemValue =
      e === null ? techTools[index].name : e.target.value;
    setSelectedItemValue(nextSelectedItemValue);
  }

  function handleSaveItemEditClick(event, nextName, selectedIndex) {
    event.preventDefault();
    const nextTechTools = techTools.map((techTool, index) => {
      if (selectedIndex === index) {
        return { ...techTool, name: nextName };
      } else {
        return techTool;
      }
    });
    setTechTools(nextTechTools);
    setSelectedIndex(null);
  }

  function handleEditItemClick(index) {
    setSelectedIndex(index);
    handleSelectedItemValueChange(null, index);
  }

  function handleCancelItemEditClick() {
    setSelectedIndex(null);
  }

  function handleDeleteItemClick(selectedIndex) {
    const nextTechTools = techTools.filter(
      (techTool, index) => index !== selectedIndex
    );
    setTechTools(nextTechTools);
    setSelectedIndex(null);
  }

  function handleIncrementItemClick(selectedIndex) {
    const nextTechTools = techTools.map((techTool, index) => {
      if (index === selectedIndex) {
        return {
          ...techTool,
          keywordAppearances: techTool.keywordAppearances + 1,
        };
      } else {
        return techTool;
      }
    });
    setTechTools(nextTechTools);
  }

  function handleDecrementItemClick(selectedIndex) {
    let nextTechTools = techTools.map((techTool, index) => {
      if (index === selectedIndex) {
        return {
          ...techTool,
          keywordAppearances: techTool.keywordAppearances - 1,
        };
      } else {
        return techTool;
      }
    });
    nextTechTools = nextTechTools.filter(
      (techTool) => techTool.keywordAppearances > 0
    );
    setTechTools(nextTechTools);
  }

  return (
    <>
      <ModifiableTechToolsList
        techTools={techTools}
        selectedIndex={selectedIndex}
        onSaveItemEditClick={handleSaveItemEditClick}
        onEditItemClick={handleEditItemClick}
        selectedItemValue={selectedItemValue}
        onSelectedItemValueChange={handleSelectedItemValueChange}
        onCancelItemEditClick={handleCancelItemEditClick}
        onDeleteItemClick={handleDeleteItemClick}
        onIncrementItemClick={handleIncrementItemClick}
        onDecrementItemClick={handleDecrementItemClick}
      />
    </>
  );
}
