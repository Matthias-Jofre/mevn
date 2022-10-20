import { Router } from 'express'

import Task from "../models/Task";

const router = Router()

router.get('/task', async (req, res) => {
    const task = await Task.find()
    res.send(task)
})

router.post('/task', async (req, res) => {
    const { title, description } = req.body

    const task = new Task({ title, description })

    await task.save()

    res.json(task)
})

router.get('/task/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.send(task)

        if (!task) return res.status(404).json({ message: "Task not found" })

    } catch (error) {
        return res.status(500).send(error)
    }
})

router.delete('/task/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) return res.status(404).json({ message: "Task not found" })

        return res.json(task)

    } catch (error) {

        return res.status(500).send(error)

    }
})

router.put('/task/:id', async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.json(updatedTask)
})

export default router