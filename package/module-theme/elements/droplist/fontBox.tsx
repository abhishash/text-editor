const fontFamily = [
  { value: "Arial", name: "Arial" },
  { value: "Verdana", name: "Verdana" },
  { value: "Times New Roman", name: "Times New Roman" },
  { value: "Garamand", name: "Garamand" },
  { value: "Courier New", name: "Courier New" },
  { value: "Cursive", name: "Cursive" },
];
const FontBox = ({ handleChange }: { handleChange: Function }) => {
  return (
    <div className="">
      <select
        onChange={(e) => handleChange(e.target.value)}
        id="countries"
        className="bg-white border-r border-gray-300 text-gray-900 text-md focus:ring-blue-500 focus:border-blue-500 block w-[11rem] p-1.5 dark:focus:border-blue-500"
      >
        {fontFamily.map((val) => (
          <option value={val.value}>{val.name}</option>
        ))}
      </select>
    </div>
  );
};
export default FontBox;
