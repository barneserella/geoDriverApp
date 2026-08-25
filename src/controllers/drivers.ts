import express, { type Request, type Response } from 'express';
import { prisma } from '../config/db.js';

module.exports = {
    // GET all drivers controller
    getDrivers: async (req: Request, res: Response) => {
        try{
            const drivers = await prisma.drivers.findMany();
            res.json(drivers);
        }catch (error){
            console.error ('Error fetching all drivers:', error);
            res.status(500).json({ error: 'Failed to fetch drivers' });
        }
    },
    // // CREATE a driver controller
    createDrivers: async (req: Request, res: Response) => {
        try{
            const { name, active } = req.body;
            const driver = await prisma.drivers.create({
                data: { name, active },
            });
            console.log('Created Driver: ', driver);
            res.status(201).json(driver);
        }catch(error) {
            console.error('Error creating driver: ', error)
            res.status(500).json({ error: 'Failed to create driver' });
        };
    },
};