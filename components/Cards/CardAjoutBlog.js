import React from "react";

export default function CardAjoutBlog() {
    
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Liste Of Blogs</h6>
           
                <a
                  href="/index2"
                  className="lex justify-end bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded "
                >
                  All Blogs
                </a>
                 <a
                  href="/admin/AjoutBlog"
                  className="lex justify-end bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded "
                >
                  Add Blog
                </a>
          </div>
       
        </div>
     
      </div>
      
      
    </>
  );
}
