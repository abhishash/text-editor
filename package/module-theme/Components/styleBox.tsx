const StyleBox = ({ handleChange }: { handleChange: Function }) => {
  return (
    <div className="">
      <select
        onChange={(e) => handleChange(e.target.value)}
        id="countries"
        className="bg-white border-r border-gray-300 text-gray-900 text-md focus:ring-blue-500 focus:border-blue-500 block w-[11rem] p-1.5 dark:focus:border-blue-500"
      >
        <option value="h1">Heading1</option>
        <option value="h2">Heading2</option>
        <option value="h3">Heading3</option>
        <option value="h4">Heading4</option>
        <option value="h5">Heading5</option>
        <option value="h6">Heading6</option>
      </select>
    </div>
  );
};
export default StyleBox;
