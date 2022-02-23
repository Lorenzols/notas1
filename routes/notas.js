var express = require('express');
var router = express.Router();

const Notas = require('../models/notas')
const {isLoggedIn} = require('../lib/protect')

/* GET users listing. */
router.get('/', isLoggedIn, async(req, res, next) => {
  const id = req.user
  const notas = await Notas.find({user_id: id})
  console.log(notas)
  res.render('notas/list', {notas})
});

router.get('/add', isLoggedIn, async(req, res, next) => {
  res.render('notas/add')
});

router.post('/add', isLoggedIn, async(req, res, next) => {
  const id = req.user
  const {title, description} = req.body
  const nota = await new Notas({
    title: title,
    description: description,
    user_id: id
  })
  await nota.save()
  res.redirect('/notas')
});

router.get('/edit/:id', isLoggedIn, async(req, res, next) => {
  const nota = await Notas.findById(req.params.id)
  res.render('notas/edit', {nota})
});

router.post('/edit/:id', isLoggedIn, async(req, res, next) => {
  const nota = await Notas.findByIdAndUpdate(req.params.id, req.body, {})
  res.redirect('/notas')
});

router.get('/delete/:id', isLoggedIn, async(req, res, next) => {
  const nota = await Notas.findByIdAndDelete(req.params.id)
  res.redirect('/notas')
});
module.exports = router;
