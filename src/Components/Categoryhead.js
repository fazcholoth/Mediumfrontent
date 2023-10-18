function CatHeader({ category }) {
  

  return (
    <div className="text-gray-600 font-thin text-xs">
      <p>{category.name}</p>
    </div>
  );
}

export default CatHeader;
