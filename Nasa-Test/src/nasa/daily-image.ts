import moment from 'moment';
import * as request from 'request-promise';
import { Keys } from './keys';

export interface IDailyImage {
    date?: string;
    explanation?: string;
    media_type?: string;
    title?: string;
    url?: string;
    error?: string;
}

export class DailyImage {

    /**
     * Gets the daily Nasa astronomy picture
     * @param date string with YYYY-MM-DD format
     */
    public async getImageForDate(date: string): Promise<IDailyImage> {

        try {
            // Get the date as a moment object
            const dateAsMoment = moment(date, 'YYYY-MM-DD');
            // Check that the date string is valid, and that the date is before or equal to today's date
            // moment() creates a moment with today's date
            if (!dateAsMoment.isValid() || dateAsMoment.isAfter(moment())) {
                return undefined;
            }
            // Parses the response
            const parsed = await this.imageGet(date);
            // Creates the return object
            return {
                date: parsed.date,
                explanation: parsed.explanation,
                media_type: parsed.media_type,
                title: parsed.title,
                url: parsed.url
            };
        } catch (e) {
            return {
                error: `There was an error retrieving the photo for this date.
                Make sure you have you api key properly setup`
            };
            // tslint:disable-next-line: no-console
            console.log(e);
        }
    }

    /**
     * Gets the daily Nasa astronomy picture for every date in the dates string
     * @param dates string with YYYY-MM-DD dates comma separated
     * @returns Promise of an array of IDailyImage objects, sorted chronilogically with most recent picture first
     */
    public async getTimeline(dates: string): Promise<IDailyImage[]>{
        try {
        var images: IDailyImage[] = [];
        var imagesAr: string[] = dates.replace(/["']/g,'').split(',');
        
        //this waits between each request to make a new one, probably a more optimal way to do this
        for(var i=0;i<imagesAr.length;i++){
            images.push(await this.getImageForDate(imagesAr[i]));
        }

        images.sort((a,b) => (new Date(b.date)) < (new Date(a.date)) ? -1 : (new Date(b.date)) < (new Date(a.date)) ? 1 : 0);

        return images;
    } catch(e) {
        return undefined;
    }
    }
    

    /**
     * Makes the get request to the nasa api
     * @param date string with YYYY-MM-DD format
     */
    public async imageGet(date: string) {
        // If there is a key set in the Keys file, use this key,
        // otherwise find it in the environment variables, this is for testing purposes
        const apiKey = Keys.apiKey ? Keys.apiKey : `${process.env.NASA_API}`;
        const resp = await request.get(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`);
        return JSON.parse(resp);
    }

}
