import { useState } from "react";
import { ageAtom } from "../../utils/ageAtom";
import { useAtom } from "jotai";

const MyFormComponent = () => {
  const [selectedAge, setSelectedAge] = useState("");
  const [ageAtomValue] = useAtom(ageAtom);
  console.log("ageAtom in mycomponent", ageAtomValue);
  const handleAgeChange = (event) => {
    setSelectedAge(event.target.value);
  };

  return (
    <form>
      <label htmlFor="age">
        Age Selection :
        <br />
      </label>
      <select id="age" value={selectedAge} onChange={handleAgeChange}>
        <option value="">Select a range</option>
        {ageAtomValue.map((age) => (
          <option key={age.id} value={age.id}>
            {age.label}
          </option>
        ))}
      </select>

      {/* You can use the selectedAge state value in your form submission */}
      <p>Selected Age: {selectedAge}</p>
    </form>
  );
};

export default MyFormComponent;
