
import dbConnect from "utils/dbConnect";
import Article from "../../../models/Article";

dbConnect()

export default async function handler(req, res) {

  const { method, body } = req
switch (method) {
  case "GET":
    try {
      const articles = await Article.find();
      return res.status(200).json(articles)
    } catch (error) {
      return res.status(500).json({ error: error.message}); 
    }
  case "POST":
    try {
      const newArticle = new Article(body);
      const savedArticle = await newArticle.save();
      return res.status(201).json(savedArticle);
    } catch (error) {
      return res.status(500).json({ error: error.message});
    }
  default:
    return res.status(400).json({ msg: 'this method is not supported'})
}

}
  