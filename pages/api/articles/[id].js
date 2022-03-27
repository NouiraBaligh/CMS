import dbConnect from "utils/dbConnect";
import Article from "../../../models/Article";

dbConnect();

export default async (req, res) => {
    const { method, body, query: {id}} = req;


    switch (method) {
        case "GET": 
            try {
                const article = await Article.findById(id);
                if (!article) return res.status(404).json({ msg:"Article not found"});
                return res.status(200).json(article);
                
            } catch (error) {
                return res.status(500).json({ error: error.message});
                
            }
        
        case "PUT":
            try {
                const articleUpdate = await Article.findByIdAndUpdate(id,body, {
                    new: true,
                });
                if(!articleUpdate) return res.status(404).json({ msg: "Article not found"});
                return res.status(200).json(Article)
            } catch (error) {
                return res.status(500).json({ error: error.message});
            }    
        case "DELETE":
            try {
                const deletearticle = await Article.findByIdAndDelete(id);
                if (!deletearticle)
                return res.status(404).json({ msg: "Article not found"});
                return res.status(204).json();
            } catch (error) {
                return res.status(500).json({ error: error.message});
                
            }
    
        default:
            return res.status(400).json({ msg: "This method is not supported"})
    }

    
};