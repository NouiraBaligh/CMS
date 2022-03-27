import React, { Component } from "react";
import dynamic from 'next/dynamic'
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)
import { Form , Button} from "semantic-ui-react";
import {useState, useEffect } from 'react';
import {useRouter} from 'next/router';

export default function ArtFormPages() { 

    const [newArticle, setNewArticle] = useState({
        title: "",
        description: "",
    })

    const [errors, setErrors] = useState({
        title: "",
        description: "",
    })

    const {query, push} = useRouter( )

    const validate = () => {

        const errors = {}

        if (!newArticle.title) errors.title = "Title is required";
        if (!newArticle.description) errors.description = "Description is required"

        return errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = validate();

        if (Object.keys(errors).length) return setErrors(errors)

        if (query.id) {
            await updateArticle();
        }else {
            await createArticle();
        }

        await push('/admin/Blog')
    }

    const createArticle = async () => {

        try {
           await fetch('http://localhost:3000/api/articles', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newArticle)
            })
        } catch (error) {
          console.error(error)  
        }
    }

    const updateArticle = async () => {
        try {
            await fetch('http://localhost:3000/api/articles/' + query.id , {
                 method: 'PUT',
                 headers: {
                     "Content-Type": "application/json"
                 },
                 body: JSON.stringify(newArticle)
             })
         } catch (error) {
           console.error(error)  
         } 
    }

    const handleChange = (e) => setNewArticle({...newArticle, [e.target.name] : e.target.value });

    const getArticle =  async () => {
        const res = await fetch('http://localhost:3000/api/articles/' + query.id)
        const data = await res.json();
        setNewArticle({ title: data.title, description: data.description });
    }


    useEffect(() => {
        if (query.id)  getArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between"></div>
          <div >

          <h1 class="block w-full  text-gray-800 text-2xl font-bold mb-6">{query.id ? 'Update Article' : 'Create Article'}</h1>
          
                    <Form onSubmit={handleSubmit}> 
                    <div class="mb-6">
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Title</label>
                        <textarea id="message" rows="1" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="title"  onChange={handleChange} 
                        error={errors.title ? { content: "Please enter a title", pointing: "below"} : null}value={newArticle.title} placeholder="Enter Title ... "></textarea>
                       </div>
                       <div class="mb-6">
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Content</label>
                        <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="description" onChange={handleChange}
                        error={errors.description ? { content: "Please enter content" , pointing: "below"} : null} value={newArticle.description} placeholder="Enter Content... "></textarea>
                       </div>
                        <div  className="text-center flex justify-between">
                        <Button primary  className="lex justify-end bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded"
                      >
                            {query.id ? 'Update' : 'Create'}
                        </Button>
                        </div>
                    </Form>
        </div>
        </div>
         </div>
    )
}