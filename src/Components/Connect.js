function Connect() {
  return (
    <div className="w-full h-full mt-6 shadow-lg bg-slate-100">
      <div className="flex justify-center w-full">
        <img className="h-15 w-2/12" src="medium.png" alt="" />
      </div>
      <div className="flex justify-center w-full text-center">
        <h3>
          Discover Medium writers
          <br /> you already follow on
          <br /> Twitter.
        </h3>
      </div>
      <div className="flex justify-center w-full text-center border-gray-950 border-2 rounded-xl relative">
        <img
          className="absolute left-2 top-1 w-3 h-4"
          src="medium.png"
          alt=""
        />
        <p>Connect To Twitter</p>
      </div>
    </div>
  );
}

export default Connect;
