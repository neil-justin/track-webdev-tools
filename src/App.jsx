import { useEffect, useState } from "react";
import ModifiableTechToolsList from "./ModifiableTechToolsList";

const initialTechTools = JSON.parse(localStorage.getItem("techTools")) ?? [];

export default function App() {
  const [techTools, setTechTools] = useState(initialTechTools);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedItemValue, setSelectedItemValue] = useState("");
  const [newItemValue, setNewItemValue] = useState("");
  const [visitedJobAdsCount, setVisitedJobAdsCount] = useState(0);

  useEffect(() => {
    localStorage.setItem("techTools", JSON.stringify(techTools));
  }, [techTools]);

  let keywordsCount = 0;

  if (techTools.length > 0) {
    keywordsCount = techTools.reduce(
      (accumulator, techTool) => accumulator + techTool.keywordAppearances,
      0
    );
  }

  function handleModifyVisitedJobAdsCount(increment) {
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

  function handleNewItemValueChange(e) {
    setNewItemValue(e.target.value);
  }

  function handleAddItemClick(event) {
    event.preventDefault();

    const existingIndex = techTools.findIndex((techTool) => {
      return techTool.name === newItemValue.toLowerCase();
    });

    if (existingIndex < 0) {
      setTechTools([
        ...techTools,
        { name: newItemValue.toLowerCase(), keywordAppearances: 1 },
      ]);
    } else {
      handleIncrementItemClick(existingIndex);
      window.alert("This tool or concept already exists on your list");
    }

    setNewItemValue("");
  }

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

  function handleClearListClick() {
    setTechTools([]);
    setVisitedJobAdsCount(0);
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
        onNewItemValueChange={handleNewItemValueChange}
        newItemValue={newItemValue}
        onAddItemClick={handleAddItemClick}
        keywordsCount={keywordsCount}
        onClearListClick={handleClearListClick}
        visitedJobAdsCount={visitedJobAdsCount}
        onModifyVisitedJobAdsCount={handleModifyVisitedJobAdsCount}
      />
    </>
  );
}
