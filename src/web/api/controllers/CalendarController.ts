import { Request, Response } from 'express';
import { GoogleCalendarRepository } from '../../../core/implementations/google_calendar/GoogleCalendarRepository';
import { Event } from '../../../core/models/Event';

const calendarRepository = new GoogleCalendarRepository();

export const createEvent = async (req: Request, res: Response) => {
    const event: Event = {
        summary: 'Test Event',
        location: 'Brasilia, Brazil',
        description: 'A hardcoded event for testing purposes.',
        start: {
            dateTime: '2024-06-29T10:00:00-03:00',
            timeZone: 'America/Sao_Paulo',
        },
        end: {
            dateTime: '2024-06-29T11:00:00-03:00',
            timeZone: 'America/Sao_Paulo',
        },
    };

    try {
        const eventLink = await calendarRepository.createEvent(event);
        res.status(200).send(`Event created: ${eventLink}`);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Error creating event.');
    }
};

export const getEvents = async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        res.status(400).send('Please provide both startDate and endDate query parameters.');
        return;
    }

    try {
        const events: Event[] = await calendarRepository.getEvents(startDate as string, endDate as string);
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('Error fetching events.');
    }
};
