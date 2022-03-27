import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Loader, Grid } from "semantic-ui-react";
import Error from "next/error";
import FooterSmall from "components/Footers/FooterSmall";


export default function ArticleDetail({article,error})
{
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { query, push } = useRouter();

  const deleteArticle = async () => {
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/articles/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };  

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteArticle();
    push("/index2");
    close();
  };

  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />;

  return (
    
    <>
    
    <div class="container flex justify-center mx-auto">
      <div class="flex flex-col">
        <div class="w-full">
          <div class="border-b border-gray-200 shadow">

          <tr>
          <th class="px-6 py-2 text-xs text-gray-500" style={{ width: '30%' }}>{article.title}</th>
          </tr>
          <tr>
          <th class="px-6 py-2 text-xs text-gray-500" style={{ width: '30%' }}>{article.description}</th>
          <button  className="lex justify-end bg-red-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded " 
           primary onClick={open} loading={isDeleting}  onConfirm={handleDelete}>Delete</button>

          <Confirm
          content={`Are you sure to delete this article`}
          header="Please confirm" 
          open={confirm}
          onConfirm={handleDelete}
          onCancel={close} />
          </tr>
          </div>
        </div>
      </div>
    </div>
    <FooterSmall  /> 
  </>
  );
};

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/articles/${id}`);

  if (res.status === 200) {
    const article = await res.json();

    return {
      props: {
        article,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}


