function Recommented({ topic }) {
  return (
    <div className="w-full h-full mt-6 pl-5 mb-5">
      <div className="">
        <p className="bg-slate-200 rounded-lg  px-2 text-xs my-1 inline-block">
          {topic.name}
        </p>
      </div>
    </div>
  );
}

export default Recommented;
