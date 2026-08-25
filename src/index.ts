import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import { prisma } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// TEST
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'geoDriverApp API is responding' });
});

// GET all drivers
app.get('/drivers', async (req: Request, res: Response) => {
    try{
        const drivers = await prisma.drivers.findMany();
        res.json(drivers);
    }catch (error){
        console.error ('Error fetching all drivers:', error);
        res.status(500).json({ error: 'Failed to fetch drivers' });
    }
});

// CREATE a driver

app.post('/drivers', async (req: Request, res: Response)=> {
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
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}, you better go catch it.`);
});