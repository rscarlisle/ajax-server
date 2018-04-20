const fs = require('fs');
const path = require('path');
const posts = '../../contentPost'
const uuid = require('uuid/v4');

const createPost = (newPost) => {
    const title = newPost.title;
    const content = newPost.content;
    const errors = [];

    // checks if the title or content is empty
    if (!title) errors.push('requires title');
    if (!content) errors.push('requires content');

    // return with error if any
    // else save post into posts.json
    if (errors.length > 0) {
        return {
            status: 400,
            message: 'empty fields',
            errors
        };
    } else {
        // read data from posts.json file
        const postArray = readFile();
        const savePost = {
            id: uuid(),
            title,
            content
        };
        // push data into the array
        postArray.push(savePost);

        // write data to posts.json file
        writeFile(postArray);
        return savePost;
    }
};

const getPostById = (id) => {
    // read data from posts.json file
    const contentArray = readFile();
    const post = postArray.find(post => post.id === id);

    if (!post) {
        return {
          status: 404,
          message: "Not Found",
          errors: `id ${id} Not Found`
        };
      }
    return post;
}

const getAllPosts = () => {
    const contentArray = readFile();
    return contentArray;
}

const deletePost = (id) => {
    const postArray = readFile();
    const post = postArray.find(post => post.id === id);
    if (!post) {
        return {
            status: 404,
            message: 'Not Found',
            errors: `id ${id} Not Found`
        };
    } else {
        const index = postArray.indexOf(post);
        postArray.splice(index, 1);
        writeFile(postArray);
        return 1;
    }
};

const updatePost = (id, updatePost) => {
    // read data from posts.json
    const postArray = readFile();
    const errors = [];
    const title = updatePost.title;
    const content = updatePost.content;
    const post = postArray.find(post => post.id === id);
    if (!post) {
        return {
            status: 404,
            message: 'Not Found',
            errors: `id ${id} Not Found`
        };
    }
    // checks for empty fields
    if (!title) errors.push("title required");
    if (!content) errors.push("content required");

    // return with error if any
    // else save post into posts.json
    if (errors.length > 0) {
        return {
            status: 400,
            message: "Fields are missing: ",
            errors
        };
    } else {
        // update existing post
        const index = postArray.indexOf(post);
        postArray[index].title = title;
        postArray[index].content = content;

        // write data to posts.json file
        writeFile(postArray);

        return {
        id,
        title,
        content
        };
    }
};


const readFile = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, posts, "posts.json"), "utf-8"));
  };

const writeFile = (postArray) => {
    fs.writeFileSync(path.join(__dirname, posts, "posts.json"), JSON.stringify(postArray));
  };

  module.exports = {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost
};