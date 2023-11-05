const express = require('express');

const { getAll, get, add, replace, remove } = require('../data/todo');
const { checkAuth } = require('../util/auth');
const { isValidText, isValidDate, isValidImageUrl } = require('../util/validation');

const router = express.Router();

router.get('/', async (req, res, next) => {
    console.log('req.token: ', req.token);
    try {
        const todos = await getAll();
        res.json({ todos });
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const todo = await get(req.params.id);
        res.json({ todo });
    } catch (error) {
        next(error);
    }
});

router.use(checkAuth);

const validateErrors = (data) => {
    let errors = {};

    if (!isValidText(data.title)) {
        errors.title = 'Invalid title.';
    }
    if (!isValidText(data.description)) {
        errors.description = 'Invalid description.';
    }
    if (!isValidDate(data.date)) {
        errors.date = 'Invalid date.';
    }
    if (!isValidImageUrl(data.image)) {
        errors.image = 'Invalid image.';
    }
    if (!isValidText(data.status)) {
        errors.status = 'Invalid status.';
    }
    return errors;
}

router.post('/', async (req, res, next) => {
    console.log('req.token: ', req.token);
    const data = req.body;

    let errors = validateErrors(data);

    if (Object.keys(errors).length > 0) {
        return res.status(422).json({
            message: ' Adding the todo failed due to validation errors.',
            errors
        });
    }
    try {
        await add(data);
        res.status(201).json({ message: 'Todo saved.', todo: data });
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', async (req, res, next) => {
    const data = req.body;

    let errors = validateErrors(data);

    if (Object.keys(errors).length > 0) {
        return res.status(422).json({
            message: ' Updating the todo failed due to validation errors.',
            errors
        });
    }
    try {
        await replace(req.params.id, data);
        res.json({ message: 'Todo updated.', todo: data });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await remove(req.params.id);
        res.json({ message: 'Todo deleted.' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;