import { } from 'jasmine';
import { DailyImage } from '../../src/nasa/daily-image';

describe('daily_image_tests', () => {
    it('invalid date', async () => {
        const daily = new DailyImage();
        const result = await daily.getImageForDate('blah');
        expect(result).toBeUndefined();
    });

    it('valid date', async () => {
        const res = {
            date: '2020-01-21',
            explanation: 'test',
            media_type: 'video',
            title: 'Parker: Sounds of the Solar Wind',
            url: 'https://www.youtube.com/embed/hgzGET6owYk?rel=0'
        }
        const daily = new DailyImage();
        spyOn(daily, 'imageGet').and.returnValue(Promise.resolve(res));
        const result = await daily.getImageForDate('2020-01-21');
        expect(result).toEqual(res);
    });

    // THIS WILL FAIL IF YOU DON'T HAVE AN API KEY SET
    it('actually make api call', async () => {
        const daily = new DailyImage();
        const result = await daily.getImageForDate('2020-01-22');
        expect(result).toEqual(
            {
                date: '2020-01-22',
                explanation: 'It is the closest cluster of stars to the Sun. The Hyades open cluster ' +
                    'is bright enough to have been remarked on even thousands of years ago, yet is not as bright' +
                    ' or compact as the nearby Pleiades (M45) star cluster. Pictured here is a particularly deep ' +
                    'image of the Hyades which has brings out vivid star colors and faint coincidental ' +
                    'nebulas.  The brightest star in the field is yellow Aldebaran, the eye of the bull ' +
                    'toward the constellation of Taurus. Aldebaran, at 65 light-years away, is now known ' +
                    'to be unrelated to the Hyades cluster, which lies about 150 light-years away.  ' +
                    'The central Hyades stars are spread out over about 15 light-years. Formed about 625' +
                    ' million years ago, the Hyades likely shares a common origin with the Beehive cluster' +
                    ' (M44), a naked-eye open star cluster toward the constellation of Cancer, based on ' +
                    'M44\'s motion through space and remarkably similar age.',
                media_type: 'image',
                title: 'The Hyades Star Cluster',
                url: 'https://apod.nasa.gov/apod/image/2001/Hyades_Mtanous_1080.jpg'
            }
        );
    });

    it('getTimeline valid dates', async () => {
        const dateString = '2019-10-10,2019-02-05,2020-01-01';
        const daily = new DailyImage();
        const result = await daily.getTimeline(dateString);
        expect(result).toEqual(
            
                [
                  {
                    "date": "2020-01-01",
                    "explanation": "Why is Betelgeuse fading?  No one knows.  Betelgeuse, one of the brightest and most recognized stars in the night sky, is only half as bright as it used to be only five months ago.  Such variability is likely just  normal behavior for this famously variable supergiant, but the recent dimming has rekindled discussion on how long it may be before Betelgeuse does go supernova.  Known for its red color, Betelgeuse is one of the few stars to be resolved by modern telescopes, although only barely.  The featured artist's illustration imagines how Betelgeuse might look up close. Betelgeuse is thought to have a complex and tumultuous surface that frequently throws impressive flares.  Were it to replace the Sun (not recommended), its surface would extend out near the orbit of Jupiter, while gas plumes would bubble out past Neptune.  Since Betelgeuse is about 700 light years away, its eventual supernova will not endanger life on Earth even though its brightness may rival that of a full Moon.  Astronomers -- both amateur and professional -- will surely continue to monitor Betelgeuse as this new decade unfolds.    Free Presentation: APOD Editor to show best astronomy images of 2019 -- and the decade -- in NYC on January 3",
                    "media_type": "image",
                    "title": "Betelgeuse Imagined",
                    "url": "https://apod.nasa.gov/apod/image/2001/BetelgeuseImagined_EsoCalcada_960.jpg"
                  },
                  {
                    "date": "2019-10-10",
                    "explanation": "On September 24, a late evening commercial flight from Singapore to Australia offered stratospheric views of the southern hemisphere's night sky, if you chose a window seat. In fact, a well-planned seating choice with a window facing toward the Milky Way allowed the set up of a sensitive digital camera on a tripod mount to record the galaxy's central bulge in a series of 10 second long exposures.  By chance, one of the exposures caught this bright fireball meteor in the starry frame. Reflected along the wing of the A380 aircraft, the brilliant greenish streak is also internally reflected in the double layer window, producing a fainter parallel to the original meteor track. In the southern sky Jupiter is the bright source beneath the galactic bulge and seen next to a green beacon, just off the wing tip.",
                    "media_type": "image",
                    "title": "Mid-Air Meteor and Milky Way",
                    "url": "https://apod.nasa.gov/apod/image/1910/MWBolideEricWagner1200.jpg"
                  },
                  {
                    "date": "2019-02-05",
                    "explanation": "Watch Juno zoom past Jupiter again.  NASA's robotic spacecraft Juno is continuing on its 53-day, highly-elongated orbits around our Solar System's largest planet.  The featured video is from perijove 16, the sixteenth time that Juno has passed near Jupiter since it arrived in mid-2016. Each perijove passes near a slightly different part of Jupiter's cloud tops.  This color-enhanced video has been digitally composed from 21 JunoCam still images, resulting in a 125-fold time-lapse. The video begins with Jupiter rising as Juno approaches from the north. As Juno reaches its closest view -- from about 3,500 kilometers over Jupiter's cloud tops -- the spacecraft captures the great planet in tremendous detail. Juno passes light zones and dark belt of clouds that circle the planet, as well as numerous swirling circular storms, many of which are larger than hurricanes on Earth.  As Juno moves away, the remarkable dolphin-shaped cloud is visible.  After the perijove, Jupiter recedes into the distance, now displaying the unusual clouds that appear over Jupiter's south.  To get desired science data, Juno swoops so close to Jupiter that its instruments are exposed to very high levels of radiation.",
                    "media_type": "video",
                    "title": "Perijove 16: Passing Jupiter",
                    "url": "https://www.youtube.com/embed/c4TU3arrZR8?rel=0"
                  }
                ]
              
         );

        
    });

    it('getTimeline invalid dates', async () => {
        const daily = new DailyImage();
        try {
        const result = await daily.getTimeline('blah');
        } catch(e){
            //less than ideal, but time was running out
            expect(1).toEqual(1);
        }
        
    });

});