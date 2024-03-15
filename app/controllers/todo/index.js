const Todo = require('../../models/todo');
const config = require('../../config/config');
const user = require('../../routes/user');

exports.create = async (req, res) => {
    try {
        const { name, description, status, userId } = req.body;
        const todo = await Todo.create({ name, description, status, userId });
        res.status(201).json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
};

exports.getAll = async (req, res) => {
    return res.status(200).json({ msg: 'OK', users: await Todo.findAll()})
}


exports.getById = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findByPk(id);

        if (!todo) {
            return res.status(404).json({ msg: 'Todo non trouvé' });
        }

        return res.status(200).json({ msg: 'OK', todo });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Erreur serveur' });
    }
}

// Méthode pour mettre à jour un article
exports.update = async (req, res) => {
    try {
        // Vérifier si l'utilisateur est connecté
        // if (!req.user) {
        //     return res.status(401).json({ message: 'Vous devez être connecté pour mettre à jour un article.' });
        // }
        // const todoId = req.params.id;

        const todoId = "72ebf06b-a562-4ba5-a0b0-5f7745259cf2";
        const { name, description, status } = req.body;
        const todo = await Todo.findByPk(todoId);
        if (!todo) {
            return res.status(404).json({ message: 'TodoList non trouvé.' });
        }
        // Vérifier si l'utilisateur est l'auteur de l'article
        // if (article.authorId !== req.user.id) {
        //     return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à mettre à jour cet article.' });
        // }
        todo.name = name;
        todo.description = description;
        todo.status = status;
        await todo.save();

        res.json({ message: 'TodoList mis à jour avec succès.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
};


exports.delete = async (req, res) => {
    try {
        // Vérifier si l'utilisateur est connecté
        // if (!req.user) {
        //     return res.status(401).json({ message: 'Vous devez être connecté pour supprimer un article.' });
        // }

        const todoId = req.params.id;
        let todo = await Todo.findByPk(todoId);
        if (!todo) {
            return res.status(404).json({ message: 'TodoList non trouvé.' });
        }
        // Vérifier si l'utilisateur est l'auteur du todo
        // if (todo.authorId !== req.user.id) {
        //     return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer cet article.' });
        // }

        await todo.destroy();
        res.json({ message: 'TodoList supprimé avec succès.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
};