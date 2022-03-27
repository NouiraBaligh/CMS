
import React from "react";
import {router,useRouter}  from "next/router";
import FooterSmall from "components/Footers/FooterSmall";
import Navbar from "components/Navbars/IndexNavbar.js";

export default function AfficheBlogs({articles=[]}) {
   
  
    const router = useRouter()
   return (    
      <>    
      <Navbar transparent />
                    <div class="container flex justify-center mx-auto">
                        <div class="flex flex-col">
                        <div class="w-full">
                            <div class="border-b border-gray-200 shadow">   
                             <thead class="bg-gray-50">         
                    <tr>
                        <th class="px-6 py-2 text-xs text-gray-500" style={{ width: '30%' }}>Titre</th>
                        <th class="px-6 py-2 text-xs text-gray-500" style={{ width: '30%' }}>Contenu</th>
                        <th class="px-6 py-2 text-xs text-gray-500" style={{ width: '30%' }}></th>
                        <th class=" px-6 py-23 text-xs text-gray-500" style={{ width: '30%' }}></th>
                       
                    </tr>

                            </thead>
                           
                            {(articles).map((article) => (
                            <tbody class="bg-white divide-y divide-gray-300">
                            <tr class="whitespace-nowrap">
                            
                            <td class="px-6 py-4 text-sm text-gray-500">
                            {article.title}
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900">
                                {article.description}
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                 <td class="px-6 py-4">
                               
                            </td>
                            <td class="px-6 py-4">
                            <button  
                                 className="lex justify-end bg-indigo-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded " 
                                  secondary onClick={() => router.push(`/${article._id}/edit`)}>Edit</button>  </td>
                                     <td class="px-6 py-4"> 
                                     
                           <button  
                                 className="lex justify-end bg-red-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded " 
                                  primary onClick={() =>router.push(`/${article._id}`)}>Delete</button>

                            </td> 
                            </td>
                            </tr>                    
                            </tbody>
                            
                            
                            ))}
                            </div>
                    </div>
              </div>
                                
         </div>
         
         <FooterSmall  />       
       </>
      );
}

export const getServerSideProps = async () => {
    const res = await fetch('http://localhost:3000/api/articles');
    const articles = await res.json();
    return {
      props: {
        articles,
      }
    }
}
 
  