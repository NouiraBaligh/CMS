import React from "react";
import Admin from "layouts/Admin.js";
import CardAjoutBlog from "components/Cards/CardAjoutBlog";
import CardBlog from "components/Cards/CardBlog";

export default function AjoutBlog() {
  return (
   <>
    <div className="flex flex-wrap">
        <div className="w-full lg:w-8/22 px-4">
          <CardBlog /> 
        </div>
    </div>
   </>
  );
}

AjoutBlog.layout = Admin;
