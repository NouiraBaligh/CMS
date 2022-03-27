import React from "react";
import Admin from "layouts/Admin.js";
import CardAjoutBlog from "components/Cards/CardAjoutBlog";
import CardListBlogs from "components/Cards/CardListBlogs";

export default function Blog() {
  return (
   <>
    <div className="flex flex-wrap">
        <div className="w-full lg:w-8/22 px-4">
        <CardAjoutBlog /> 
        
        </div>
    </div>
   </>
  );
}

Blog.layout = Admin;
