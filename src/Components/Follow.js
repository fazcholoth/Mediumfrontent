function Follow({writer}) {


    
    return (
      <div className="w-full h-full bg-slate-100 mt-3 px-2 py-2">
        <div className="flex justify-around w-full shadow-md py-1">
          <div className="w-2/4 flex justify-around ">
            <div className="py-2"><img className="h-5 w-5 rounded-full" src={writer.image} alt="" /></div>
            <div  className="text-left">
              <div className=""><h3 className="pt-1 text-sm">{writer.name}</h3></div>
              <div className=""><p className="text-xs">Assistant Professor</p></div>
            </div>
          </div>
          <div>
          <button type="button" className=" bg-white border focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">follow</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Follow;