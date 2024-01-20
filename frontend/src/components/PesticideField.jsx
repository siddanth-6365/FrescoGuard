import React, { useState, useCallback } from "react";

export default function RequirementsField({
  name,
  requirementsList,
  setRequirementsList,
  updatePesticidesInForm,
}) {
  const [requirement, setRequirement] = useState("");

  const handleAddRequirement = useCallback(() => {
    if (requirement) {
      const updatedRequirements = [...requirementsList, requirement];
      setRequirementsList(updatedRequirements);
      setRequirement("");
      // Call the parent component's function directly
      updatePesticidesInForm(updatedRequirements);
    }
  }, [requirementsList, requirement, setRequirementsList, updatePesticidesInForm]);

  const handleRemoveRequirement = useCallback(
    (index) => {
      const updatedRequirements = [...requirementsList];
      updatedRequirements.splice(index, 1);
      setRequirementsList(updatedRequirements);
      // Call the parent component's function directly
      updatePesticidesInForm(updatedRequirements);
    },
    [requirementsList, setRequirementsList, updatePesticidesInForm]
  );

  return (
    <div className="flex flex-row gap-4 space-y-2">
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold"
        >
          Add
        </button>
      </div>
      {requirementsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementsList.map((req, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{req}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300"
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
