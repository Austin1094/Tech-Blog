const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        })

        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;

            res.json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        })

        if (!user) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        const validPassword = user.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.json({ user, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(500).json({ message: 'No account found' });
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.delete("/user/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        await User.destroy({ where: { id: userId } });

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error occurred during delete:', err);
        res.status(500).json({ message: 'An error occurred while deleting the user' });
    }
});


module.exports = router;